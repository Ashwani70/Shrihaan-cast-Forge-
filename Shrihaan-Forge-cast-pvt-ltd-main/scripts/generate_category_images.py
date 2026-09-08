import asyncio
import base64
import os
import sys
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv('/app/backend/.env')
API_KEY = os.environ['EMERGENT_LLM_KEY']
SRC = '/app/frontend/public/products'
OUT = '/app/frontend/public/products'

CATEGORIES = [
    ('ringlock-system', 'ringlock-vertical.webp', 'ringlock scaffolding vertical standard with rosette discs'),
    ('ringlock-accessories', 'rosette.webp', 'ringlock scaffolding rosette ring accessory'),
    ('cuplock-system', 'cuplock-node-photo.webp', 'cuplock scaffolding node connection with cups'),
    ('support-railings', 'support-guard-rail-500.webp', 'scaffolding guard rail post'),
    ('kwikstage-system', 'kwikstage-banner.webp', 'kwikstage scaffolding system'),
    ('ladders-brackets-gates-accessories', 'ladder.webp', 'galvanized steel scaffolding access ladder'),
    ('screw-base-jacks', 'solid-screw-jack.webp', 'adjustable screw base jack with cast nut'),
    ('walk-boards-steel-planks', 'american-type-steel-plank.webp', 'galvanized steel walk board plank'),
    ('steel-props', 'props-banner.webp', 'adjustable steel shoring props'),
    ('forged-pressed-couplers', 'british-type-right-angle-coupler.webp', 'forged scaffolding right angle coupler'),
    ('framework-accessories', 'fa-01.webp', 'formwork hardware accessory'),
    ('frames', 'walk-through-frame.webp', 'yellow steel walk-through scaffolding frame'),
]

PROMPT = (
    'Enhance this industrial product photo into a clean, sharp, high-resolution professional studio '
    'product photograph of the exact same {what}. Keep the product shape, color and proportions identical. '
    'Soft light-grey studio gradient background, subtle floor shadow, crisp machined metal detail, '
    'catalogue quality, no text, no watermark, no people, no logos.'
)


async def gen(slug, ref, what):
    ref_path = os.path.join(SRC, ref)
    if not os.path.exists(ref_path):
        print('SKIP missing ref', slug, flush=True)
        return
    with open(ref_path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    chat = LlmChat(api_key=API_KEY, session_id=f'catimg-{slug}', system_message='You are a professional product photographer.')
    chat.with_model('gemini', 'gemini-3.1-flash-image-preview').with_params(modalities=['image', 'text'])
    msg = UserMessage(text=PROMPT.format(what=what), file_contents=[ImageContent(b64)])
    try:
        text, images = await chat.send_message_multimodal_response(msg)
    except Exception as e:
        print('FAIL', slug, str(e)[:120], flush=True)
        return
    if images:
        data = base64.b64decode(images[0]['data'])
        out = os.path.join(OUT, f'cat-{slug}.png')
        with open(out, 'wb') as f:
            f.write(data)
        print('OK', slug, len(data), flush=True)
    else:
        print('NOIMG', slug, (text or '')[:80], flush=True)


async def main():
    for slug, ref, what in CATEGORIES:
        await gen(slug, ref, what)

asyncio.run(main())
