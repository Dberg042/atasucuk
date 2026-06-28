# Ata Sucuk — Task Listesi

> Her task tek bir sub-agent'ın bir oturumda bitirebileceği boyutta küçük parçadır.
> `[bağımlılık]` ile sıra belirtilmiştir. Spec referansları için `specs/README.md`.

## Build sırası (faz)
1. Astro migrate + i18n iskelet (SPEC-01, SPEC-08)
2. Supabase şema (SPEC-02, SPEC-09a)
3. Worker API iskeleti (SPEC-03)
4. Waitlist + double opt-in (SPEC-04)
5. Anket (SPEC-05)
6. Referral + paylaşım (SPEC-06)
7. Fraud (SPEC-07)
8. Prod deploy (SPEC-09b)
9. (sonra) v2 içerik + blog (SPEC-10)

---

## Faz 1 — Astro migrate + i18n iskelet · SPEC-01, SPEC-08
- [ ] **T1.1** Astro projesi iskeleti: `package.json`, `astro.config.mjs` (@astrojs/cloudflare), `tsconfig.json`, `src/pages/index.astro` boş layout. `.gitignore` (node_modules, dist).
- [ ] **T1.2** `src/layouts/Base.astro`: `<head>` (meta, OG, fonts), `dir`/`lang` mekanizması. `styles.css` → `src/styles/global.css` (değişmeden). [T1.1]
- [ ] **T1.3** Görselleri `public/assets/`'e topla, çift kopyaları tekilleştir, referansları güncelle. [T1.1]
- [ ] **T1.4** Component'ler: `Nav`, `Hero`, `Trust`. [T1.2]
- [ ] **T1.5** Component'ler: `ProblemSolution`, `Showcase`, `Quality`. [T1.2]
- [ ] **T1.6** Component'ler: `Cta`, `Footer`; `index.astro`'da birleştir. [T1.4, T1.5]
- [ ] **T1.7** i18n altyapısı: `src/i18n/` sözlükler (tr/no dolu, en/ar/fa iskelet), `t()` helper, dil algılama + manuel seçici. [T1.2]
- [ ] **T1.8** Tüm component metinlerini i18n anahtarlarına bağla (TR/NO). [T1.4–T1.7]
- [ ] **T1.9** RTL hazırlık: logical CSS properties, `dir=rtl` AR placeholder testi. [T1.8]
- [ ] **T1.10** Parite doğrulama: build + mevcut sayfayla görsel karşılaştır (mobil+desktop). [T1.6]

## Faz 2 — Supabase şema · SPEC-02, SPEC-09a
- [ ] **T2.1** Supabase projesi oluştur, `supabase/` CLI init, `.env.example`.
- [ ] **T2.2** Migration: `subscribers` + index'ler. [T2.1]
- [ ] **T2.3** Migration: `survey_responses` (nullable subscriber_id + session_key) + `raffle_tickets` (unique kısıt). [T2.2]
- [ ] **T2.4** Migration: `posts` + `subscriber_tickets` view. [T2.2]
- [ ] **T2.5** Migration: RLS politikaları (anon insert/select, posts public, service_role). [T2.2–T2.4]
- [ ] **T2.6** Şema testi: `supabase db reset`; anon insert kabul / anon select red. [T2.5]

## Faz 3 — Worker API iskeleti · SPEC-03
- [ ] **T3.1** `api/` wrangler projesi: `wrangler.toml`, router `src/index.ts`, sağlık endpoint'i.
- [ ] **T3.2** `src/db.ts`: supabase-js (service_role) wrapper, tüm sorgular tek modülde. [T3.1]
- [ ] **T3.3** Ortak middleware: zod validation, CORS, JSON hata formatı, locale doğrulama. [T3.1]
- [ ] **T3.4** Secret şeması + `wrangler dev` lokal env doğrulama. [T3.1]

## Faz 4 — Waitlist + double opt-in · SPEC-04
- [ ] **T4.1** `POST /waitlist`: validation → subscribers insert (referral_code, ref çöz, hash'ler, rıza). [T3.2]
- [ ] **T4.2** Mail sağlayıcı entegrasyonu (Resend/Postmark HTTP) + çok dilli onay maili (TR/NO). [T3.4]
- [ ] **T4.3** `GET /confirm?token=`: imzalı token doğrula → confirmed + bekleyen bilet ver. [T4.1, T4.2]
- [ ] **T4.4** Frontend: hero + CTA formlarını Worker'a bağla (Gentic kaldır), durum mesajları. [T1.8, T4.1]

## Faz 5 — Anket · SPEC-05
- [ ] **T5.1** Anket veri modeli: 4 soru JSON tanımı (ID + TR/NO metin). [T1.7]
- [ ] **T5.2** Anket island UI: tek-soru akışı, ilerleme 1/4, otomatik ilerleme, opt-in tetik. [T5.1]
- [ ] **T5.3** `POST /survey` kısmi kayıt (session key, her adımda upsert). [T3.2]
- [ ] **T5.4** Sonda anketi subscriber'a bağla + kayıt adımı (e-posta + fylke en son). [T5.2, T4.1]
- [ ] **T5.5** Dinamik sonuç ekranı: S3 cevabı + fylke mesaj tablosu (Ekran 5). [T5.4]

## Faz 6 — Referral + paylaşım · SPEC-06
- [ ] **T6.1** `?ref=CODE` çözümü + onayda iki-taraflı `raffle_tickets` insert. [T4.3]
- [ ] **T6.2** Teşekkür/Ekran 6 UI: kişisel link + paylaş butonları (WA/TG/SMS/Kopyala + Web Share API). [T5.5]
- [ ] **T6.3** Çok dilli hazır paylaşım metni + link enjeksiyonu. [T6.2, T1.7]
- [ ] **T6.4** `GET /tickets` imzalı kişisel sayaç (public sıralama yok). [T3.2]

## Faz 7 — Fraud · SPEC-07
- [ ] **T7.1** Disposable email + MX check (waitlist'e ekle). [T4.1]
- [ ] **T7.2** Rate limit (ip_hash velocity, CF KV/Durable Object). [T4.1]
- [ ] **T7.3** Self-referral bloğu (ip_hash/ua_hash eşleşmesi → bilet verme). [T6.1]
- [ ] **T7.4** Cloudflare Turnstile: frontend widget + Worker token doğrulama. [T4.4]

## Faz 8 — Prod deploy · SPEC-09b
- [ ] **T8.1** Cloudflare Pages'i repo'ya bağla, Astro build pipeline.
- [ ] **T8.2** Worker deploy + route; secret'leri set et (`wrangler secret put`). [T3.4]
- [ ] **T8.3** `atasucuk.no` DNS + TLS + Pages/Worker route. [T8.1, T8.2]
- [ ] **T8.4** Mail domain doğrulama (SPF/DKIM). [T4.2]
- [ ] **T8.5** `pg_dump` cron + R2/B2 off-site backup. [T2.6]
- [ ] **T8.6** Uçtan uca smoke test (kayıt→onay→referral→bilet) prod'da. [tümü]

## Faz 9 — (sonra) v2 içerik + blog · SPEC-10
- [ ] Henüz bölünmedi. SPEC-10 aktif edilince task'lara açılacak (v2 landing içerik + posts render).
