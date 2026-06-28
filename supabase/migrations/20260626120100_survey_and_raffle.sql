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
