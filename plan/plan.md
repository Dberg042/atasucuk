# Atasucuk — Waitlist + Anket + Referral Sitesi: Plan

> Karar dökümanı. Stack seçimi, taşınabilirlik, fraud savunması, anket akışı ve
> çok dilli destek. Öncelik: **önce hızlı lansman, sonra Hermes'in yanına self-host'a taşı.**

---

## 0. Tasarım prensibi (her kararın üstünde duran kural)

**Lock-in'siz hızlı.** Supabase'i bir "platform" olarak değil, sadece **managed Postgres**
olarak kullan. Böylece lansmandan sonra her şeyi Hetzner'e (Hermes'in yanına) taşımak
tek kutuyu değiştirmek olur, mimariyi yeniden yazmak değil.

- ✅ Kullan: Postgres + RLS + Storage (CDN)
- ⚠️ Bağımlı olma: Supabase Auth, Supabase Edge Functions, Realtime
- **Auth'a hiç ihtiyaç yok** — kullanıcı login olmuyor, sadece form dolduruyor.
  Anonim insert + RLS yeterli. Bu, taşımayı dramatik şekilde kolaylaştırır.

---

## 1. Mimari

```
[Cloudflare Pages]   → statik frontend (landing + anket pop-up + blog + recipe)
       │                Astro: sıfır-JS default, içerik-ağırlıklı site için ideal.
       ▼
[Cloudflare Worker]  → ince API katmanı: /survey, /waitlist, /referral
       │                Fraud katmanı burada: Turnstile, rate limit, disposable block.
       │                Saf HTTP + SQL tut → FastAPI/.NET'e port bir öğleden sonra.
       ▼
[Supabase Postgres]  → TEK bağımlılık. Şema saf SQL, her yere taşınır.
```

### Neden bu seçimler (bias düzeltilmiş hâliyle)

| Karar | Seçim | Neden (senin kısıtların) |
|---|---|---|
| DB | **Supabase Postgres** (Firebase değil) | İlişkisel veri: `subscriber → referred_by → subscriber` self-join, referral graph, fraud pattern sorguları → SQL'in evi. Firestore'da işkence. Açık kaynak → Hetzner'e Docker'la taşınır. Firebase = Google lock-in + US veri. |
| Hosting | **Cloudflare** (Vercel değil) | Egress ücreti yok (R2 bedava egress), Turnstile dahil, cömert free tier. Vercel bandwidth'te sıkar. CF senin "ucuz + kontrollü" tarzına yakın. |
| Frontend | **Astro** (Next.js değil) | Site %95 statik içerik. Astro sıfır-JS default, sadece formlarda island. Next'in SSR ağırlığı gereksiz. Mevcut HTML'i taşımak kolay. |
| API | **CF Worker → sonra FastAPI/.NET** | Worker'ı saf HTTP+SQL tutarsan Hermes'in yanına Python/dotnet olarak taşırsın. RAG entegrasyonu istersen FastAPI doğal. |

### Lansman vs self-host taşıma

- **Lansman:** Supabase free tier (trafik gelince Pro $25/ay → no pause).
- **Taşıma kararı lansman SONRASI**, gerçek trafiği görünce. Erken optimize etme.
- Taşırken üstlendiğin 3 görünmez iş: (1) RLS — aynı, taşınabilir. (2) Bağlantı
  güvenliği — Postgres'i public açma, PgBouncer öne koy, TLS zorunlu, `pg_hba.conf`
  sıkı. (3) **Backup** — `pg_dump` cron + off-site (R2/B2). En sık atlanan ölümcül hata.

---

## 2. Kullanıcı akışı

```
Siteye giriş (çoğunlukla MOBİL)
   │
   ▼
Pop-up: "1000 kr hediye çeki kazanmak ister misiniz?
         Anketi doldurun + waitliste katılın."
   │
   ▼
ANKET (3-4 soru, tarayıcı diline göre otomatik dil)
   │
   ▼
E-posta + waitliste katılım  →  double opt-in (onay maili)
   │
   ▼
TEŞEKKÜR ekranı + kişisel referral linki
   │   "Arkadaşına gönder, kura şansın artsın"
   ▼
Paylaş butonları (mobil öncelikli):
   WhatsApp · SMS/Mesajlar · Telegram · Kopyala
   │
   ▼
Arkadaş linkten gelir → anket + kayıt → DAVET EDENİN kura şansı +1
```

**Mekanik karar — kura (lottery), leaderboard değil.**
Senin amacın "en çok davet eden kazanır" yarışı değil, **kulaktan kulağa yayılma**.
O yüzden her onaylı referral = davet edene **1 ekstra çekiliş bileti**. Bu hem daha
adil hissettirir hem leaderboard fraud'unu (herkesin gözü önünde sıralama gaming'i)
büyük ölçüde ortadan kaldırır. İstersen "şu an X biletin var" diye kişisel sayaç göster
— ama public sıralama gösterme.

---

## 3. Anket (3-4 soru, çok dilli)

Sorular `jsonb` olarak saklanır, böylece dil/şıklar koddan ayrı kalır.

**S1 — Tüketim (tekli seçim):** Ayda ortalama kaç kilo sucuk tüketiyorsunuz?
`Hiç · 0.5 kg · 1 kg · 1.5 kg · 2+ kg`

**S2 — Kaynak (çoklu seçim):** Sucuğu nereden alıyorsunuz?
`Yurt dışından · Norveç'ten · Kendim üretiyorum`

**S3 — En büyük problem (tekli seçim):** Sucukta en büyük sorun nedir?
`Pahalı olması · İçindeki kimyasallar/sağlık · Acı olması · Üretenin güvenilirliği`

**S4 — Beklenti (çoklu + serbest metin):** Norveç'te helal sucuk üretsek en büyük
beklentiniz ne olurdu?
`Düşük fiyat · Minimum koruyucu · Tam fermente · Diğer (serbest yazı)`

> **Veri değeri notu:** Bu 4 soru aynı zamanda senin pazarlama RAG'in için altın.
> S3 (problem) → landing page'in ana mesajı. S4 (beklenti) → ürün positioning.
> Anketi sadece "engel" gibi değil, **müşteri araştırması** gibi tasarla.

### Çok dilli destek
- Tarayıcı dilini `Accept-Language` / `navigator.language` ile algıla, o dile geç.
- Diller: **Türkçe, İngilizce, Norveççe, Arapça (Suriye), Darî/Farsça (Afgan)**.
- Arapça/Farsça için **RTL** (sağdan sola) layout — Astro'da `dir="rtl"` ile yönet.
- Çeviriler basit JSON sözlük dosyaları (`tr.json`, `en.json`, `no.json`, `ar.json`,
  `fa.json`). Anket şıkları ID ile eşleşir, metin dilden gelir → veri tek, sunum çok dilli.
- Kullanıcı dili manuel değiştirebilsin (üstte küçük seçici) — algılama hep doğru değil.

---

## 4. Veritabanı şeması (taşınabilir SQL)

```sql
-- waitlist + referral
create table subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  referral_code text unique not null,            -- kısa rastgele: ABC123
  referred_by   uuid references subscribers(id), -- davet eden
  status        text not null default 'pending', -- pending | confirmed
  locale        text,                            -- tr|en|no|ar|fa
  ip_hash       text,                            -- HAM IP DEĞİL, hash (GDPR)
  ua_hash       text,                            -- device parmak izi (fraud)
  created_at    timestamptz default now(),
  confirmed_at  timestamptz
);

-- anket yanıtları
create table survey_responses (
  id            uuid primary key default gen_random_uuid(),
  subscriber_id uuid references subscribers(id),
  answers       jsonb not null,                  -- {q1:"1kg", q2:["abroad"], ...}
  created_at    timestamptz default now()
);

-- kura biletleri (denormalize SAYAÇ TUTMA, buradan say)
create table raffle_tickets (
  id            uuid primary key default gen_random_uuid(),
  subscriber_id uuid references subscribers(id), -- bilet sahibi (davet eden)
  source_id     uuid references subscribers(id), -- bileti getiren yeni kayıt
  created_at    timestamptz default now(),
  unique (subscriber_id, source_id)              -- aynı kişi 2 bilet getiremez
);

-- içerik (sadece sen yazarsın)
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique, type text,        -- blog | recipe
  title jsonb, body jsonb,            -- çok dilli
  hero_image_url text, video_url text,
  images text[], published_at timestamptz
);
```

**Kritik kural:** `referral_count` / `ticket_count` diye kolon TUTMA. Onaylı
biletlerden bir **view** ile hesapla. Aksi halde fraud temizliği imkansızlaşır.

```sql
create view subscriber_tickets as
select s.id, count(t.id) as tickets
from subscribers s
left join raffle_tickets t on t.subscriber_id = s.id
where s.status = 'confirmed'
group by s.id;
```

### RLS (her tabloda zorunlu)
- `subscribers`: anonim **insert** açık, **select** kapalı (kullanıcı kendi satırını
  bile görmesin — bilet sayısını API üzerinden imzalı dönersin).
- `posts`: **select** public, **insert/update** sadece `service_role`.
- `service_role` key ASLA client'ta değil — sadece Worker/server-side.

---

## 5. Referral fraud savunması (katmanlı)

**Temel kural:** Amaç sıfır fraud değil — saldırganın maliyetini ödülün değerinin
üstüne çıkarmak. 1000 kr çeki için kimse residential proxy pool kiralamaz.
Eşik: şüpheli kayıt **%1 altı = normal gürültü**, **%5 üstü = sorun**.

**En kritik tasarım kararı:** Bileti "e-posta girildi" anına değil,
**double opt-in onayına** bağla. Onay linkine tıklanmazsa referral sayılmaz →
fake email farming'in çoğu burada ölür.

Katmanlar (görünmezden görünüre):

1. **Disposable email engelleme** — bilinen throwaway domain listesi. En yüksek getiri.
2. **MX record check** — domain gerçekten mail kabul ediyor mu.
3. **Velocity / rate limit** — aynı IP_hash'ten dakikada N kayıt → blok. Fraud farm
   1 saatte aynı IP'den 80 sıralı e-posta üretir; gerçek ev birkaç günde 3-4.
   **Kombinasyona bak, tek sinyale değil.**
4. **Self-referral bloğu** — yeni kaydın `ip_hash`/`ua_hash`'i davet edenle eşleşiyorsa
   bilet verme. (Sadece e-posta eşleştirme yetmez.)
5. **Cloudflare Turnstile** — script burst'lerini durdurur (reCAPTCHA'dan temiz, ücretsiz).
6. **Ödül gecikmesi** — kura zaten lansmanda çekilecek → doğal inceleme penceresi.
   Çekilişten önce şüpheli biletleri ele.

**GDPR (Norveç — sıkı):** IP'yi ham saklama, hash'le. Fraud için eşleşip eşleşmediği
yeter, IP'nin kendisi değil. Anket + e-posta için açık rıza metni (onay kutusu) koy.

---

## 6. Teşekkür + paylaşım (mobil öncelikli)

- Kayıt + anket sonrası **teşekkür ekranı** + **double opt-in onay maili**
  (onay maili aynı zamanda deliverability'yi korur).
- Onay maili çok dilli (kullanıcının `locale`'ine göre).
- Paylaşım butonları, mobil için derin linkler:
  - **WhatsApp:** `https://wa.me/?text=<mesaj+link>`
  - **SMS:** `sms:?body=<mesaj+link>` (iOS/Android)
  - **Telegram:** `https://t.me/share/url?url=<link>&text=<mesaj>`
  - **Kopyala** (fallback)
- Paylaşım mesajı çok dilli + linkte `?ref=ABC123` taşır.
- Web Share API (`navigator.share`) destekliyorsa tek "Paylaş" butonu — mobilde en temizi.

---

## 7. Önerilen inşa sırası

1. **Şema + RLS politikaları** (bu döküman §4) — her şeyin temeli, taşınabilirliğin garantisi.
2. Statik landing + anket pop-up (Astro), çok dilli iskelet.
3. Worker API: `/survey` + `/waitlist` insert + double opt-in.
4. Referral akışı + fraud katmanları (disposable → MX → rate limit → self-referral → Turnstile).
5. Teşekkür + paylaşım butonları (mobil derin linkler).
6. Blog/recipe (en son — sadece sen yazıyorsun, acelesi yok).

---

## 8. Açık kalan kararlar (lansmandan önce netleştir)

- Kura çekiliş tarihi / yöntemi (şeffaf olmalı — güven konusu).
- 1000 kr çeki: tek kişi mi, birkaç kişi mi? (Bilet mantığı buna göre.)
- Anket zorunlu mu, yoksa "sadece e-posta" da kabul mü? (Zorunlu = daha iyi veri,
  daha düşük dönüşüm. A/B düşünülebilir.)
- Çeviri kalitesi: Arapça/Farsça için native göz lazım (makine çeviri güven kırar).
