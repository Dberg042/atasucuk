# SPEC-07 — Fraud savunma katmanları

> Faz 7 · Bağımlı: SPEC-04, SPEC-06 · Kaynak: `plan/plan.md` §5

## Amaç
**Sıfır fraud değil** — saldırganın maliyetini ödülün (1000 kr) değerinin üstüne çıkar. 1000 kr çeki için kimse residential proxy pool kiralamaz.
Eşik: şüpheli kayıt **<%1 = normal gürültü**, **>%5 = sorun**.

## En kritik karar
Bileti "e-posta girildi" anına değil, **double opt-in onayına** bağla (SPEC-04). Onaysız → bilet yok → fake email farming'in çoğu burada ölür.

## Katmanlar (görünmezden görünüre)
1. **Disposable email engelleme** — bilinen throwaway domain listesi. En yüksek getiri.
2. **MX record check** — domain gerçekten mail kabul ediyor mu.
3. **Velocity / rate limit** — aynı `ip_hash`'ten dakikada N kayıt → blok. **Kombinasyona bak, tek sinyale değil.** (CF KV / Durable Object.)
4. **Self-referral bloğu** — yeni kaydın `ip_hash`/`ua_hash`'i davet edenle eşleşiyorsa bilet verme (sadece e-posta eşleştirme yetmez).
5. **Cloudflare Turnstile** — form submit'te; script burst'lerini durdurur (reCAPTCHA'dan temiz, ücretsiz).
6. **Ödül gecikmesi** — kura lansmanda çekilecek → doğal inceleme penceresi; çekilişten önce şüpheli biletleri ele.

## Kabul kriterleri
- Disposable / geçersiz-MX e-posta **reddedilir**.
- Aynı IP'den burst **rate-limit**'e takılır.
- Self-referral (eşleşen hash) **bilet vermez**.
- Turnstile token Worker'da doğrulanır.

## İlgili task'lar
T7.1 – T7.4
