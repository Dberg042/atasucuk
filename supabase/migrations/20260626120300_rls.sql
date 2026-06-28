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
