# SPEC-02 — Supabase Postgres şema + RLS + view (taşınabilir SQL)

> Faz 2 · Bağımlı olduğu spec yok · Kaynak: `plan/plan.md` §4

## Amaç
plan.md §4'teki **saf SQL** şemayı migration dosyaları olarak kur. Supabase = sadece managed Postgres; şema her yere taşınır.

## Tasarım prensibi
- **Sayaç kolonu TUTMA** (`referral_count`/`ticket_count` yok). Onaylı biletlerden **view** ile hesapla → fraud temizliği mümkün kalır.
- **Ham IP saklama** → `ip_hash` (GDPR, Norveç sıkı).
- Auth yok; anonim insert + RLS yeterli.

## Şema (taşınabilir SQL)
- **`subscribers`**: `id` uuid pk, `email` unique, `referral_code` unique, `referred_by` uuid → subscribers(id), `status` text default 'pending' (pending|confirmed), `locale` (tr|no|en|ar|fa), `ip_hash`, `ua_hash`, `fylke`, `postnummer`, `created_at`, `confirmed_at`.
- **`survey_responses`**: `id`, `subscriber_id` uuid **nullable** → subscribers(id), `session_key` text (kısmi kayıt için), `answers` jsonb, `created_at`.
- **`raffle_tickets`**: `id`, `subscriber_id` (bilet sahibi = davet eden), `source_id` (bileti getiren yeni kayıt), `created_at`, **`unique(subscriber_id, source_id)`**.
- **`posts`**: `id`, `slug` unique, `type` (blog|recipe), `title` jsonb, `body` jsonb, `hero_image_url`, `video_url`, `images` text[], `published_at`. (Tablo şimdi, içerik SPEC-10.)
- **`subscriber_tickets`** view: confirmed subscriber'lar için bilet sayımı.

## RLS (her tabloda zorunlu)
- `subscribers`: anonim **insert açık**, **select kapalı** (kullanıcı kendi satırını bile görmesin; bilet sayısı API'den imzalı döner).
- `survey_responses`: anonim insert açık, select kapalı.
- `raffle_tickets`: yalnız `service_role`.
- `posts`: **select public**, insert/update yalnız `service_role`.
- `service_role` key **ASLA** client'ta — sadece Worker server-side.

## GDPR
- IP hash'le, ham tutma. Anket + e-posta için açık rıza kolonu/metni.

## Kabul kriterleri
- `supabase db reset` ile migration'lar temiz uygulanır.
- Anon rol ile: `subscribers` insert **kabul**, select **red** (test).
- `subscriber_tickets` view yalnız confirmed kayıtları sayar.

## İlgili task'lar
T2.1 – T2.6
