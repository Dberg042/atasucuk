# SPEC-05 — Anket (4 soru, çok dilli, kısmi kayıt, dinamik sonuç)

> Faz 5 · Bağımlı: SPEC-03, SPEC-04 · Kaynak: `plan/plan.md` §3, `plan/anket-akisi-ekran-metinleri.md`

## Amaç
plan.md §3'teki **4 soru**, anket-akisi dökümanının UX kurallarıyla. Anket = "engel" değil, müşteri araştırması.

## Sorular (4 soru — onaylanmış karar)
- **S1 Tüketim** (tek seçim): Ayda ne kadar sucuk? → Hiç · 0,5 kg · 1 kg · 1,5 kg · 2+ kg
- **S2 Kaynak** (çoklu seçim): Nereden alıyorsun? → Yurt dışından · Norveç'ten · Kendim yapıyorum
- **S3 Problem** (tek seçim): En büyük sorun? → Pahalı · Katkılar/sağlık · Tadı · Üreticiye güven _(→ dinamik sonuç ekranını besler)_
- **S4 Beklenti** (çoklu + **opsiyonel** serbest metin): En önemlisi ne? → Düşük fiyat · Min. koruyucu · Tam fermente · Diğer (yaz)

Sorular ID + locale metni ayrı (`jsonb`/JSON sözlük) — veri tek, sunum çok dilli.

## UX kuralları (anket-akisi)
- Anket = **island** (Astro island / minimal TS). Tek soru tek ekran, ilerleme "1/4", tek seçimde **otomatik ilerle**.
- **Sıra: önce 4 soru, e-posta + fylke EN SON** (sunk-cost → daha yüksek dönüşüm).
- **Opt-in tetik** — kesintili pop-up değil; hero CTA'ya basınca veya scroll sonrası açılır.
- **Kısmi kayıt:** her adımda `POST /survey` (session anahtarı) ile anında kaydet; yarıda kalsa bile veri durur; sonda subscriber'a bağla.
- **Dinamik sonuç ekranı:** S3 cevabına göre mesaj + fylke'ye göre bölge mesajı (Ekran 5 tablosu).
- CTA değer odaklı ("çekiliş/yerini ayır") — asla "Gönder/Kaydol".
- Mobil öncelikli; hata mesajları nazik.

## Kabul kriterleri
- Anket mobilde tek-soru akışıyla tamamlanır.
- Kısmi cevaplar `survey_responses`'ta görünür (yarıda bırakınca bile).
- Sonuç ekranı S3 + fylke'ye göre dinamik metin gösterir.

## İlgili task'lar
T5.1 – T5.5
