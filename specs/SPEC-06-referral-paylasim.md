# SPEC-06 — İki-taraflı referral + raffle ticket + paylaşım

> Faz 6 · Bağımlı: SPEC-04, SPEC-05 · Kaynak: `plan/plan.md` §2/§6, `plan/musteri-anket-waitlist-plani.md` §5

## Amaç
Her onaylı davet = **hem davet edene hem gelene +1 çekiliş bileti**. **Leaderboard YOK** — kulaktan kulağa yayılma için kura mantığı (public sıralama fraud gaming'i getirir).

## Mekanik
- `?ref=CODE` linkten gelen kayıt → **onaylanınca** `raffle_tickets`: davet eden + gelen için satır.
- `unique(subscriber_id, source_id)` → aynı kaynak iki bilet veremez.
- Bilet **double opt-in onayına** bağlı (SPEC-04) — fake email farming burada ölür.

## Paylaşım (mobil öncelikli — Ekran 6)
- Teşekkür ekranında kişisel link: `atasucuk.no/?ref=ABC123`.
- Butonlar: **WhatsApp** (`wa.me/?text=`), **Telegram** (`t.me/share/url?url=&text=`), **SMS** (`sms:?body=`), **Kopyala**.
- Web Share API (`navigator.share`) destekliyorsa tek "Paylaş" butonu (mobilde en temizi).
- Hazır paylaşım metni çok dilli (TR/NO), link otomatik eklenir (metinler anket-akisi Ekran 6'da).

## Sayaç
- `GET /tickets`: imzalı kişisel bilet sayacı. **Public sıralama gösterme**; istersen "şu an X biletin var".

## Kabul kriterleri
- ref linkle gelen onaylı kayıt **iki tarafa da** bilet verir.
- Aynı kaynak iki bilet veremez (unique kısıt).
- Onaysız davet bilet vermez.

## İlgili task'lar
T6.1 – T6.4
