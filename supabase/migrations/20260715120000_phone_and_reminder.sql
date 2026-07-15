-- Telefon (isteğe bağlı — ödül/teslimat iletişimi) + onay hatırlatma damgası.
-- phone: kimlik DEĞİL; e-posta kimlik olmaya devam eder. Doğrulama yok (OTP maliyeti bilinçli olarak alınmadı).
-- reminded_at: 24-72 saat penceresinde onaylamayanlara tek seferlik hatırlatma maili (cron) — ikinci kez gitmesin.
alter table subscribers add column phone text;
alter table subscribers add column reminded_at timestamptz;

-- Cron sorgusu için: pending + henüz hatırlatılmamış kayıtlar.
create index subscribers_reminder_idx
  on subscribers (created_at)
  where status = 'pending' and reminded_at is null;
