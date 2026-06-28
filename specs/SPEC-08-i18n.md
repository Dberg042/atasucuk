# SPEC-08 — i18n altyapısı (TR/NO aktif, EN/AR/FA iskelet, RTL hazır)

> Faz 1 (SPEC-01 ile birlikte) · Kaynak: `plan/plan.md` §3

## Amaç
Tek veri, çok sunum. Dil koddan ayrı. **Lansmanda TR + NO aktif**; EN/AR/FA iskelet + RTL hazır (çeviri sonra, native göz şart).

## Kapsam
- `src/i18n/{tr,no,en,ar,fa}.json` sözlükler.
  - **TR + NO dolu** (metinler `plan/` dökümanlarından).
  - **EN/AR/FA anahtar iskeleti** (boş/placeholder; fallback NO).
- `t(key, locale)` helper.
- Dil algılama: `navigator.language` / `Accept-Language`; sayfada manuel seçici (üstte küçük) — algılama hep doğru değil.
- **RTL hazır:** AR/FA için `dir="rtl"` mekanizması + RTL-safe CSS (logical properties: `margin-inline`, `padding-inline`, `inset-*`). Aktif olmasa da çalışır durumda.
- Anket şıkları ID ile eşleşir, metin dilden gelir (SPEC-05 ile uyumlu).

## Kabul kriterleri
- TR ↔ NO geçişi tüm UI'da çalışır.
- `dir=rtl` set edilince layout kırılmaz (AR placeholder ile test).
- Eksik anahtar NO'ya fallback eder.

## İlgili task'lar
T1.7, T1.8, T1.9 (+ SPEC-05'teki T5.1)
