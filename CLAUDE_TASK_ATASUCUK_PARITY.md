# Claude Code task — Ata Sucuk mobile-first reference parity

You are delegated by Eli for Ake. Use Claude Code with `--model opus --effort max` quality. This task is implementation, not just analysis.

## Goal

Make the GitHub Pages site in this repo match the reference site as closely as possible:

- Current/clone target repo: `/root/atasucuk`
- Current live site: https://dberg042.github.io/atasucuk/
- Reference site to copy: https://atasucuk.gentic.run/lansman

Ake wants a *birebir* clone, not an approximate brochure. Mobile is the main target. Most visitors will open the site from phones.

## Required inputs already prepared

Read these before coding:

- `docs/parity-backlog.md` — primary implementation backlog and acceptance criteria.
- `docs/eksikler-listesi.md` — detailed audit of current vs reference.
- `audit-artifacts/reference-source.html` — captured reference HTML with icon names/classes.
- `audit-artifacts/computed-comparison.json` — current reference/clone computed layout measurements.
- `audit-artifacts/reference-mobile-full.png`
- `audit-artifacts/clone-mobile-full.png`
- `audit-artifacts/reference-desktop-full.png`
- `audit-artifacts/clone-desktop-full.png`

Reference image assets are already downloaded:

- `assets/reference/hero-reference.jpg`
- `assets/reference/middle-reference.jpg`
- `assets/reference/cta-reference.jpg`

## Non-negotiables

1. Mobile-first. Optimize `390x844` first, desktop second.
2. Add the missing Lucide icons or equivalent inline SVGs:
   `beef`, `arrow-right`, `shield-check`, `map-pin`, `clock`, `frown`, `x-circle`, `check-circle-2`, `check`, `hourglass`, `flame`.
3. Add the decorative underline SVG under `autentiske` in the H1.
4. Use the reference image assets above for hero, middle image, and final CTA.
5. Use reference typography: Inter body, Playfair Display headings.
6. Use reference palette: dark/cream/sand/red/gold as documented.
7. Forms must match reference endpoint/method/hidden source fields unless a serious technical blocker exists:
   `https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070`
8. Do not push. Eli will verify and push after you finish.
9. Do not delete audit/backlog files.

## Work protocol

After every meaningful fix, append an item to `docs/done-list.md` with:

- timestamp
- what was changed
- files touched
- why it fixes a specific backlog/audit item
- verification performed for that fix

Keep `docs/done-list.md` updated throughout the work, not only at the end.

At final completion, update/create `docs/final-verification.md` with:

- summary of all changes
- mobile verification result
- desktop verification result
- console errors, if any
- remaining known deviations, if any
- exact commands/scripts used to verify

## Suggested implementation path

1. Read `docs/parity-backlog.md` fully.
2. Inspect `audit-artifacts/reference-source.html` to reconstruct markup/classes/icons.
3. Replace current simplified structure with reference-like sections:
   - hero
   - trust badge row
   - problem/solution
   - middle image section
   - quality pillars
   - final CTA
   - footer
4. Rework CSS almost completely for mobile-first parity.
5. Use local assets from `assets/reference/`.
6. Add icons via inline SVGs or Lucide CDN. If using CDN, preserve graceful fallback. Inline SVG is preferable for static GitHub Pages if feasible.
7. Verify in browser or Playwright at least at:
   - mobile `390x844`
   - desktop `1280x720`
8. Compare screenshots against the existing reference screenshots.
9. Run a quick static/server check. There is no complex build unless you add one.
10. Leave git changes uncommitted. Eli will review, commit, and push.

## Acceptance criteria

Minimum:

- Mobile view visually close to reference at `390x844`.
- H1 mobile roughly `48px`, centered, Playfair.
- Desktop H1 roughly `72px`, centered, Playfair.
- Body background cream, not pure white.
- Hero, middle, and CTA use the correct reference images.
- Middle image mobile is tall/cropped like reference, not shallow landscape.
- Final CTA is red/image overlay, not gray.
- Footer has `ATA SUCUK` and full copyright.
- Missing problem paragraph and hero spam note are present.
- Icons are present in hero/trust/problem/quality/footer sections.
- Forms have correct endpoint, method, hidden source fields, and placeholders.
- Browser console has no unexpected errors.

If you cannot meet one criterion, document the blocker explicitly in `docs/final-verification.md`.
