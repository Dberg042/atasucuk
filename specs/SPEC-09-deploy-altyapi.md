# SPEC-09 — Deploy & altyapı (kurulum dahil)

> 9a → Faz 2 · 9b → Faz 8 · Kaynak: `plan/plan.md` §1

## Amaç
Cloudflare + Supabase hesap/proje kurulumu dahil uçtan uca deploy. **Hesaplar henüz yok** (onaylanmış karar).

## 9a — Erken kurulum (Faz 2)
- Supabase projesi oluştur.
- `supabase/` CLI init; migration'ları uygula.
- Env/secret şablonu (`.env.example`): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`, anon key.

## 9b — Prod deploy (Faz 8)
- Cloudflare hesabı/proje; **Pages**'i repo'ya bağla (Astro build pipeline).
- **Worker** deploy (`wrangler deploy`) + route.
- **`atasucuk.no`** domain → Cloudflare DNS, Pages + Worker route, TLS.
- Secret'leri CF'e (`wrangler secret put`): Supabase URL/keys, Turnstile secret, mail key, HMAC key.
- **Turnstile** site/secret key oluştur.
- **Mail sağlayıcı** domain doğrulama (SPF/DKIM).
- **Backup:** `pg_dump` cron + off-site (R2/B2). plan.md'nin "en sık atlanan ölümcül hata"sı — atlama.

## Taşıma notu (lansman sonrası, bu spec'in dışında)
Hetzner'e taşırken 3 görünmez iş: (1) RLS taşınabilir/aynı; (2) bağlantı güvenliği — Postgres'i public açma, PgBouncer + TLS + sıkı `pg_hba.conf`; (3) backup (yukarıda).

## Kabul kriterleri
- `atasucuk.no` canlı.
- Form → Worker → Supabase uçtan uca çalışır.
- Günlük backup R2/B2'de görünür.

## İlgili task'lar
T2.1 (9a), T8.1 – T8.6 (9b)
