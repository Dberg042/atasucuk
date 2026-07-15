-- ÜRETİLMİŞ DOSYA: 5 migration'ın sıralı birleşimi (prod ilk kurulum, 2026-07-16).
-- Supabase Dashboard → SQL Editor → tümünü yapıştır → Run.

-- ========== supabase/migrations/20260626120000_subscribers.sql ==========
-- T2.2 — subscribers (waitlist + referral grafiği)
-- plan/plan.md §4 + specs/SPEC-02. Taşınabilir saf SQL.

create extension if not exists pgcrypto; -- gen_random_uuid()

create table subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  referral_code text not null,                                  -- kısa rastgele: ABC123
  referred_by   uuid references subscribers(id) on delete set null, -- davet eden
  status        text not null default 'pending'
                  check (status in ('pending', 'confirmed')),
  locale        text check (locale in ('tr', 'no', 'en', 'ar', 'fa')),
  ip_hash       text,                                           -- HAM IP DEĞİL, hash (GDPR)
  ua_hash       text,                                           -- device parmak izi (fraud)
  fylke         text,                                           -- bölge (lead verisi)
  postnummer    text,                                           -- opsiyonel, teslimat yarıçapı
  consent       boolean not null default false,                 -- GDPR açık rıza
  created_at    timestamptz not null default now(),
  confirmed_at  timestamptz
);

-- email büyük/küçük harf duyarsız tekil; referral_code tekil
create unique index subscribers_email_key on subscribers (lower(email));
create unique index subscribers_referral_code_key on subscribers (referral_code);

-- sık sorgulanan kolonlar (referral grafiği, fraud, durum)
create index subscribers_referred_by_idx on subscribers (referred_by);
create index subscribers_status_idx on subscribers (status);
create index subscribers_ip_hash_idx on subscribers (ip_hash);

-- ========== supabase/migrations/20260626120100_survey_and_raffle.sql ==========
-- T2.3 — survey_responses (kısmi kayıt) + raffle_tickets (iki-taraflı referral)
-- specs/SPEC-02, SPEC-05, SPEC-06.

-- Anket yanıtları. subscriber_id NULLABLE: anket e-postadan ÖNCE başlar,
-- her adımda session_key ile upsert edilir; sonda subscriber'a bağlanır.
create table survey_responses (
  id            uuid primary key default gen_random_uuid(),
  subscriber_id uuid references subscribers(id) on delete cascade,
  session_key   text,                                  -- kısmi kayıt anahtarı (client'ta üretilen rastgele)
  answers       jsonb not null default '{}'::jsonb,    -- {q1:"1kg", q2:["abroad"], q3:"price", q4:[...], q4_text:"..."}
  locale        text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- session_key başına TEK satır → her adımda upsert (yarıda kalsa bile veri durur).
-- Tam unique index (partial değil) — ON CONFLICT(session_key) upsert için gerekir.
-- Postgres NULL'ları benzersiz sayar; pratikte session_key hep dolu gelir.
create unique index survey_responses_session_key
  on survey_responses (session_key);
create index survey_responses_subscriber_idx on survey_responses (subscriber_id);

-- Kura biletleri. SAYAÇ KOLONU TUTMA — buradan say (subscriber_tickets view).
-- İki-taraflı: davet onaylanınca hem davet edene hem gelene birer satır.
--   davet eden bileti: (subscriber_id=inviter,  source_id=invitee)
--   gelen bileti:      (subscriber_id=invitee,  source_id=inviter)
-- unique(subscriber_id, source_id) → aynı ilişkiden ikinci bilet çıkmaz (fraud).
create table raffle_tickets (
  id            uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references subscribers(id) on delete cascade, -- bilet sahibi
  source_id     uuid not null references subscribers(id) on delete cascade, -- bileti getiren ilişki tarafı
  created_at    timestamptz not null default now(),
  unique (subscriber_id, source_id)
);
create index raffle_tickets_subscriber_idx on raffle_tickets (subscriber_id);

-- ========== supabase/migrations/20260626120200_posts_and_view.sql ==========
-- T2.4 — posts (blog/recipe) + subscriber_tickets view
-- specs/SPEC-02. İçerik (posts) SPEC-10'da; tablo şimdi kuruluyor.

create table posts (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  type           text not null check (type in ('blog', 'recipe')),
  title          jsonb not null default '{}'::jsonb,   -- çok dilli {no:"...", tr:"..."}
  body           jsonb not null default '{}'::jsonb,   -- çok dilli
  hero_image_url text,
  video_url      text,
  images         text[] not null default '{}',
  published_at   timestamptz
);
create index posts_published_idx on posts (published_at);

-- Onaylı subscriber başına bilet sayımı (denormalize sayaç YOK, hep buradan say).
-- security_invoker: view sorgulayan rolün RLS'ine tabi olur (anon görmez, service_role görür).
create view subscriber_tickets
  with (security_invoker = true)
as
  select s.id, count(t.id) as tickets
  from subscribers s
  left join raffle_tickets t on t.subscriber_id = s.id
  where s.status = 'confirmed'
  group by s.id;

-- ========== supabase/migrations/20260626120300_rls.sql ==========
-- T2.5 — RLS politikaları
-- specs/SPEC-02. GÜVENLIK KARARI: tüm yazma Worker üzerinden service_role ile.
-- service_role RLS'i bypass eder. anon role yazma tablolarında TAMAMEN kapalı —
-- böylece frontend'deki public anon key ile fraud katmanı atlatılamaz (SPEC-07).
-- Sadece posts public okuma açık.

alter table subscribers      enable row level security;
alter table survey_responses enable row level security;
alter table raffle_tickets   enable row level security;
alter table posts            enable row level security;

-- subscribers / survey_responses / raffle_tickets:
--   anon için HİÇ policy yok → anon insert/select/update/delete reddedilir.
--   service_role (Worker) RLS bypass → tam erişim.

-- posts: public (anon) okuma; yazma yalnız service_role (policy yok → bypass).
create policy "posts public select" on posts
  for select to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- TABLO GRANT'leri (explicit — taşınabilirlik; Supabase default-privilege
-- sihrine güvenme). RLS yetkilendirmenin ÜSTÜNDE çalışır: bir rolün satıra
-- erişmesi için hem tablo GRANT'i hem (varsa) RLS policy'si gerekir.
-- ---------------------------------------------------------------------------

-- service_role (Worker): tüm tablolarda tam yetki. RLS'i zaten bypass eder,
-- ama tablo seviyesinde GRANT olmadan PostgREST üzerinden erişemez.
grant select, insert, update, delete
  on subscribers, survey_responses, raffle_tickets, posts
  to service_role;
grant select on subscriber_tickets to service_role;

-- anon/authenticated: yalnız posts okuma. Diğer tablolarda GRANT YOK →
-- RLS policy olsa bile tablo seviyesinde sert red (veri sızmaz).
grant select on posts to anon, authenticated;

-- subscriber_tickets view'ı API'nin anon/authenticated rollerine kapalı kalsın
-- (Worker service_role ile okur).
revoke all on subscriber_tickets from anon, authenticated;

-- ========== supabase/migrations/20260715120000_phone_and_reminder.sql ==========
-- Telefon (isteğe bağlı — ödül/teslimat iletişimi) + onay hatırlatma damgası.
-- phone: kimlik DEĞİL; e-posta kimlik olmaya devam eder. Doğrulama yok (OTP maliyeti bilinçli olarak alınmadı).
-- reminded_at: 24-72 saat penceresinde onaylamayanlara tek seferlik hatırlatma maili (cron) — ikinci kez gitmesin.
alter table subscribers add column phone text;
alter table subscribers add column reminded_at timestamptz;

-- Cron sorgusu için: pending + henüz hatırlatılmamış kayıtlar.
create index subscribers_reminder_idx
  on subscribers (created_at)
  where status = 'pending' and reminded_at is null;

