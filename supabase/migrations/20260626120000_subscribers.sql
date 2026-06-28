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
