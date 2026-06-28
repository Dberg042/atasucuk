# Ata Sucuk — Spec'ler

Bu klasör, `plan/` klasöründeki strateji dökümanlarından damıtılmış **uygulanabilir spec'leri** ve **task listesini** içerir.

## Hedef
Lock-in'siz, taşınabilir bir **waitlist + anket + iki-taraflı referral** motoru. Amaç satış değil; Jens Eide pitch'i için **sinyal toplama** (waitlist + anket verisi).

## Mimari
```
[Cloudflare Pages] Astro statik (landing + anket island + i18n) — TR/NO aktif, EN/AR/FA iskelet
        ▼
[Cloudflare Worker] ince API: /waitlist /survey /referral /confirm /tickets — fraud katmanı + tek db modülü
        ▼
[Supabase Postgres] TEK bağımlılık · saf SQL + RLS + view
```

## Onaylanmış kararlar
1. **Diller:** TR + NO aktif; EN/AR/FA iskelet + RTL hazır (çeviri sonra).
2. **İçerik:** Önce mevcut tasarım birebir Astro'ya taşınır; v2 içerik SPEC-10.
3. **Anket:** 4 soru (Tüketim · Kaynak · Problem · Beklenti).
4. **Altyapı:** Hesap kurulumu dahil (Cloudflare + Supabase + atasucuk.no + backup).

## Spec indeksi
| Spec | Faz | Konu |
|---|---|---|
| [SPEC-01](SPEC-01-astro-migrasyon.md) | 1 | Astro + Cloudflare Pages migrasyonu (birebir) |
| [SPEC-08](SPEC-08-i18n.md) | 1 | i18n altyapısı (TR/NO aktif, EN/AR/FA iskelet, RTL hazır) |
| [SPEC-02](SPEC-02-supabase-sema.md) | 2 | Supabase Postgres şema + RLS + view |
| [SPEC-03](SPEC-03-worker-api.md) | 3 | Cloudflare Worker API katmanı + db modülü |
| [SPEC-04](SPEC-04-waitlist-double-optin.md) | 4 | Waitlist + double opt-in |
| [SPEC-05](SPEC-05-anket.md) | 5 | Anket (4 soru, kısmi kayıt, dinamik sonuç) |
| [SPEC-06](SPEC-06-referral-paylasim.md) | 6 | İki-taraflı referral + raffle ticket + paylaşım |
| [SPEC-07](SPEC-07-fraud.md) | 7 | Fraud savunma katmanları |
| [SPEC-09](SPEC-09-deploy-altyapi.md) | 2 & 8 | Deploy & altyapı (kurulum dahil) |
| [SPEC-10](SPEC-10-v2-icerik-blog.md) | sonra | v2 landing içerik + blog/recipe (yer tutucu) |

Task listesi: **[TASKS.md](TASKS.md)**

## Not
`specs/lansman-spec.md` **SUPERSEDED** (sadece statik klon spec'iydi). Yeni spec seti yukarıdakilerdir.
Kaynak strateji dökümanları: `plan/` (plan.md, brief.md, musteri-anket-waitlist-plani.md, anket-akisi-ekran-metinleri.md, landing-page-innhold-NO.md).
