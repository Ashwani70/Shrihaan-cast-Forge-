from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import re
import time
from collections import defaultdict
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
import importlib

try:
    _llm_mod = importlib.import_module("emergentintegrations.llm.chat")
    LlmChat = getattr(_llm_mod, "LlmChat", None)
    UserMessage = getattr(_llm_mod, "UserMessage", None)
    TextDelta = getattr(_llm_mod, "TextDelta", None)
    StreamDone = getattr(_llm_mod, "StreamDone", None)
except Exception:
    LlmChat = UserMessage = TextDelta = StreamDone = None


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'shrihaan_db')]

EMAIL_BASE_URL = os.environ.get("EMAIL_BASE_URL", "https://integrations.emergentagent.com")
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Shrihaan Cast & Forge Private Limited")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "sales@shrihaancastforge.com")
JWT_SECRET = os.environ.get("JWT_SECRET", "default_secret_key_change_in_env")
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@shrihaancastforge.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin_secret_pass")

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


import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = os.environ.get("SMTP_HOST", "")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SMTP_FROM = os.environ.get("SMTP_FROM", "") or SMTP_USER or "sales@shrihaancastforge.com"
SMTP_USE_SSL = os.environ.get("SMTP_USE_SSL", "true").lower() in ("true", "1", "yes")

async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)

    # 1. Try SMTP if configured (Hostinger, Gmail, Custom SMTP)
    if SMTP_HOST and SMTP_USER and SMTP_PASSWORD:
        def _send_smtp():
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"{EMAIL_FROM_NAME} <{SMTP_FROM}>"
            msg["To"] = to
            if reply_to:
                msg["Reply-To"] = reply_to

            msg.attach(MIMEText(html, "html"))

            if SMTP_USE_SSL:
                with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20) as server:
                    server.login(SMTP_USER, SMTP_PASSWORD)
                    server.sendmail(SMTP_FROM, [to], msg.as_string())
            else:
                with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
                    server.starttls()
                    server.login(SMTP_USER, SMTP_PASSWORD)
                    server.sendmail(SMTP_FROM, [to], msg.as_string())
            return "smtp-success"

        try:
            return await asyncio.to_thread(_send_smtp)
        except Exception as e:
            logger.error(f"SMTP email dispatch failed: {e}")

    # 2. Try Resend / Emergent API Proxy if key is configured
    key = EMAIL_KEY or os.environ.get("RESEND_API_KEY", "")
    if key:
        payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
        if reply_to:
            payload["contact_email"] = reply_to
            payload["reply_to"] = reply_to
        try:
            async with httpx.AsyncClient(timeout=30) as http:
                resp = await http.post(
                    f"{EMAIL_BASE_URL}/api/v1/email/send",
                    headers={"X-Email-Key": key, "Authorization": f"Bearer {key}"},
                    json=payload,
                )
            resp.raise_for_status()
            return resp.json().get("id", "api-success")
        except Exception as e:
            logger.error(f"API Proxy email dispatch failed: {e}")

    # 3. Fallback: Log email details for local testing
    logger.warning(
        f"NO EMAIL CREDENTIALS CONFIGURED. Logged enquiry email to stdout:\n"
        f"To: {to} | Subject: {subject} | Reply-To: {reply_to}"
    )
    return "logged-dev-mode"


def _enquiry_email_html(doc: dict) -> str:
    name = escape(str(doc.get("name", "")).strip())
    company = escape(str(doc.get("company", "")).strip()) or "N/A"
    email = escape(str(doc.get("email", "")).strip())
    phone = escape(str(doc.get("phone", "")).strip()) or "N/A"
    product = escape(str(doc.get("product", "")).strip()) or "General Enquiry"
    quantity = escape(str(doc.get("quantity", "")).strip()) or "N/A"
    message = escape(str(doc.get("message", "")).strip()) or "N/A"

    return f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1e293b; background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-radius: 6px;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-top: 0;">NEW QUOTE REQUEST</h2>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 20px; font-size: 14px;">
        <tr style="background: #f8fafc;"><td style="padding: 10px; font-weight: bold; width: 140px; border: 1px solid #e2e8f0;">Name:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">{name}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Company:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">{company}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Email:</td><td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:{email}" style="color: #ea580c;">{email}</a></td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Phone:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">{phone}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Product:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">{product}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Quantity:</td><td style="padding: 10px; border: 1px solid #e2e8f0;">{quantity}</td></tr>
        <tr style="background: #f8fafc;"><td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Requirements:</td><td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">{message}</td></tr>
      </table>

      <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
        <strong>Website:</strong> Shrihaan Cast & Forge Pvt Ltd (<a href="https://www.shrihaancastforge.com/" style="color: #ea580c; text-decoration: none;">https://www.shrihaancastforge.com/</a>)
      </p>
    </div>
    """

# --- Security Middleware ---
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "img-src 'self' data: https:; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "font-src 'self' data: https:;"
        )
        return response


_RATE_LIMIT_STORE = defaultdict(list)
_SENSITIVE_PATHS = {"/api/enquiries", "/api/admin/login"}

class RateLimiterMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        path = request.url.path

        # Clean records older than 60s
        timestamps = [t for t in _RATE_LIMIT_STORE[client_ip] if now - t < 60]
        _RATE_LIMIT_STORE[client_ip] = timestamps

        # Enforce rate limit (15 requests/min on sensitive routes, 120 requests/min overall)
        limit = 15 if any(path.startswith(p) for p in _SENSITIVE_PATHS) else 120
        if len(timestamps) >= limit:
            return Response(
                content=_json.dumps({"detail": "Too many requests. Please wait a moment before trying again."}),
                status_code=429,
                media_type="application/json"
            )

        _RATE_LIMIT_STORE[client_ip].append(now)
        return await call_next(request)


def _sanitize_string(val: str, max_len: int = 500) -> str:
    if not val:
        return ""
    s = re.sub(r"<script.*?>.*?</script>", "", str(val), flags=re.I | re.S)
    s = re.sub(r"javascript:", "", s, flags=re.I)
    s = re.sub(r"on\w+\s*=", "", s, flags=re.I)
    return s.strip()[:max_len]


app = FastAPI()
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimiterMiddleware)
api_router = APIRouter(prefix="/api")


class EnquiryCreate(BaseModel):
    name: str = Field(..., min_length=1)
    company: Optional[str] = ""
    country: Optional[str] = ""
    email: EmailStr
    phone: str = Field(..., min_length=1)
    product: str = Field(..., min_length=1)
    itemCode: Optional[str] = ""
    quantity: Optional[str] = ""
    message: str = Field(..., min_length=1)
    source: Optional[str] = "quote"
    hp_field: Optional[str] = ""


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
    # Spam honeypot check
    if input.hp_field and input.hp_field.strip():
        logger.info("Spam honeypot triggered; ignoring submission.")
        return Enquiry(**input.model_dump(exclude={'hp_field'}))

    # Sanitize inputs against XSS and buffer attacks
    sanitized = {
        'name': _sanitize_string(input.name, 100),
        'company': _sanitize_string(input.company, 150),
        'country': _sanitize_string(input.country, 100),
        'email': input.email.strip().lower(),
        'phone': _sanitize_string(input.phone, 30),
        'product': _sanitize_string(input.product, 150),
        'itemCode': _sanitize_string(input.itemCode, 50),
        'quantity': _sanitize_string(input.quantity, 50),
        'message': _sanitize_string(input.message, 2000),
        'source': _sanitize_string(input.source, 50) or 'quote',
    }

    obj = Enquiry(**sanitized)
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.enquiries.insert_one(doc)

    target_email = OWNER_EMAIL or "sales@shrihaancastforge.com"
    product_name = input.product.strip() or "General Enquiry"
    subject = f"New Quote Request - {product_name}"

    try:
        await send_email(
            to=target_email,
            subject=subject,
            html=_enquiry_email_html(doc),
            reply_to=doc['email'],
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


EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
CATALOGUE_CONTEXT = (ROOT_DIR / 'catalogue_context.txt').read_text(encoding='utf-8') if (ROOT_DIR / 'catalogue_context.txt').exists() else ""

ASSISTANT_SYSTEM = f"""You are the AI Product Assistant on the SHRIHAAN CAST & FORGE PVT. LTD. website — a B2B manufacturer of forging, casting, scaffolding, shoring and industrial engineering products.

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

    if not LlmChat or not EMERGENT_LLM_KEY:
        async def fallback_generator():
            yield f"data: {_json.dumps({'t': 'AI Assistant is offline. Please submit an enquiry via Request a Quote or contact sales.'})}\n\n"
            yield "data: [DONE]\n\n"
        return StreamingResponse(fallback_generator(), media_type="text/event-stream",
                                 headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

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
