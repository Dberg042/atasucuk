# Ata Sucuk — UI/UX Pro Max variant analysis

Date: 2026-06-19 UTC
Source skill repo: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill` at `b7e3af8`
Current live page: <https://dberg042.github.io/atasucuk/>
Variant targets: `/v1/`, `/v2/`, `/v3/`

## Constraints from Ake

- Keep the same content and same assets as the current Ata Sucuk page.
- New icons are allowed, but no emoji-as-icons.
- The original homepage must remain untouched and available at `/atasucuk/`.
- Variants must be visible through GitHub Pages as:
  - <https://dberg042.github.io/atasucuk/v1/>
  - <https://dberg042.github.io/atasucuk/v2/>
  - <https://dberg042.github.io/atasucuk/v3/>
- Use the same lead endpoint and form behavior; do not test-submit real leads.
- Build static, dependency-light pages suitable for GitHub Pages.

## UI/UX Pro Max findings

The skill search for `premium halal sucuk food landing Norwegian ecommerce waitlist artisan meat` recommended:

- Pattern: **Waitlist / Coming Soon**
- Conversion focus: email capture above the fold, launch anticipation, early-access benefit, minimal friction.
- Palette direction: premium black / warm off-white / gold accent; keep red as brand/food anchor.
- Checklist:
  - no emoji icons; use inline SVG / Lucide-style symbols,
  - visible focus states,
  - `prefers-reduced-motion` respected,
  - responsive checks at 375, 768, 1024, 1440 px,
  - light contrast minimum 4.5:1; CTA contrast higher.

Supplemental landing pattern matches:

- **Bento Grid Showcase** — good for scannable proof without adding new claims.
- **Scroll-Triggered Storytelling** — good for a heritage/artisan food narrative.
- **Trust & Authority + Conversion** — good for halal, Norwegian production, premium quality.

Supplemental style matches:

- **Nature Distilled** — terracotta, sand, clay, organic textures; strong fit for artisan food.
- **Editorial Grid / Magazine** — asymmetric layout, pull quote treatment, print-inspired hierarchy; strong fit for premium heritage.
- **Bold Typography / Mobile Poster** — useful for one high-personality option, but must not become gimmicky.
- **Modern Dark / Cinematic** — good for a launch/waitlist premium mood; use carefully for accessibility.

## Recommended variant concepts

### v1 — Artisan Editorial / “heritage magazine”

**Best when:** Ata Sucuk should feel old-world, handcrafted, premium and culturally rooted.

**Design direction:**

- Editorial layout with large serif headlines, asymmetric content blocks, image captions, section numbers and pull-quote styling.
- Warm paper/cream background, terracotta/red accents, subtle grain texture, deep brown/black text.
- Keep the current content, but present it as a story: launch promise → market problem → Ata method → quality pillars → waitlist.
- Use inline SVG icons with a hand-crafted food/quality feeling: shield, map-pin, hourglass, flame/spice, check, x.
- Motion should be subtle: fade/slide reveals, not heavy scroll-jacking.

**Why it fits:** sucuk is not a SaaS dashboard. The premium cue should come from provenance, patience and taste. Editorial gives it gravity without pretending to be a luxury perfume ad. Tiny mercy.

### v2 — Nordic Trust Bento / “clean conversion system”

**Best when:** the page should convert fast and make the value proposition obvious.

**Design direction:**

- Modular bento grid: hero + email form, three trust tiles, problem/solution comparison, image showcase, quality cards, final CTA.
- Lighter Nordic palette: cream, sand, dark stone, brand red, muted gold.
- More compact than v1; scannability over atmosphere.
- Strong sticky/floating CTA on desktop and accessible repeated forms.
- Use crisp minimal line icons and check/x indicators.

**Why it fits:** this is probably the commercially strongest variant. It answers: halal? local? cheaper than import? fresh? sign up where? Less poetry, more meat.

### v3 — Cinematic Dark Launch / “premium waitlist”

**Best when:** Ata Sucuk should feel like an anticipated launch rather than just a product page.

**Design direction:**

- Dark hero, warm gold/red ambient glow, large product imagery, glassy signup panel.
- “Lanseres snart i Norge” remains the anticipation signal; do not invent fake countdowns or waitlist numbers.
- Chapters/cards on dark surfaces: 370 kr/kg pain point, local production, fermentation, spices, final waitlist CTA.
- Use fewer, bolder sections with large imagery and strong contrast.
- Respect `prefers-reduced-motion`; avoid excessive blur where it hurts readability.

**Why it fits:** visually distinct from the current page while keeping the same story. It can feel premium and appetite-driven if the contrast is handled properly; if not, it becomes a steakhouse PDF in a trenchcoat.

## Non-negotiable build checklist for Claude Code

- Create `/v1/index.html` + `/v1/styles.css`, `/v2/index.html` + `/v2/styles.css`, `/v3/index.html` + `/v3/styles.css`.
- Preserve `/index.html` and `/styles.css` unless a tiny navigation link to variants is explicitly justified; default is **do not touch**.
- Use existing images from `../assets/hero.jpg`, `../assets/middle.png`, `../assets/cta.jpg` or existing reference assets if already used by the current site.
- Use relative paths that work on GitHub Pages subpaths.
- Preserve the Gentic lead endpoint:
  `https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070`
- Preserve two forms per variant unless a variant has a strong UX reason for one sticky form plus final form; all forms must use `email`, `required`, `autocomplete=email`, and hidden `source` values that identify the variant.
- Do not add fake testimonials, fake customer logos, fake waitlist counts, fake countdown dates or unverifiable health claims.
- Inline SVG icons are preferred. No icon CDN required.
- Add/maintain `docs/atasucuk-v123-check.md` as a running checklist after meaningful implementation steps.
- Run `python3 scripts/verify_versions.py` and fix every failure before declaring complete.
