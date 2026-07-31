# Görsel promptları — "Sucukens historie" blog yazısı

Bu 5 görsel şu an `public/assets/blog/` altında düz renkli **placeholder** JPG olarak duruyor
(`sucuk-historie-*.jpg`, üzeri "PLACEHOLDER" yazılı gradient). Gen AI ile üretilen gerçek
görselleri **aynı dosya adıyla** üzerine kaydedersen, `no`/`tr`/`en` içerik dosyaları
(`src/content/blog/sucuk-historie.*.md`) otomatik olarak yeni görseli kullanır — kod
değişikliği gerekmez.

**Genel stil notu (hepsi için geçerli):** Atasucuk markası sıcak, toprak tonlu bir palet
kullanıyor — kırmızı `#711A1B`, altın/hardal `#B8860B`, krem `#FDFBF7`, koyu kahve `#1C1917`.
Editoryal/belgesel fotoğrafçılık hissi (National Geographic tarzı, aşırı stilize/3D-render
değil), doğal ışık, hafif film grain, sıcak renk sıcaklığı (2700–3200K gibi). Metin/logo/yazı
YOK. Yatay (landscape) kompozisyon, konu görselin alt üçte ikisinde — üstte gökyüzü/negatif
alan bırak (hero olarak kullanılacak, üzerine başlık binmiyor ama kırpılabilir olsun).

Önerilen boyut: **1536×1024px (3:2)**, JPG.

---

## 1. `sucuk-historie-hero.jpg` — Kapak görseli

**Kullanım yeri:** Yazının en üstü (tüm dillerde ortak kapak).

**Prompt:**
> Editorial documentary photograph, warm golden-hour light. A rustic wooden table with
> several whole dried Turkish sucuk sausages (dark reddish-brown, coiled, dusted with visible
> spice — garlic, cumin, paprika), one sausage sliced open showing a deep red-brown marbled
> interior. Scattered whole spices around it: cumin seeds, black peppercorns, dried red chili
> flakes, garlic cloves. Shallow depth of field, soft warm side light, terracotta and deep red
> tones, slightly rustic Anatolian kitchen setting in the background (out of focus stone wall
> or wooden shelf). No text, no logos, no people. Shot on a 50mm lens, f/2.0, natural light,
> food editorial photography style.

**Alt metin (öneri):** "Geleneksel yöntemle kurutulmuş sucuk, baharatlarla birlikte" (dile göre çevir)

---

## 2. `sucuk-historie-steppe.jpg` — Orta Asya bozkırı / göçebeler

**Kullanım yeri:** Bölüm 2'nin sonunda ("Fra steppen til Anatolia" / göçebe icadı).

**Prompt:**
> Wide cinematic landscape photograph of the Central Asian steppe at golden hour — vast open
> grassland under a huge sky, rolling hills fading into the horizon. In the mid-ground, a
> small group of Turkic nomadic horseback riders (silhouetted or partially visible, historically
> plausible clothing — fur-trimmed coats, simple leather satchels), with a couple of pack
> horses carrying bundled provisions. Warm, dusty, golden-brown color palette. Sense of scale
> and distance, epic but grounded, documentary/historical-reenactment photography style, not
> fantasy or CGI. No text, no modern elements, no visible faces close-up (keep riders distant
> or from behind for a timeless, non-specific look).

**Alt metin (öneri):** "Orta Asya bozkırında atlı göçebe Türk halkları"

---

## 3. `sucuk-historie-ottoman.jpg` — Osmanlı pazarı / baharat

**Kullanım yeri:** Bölüm 3'ün sonunda ("Det osmanske kjøkkenet" / sucuk günlük yemek oluyor).

**Prompt:**
> Atmospheric photograph of a historic Ottoman-era covered bazaar (bedesten style, stone
> archways, warm hanging lanterns). Close-to-mid shot of a spice merchant's stall: burlap
> sacks and copper bowls overflowing with vivid spices — deep red paprika, golden turmeric,
> dark cumin seeds, dried chili peppers — alongside hanging dried sausages and cured meats on
> hooks. Warm lantern light mixed with soft daylight from an archway opening, dust particles
> visible in light beams. Rich reds, ochres and browns. Documentary/historical travel
> photography style, textured stone and wood surfaces. No text, no modern signage, no clearly
> visible modern people.

**Alt metin (öneri):** "Osmanlı pazarında baharat ve kurutulmuş et tezgâhı"

---

## 4. `sucuk-historie-afyon.jpg` — Üç şehrin üç sucuğu (YENİDEN ÜRETİLECEK)

**Kullanım yeri:** Bölüm 5'in sonunda (Afyonkarahisar, Kayseri, Tokat).

> **Not:** Bölüm artık tek şehri değil üç şehri anlatıyor, eski "kurutma odası" görseli
> metni karşılamıyordu. Yeni görselin fikri şu: **üç şehrin sucuğunu yan yana göstermek**,
> böylece okur aradaki farkı okumadan önce görüyor. Dosya adı `sucuk-historie-afyon.jpg`
> olarak kalıyor, yeni görseli bu adla üzerine kaydetmen yeterli.

**Prompt:**
> Overhead flat-lay editorial food photograph on a dark, aged wooden surface or dark slate.
> Three distinctly different types of Turkish sucuk arranged side by side in three clear
> groups, evenly spaced, each group slightly separated so the differences read instantly:
> LEFT — a thick, classic horseshoe-shaped coiled sucuk, deep brick red, firm and glossy,
> with two cut slices lying beside it showing the marbled red interior.
> CENTER — a bundle of thin, finger-thick short sucuk links (about the width of a thumb),
> tied off with natural twine into segments, darker red and slightly wrinkled and matte.
> RIGHT — a flat, rectangular sucuk still partly wrapped in its natural off-white cotton
> cloth casing, the cloth folded open on one side to reveal the pressed, flattened dark red
> meat, with visible woven fabric texture and hand-stitched seam.
> Scattered sparingly between the groups: a few cumin seeds, dried red chili flakes and two
> garlic cloves. Warm directional side light from the upper left, soft shadows, slightly
> moody. Rich earthy palette of deep reds, browns and cream. Shot on a 50mm lens at f/4,
> sharp across all three groups. Rustic artisan charcuterie editorial style. No text, no
> labels, no logos, no packaging, no people, no flags or maps.

**Alt metin (öneri):** "Üç sucuk çeşidi yan yana: Afyon'un kalın halka sucuğu, Kayseri'nin ince parmak sucuğu ve Tokat'ın bez içinde yassı sucuğu"

---

## 5. `sucuk-historie-norway.jpg` — Norveç kahvaltı sofrası

**Kullanım yeri:** Bölüm 7'nin sonunda ("Sucuk i norsk hverdag" — evde pişirme).

**Prompt:**
> Bright, warm breakfast-table photograph shot from a 45-degree overhead angle. A rustic
> wooden or light-colored table set for breakfast: a skillet with fried sucuk slices and
> sunny-side-up eggs (sucuklu yumurta), a plate of sliced fresh tomatoes and cucumber, a
> basket with coarse Norwegian bread, a small glass of Turkish tea (çay) in a tulip-shaped
> glass. Soft natural morning light from a window (Nordic/Scandinavian interior feel — pale
> wood, linen napkin, simple ceramic plates), cozy and homely, not overly styled or luxurious.
> Warm color grading consistent with red/gold Ottoman-Turkish palette but with a bright,
> airy Scandinavian breakfast mood. No text, no people's faces (hands okay), no branding.

**Alt metin (öneri):** "Sucuklu yumurta ile hazırlanmış bir Norveç kahvaltı sofrası"

---

## Uygulama notu

Görselleri ürettikten sonra:

1. Aynı dosya adıyla `public/assets/blog/` altına kaydet (üzerine yaz).
2. `npm run build` çalıştırıp `/blog/sucuk-historie` sayfasını kontrol et — kod tarafında
   hiçbir değişiklik gerekmiyor.
3. Dosya boyutu için öneri: JPG kalite ~75–85, hedef ~150–400 KB/görsel (sayfa hızı için).
