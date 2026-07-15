# Ata Sucuk — Deploy Runbook (Faz 8 / SPEC-09b)

Prod mimari: **Cloudflare Pages** (Astro statik) + **Cloudflare Worker** (`api.atasucuk.no`) + **Supabase Postgres**.
Durum: domain `atasucuk.no` Cloudflare'de aktif (NS: adele/dax). Tüm değerler `.env`'de.

> Sıra önemlidir: **1) DB şeması → 2) Worker → 3) Pages → 4) DNS/domain → 5) Mail → 6) Backup → 7) Smoke.**

---

## 1) Supabase prod şeması (senin çalıştırman gerek — DB şifresi lokalde girilir)

```bash
# Supabase access token: supabase.com → Account → Access Tokens → generate
export SUPABASE_ACCESS_TOKEN=<token>
npx supabase link --project-ref oafqppbkvtbzltnnehux   # DB şifresini sorar (proje kurulumunda belirlediğin)
npx supabase db push                                    # supabase/migrations/* → prod'a uygular
```
Alternatif (CLI istemezsen): `supabase/migrations/*.sql` dosyalarının içeriğini **sırayla** Supabase Dashboard → SQL Editor'a yapıştırıp çalıştır.

Doğrula: Dashboard → Table editor'da `subscribers, survey_responses, raffle_tickets, posts` + `subscriber_tickets` view görünmeli.

## 2) Worker deploy + secrets

```bash
# Secret'ları .env'den prod'a aktar (SUPABASE_URL prod, service_role, turnstile secret, resend, mail_from, confirm secret)
bash scripts/set-prod-secrets.sh

cd api
npx wrangler deploy --env production    # api.atasucuk.no custom domain'e bağlar
```
Doğrula: `curl https://api.atasucuk.no/health` → `{"data":{"status":"ok","db":true}}`

## 3) Pages deploy (frontend)

**Önerilen — repo bağla (otomatik build):** Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → bu repo.
- Build command: `npm run build`
- Build output: `dist`
- Environment variables (Production):
  - `PUBLIC_API_URL = https://api.atasucuk.no`
  - `PUBLIC_TURNSTILE_SITE_KEY = 0x4AAAAAADrZxddsfMuo9GJa`

**Veya CLI:**
```bash
PUBLIC_API_URL=https://api.atasucuk.no PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAADrZxddsfMuo9GJa npm run build
cd .. && npx wrangler pages deploy dist --project-name atasucuk
```

## 4) DNS / domain

- Pages projesi → Custom domains → `atasucuk.no` (+ `www` → `atasucuk.no` redirect).
- Worker custom domain `api.atasucuk.no` adım 2'de `wrangler deploy` ile otomatik bağlanır (routes custom_domain).
- TLS: Cloudflare universal SSL otomatik.

## 5) Mail — Resend domain doğrulama

Resend → Domains → Add `atasucuk.no` → verdiği **SPF + DKIM** kayıtlarını Cloudflare DNS'e ekle → Verify.
Doğrulanınca `MAIL_FROM=noreply@atasucuk.no` çalışır (şu an dev'de mail loglanıyor, gönderilmiyor).

## 6) Turnstile prod

Cloudflare → Turnstile → site `atasucuk.no`'nun **site key**'i frontend env'de (adım 3), **secret key** worker secret'ında (adım 2). Zaten `.env`'de mevcut.

## 7) Backup (off-site)

GitHub repo → Settings → Secrets → Actions, şunları ekle:
- `SUPABASE_DB_URL` = `postgresql://postgres:<sifre>@db.oafqppbkvtbzltnnehux.supabase.co:5432/postgres`
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` (R2 → Manage API tokens)
- `R2_ENDPOINT` = `https://<account_id>.r2.cloudflarestorage.com`
- `R2_BUCKET` = `atasucuk-backups` (önce R2'de oluştur)

`.github/workflows/backup.yml` her gün 03:00 UTC çalışır. Elle test: Actions → db-backup → Run workflow.

## 8) Uçtan uca smoke test (prod)

```bash
curl https://api.atasucuk.no/health
# Siteden gerçek e-posta ile kaydol → onay maili gelmeli → linke tıkla → confirmed.
# ?ref=KOD ile ikinci kayıt+onay → iki tarafta da bilet (subscriber_tickets).
```

---

## Notlar
- Lokal geliştirme portları (`supabase/config.toml`: API 55421, DB 55432; studio/smtp/analytics kapalı) yalnız bu makineye özel — prod'u etkilemez.
- Taşınabilirlik: tüm DB erişimi `api/src/db.ts`'te izole. Hetzner'e taşırken yalnız `SUPABASE_URL`/bağlantı değişir.

## 9) Admin takibi — referral & çekiliş sorguları

Dashboard: **Supabase Dashboard → SQL Editor** (supabase.com → proje → soldaki menü).
Aşağıdaki sorguları oraya yapıştırıp çalıştır; sık kullandıklarını "Save query" ile kaydet.
Tablolar: `subscribers` (status: pending/confirmed), `raffle_tickets` (iki-taraflı biletler),
`subscriber_tickets` view (onaylı kişi başına referral bilet sayısı).

```sql
-- Genel durum: kaç kayıt, kaç onaylı
select status, count(*) from subscribers group by status;

-- Referral lider tablosu: kim kaç kişi getirdi, kaç lodd'u var
-- (lodd = 1 temel katılım + referral biletleri; yalnız onaylılar)
select
  s.email,
  s.referral_code,
  s.fylke,
  count(distinct r.id) filter (where r.status = 'confirmed') as onaylı_davet,
  1 + coalesce(t.tickets, 0)                                 as toplam_lodd,
  s.created_at::date                                          as kayıt_tarihi
from subscribers s
left join subscribers r on r.referred_by = s.id
left join subscriber_tickets t on t.id = s.id
where s.status = 'confirmed'
group by s.id, s.email, s.referral_code, s.fylke, t.tickets, s.created_at
order by toplam_lodd desc, kayıt_tarihi;

-- Kim kimi davet etti (zincir)
select davet_eden.email as davet_eden, gelen.email as gelen, gelen.status, gelen.created_at::date
from subscribers gelen
join subscribers davet_eden on davet_eden.id = gelen.referred_by
order by gelen.created_at desc;

-- ÇEKİLİŞ (20 Ağustos 2026): bilet ağırlıklı 4 farklı kazanan.
-- Ağırlıklı örnekleme (A-Res): priority = random()^(1/lodd), en yüksek 4 kazanır.
-- Çalıştırmadan önce sonucu kayıt altına al (ekran görüntüsü + bu sorgunun çıktısı).
with entries as (
  select s.id, s.email, 1 + coalesce(t.tickets, 0) as lodd
  from subscribers s
  left join subscriber_tickets t on t.id = s.id
  where s.status = 'confirmed'
)
select email, lodd, random() ^ (1.0 / lodd) as priority
from entries
order by priority desc
limit 4;
```

## 10) Test sonrası DB sıfırlama

Canlı test bittikten sonra tüm katılımcı verisini temizleyip kampanyaya sıfırdan başlamak için
(Supabase Dashboard → SQL Editor):

```sql
-- DİKKAT: tüm kayıtları, anket cevaplarını ve biletleri siler. Geri dönüşü yok.
truncate raffle_tickets, survey_responses, subscribers cascade;
```
`posts` tablosuna dokunmaz. Şema/migration'lar yerinde kalır.
