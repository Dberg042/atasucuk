# SPEC-03 — Cloudflare Worker API katmanı + db modülü

> Faz 3 · Bağımlı: SPEC-02

## Amaç
İnce, **taşınabilir** API katmanı. Saf HTTP + parametrik SQL → sonra FastAPI/.NET'e port bir öğleden sonra.

## Endpoint'ler
- `POST /waitlist` — kayıt (SPEC-04)
- `POST /survey` — anket kısmi/tam kayıt (SPEC-05)
- `POST /referral` — referral çözümü (SPEC-06)
- `GET /confirm?token=` — double opt-in onayı (SPEC-04)
- `GET /tickets` — imzalı kişisel bilet sayacı (SPEC-06)

## Kapsam
- `api/` wrangler projesi: `wrangler.toml`, `src/index.ts` router, sağlık endpoint'i.
- **`src/db.ts`** — TÜM DB erişimi burada izole (taşınabilirlik garantisi). Lansmanda `@supabase/supabase-js` (service_role, server-side). Tüm sorgular parametrik; Postgres swap için tek dosya değişir.
- Ortak middleware: input validation (zod), CORS (yalnız kendi origin), JSON hata formatı, locale doğrulama.

## Secret'ler
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`, `TURNSTILE_SECRET`, mail sağlayıcı API key, token imzalama anahtarı (HMAC).

## Kabul kriterleri
- Her endpoint lokalde `wrangler dev` ile çağrılabilir.
- `db.ts` **dışında** hiçbir yerde DB client yok (`grep` ile doğrula).
- `service_role` yalnız Worker'da; client bundle'a sızmaz.

## İlgili task'lar
T3.1 – T3.4
