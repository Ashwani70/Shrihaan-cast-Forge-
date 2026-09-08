# PRD — SHRIHAAN CAST & FORGE PVT. LTD. B2B Website

## Original Problem Statement
Build a premium international B2B website for SHRIHAAN CAST & FORGE PVT. LTD. (casting, forging, scaffolding, shoring & industrial engineering products). The uploaded product catalogue PDF is the PRIMARY SOURCE OF TRUTH for the product section: only real products, item codes, dimensions, weights and specs; anything missing shows "Available on Request". No Gravity Engineering Works branding. Premium industrial design (Deep Industrial Navy #111827, Steel Grey #374151, metallic copper accent), compact sticky header, hero ("PRECISION ENGINEERED. BUILT FOR PERFORMANCE."), 12 product categories, searchable/filterable catalogue, product detail pages with spec tables + image zoom/fullscreen, enquiry/quote forms, industries + quality sections, catalogue page with PDF download, contact page, footer, SEO-friendly URLs, fast performance, final product audit against the catalogue.

## User Personas
- International B2B buyer / procurement manager looking for scaffolding/shoring components with verified item codes and specs
- Contractor/distributor wanting to request bulk quotes quickly
- Engineer checking dimensions/weights before enquiry

## Architecture
- Frontend: React 19 (CRA + craco), Tailwind, shadcn/ui (Dialog), react-router-dom v7, axios, sonner toasts. Static product database at `src/data/products.js` built exclusively from the catalogue PDF (all item codes/tables transcribed; 117 product images extracted from the PDF into `public/products/*.webp`).
- Backend: FastAPI + Motor (MongoDB). Endpoints: `GET /api/`, `POST /api/enquiries`, `GET /api/enquiries`.
- Catalogue PDF served at `/shrihaan-cast-forge-catalogue.pdf` (download button).
- Contact details are placeholders ("Available on Request") until the user supplies real ones.

## Implemented (2026-08-14, v3 — 3D & Admin)
- v3: Full 3D product experience with React Three Fiber — parametric metal product models built from catalogue imagery/data (labeled "3D Visualization", never claimed as certified CAD). Cinematic product reveal (blueprint → wireframe → solid metal → auto-rotate + spec callouts + quote CTA), viewer controls (rotate/zoom/wireframe/technical/exploded/fullscreen/reset), exploded views on multi-part products (jacks, props, verticals, couplers, braces), CAD-style Technical Drawing section with FRONT/SIDE/TOP/ISOMETRIC orthographic views and catalogue-only dimension chips, 3D Product Gallery page (/gallery3d) with category filters and in-viewport lazy 3D mounting, cinematic 3D homepage hero (rotating Ringlock vertical, blueprint grid, CAD callouts, parallax), product cards with View 3D / Drawing / Details / Quote actions, mobile 3D with reduced dpr/no shadows. Enquiry Dashboard at /admin (JWT auth, status management new/contacted/closed, delete). Google Analytics wired via REACT_APP_GA_ID (inactive until ID provided).
- v1: Full site — Home, About, Products (search + category filter), Category pages, Product detail with spec/variant tables + lightbox zoom, Catalogue page with PDF download, Contact, Footer. 98 catalogue-verified products with extracted PDF imagery. Enquiry modal + contact form persisted to MongoDB.
- v2: Floating WhatsApp chat button (product-aware prefilled message; number via REACT_APP_WHATSAPP_NUMBER — currently PLACEHOLDER 910000000000). Enquiry email alerts via Emergent managed Resend proxy (EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME="SHRIHAAN CAST & FORGE", OWNER_EMAIL currently PLACEHOLDER delivered@resend.dev — replace with real inbox). Design elevation: lenis smooth scrolling, framer-motion masked line-by-line hero reveal + hero parallax, editorial marquee strip, numbered manifesto quality chapters, spotlight product photography treatment, scroll-reveal micro-interactions.

## Verified
- Backend: POST/GET /api/enquiries via curl; notification email send confirmed (HTTP 202 from integration proxy).
- Frontend screenshots: kinetic hero, marquee, numbered quality chapters, product detail + quote modal submit, catalogue search filter, lightbox zoom, WhatsApp button with prefilled product message.
- Not checked: real WhatsApp number and real owner inbox (both placeholders); email rendering in an actual inbox.

## Implemented (2026-08-21, v11 — central product validation)
- v11: One central validator per dataset — `isCompleteProduct`/`visibleProducts` (tractorParts.js) and `isCompleteScaffolding`/`visibleScaffolding` (products.js). A product shows only with name + valid image + division/category + description + active status. Applied to: division listings, tractor listing, search, counts ("SHOWING X PRODUCTS" now counts only valid), related products, home featured, and detail-page guards (incomplete product URL → "Product Not Available" + Back to Products). Records NOT deleted — just filtered. Resulting counts: forging 6, agriculture 15, tractorlink 17, auto 10 (scaffolding 98 all valid). Bale Spear Double marked complete (has image + full specs).

## Implemented (2026-08-21, v10 — homepage copy/sections)
- v10: Home About section retitled "From Scaffolding to Forging" with expanded copy (scaffolding → forging components, tractor parts, auto parts). Product Range section now shows the 5 divisions ("From Scaffolding to Forging, Tractor Parts & Auto Parts"). Featured Products mixes scaffolding + tractor/agri/auto products. Stats strip shows 5 divisions and combined product count.

## Implemented (2026-08-21, v9 — grid layout fix)
- v9: Product grids changed to 3-col desktop / 2-col tablet / 1-col mobile with items-stretch equal heights. Image-less cards no longer render a large blank navy panel — they show a compact layout (small monogram chip + name + buttons) so no card ever looks empty. Only real products render; grid reflows automatically.

## Implemented (2026-08-21, v8 — Products.zip integration)
- v8: Imported all 80 images from customer Products.zip (folders = divisions). Images enhanced (background cleanup to pure white, autocontrast, sharpen, squared, webp) into /products/parts/. Added 28 new products with names + model codes preserved from the supplied labeled images (Double/Single Tine Guard GC255–GC263, Ledger Blade GC264–GC269 + GC281, Eye Rod GC270–GC275, Tongue Tip GC276, Toggle Pin GC277, Socket Eye Bolt GC278, L-Shaped Handle Pin GC279, Scaffolding Spigot GC280, Scaffold Wedge Nut GC282, Scaffold Cup GC286 (full specs from image: Carbon Steel, 0.35 kg, 80×70×28 mm), Locating Peg GC285/GC287/GC288 (GC287 full specs), Spigot Pin, Dog Bone Tie, Standard Top Link Zinc Coated). Merged supplied photos into 5 existing products (lever-arm, clutch-fork, wing-nut, hook-latch, eye-rod). Division counts: agriculture 15, tractorlink 44, auto 25, forging 66. Cards show enhanced photos with hover zoom/tilt; products without photos keep monogram tiles. Division tiles now use real supplied imagery.

## Implemented (2026-08-21, v7)
- v7: Removed ALL product images from the four forging divisions (Forging Parts, Tractorlink, Agriculture Parts, Auto Parts) per user request — cards and detail pages now show branded monogram tiles with "Product image available on request"; division cards on /products use navy monogram tiles (Scaffolding Parts keeps catalogue imagery). The cropped tractor grid images remain on disk at /products/tractor/ but are not displayed.

## Implemented (2026-08-20, v6 — Products navigation restructure)
- v6: Products navigation rebuilt around 5 divisions from single data source `DIVISIONS` in products.js: Forging Parts, Tractorlink, Agriculture Parts, Auto Parts, Scaffolding Parts. Old 12-category dropdown removed; standalone Tractor Parts nav link removed. Routes: /products shows 5 division cards + scaffolding catalogue browser; /products/:section dispatches (SectionRouter) to division page or scaffolding category page. Division assignment via multi-membership tags in tractorParts.js (forging-parts: all 66; tractorlink: 30 linkage parts; auto-parts: 17 auto hardware; agriculture-parts: bale spear; scaffolding-parts: 12 existing categories). Detail pages unchanged (/products/:cat/:slug, /tractor-parts/:slug). Footer Products column now lists the 5 divisions.

## Implemented (2026-08-17, v5 — Tractor Parts + 3D removal)
- v5: Per user instruction, REMOVED all 3D model presentation (3D hero scene, 3D product viewer, technical/CAD drawing views, 3D Gallery page + nav/footer links). Product pages are photo-first with spotlight imagery, fullscreen zoom lightbox, and an honest "Technical drawing available on request" note. Added TRACTOR PARTS nav link (after Products) and /tractor-parts section: 66 forging components cropped from the 4 supplied catalogue grid images (number badges cleaned, webp-optimized), product names preserved verbatim, search filter, premium cards, detail pages at /tractor-parts/:slug with gallery (8 products have 2 images), specs table (only Bale Spear Double has confirmed specs from the supplied detail card — everything else shows "Available on Request"), Request a Quote wiring. NOTE: the "exploded view videos" idea was dropped as it conflicts with the no-3D instruction.

## Implemented (2026-08-17, v4 — Gemini AI + enhanced imagery)
- v4: Gemini AI Product Assistant (gemini-3.5-flash via EMERGENT_LLM_KEY, emergentintegrations) — floating chat widget (bottom-left), SSE token streaming, answers grounded strictly in catalogue_context.txt (generated from products.js; never quotes prices, cites item codes, suggests Request a Quote), chat history persisted in Mongo `chat_messages`. Endpoints: POST /api/assistant/chat (SSE), GET /api/assistant/history/{session_id}. All 12 category card images re-generated as clean studio product shots via Gemini Nano Banana (gemini-3.1-flash-image-preview) using catalogue images as reference (`/products/cat-*.webp`); script at /app/scripts/generate_category_images.py.

## Verified (v3)
- Backend: login returns JWT; enquiries list rejects unauthenticated (401); PATCH status + DELETE work; alert email still fires (202).
- Frontend screenshots: 3D hero (rotating ringlock vertical + blueprint grid + CAD callouts), product page cinematic 3D viewer, technical mode with spec callouts, exploded view on U-head jack, CAD drawing with view switcher, 3D gallery with category filter (screw jacks → 9 products), admin login → dashboard with 3 enquiries, mobile (390px) 3D viewer renders.
- Not checked: GA events (no measurement ID provided yet); exploded/3D performance on low-end physical devices (simulated viewport only); email rendering in real inbox.

## Backlog
- P0: Replace placeholders: OWNER_EMAIL (real sales inbox) in backend/.env, REACT_APP_WHATSAPP_NUMBER (real WhatsApp business number) in frontend/.env, and contact address/phone/email on Contact page + Footer.
- P1: Admin view for enquiries; rebrand the downloadable PDF (current PDF still carries Gravity Engineering Works branding); per-page SEO meta via react-helmet.
- P2: Multi-language, Google Analytics, sitemap.xml/robots.txt.

## Next Tasks
1. Add real company contact details when provided.
2. Optional: Resend email notification on each enquiry.
3. Optional: branded replacement catalogue PDF.
