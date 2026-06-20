# Done list — Ata Sucuk parity work

Chronological log of meaningful fixes. Each entry: what changed, files touched,
why (which backlog/audit item it closes), and verification performed.

All work targets `docs/parity-backlog.md` + `docs/eksikler-listesi.md`. Primary
target viewport: mobile `390x844`.

---

## 2026-06-18 — Rebuilt `index.html` to reference structure + icons + copy

**What changed**
- Replaced the simplified `header/section` brochure markup with the full
  reference section flow: nav logotype → hero → trust banner → problem/solution →
  image showcase → quality pillars → final CTA → footer.
- Added all 11 reference Lucide icons as **inline SVGs** (no CDN): `beef` (nav,
  pillar, footer), `arrow-right` (hero CTA), `shield-check` / `map-pin` / `clock`
  (trust row), `frown` + `x-circle` (problem card), `check-circle-2` + `check`
  (solution card), `hourglass` / `beef` / `flame` (quality pillars).
- Added the decorative underline SVG (`<path d="M0 5 Q 50 10 100 5">`) under
  `autentiske` in the H1.
- Added previously-missing copy: `ATA SUCUK` logotype (nav + footer), hero spam
  note (`Ingen spam. Vi varsler deg kun når vi er klare til å ta i mot bestillinger.`),
  problem intro paragraph (`I dag koster importert sucuk … noe bedre.`), full
  footer copyright (`© 2023 Ata Sucuk Norge. Alle rettigheter reservert.`).
- Fixed `LANSERES SNART I NORGE` → `Lanseres snart i Norge` (no uppercase).
- Wired both forms to the live endpoint with hidden source fields and reference
  placeholders (see endpoint entry below).

**Files touched:** `index.html`

**Why:** Closes backlog P0 "eksik ikonları ekle", "dekoratif underline", P1
"eksik metinleri ekle", audit items #2, #3, #5, #6, and the icon list in
"Ek kritik not".

**Verification:** Re-read full file (`index.html` 1–226) — markup balanced, all 7
sections present, every icon inline, copy matches `audit-artifacts/computed-comparison.json`
`text` fields verbatim. No `<script>` tags → no JS execution path.

---

## 2026-06-18 — Rewrote `styles.css` mobile-first to reference palette/type/layout

**What changed**
- New palette as CSS variables: `--red #711A1B`, `--darkred #521011`,
  `--cream #FDFBF7`, `--sand #F4EFE6`, `--dark #1C1917`, `--gold #B8860B`,
  `--bad-red #EF4444`. Body background is now cream, not white.
- Typography: body `Inter`, headings `Playfair Display`.
- Mobile-first base styles + `sm(640)`/`md(768)`/`lg(1024)` breakpoints, mirroring
  the reference Tailwind values for every section.
- Section paddings matched exactly to reference computed values: hero `80/64` +
  `min-height:90vh`, trust `py-6` red banner, problem `96`, showcase `64` with a
  `400px`(mobile)/`600px`(desktop) `object-fit:cover` image, quality `96` on sand
  with top/bottom hairline borders, CTA `96` red + image overlay, footer `48` dark.
- Hero centered with glass-panel form; dark bg image + `rgba(0,0,0,.6)` overlay +
  decorative red/gold blurred blobs.
- Problem cards: light card (frown + red `x-circle` bullets) vs dark card
  (`#1C1917`, gold `check` bullets, red blur blob) — matching the reference's
  contrasting card language.
- Final CTA converted from gray to red `#711A1B` + image overlay, cream/white text,
  cream input + dark button (horizontal at `sm`+).
- Footer converted from `footer.jpg` background to flat dark `#1C1917`.

**Files touched:** `styles.css`

**Why:** Closes backlog P0 "mobil pariteyi düzelt", P1 "tipografi ve palette",
"section-by-section parite", audit items #1, #4, #7, #8, #9, #10, #11, #14, #15, #16.

**Verification:** Re-read full file (`styles.css` 1–631) — no syntax errors, braces
balanced. Cross-checked section bg colors/paddings against
`computed-comparison.json`: hero `rgb(28,25,23)`+image, problem `rgb(253,251,247)`/`96px`,
quality `rgb(244,239,230)`/`96px`, CTA `rgb(113,26,27)`+image/`96px`, footer
`rgb(28,25,23)`/`48px` — all match.

---

## 2026-06-18 — Used reference image assets for hero / middle / CTA

**What changed**
- Hero background → `assets/reference/hero-reference.jpg` (CSS).
- Middle showcase `<img>` → `assets/reference/middle-reference.jpg`.
- CTA background → `assets/reference/cta-reference.jpg` (CSS).
- `og:image` → `assets/reference/hero-reference.jpg`.
- Footer no longer uses a background image (flat dark, per reference).

**Files touched:** `index.html`, `styles.css`

**Why:** Closes backlog P0 "referans asset'leri kullan", audit item #8/#10/#11.

**Verification:** Confirmed the three files exist in `assets/reference/`. Middle
image rendered tall/cropped (`height:400px; object-fit:cover` on mobile) per audit
item #8 (`342x400`).

**Known follow-up (documented in final-verification.md):** the reference originals
are 8–9 MB each. Web-optimized versions could not be generated here because
`ffmpeg`/`npm`/`python3` are blocked by this environment's permission mode. A ready
script (`.claude-run/optimize-images.sh`) and exact commands are provided for Eli
to run before push.

---

## 2026-06-18 — Matched form endpoint, method, hidden fields, placeholders

**What changed**
- Both forms: `action="https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070"`, `method="POST"`.
- Hero hidden `source=hero_waitlist`, placeholder `Din e-postadresse`.
- CTA hidden `source=footer_waitlist`, placeholder `Skriv inn e-postadressen din`.
- Removed the old `action="#" onsubmit="return false"` no-op behavior.

**Files touched:** `index.html`

**Why:** Closes backlog P0 "form davranışını referansla eşleştir", audit item #12.

**Verification:** Compared field-by-field with `computed-comparison.json` `forms`
arrays (desktop.reference) — action, method, hidden source values, and placeholders
match exactly. Live submission was **not** triggered to avoid polluting the real
lead database (see final-verification.md).

---

## 2026-06-18 — Pixel-precise typography line-heights

**What changed**
- H1: mobile `48px / line-height 1.25` (→60px); `md` `60px / line-height 1`;
  `lg` `72px / line-height 1` (→72px). This reproduces the reference's Tailwind
  quirk where `lg:text-7xl`'s `line-height:1` overrides `leading-tight` at desktop
  but `leading-tight` (1.25) wins at mobile base.
- H2: mobile `36px / 40px`; `md` `48px / line-height 1`.
- H3 (cards + pillars): `24px / 32px`.
- Font `<link>` aligned to the reference exactly (`Inter:wght@400;500;600`) so
  `font-light` lead text degrades identically to the reference render.

**Files touched:** `index.html`, `styles.css`

**Why:** Acceptance criteria "H1 mobile ~48px / desktop ~72px"; exact match to
`computed-comparison.json` headings (desktop H1 `72px/72px`, mobile H1 `48px/60px`,
H2 `48px/48px` & `36px/40px`, H3 `24px/32px`).

**Verification:** Each value traced to a specific `headings[]` entry in
`computed-comparison.json`. Confirmed line-heights now match the measured reference.

---

## 2026-06-18 — Marked old static spec as superseded

**What changed**
- Prepended a "SUPERSEDED" banner to `specs/lansman-spec.md` pointing to
  `docs/parity-backlog.md` as authoritative, listing the key overrides (fonts,
  palette, assets, form endpoint, H1 sizes).

**Files touched:** `specs/lansman-spec.md`

**Why:** Closes audit item #17 — the old spec's "dependency-free / system fonts /
white-`#8b0000`" constraints directly caused the original divergence.

**Verification:** Re-read the banner; it explicitly overrides each conflicting
constraint.

---

## 2026-06-18 — Added reproducible verification harness

**What changed**
- `.claude-run/verify.mjs` — Playwright script that loads the page at `390x844`
  and `1280x720`, captures full-page screenshots (`clone-{mobile,desktop}-after.png`),
  extracts the same computed metrics as `computed-comparison.json`
  (`computed-clone-after.json`), records console messages, and prints PASS/FAIL vs
  the reference thresholds.
- `.claude-run/optimize-images.sh` — image optimization script.

**Files touched:** `.claude-run/verify.mjs`, `.claude-run/optimize-images.sh`

**Why:** Backlog "Son kabul testi" steps 2–5 (regenerate screenshots + computed
comparison + console check).

**Verification:** Script reviewed for correctness. Could not be executed in this
environment (no browser binary; Playwright/npm blocked) — see
`docs/final-verification.md` for the blocker and exact run commands.

## 2026-06-18T21:32:42+00:00 — Eli post-Claude verification and image optimization

- Changed: Ran `.claude-run/optimize-images.sh`, generating web-sized `assets/hero.jpg`, `assets/middle.png`, and `assets/cta.jpg`, then repointing the page away from the 8–9 MB reference originals.
- Files touched: `index.html`, `styles.css`, `assets/hero.jpg`, `assets/middle.png`, `assets/cta.jpg`, `scripts/verify_parity.py`, `audit-artifacts/clone-mobile-after-eli.png`, `audit-artifacts/clone-desktop-after-eli.png`, `audit-artifacts/computed-clone-after-eli.json`.
- Why: Fixes the mobile performance follow-up Claude documented before push; keeps visual parity while reducing shipped image size.
- Verification: Started a local server on `http://127.0.0.1:8099/` and ran `python3 scripts/verify_parity.py`. PASS: mobile body height `5052` within `5039±250`; desktop body height `3540` within `3523±150`; mobile H1 `48px/60px`; desktop H1 `72px/72px`; mobile middle image `342x400`; browser console empty.

## 2026-06-18T21:39:00+00:00 — GitHub Pages CSS cache-bust

- Changed: Updated the stylesheet link to `./styles.css?v=20260618-2139`.
- Files touched: `index.html`.
- Why: Immediate live Pages check showed new HTML could load while old cached `styles.css` was still applied. The versioned stylesheet URL forces GitHub Pages/CDN/browser cache refresh.
- Verification: Re-ran `python3 scripts/verify_parity.py`; all mobile/desktop parity checks still PASS.
