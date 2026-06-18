> ⚠️ **SUPERSEDED (2026-06-18).** This original brief targeted a *dependency-free,
> system-font, white/`#8b0000`* static page. That goal conflicts with the actual
> requirement — a **birebir (pixel-faithful) clone** of
> <https://atasucuk.gentic.run/lansman>. Following this spec is what produced the
> ~60% "brochure" divergence documented in `docs/eksikler-listesi.md`.
>
> The authoritative spec is now **`docs/parity-backlog.md`** (+ `docs/eksikler-listesi.md`).
> Key overrides: fonts = **Inter + Playfair Display** (Google Fonts); palette =
> dark `#1C1917` / cream `#FDFBF7` / sand `#F4EFE6` / red `#711A1B` / gold `#B8860B`;
> hero/middle/CTA use `assets/reference/*`; forms **POST** to the Gentic lead
> endpoint with hidden `source` fields; icons = inline Lucide SVGs; H1 = 48px mobile /
> 72px desktop, centered. The sections below are kept only for historical context.

# Ata Sucuk Landing Page — Detailed Implementation Spec

Source URL
- Public landing page to mirror: https://atasucuk.gentic.run/lansman
- Objective: Reproduce the same content, structure, and visual intent as a static, dependency-free HTML/CSS page.

Delivery Target (repo paths)
- index.html at repository root
- styles.css at repository root
- Use existing images in repo root:
  - ./hero.jpg — hero section banner (top)
  - ./middle.png — mid-page illustrative image
  - ./footer.jpg — footer background banner
- No package.json, no bundlers, no frameworks. Pure HTML5 + CSS3 only.

Global Requirements
- Language: Norwegian content as shown on the source page; preserve headings and copy exactly.
- Responsive: mobile-first layout; readable on 360px wide screens up to large desktop (≥1200px).
- Typography: system fonts (no external font loads). Suggested: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif. Headings are bold; body normal.
- Color palette: neutral, high-contrast text (#111 on white). Primary accent may be deep red (#8b0000) for highlights and buttons to match a sucuk/premium feel. Backgrounds are white or very light gray sections to separate blocks.
- Spacing scale: 8px unit (8/12/16/24/32/48/64). Section max-width: 1200px, centered, with 24px horizontal gutters on mobile, 48px+ on desktop.
- Accessibility: Proper semantic tags, alt text for images, labels for inputs, sufficient color contrast, focus states on buttons/inputs.
- Performance: No JS required. Keep images referenced by relative paths; do not inline base64. Use width/height attributes for CLS stability where known or set CSS aspect-ratio.
- SEO: <title>, <meta name="description">, and Open Graph basics (title/description). No analytics.

Page Structure
1) Top Announcement + Hero
   - Small announcement line: "Lanseres snart i Norge"
   - H1 (wrap to two lines on mobile): "Norges første autentiske lokalproduserte halal sucuk."
   - Supporting paragraph:
     "Tradisjonelt fermentert. Ferske norske råvarer. Ekte tyrkisk smak – til en rettferdig pris. Meld deg på ventelisten for å sikre deg din første smakebit når vi starter produksjonen."
   - Three compact badges (inline on desktop, stacked on mobile):
     - "100% Garantert Halal"
     - "Produsert i Norge"
     - "Tradisjonelt Fermentert"
   - Email capture (non-functional): single-line input labeled "E-postadresse" and primary CTA button with text "Få tidlig tilgang". The form must have required email validation via input type=email, but no submission/network call. On submit, prevent default and do nothing; or simply point action="#" and rely on HTML5 validation with no success message.
   - Visual treatment:
     - Use hero.jpg as a full-bleed background banner behind the hero section OR a prominent image alongside the copy on desktop. Keep text readable with a soft dark overlay (linear-gradient) if used as background.

2) Problem / Solution Split
   - H2: "Hvorfor betale overpris for importert sucuk?"
   - Two columns on desktop, stacked on mobile.
   - Left column — H3: "Dagens marked" with bullet list:
     - "Dyr import (ofte over 370 kr/kg)."
     - "Lang transporttid og ukesvis på lager."
     - "Hurtigproduksjon på bekostning av tradisjonell smak."
   - Right column — H3: "Ata-metoden" with bullet list:
     - "Lokal produksjon = Rettferdig, tilgjengelig pris."
     - "Ferske, norske råvarer fra anerkjent kjøttprodusent."
     - "Tradisjonell fermentering og autentisk krydderblanding."
   - Between or below columns on mobile, include an illustrative image using middle.png at a reasonable size (max-width: 100%; border-radius: 12px). On desktop, it may sit below the two-column block or aligned beside as layout allows.

3) Quality Pillars
   - Section H2: "Kompromissløs kvalitet"
   - Three H3 sub-sections with short paragraphs:
     - H3: "Langtidsfermentert"
       Paragraph: "Vi tar ingen snarveier. En ekte sucuk krever tid. Vi benytter tradisjonelle metoder for langsom fermentering, som gir den dype, komplekse smaken og den perfekte teksturen."
     - H3: "Premium Norsk Kjøtt"
       Paragraph: "Produsert i Norge med ferskt, kortreist storfekjøtt av høyeste kvalitet. Vi samarbeider kun med de beste lokale leverandørene under strenge halal-sertifiseringer."
     - H3: "Autentisk Krydder"
       Paragraph: "Vår hemmelige familieoppskrift benytter krydder importert direkte fra Tyrkia. Hvitløk, spisskummen og rød pepper i perfekt harmoni for den gjenkjennelige smaken."

4) Final CTA
   - H2: "Hjelp oss å bringe Ata Sucuk til live"
   - Paragraph: "Vi har oppskriften, produsenten og råvarene klare. Nå trenger vi kun å bevise at Norge er klart for en ekte premium sucuk. Meld din interesse i dag, helt uforpliktende."
   - Email capture form (duplicate of hero) with label "E-postadresse" and CTA button: "Bli med på listen". Same non-functional behavior; type=email, required.

5) Footer
   - Subtle background image using footer.jpg with a dark overlay for legibility.
   - Footer text centered: "© 2023 Ata Sucuk Norge"

Layout and CSS Notes
- Container utility: .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
- Hero: at least 60vh height on desktop; on mobile, stack elements vertically with 16px gaps. Apply gradient overlay over hero.jpg to keep text readable.
- Buttons: .btn primary style: background #8b0000; color white; padding 12px 20px; border-radius: 8px; hover: darken.
- Inputs: type=email; width: 100% on mobile; inline with button on desktop (use grid or flex with wrap). Border-radius: 8px; border: 1px solid #ddd; focus ring: 2px outline #8b0000 at 30% opacity.
- Headings: H1 36–44px desktop; H2 28–32px; H3 ~20–22px; scale down on mobile (H1 ~28–32px). Use clamp() for fluid sizing.
- Lists: Use standard <ul> with disc bullets and left padding; ensure adequate line-height (1.6).
- Images: max-width: 100%; height: auto; border-radius: 12px on content images; background images use background-size: cover; background-position: center.
- Sections: generous spacing — 64px top/bottom on desktop, 40px on mobile.

HTML Skeleton Requirements
- Proper <head> with meta charset UTF-8, viewport, title:
  Title: "Ata Sucuk | Norges første autentiske, lokalproduserte halal sucuk"
  Meta description: "Tradisjonelt fermentert. Ferske norske råvarer. Ekte tyrkisk smak – til en rettferdig pris. Meld deg på ventelisten for lansering."
- Open Graph:
  og:title = Title above
  og:description = Meta description above
  og:image = "./hero.jpg"
  og:type = website

Forms Behavior (No backend)
- Use <form action="#" onsubmit="return false"> to block navigation or omit JS and rely on required email field and no action (stays on page). Do not attempt network requests.
- Include accessible <label for> bound to input id.

File List to Produce
- index.html — fully structured page per above
- styles.css — all styles used, no inline <style> except minimal critical CSS if necessary (prefer external file)

Image Mapping
- Hero banner: ./hero.jpg (background)
- Mid-content illustrative image: ./middle.png (inline <img>)
- Footer background: ./footer.jpg (background)

Out of Scope
- JS frameworks, build pipelines, analytics, third-party forms, external fonts.
- Server-side code or deploy config.

Done Criteria
- Opening index.html in a browser (offline) renders the described content and layout across mobile and desktop viewport sizes.
- All copy matches the source page Norwegian strings exactly.
- Images load from relative paths and the page has no external network requirements.
- Lighthouse basics: no major contrast failures; viewport and meta tags present.
