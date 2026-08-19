-- Son çağrı onay maili + denetlenebilir çekiliş kaydı.
--
-- 1) last_call_at: çekilişten önce gönderilen TEK seferlik "son çağrı" maili.
--    reminded_at'ten AYRI kolon — o 24-72 saat penceresindeki otomatik cron için.
--    Son çağrı ise yaşa bakmadan tüm pending kayıtlara bir kez gider; kendi
--    damgası olmadan cron ile çakışır ve aynı kişiye iki mail atardı.
alter table subscribers add column last_call_at timestamptz;

-- Son çağrı sorgusu: pending + henüz son çağrı almamış.
create index subscribers_last_call_idx
  on subscribers (created_at)
  where status = 'pending' and last_call_at is null;

-- 2) Çekiliş kaydı. AMAÇ: sonuç sonradan yeniden hesaplanabilsin (denetlenebilirlik).
--    Kazanan seçimi rastgele DEĞİL, seed'den TÜRETİLİR: aynı seed + aynı anlık
--    görüntü → aynı kazananlar. Seed çekilişten sonra yayımlanır, herkes doğrular.
create table raffle_draws (
  id            uuid primary key default gen_random_uuid(),
  seed          text not null,                    -- yayımlanan herkese açık seed
  prize_count   integer not null,                 -- asıl kazanan sayısı (şartlarda: 3)
  reserve_count integer not null default 3,       -- yedek (14 gün yanıt yoksa sıradaki)
  entrant_count integer not null,                 -- katılan onaylı kişi sayısı
  ticket_total  integer not null,                 -- toplam bilet
  entries_hash  text not null,                    -- anlık görüntünün SHA-256'sı
  drawn_at      timestamptz not null default now(),
  notes         text
);

-- Kazananlar + yedekler. rank 1..prize_count asıl, sonrası yedek sırası.
-- unique(draw_id, subscriber_id): bir kişi aynı çekilişte iki kez çıkamaz.
create table raffle_draw_winners (
  id            uuid primary key default gen_random_uuid(),
  draw_id       uuid not null references raffle_draws(id) on delete cascade,
  subscriber_id uuid not null references subscribers(id) on delete cascade,
  rank          integer not null,                 -- 1,2,3 = kazanan · 4,5,6 = yedek
  tickets       integer not null,                 -- çekiliş anındaki bilet sayısı
  is_reserve    boolean not null default false,
  claimed_at    timestamptz,                      -- kazanan yanıtladı
  forfeited_at  timestamptz,                      -- 14 gün doldu, hak yedeğe geçti
  created_at    timestamptz not null default now(),
  unique (draw_id, subscriber_id),
  unique (draw_id, rank)
);
create index raffle_draw_winners_draw_idx on raffle_draw_winners (draw_id);

-- Çekiliş anındaki tam katılımcı listesi (donmuş). Sonradan biri abonelikten
-- çıksa/bilet kazansa bile çekiliş yeniden doğrulanabilir kalsın diye saklanır.
create table raffle_draw_entries (
  draw_id       uuid not null references raffle_draws(id) on delete cascade,
  subscriber_id uuid not null references subscribers(id) on delete cascade,
  tickets       integer not null,
  position      integer not null,                 -- sıralamadaki yeri (0-tabanlı)
  primary key (draw_id, subscriber_id)
);
create index raffle_draw_entries_draw_idx on raffle_draw_entries (draw_id, position);

-- RLS: diğer yazma tabloları gibi — anon'a HİÇ policy/GRANT yok, yalnız Worker
-- (service_role) erişir. Kazanan listesi kişisel veridir, public okunmaz.
alter table raffle_draws        enable row level security;
alter table raffle_draw_winners enable row level security;
alter table raffle_draw_entries enable row level security;

grant select, insert, update, delete
  on raffle_draws, raffle_draw_winners, raffle_draw_entries
  to service_role;
