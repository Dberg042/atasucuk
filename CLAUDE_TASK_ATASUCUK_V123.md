# Claude Task — Ata Sucuk v1/v2/v3 UI alternatives

You are Claude Code running in `/root/atasucuk`.

Ake likes the current Ata Sucuk homepage at <https://dberg042.github.io/atasucuk/>, but wants three alternative homepage versions to compare. Build them as static GitHub Pages subpages:

- `/v1/` → <https://dberg042.github.io/atasucuk/v1/>
- `/v2/` → <https://dberg042.github.io/atasucuk/v2/>
- `/v3/` → <https://dberg042.github.io/atasucuk/v3/>

## Read first

1. `docs/ui-ux-pro-max-variants.md` — design analysis and variant concepts.
2. `index.html` and `styles.css` — current content, forms, assets and brand base.
3. `docs/final-verification.md` and `docs/done-list.md` — previous implementation context.
4. `scripts/verify_versions.py` — required deterministic verification for this task.

## Hard requirements

- Keep the existing root homepage working. Do **not** break `/`.
- Create these files:
  - `v1/index.html`
  - `v1/styles.css`
  - `v2/index.html`
  - `v2/styles.css`
  - `v3/index.html`
  - `v3/styles.css`
- Same assets only: use existing images from `../assets/hero.jpg`, `../assets/middle.jpg`, `../assets/cta.jpg` and/or existing reference assets already in this repo. Do not fetch or invent new product images.
- Same core content and facts. You may restructure section order and shorten labels only where the design needs it, but do not invent:
  - testimonials,
  - customer logos,
  - waitlist counts,
  - launch dates/countdowns,
  - health claims,
  - certifications beyond the existing “100% Garantert Halal” copy.
- Preserve the lead endpoint exactly:
  `https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070`
- Forms must be accessible and have variant-specific hidden sources, for example:
  - `v1_hero_waitlist`, `v1_footer_waitlist`
  - `v2_hero_waitlist`, `v2_footer_waitlist`
  - `v3_hero_waitlist`, `v3_footer_waitlist`
- Inline SVG icons only; no emoji icons.
- External resources: Google Fonts are acceptable. Avoid JS frameworks/CDNs. Avoid Tailwind CDN.
- Respect `prefers-reduced-motion`.
- Responsive targets: 375px, 768px, 1024px, 1440px.

## Variant specs

### v1 — Artisan Editorial / heritage magazine

Make v1 feel like a premium food/heritage editorial.

- Warm paper/cream canvas, deep brown/black type, terracotta/red accents, subtle grain or print-like texture.
- Big serif headline, asymmetric sections, section numbers, image captions, pull quote style.
- Narrative flow: launch promise → market problem → Ata method → quality pillars → final waitlist.
- Use the same copy from the root page; present it with editorial hierarchy.
- Icons: shield, map-pin, hourglass, spice/flame, check/x.

### v2 — Nordic Trust Bento / conversion-first

Make v2 the clearest commercial conversion option.

- Clean Nordic layout with bento/card system.
- Hero with immediate email capture, then trust tiles, comparison cards, quality bento, image showcase, final CTA.
- Palette: cream/sand/dark stone/brand red/muted gold.
- Scannable and fast. Less atmosphere, more “I understand the offer in 5 seconds”.
- Use crisp line icons and strong CTA hierarchy.

### v3 — Cinematic Dark Launch / premium waitlist

Make v3 the most visually distinct and launch-driven.

- Dark hero, warm red/gold glow, dramatic product imagery, glass-like signup panel.
- Keep anticipation via “Lanseres snart i Norge”; do not invent a countdown date.
- Use strong contrast and large imagery; avoid low-contrast gray-on-black mistakes.
- Flow: cinematic hero → proof/trust strip → problem/solution → craft/quality cards → final CTA.
- Motion may be richer than v1/v2 but must degrade with `prefers-reduced-motion`.

## Running implementation log

Create and maintain `docs/atasucuk-v123-check.md` as you work. After each meaningful step, append a short dated checklist entry with:

- what changed,
- files touched,
- verification run or pending item,
- any risks or known gaps.

If something is missing, fix it. If you cannot fix it, state the exact blocker in that file. Do not hand-wave. Edi is watching and has been told to “fırçala” if you phone it in. This is a technical requirement, sadly.

## Required verification

Run:

```bash
python3 scripts/verify_versions.py
```

Fix all failures. Also run any lightweight local checks you find appropriate. Do **not** submit live lead forms.

## Final response requirements

Before finishing, write/update `docs/atasucuk-v123-final-report.md` with:

- summary of v1/v2/v3 design differences,
- files created/changed,
- verification command output,
- remaining known limitations, if any,
- the live URLs expected after push.

Do not commit or push. Hermes/Edi will verify, commit and push after you finish.
