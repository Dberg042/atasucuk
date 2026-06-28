# SPEC-04 — Waitlist + double opt-in

> Faz 4 · Bağımlı: SPEC-03

## Amaç
E-posta kaydı + onay maili akışı. **Referral bileti onaya bağlı** — onaylanmayan kayıt davet edene bilet kazandırmaz (fraud savunmasının temeli).

## Akış
1. `POST /waitlist`: validation → `subscribers` insert (`status=pending`, `referral_code` üret, `referred_by`'ı `?ref=`'ten çöz, `locale`, `fylke`, `ip_hash`/`ua_hash`, rıza).
2. Onay maili gönder (çok dilli, `locale`'e göre TR/NO).
3. `GET /confirm?token=`: imzalı token doğrula → `status=confirmed`, `confirmed_at` set, bekleyen referral biletini ver (SPEC-06).

## Detaylar
- Mail sağlayıcı: Resend/Postmark gibi **HTTP API** (Worker uyumlu; SMTP değil).
- Token: imzalı (HMAC) veya tek-kullanımlık.
- Onay maili metinleri: `plan/anket-akisi-ekran-metinleri.md` "Onay maili" bölümü (TR/NO).
- Frontend: hero + CTA formları Worker'a POST eder; mevcut **Gentic endpoint'i kaldırılır**. "Onay maili gönderildi" durumu gösterilir.

## Kabul kriterleri
- Kayıt → `pending`.
- Onay linki → `confirmed`, `confirmed_at` dolu.
- Onaysız kayıt davet edene bilet vermez.

## İlgili task'lar
T4.1 – T4.4
