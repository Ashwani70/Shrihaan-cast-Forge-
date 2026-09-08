from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import json as _json
from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]

logger = logging.getLogger(__name__)

# --- Email guardrail gate (Resend playbook) ---
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        return None
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


def _enquiry_email_html(doc: dict) -> str:
    rows = [
        ("Name", doc["name"]), ("Company", doc["company"]), ("Country", doc["country"]),
        ("Email", doc["email"]), ("Phone / WhatsApp", doc["phone"]), ("Product", doc["product"]),
        ("Item Code", doc["itemCode"]), ("Quantity", doc["quantity"]), ("Message", doc["message"]),
        ("Source", doc["source"]),
    ]
    trs = "".join(
        f'<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;color:#374151;font-weight:600">{escape(k)}</td>'
        f'<td style="padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;color:#111827">{escape(str(v) or "-")}</td></tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%" style="background:#f8fafc;padding:24px">'
        '<tr><td style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">'
        f'<p style="font-size:18px;font-weight:700;color:#111827">New enquiry received — {escape(EMAIL_FROM_NAME)}</p>'
        f'<table role="presentation" width="100%" style="border-collapse:collapse;background:#ffffff">{trs}</table>'
        f'<p style="font-size:12px;color:#94a3b8;margin-top:16px">Sent by {escape(EMAIL_FROM_NAME)} website enquiry system.</p>'
        '</td></tr></table>'
    )

app = FastAPI()
api_router = APIRouter(prefix="/api")


class EnquiryCreate(BaseModel):
    name: str
    company: Optional[str] = ""
    country: Optional[str] = ""
    email: EmailStr
    phone: Optional[str] = ""
    product: Optional[str] = ""
    itemCode: Optional[str] = ""
    quantity: Optional[str] = ""
    message: Optional[str] = ""
    source: Optional[str] = "quote"


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str = ""
    country: str = ""
    email: str
    phone: str = ""
    product: str = ""
    itemCode: str = ""
    quantity: str = ""
    message: str = ""
    source: str = "quote"
    status: str = "new"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "SHRIHAAN CAST & FORGE PVT. LTD. API"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    obj = Enquiry(**input.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.enquiries.insert_one(doc)
    if OWNER_EMAIL:
        try:
            label = doc['product'] or 'Website Contact'
            await send_email(
                to=OWNER_EMAIL,
                subject=f"New Enquiry: {label} — {doc['name']}",
                html=_enquiry_email_html(doc),
            )
        except Exception as e:
            logger.error(f"Enquiry notification email failed: {e}")
    return obj


# ---------------- Auth (single admin, JWT Bearer) ----------------
security = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(email: str) -> str:
    payload = {"sub": email, "type": "access", "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(creds: HTTPAuthorizationCredentials = Depends(security)):
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"email": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Not authorized")
    return user


class LoginInput(BaseModel):
    email: EmailStr
    password: str


@api_router.post("/auth/login")
async def login(input: LoginInput):
    email = input.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(email)
    return {"token": token, "user": {"email": email, "name": user.get("name", "Admin"), "role": "admin"}}


@api_router.get("/auth/me")
async def auth_me(admin=Depends(get_current_admin)):
    return admin


@app.on_event("startup")
async def seed_admin():
    await db.users.create_index("email", unique=True)
    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.users.insert_one({
            "email": ADMIN_EMAIL, "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "Admin", "role": "admin", "created_at": datetime.now(timezone.utc).isoformat(),
        })
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one({"email": ADMIN_EMAIL}, {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}})


EMERGENT_LLM_KEY = os.environ["EMERGENT_LLM_KEY"]
CATALOGUE_CONTEXT = (ROOT_DIR / 'catalogue_context.txt').read_text()

ASSISTANT_SYSTEM = f"""You are the AI Product Assistant on the SHRIHAAN CAST & FORGE PVT. LTD. website — a B2B manufacturer of casting, forging, scaffolding, shoring and industrial engineering products.

STRICT RULES:
- Answer ONLY using the catalogue data below. Never invent specifications, dimensions, weights, materials, load capacities, certifications or prices.
- If information is not in the catalogue, say it is "Available on Request" and suggest the buyer use the Request a Quote form.
- Prices are never quoted — direct all pricing questions to Request a Quote.
- Keep answers concise and professional. Always cite exact Item Codes when recommending products.
- When a buyer describes an application, recommend matching products from the catalogue with their item codes.

CATALOGUE DATA:
{CATALOGUE_CONTEXT}
"""


class ChatInput(BaseModel):
    session_id: str
    message: str


@api_router.post("/assistant/chat")
async def assistant_chat(input: ChatInput):
    msg = input.message.strip()
    if not msg or len(msg) > 2000:
        raise HTTPException(status_code=400, detail="Invalid message")
    now = datetime.now(timezone.utc).isoformat()
    await db.chat_messages.insert_one({"session_id": input.session_id, "role": "user", "text": msg, "timestamp": now})

    history = await db.chat_messages.find({"session_id": input.session_id}, {"_id": 0}).sort("timestamp", 1).to_list(40)
    recent = history[-9:]
    convo = "\n".join(f"{'Buyer' if h['role'] == 'user' else 'Assistant'}: {h['text']}" for h in recent[:-1])
    prompt = f"{convo}\nBuyer: {msg}" if convo else msg

    chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=input.session_id, system_message=ASSISTANT_SYSTEM)
    chat.with_model("gemini", "gemini-3.5-flash")

    async def event_generator():
        full = []
        try:
            async for ev in chat.stream_message(UserMessage(text=prompt)):
                if isinstance(ev, TextDelta):
                    full.append(ev.content)
                    yield f"data: {_json.dumps({'t': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            logger.error(f"Assistant stream error: {e}")
            yield f"data: {_json.dumps({'t': 'Sorry, I could not process that. Please try again or use Request a Quote.'})}\n\n"
        reply = "".join(full).strip()
        if reply:
            await db.chat_messages.insert_one({
                "session_id": input.session_id, "role": "assistant", "text": reply,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            })
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@api_router.get("/assistant/history/{session_id}")
async def assistant_history(session_id: str):
    rows = await db.chat_messages.find({"session_id": session_id}, {"_id": 0}).sort("timestamp", 1).to_list(100)
    return rows


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(admin=Depends(get_current_admin)):
    rows = await db.enquiries.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


class EnquiryStatus(BaseModel):
    status: str


@api_router.patch("/enquiries/{enquiry_id}")
async def update_enquiry(enquiry_id: str, input: EnquiryStatus, admin=Depends(get_current_admin)):
    res = await db.enquiries.update_one({"id": enquiry_id}, {"$set": {"status": input.status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"status": "updated"}


@api_router.delete("/enquiries/{enquiry_id}")
async def delete_enquiry(enquiry_id: str, admin=Depends(get_current_admin)):
    res = await db.enquiries.delete_one({"id": enquiry_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"status": "deleted"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
