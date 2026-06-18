# Ata Sucuk birebir klon backlog'u

Hedef: <https://atasucuk.gentic.run/lansman> sayfasını GitHub Pages sürümünde mümkün olduğunca birebir yeniden üretmek. Öncelik mobile. İnsanlar sayfayı büyük ihtimalle telefondan açacak; desktop “sonra iyi görünür” seviyesinde değil, ama mobil parite kodlamanın ana kabul kapısı.

Mevcut canlı sayfa: <https://dberg042.github.io/atasucuk/>

## Kodlamaya başlamadan önce hazır olanlar

### Referans ölçüm/kanıt dosyaları

- `audit-artifacts/reference-source.html` — referans HTML snapshot.
- `audit-artifacts/computed-comparison.json` — desktop/mobile computed style ve layout ölçümleri.
- `audit-artifacts/reference-desktop-full.png`
- `audit-artifacts/clone-desktop-full.png`
- `audit-artifacts/reference-mobile-full.png`
- `audit-artifacts/clone-mobile-full.png`

### Lokal referans görselleri

Referans S3 görselleri lokal asset olarak indirildi:

- `assets/reference/hero-reference.jpg` — referans hero background, `5504x3072`, kaynak: `generated_20260516_211111_1b3a6ff1.jpg`
- `assets/reference/middle-reference.jpg` — referans orta görsel, `5056x3392`, kaynak: `generated_20260516_211442_c5967d2f.jpg`
- `assets/reference/cta-reference.jpg` — referans final CTA background, `5504x3072`, kaynak: `generated_20260516_211449_a92fbd78.jpg`

Bunlar mevcut `hero.jpg`, `middle.png`, `footer.jpg` ile aynı hedefe hizmet etmiyor. Birebir parite için yeni referans görseller kullanılmalı veya mevcut dosyalar bu görsellerle değiştirilmelidir.

### Referans ikon seti

Referans Lucide kullanıyor:

```html
<script src="https://unpkg.com/lucide@latest"></script>
lucide.createIcons();
```

Referansta tespit edilen ikonlar:

- `beef`
- `arrow-right`
- `shield-check`
- `map-pin`
- `clock`
- `frown`
- `x-circle`
- `check-circle-2`
- `check`
- `hourglass`
- `flame`

Kodlama sırasında iki seçenek var:

1. Lucide CDN'i referans gibi kullanmak. En hızlı ve birebir davranışa en yakın yol.
2. Bu ikonları inline SVG olarak HTML'e gömmek. GitHub Pages için daha bağımsız ve stabil. Birebir hedefte tercih edilecekse ikon boyut/stroke/color değerleri referans class'larına göre ayarlanmalı.

Referans ikon sınıfları / yerleşimleri:

- Hero logo/icon: `beef`, `text-brand-cream h-8 w-8`
- Hero CTA button: `arrow-right`, `w-5 h-5 group-hover:translate-x-1 transition-transform`
- Trust row: `shield-check`, `map-pin`, `clock`, `w-6 h-6 text-brand-gold`
- Problem left card: `frown`, `w-6 h-6`
- Problem negative bullets: `x-circle`, `w-5 h-5 text-red-500 shrink-0 mt-0.5`
- Ata-metoden card: `check-circle-2`, `w-6 h-6`
- Positive bullets: `check`, `w-5 h-5 text-brand-gold shrink-0 mt-0.5`
- Quality pillars: `hourglass`, `beef`, `flame`, `w-10 h-10 text-brand-red`
- Footer/logo: `beef`, `w-6 h-6`

Referans H1 içinde ayrıca ikon olmayan dekoratif underline SVG var:

```html
<svg class="absolute w-full h-3 -bottom-1 left-0 text-brand-red opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="4" fill="transparent"/></svg>
```

Bu da eklenmeli; şu an mevcut sitede yok.

## Öncelik sırası

### P0 — Mobil pariteyi düzelt

Mobil şu an uygun değil. Referans mobile sayfa çok daha okunaklı, daha büyük tipografili ve section'ları daha ferah. Mevcut mobile sıkışık ve tasarım etkisi düşük.

Kabul hedefleri:

- Mobile viewport test ölçüsü: `390x844`.
- Referans mobile toplam yükseklik: `5039px`; hedef `±250px`.
- Mevcut mobile yükseklik: `3302px`; bu çok kısa.
- H1 referansta `48px`, `Playfair Display`, centered; mevcut `30.4px`, sans, left aligned.
- Middle image referansta mobile `342x400`; mevcut `342x228`.
- Quality section referansta mobile `1262px`; mevcut `884px`.
- CTA mobile referansta koyu kırmızı/görselli; mevcut açık gri.

Yapılacaklar:

- Mobile-first CSS'i referansa göre yeniden yaz.
- Hero'u center align yap, H1'i büyüt.
- Formu mobilde referanstaki gibi geniş/dikey göster.
- Middle görseli dikey crop olacak şekilde `height: 400px; object-fit: cover;` yap.
- Section paddinglerini mobilde artır; mevcut compact layout'u bırak.
- Quality pillar'larını iconlu, center hizalı ve ferah bloklar haline getir.
- Final CTA'yı mobile'da da görsel overlay + kırmızı zemin yap.

### P0 — Eksik ikonları ekle

Mevcut sayfada referans ikon sistemi yok. Bu, tasarımın “premium landing” hissini kırıyor.

Yapılacaklar:

- Yukarıdaki 11 Lucide ikonunu ekle.
- İkonların yerleşimini referans HTML'e göre section section eşleştir.
- İkon renkleri:
  - Gold: referans `text-brand-gold` — palette çıkarılmalı.
  - Red: `text-brand-red` / `#711a1b`.
  - Cream: `#fdfbf7`.
  - Negative red: Tailwind `text-red-500` civarı.
- H1 `autentiske` kelimesindeki dekoratif underline SVG'yi ekle.

### P0 — Referans asset'leri kullan

Birebir hedefte mevcut asset mapping yanlış.

Yapılacaklar:

- Hero background: `assets/reference/hero-reference.jpg`
- Middle image: `assets/reference/middle-reference.jpg`
- CTA background: `assets/reference/cta-reference.jpg`
- Footer background image kullanma; referans footer koyu düz zemin.

### P0 — Form davranışını referansla eşleştir

Referans formları gerçek lead endpoint'e gönderiyor. Mevcut sayfa submit'i engelliyor.

Yapılacaklar:

- Form endpoint:
  `https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070`
- `method="POST"`
- Hero hidden input: `name="source" value="hero_waitlist"`
- Footer/CTA hidden input: `name="source" value="footer_waitlist"`
- Hero placeholder: `Din e-postadresse`
- Footer placeholder: `Skriv inn e-postadressen din`
- Hero form altına spam notu ekle:
  `Ingen spam. Vi varsler deg kun når vi er klare til å ta i mot bestillinger.`

### P1 — Tipografi ve palette paritesi

Yapılacaklar:

- Body font: `Inter`.
- Heading font: `Playfair Display`.
- Renkler:
  - `--brand-dark: #1c1917`
  - `--brand-cream: #fdfbf7`
  - `--brand-sand: #f4efe6`
  - `--brand-red: #711a1b`
  - Gold değeri referans computed style/HTML'den çıkarılmalı; yoksa yaklaşık sıcak altın seçilmeli.
- Body background `#fdfbf7` olmalı, beyaz değil.

### P1 — Section-by-section parite

Referans akış:

1. Hero
2. Trust badge row
3. Problem/Solution
4. Middle image section
5. Quality pillars
6. Final CTA
7. Footer

Mevcut akışta problem ve image birleşik; bu ayrılmalı.

Kabul hedefleri desktop:

- Hero: `~798px`
- Problem: `~738px`
- Middle image section: `~728px`
- Quality: `~578px`
- CTA: `~482px`
- Footer: `~125px`

### P1 — Eksik metinleri ekle

Eksik olanlar:

- Üst/hero `ATA SUCUK` marka yazısı.
- Footer `ATA SUCUK` marka yazısı.
- Hero spam notu.
- Problem intro paragrafı:
  `I dag koster importert sucuk i Norge opp mot 370 kr/kg. Den reiser langt, ligger lenge på lager og mister sin ferskhet. Vi mener du fortjener noe bedre.`
- Footer tam metni:
  `© 2023 Ata Sucuk Norge. Alle rettigheter reservert.`

Düzeltilmesi gereken metin:

- `LANSERES SNART I NORGE` değil, `Lanseres snart i Norge`.

### P2 — Desktop polish

Mobil tamamlandıktan sonra desktop pariteye bakılmalı.

Yapılacaklar:

- H1 desktop `72px`, center, Playfair.
- Middle image desktop `1216x600`, radius `0`.
- Problem cards referanstaki gibi daha büyük ve zıt renkli.
- CTA desktop form yatay: input `~305px`, button `~189px`.
- Footer referans gibi koyu ve sade.

## Kodlama başlamadan önce net kararlar

Bunlar net olmalı; aksi halde tekrar yarım klon çıkar:

1. Birebirlik için dış bağımlılık kabul mü? Google Fonts + Lucide CDN kullanılacak mı, yoksa self-host/inline mı?
2. Lead endpoint aktif kullanılacak mı? Referansla birebir için evet görünüyor.
3. Mevcut `hero.jpg`, `middle.png`, `footer.jpg` korunacak mı, yoksa referans asset'lere mi geçilecek? Birebir hedefte referans asset'lere geçilmeli.
4. `specs/lansman-spec.md` eski statik/bağımsız brief'i temsil ediyor; bu dosya güncellenmeli mi, yoksa yeni parity spec mi ana kabul kriteri olacak?

## Tavsiye edilen dosya değişiklikleri

- `index.html`: referans yapıya göre section'ları yeniden düzenle, ikonları ve eksik metinleri ekle, form endpointlerini düzelt.
- `styles.css`: neredeyse tamamen referans palette/typography/layout'a göre yeniden yaz.
- `assets/reference/*`: yeni görselleri kullan veya kök asset dosyalarıyla değiştir.
- `specs/lansman-spec.md`: mevcut “dependency-free/system font” maddeleri birebir klon hedefiyle çeliştiği için revize et.

## Son kabul testi

Kodlama bittikten sonra şu komut/akış tekrarlanmalı:

1. Lokal/Pages siteyi aç.
2. `390x844` mobile screenshot al ve referans mobile ile karşılaştır.
3. `1280x720` desktop screenshot al ve referans desktop ile karşılaştır.
4. `computed-comparison.json` tekrar üret.
5. Console hatalarını kontrol et.
6. Form submit davranışını bilinçli test et: endpoint'e gerçekten post edilecekse test mail ile doğrula; canlı lead kirletmek istenmiyorsa test notu bırak.

Parite ancak mobil ekran görüntüsü referansa çıplak gözle yakınsa kabul edilmeli. “Metinler var” yeterli değil; bu landing page'in satacağı şey atmosfer. Atmosfer yoksa sucuk değil, PDF broşür olmuş oluyor.
