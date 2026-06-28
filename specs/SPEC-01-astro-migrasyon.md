# SPEC-01 — Astro + Cloudflare Pages migrasyonu (birebir)

> Faz 1 · Bağımlı olduğu spec yok · İlgili: SPEC-08 (i18n)

## Amaç
Mevcut `index.html` + `styles.css`'i Astro projesine **görsel olarak birebir**, bölünmüş component'lerle taşı. Sıfır-JS default; JS yalnızca form/island'larda.

## Bağlam
Mevcut site `atasucuk.gentic.run/lansman`'ın pixel-faithful klonu (bkz. `docs/parity-backlog.md`). Bu fazda **içerik değişmez** — sadece teknoloji taşınır. v2 içerik SPEC-10'da.

## Kapsam
- Astro projesi: `astro.config.mjs`, `package.json`, `tsconfig.json`, `src/`, `public/`.
- `@astrojs/cloudflare` adapter (veya static output + Cloudflare Pages).
- `index.html`'in 7 bölümü → ayrı component:
  - `Nav` · `Hero` · `Trust` · `ProblemSolution` · `Showcase` · `Quality` · `Cta` · `Footer`
- `styles.css` → `src/styles/global.css` (token/CSS **değişmeden** taşınır; `?v=` cache-bust querystring kalkar, Astro hash'ler).
- Görseller `public/assets/`'e toplanır. Mevcut çift kopyalar (`/hero.jpg` vs `/assets/hero.jpg`, `/middle.png` vs `/assets/middle.png`, `/footer.jpg`) tekilleştirilir.
- Google Fonts (Inter + Playfair Display) korunur.
- `<head>`: title, meta description, OG (title/description/image/type) birebir korunur.

## Kabul kriterleri
- `npm run build && npm run preview` çıktısı mevcut sayfayla **mobil (360px) + desktop (1280px)** görsel paritede.
- Tüm Norveççe metinler birebir aynı.
- Harici network yalnızca Google Fonts (başka 3. parti yok).

## Kapsam dışı
- İçerik/copy değişikliği → SPEC-10.
- `v1/`, `v2/`, `v3/`, `audit-artifacts/`, `docs/` klasörlerine dokunma.
- `index.html`/`styles.css` parite onaylanana kadar **silinmez** (referans).

## İlgili task'lar
T1.1 – T1.10 (bkz. `TASKS.md`)
