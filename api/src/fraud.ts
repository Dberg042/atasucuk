// Fraud savunma katmanları (specs/SPEC-07).
// Amaç: saldırı maliyetini ödülün üstüne çıkar. Katmanlar Worker'da (server-side).

// --- 1) Disposable / throwaway e-posta domain'leri --------------------------
// En yaygın atılabilir domain'ler. Genişletilebilir (en yüksek getirili katman).
const DISPOSABLE = new Set<string>([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com',
  '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org',
  'throwawaymail.com', 'yopmail.com', 'yopmail.net', 'getnada.com', 'nada.email',
  'maildrop.cc', 'dispostable.com', 'trashmail.com', 'trashmail.de', 'mailnesia.com',
  'fakeinbox.com', 'mytemp.email', 'tempmailo.com', 'tempr.email', 'discard.email',
  'mailcatch.com', 'mintemail.com', 'spamgourmet.com', 'mohmal.com', 'emailondeck.com',
  'moakt.com', 'tempinbox.com', 'burnermail.io', 'mailsac.com', 'inboxkitten.com',
  'emailfake.com', 'fakemail.net', 'tmpmail.org', 'tmpmail.net', 'mail-temp.com',
  'temp-mail.io', 'luxusmail.org', 'wegwerfmail.de', 'einrot.com', 'spam4.me',
  'grr.la', 'guerrillamailblock.com', 'pokemail.net', 'spambog.com', 'mailexpire.com',
  'jetable.org', 'tempemail.net', 'throwawaymail.net', 'getairmail.com', 'cs.email',
  '0815.ru', '1secmail.com', '1secmail.org', '1secmail.net', 'dropmail.me',
  'harakirimail.com', 'incognitomail.org', 'mailtothis.com', 'no-spam.ws',
  'spambox.us', 'tempmailaddress.com', 'vomoto.com', 'kuku.lu', 'minuteinbox.com',
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  return !!domain && DISPOSABLE.has(domain);
}

// --- 2) MX kaydı kontrolü (DNS-over-HTTPS, Cloudflare 1.1.1.1) ---------------
// Domain gerçekten mail kabul ediyor mu? Workers'da native DNS yok → DoH.
export async function hasMxRecord(email: string): Promise<boolean> {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { accept: 'application/dns-json' } }
    );
    if (!res.ok) return true; // DNS hatası → engelleme (false negative riski alma)
    const data = (await res.json()) as { Answer?: { type: number }[] };
    // type 15 = MX. MX yoksa bazı domain'ler A kaydıyla da mail alır; ama
    // MX yokluğu güçlü bir sahte sinyalidir. MX varsa kabul.
    const hasMx = Array.isArray(data.Answer) && data.Answer.some((a) => a.type === 15);
    return hasMx;
  } catch {
    return true; // ağ hatasında kullanıcıyı cezalandırma
  }
}

// --- 4) Self-referral: hash eşleşmesi --------------------------------------
export function isSelfReferral(
  inviter: { ip_hash: string | null; ua_hash: string | null },
  invitee: { ip_hash: string | null; ua_hash: string | null }
): boolean {
  const ipMatch = !!inviter.ip_hash && inviter.ip_hash === invitee.ip_hash;
  const uaMatch = !!inviter.ua_hash && inviter.ua_hash === invitee.ua_hash;
  // İkisi birden eşleşirse güçlü self-referral sinyali (aynı cihaz+ağ).
  return ipMatch && uaMatch;
}

// --- 5) Cloudflare Turnstile doğrulama -------------------------------------
// Test anahtarları (1x/2x/3x ile başlar) dev'de kullanılır → doğrulama atlanır.
export function isTestTurnstileSecret(secret: string): boolean {
  return /^[123]x0000/.test(secret);
}

export async function verifyTurnstile(
  secret: string,
  token: string | undefined,
  ip?: string
): Promise<boolean> {
  if (isTestTurnstileSecret(secret)) return true; // dev / test anahtarı
  if (!token) return false;
  try {
    const form = new FormData();
    form.append('secret', secret);
    form.append('response', token);
    if (ip) form.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
