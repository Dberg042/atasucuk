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
