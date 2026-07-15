// Ata Sucuk Worker API — ince katman (specs/SPEC-03).
// Router + CORS + tutarlı hata formatı. DB erişimi yalnız db.ts üzerinden.
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { z } from 'zod';
import type { Bindings } from './env';
import {
  createDb,
  pingDb,
  findByEmail,
  findIdByReferralCode,
  referralCodeExists,
  insertSubscriber,
  markConfirmed,
  awardReferralTickets,
  upsertSurveyBySession,
  linkSurveyToSubscriber,
  countTickets,
  getSubscriberStatus,
  getReferralCode,
  findPendingForReminder,
  markReminded,
} from './db';
import { ok, fail, parseBody, localeSchema } from './lib';
import { sha256Hex, signToken, verifyToken, genReferralCode } from './crypto';
import {
  isDisposableEmail,
  hasMxRecord,
  isSelfReferral,
  verifyTurnstile,
} from './fraud';
import { countRecentByIpHash, getHashes, countConfirmed } from './db';

const app = new Hono<{ Bindings: Bindings }>();

// CORS — yalnız kendi origin'imiz (env'den). Tarayıcı dışı çağrılar (curl) etkilenmez.
app.use('*', (c, next) =>
  cors({
    origin: c.env.ALLOWED_ORIGIN,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  })(c, next)
);

// --- Yardımcılar -----------------------------------------------------------
const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 gün
const RATE_WINDOW_MIN = 10; // aynı IP velocity penceresi
const RATE_MAX = 5; // pencere içinde izinli kayıt

// Worker'ın kendi origin'i (confirm linki buraya işaret eder).
const apiOrigin = (c: any): string => new URL(c.req.url).origin;

// Dev modunda (localhost) confirm linkini yanıta ekle → yerel E2E testi.
const isDev = (c: any): boolean => /localhost|127\.0\.0\.1/.test(c.env.SITE_URL ?? '');

async function hashOrNull(value: string, salt: string): Promise<string | null> {
  return value ? await sha256Hex(value + salt) : null;
}

async function buildConfirmUrl(c: any, id: string): Promise<string> {
  const token = await signToken({ id, exp: Date.now() + CONFIRM_TTL_MS }, c.env.CONFIRM_TOKEN_SECRET);
  return `${apiOrigin(c)}/confirm?token=${token}`;
}

// İmzalı bilet token'ı (sayaç sorgusu için; süresiz, yalnız sayı sızdırır).
async function buildTicketsToken(c: any, id: string): Promise<string> {
  return signToken({ sid: id }, c.env.CONFIRM_TOKEN_SECRET);
}

// --- Sağlık ----------------------------------------------------------------
app.get('/', (c) => ok(c, { service: 'atasucuk-api', status: 'up' }));

app.get('/health', async (c) => {
  const dbOk = await pingDb(createDb(c.env));
  return ok(c, { status: dbOk ? 'ok' : 'degraded', db: dbOk });
});

// Public waitlist sayacı (SPEC-10 proof). Yalnız onaylı toplam.
app.get('/count', async (c) => {
  const total = await countConfirmed(createDb(c.env));
  return ok(c, { total });
});

// --- Waitlist (T4.1) -------------------------------------------------------
const waitlistSchema = z.object({
  email: z.string().email().max(254),
  locale: localeSchema,
  ref: z.string().min(3).max(16).optional(),
  fylke: z.string().max(64).optional(),
  postnummer: z.string().max(16).optional(),
  phone: z.string().max(24).optional(), // isteğe bağlı — ödül/teslimat iletişimi
  consent: z.boolean().optional().default(false),
  session_key: z.string().min(8).max(64).optional(), // anketi bağlamak için
  turnstile_token: z.string().max(2048).optional(), // fraud (T7.4)
});

app.post('/waitlist', async (c) => {
  const body = await parseBody(c, waitlistSchema);
  const db = createDb(c.env);
  const email = body.email.trim().toLowerCase();

  const ip = c.req.header('CF-Connecting-IP') ?? c.req.header('x-forwarded-for') ?? '';

  // --- Fraud katmanları (SPEC-07) ---
  // 5) Turnstile (test anahtarında otomatik geçer)
  if (!(await verifyTurnstile(c.env.TURNSTILE_SECRET_KEY, body.turnstile_token, ip))) {
    fail('turnstile_failed', 'Doğrulama başarısız. Lütfen tekrar deneyin.', 403);
  }
  // 1) Disposable e-posta
  if (isDisposableEmail(email)) {
    fail('disposable_email', 'Geçici e-posta adresleri kabul edilmiyor.', 422);
  }
  // 2) MX kaydı
  if (!(await hasMxRecord(email))) {
    fail('invalid_email_domain', 'Bu e-posta alan adı mail kabul etmiyor.', 422);
  }

  // GDPR: ham IP/UA değil, tuzlu hash.
  const salt = c.env.CONFIRM_TOKEN_SECRET;
  const ua = c.req.header('User-Agent') ?? '';
  const ip_hash = await hashOrNull(ip, salt);
  const ua_hash = await hashOrNull(ua, salt);

  // 3) Velocity / rate limit (ip_hash başına pencere içinde N kayıt)
  if (ip_hash) {
    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
    if ((await countRecentByIpHash(db, ip_hash, since)) >= RATE_MAX) {
      fail('rate_limited', 'Çok fazla deneme. Lütfen biraz sonra tekrar deneyin.', 429);
    }
  }

  // Zaten kayıtlı mı?
  const existing = await findByEmail(db, email);
  if (existing) {
    // Anketi (varsa) yine de bu subscriber'a bağla.
    if (body.session_key) await linkSurveyToSubscriber(db, body.session_key, existing.id);

    const tickets_token = await buildTicketsToken(c, existing.id);
    if (existing.status === 'confirmed') {
      return ok(c, { status: 'already_confirmed', referral_code: existing.referral_code, tickets_token });
    }
    // pending → onay mailini yeniden gönder (idempotent)
    const confirmUrl = await buildConfirmUrl(c, existing.id);
    const mail = await sendConfirmMail(c, email, existing.locale ?? body.locale, confirmUrl, existing.referral_code);
    return ok(c, {
      status: 'pending',
      resent: true,
      referral_code: existing.referral_code,
      tickets_token,
      ...(isDev(c) ? { confirmUrl, mail } : {}),
    });
  }

  // Davet eden (?ref= → referred_by)
  const referred_by = body.ref ? await findIdByReferralCode(db, body.ref) : null;

  // Çakışmasız referral kodu üret
  let code = genReferralCode();
  for (let i = 0; i < 5 && (await referralCodeExists(db, code)); i++) code = genReferralCode();

  const sub = await insertSubscriber(db, {
    email,
    referral_code: code,
    referred_by,
    locale: body.locale,
    ip_hash,
    ua_hash,
    fylke: body.fylke ?? null,
    postnummer: body.postnummer ?? null,
    phone: body.phone?.trim() || null,
    consent: body.consent,
  });

  // Anketi (varsa) yeni subscriber'a bağla.
  if (body.session_key) await linkSurveyToSubscriber(db, body.session_key, sub.id);

  const confirmUrl = await buildConfirmUrl(c, sub.id);
  const tickets_token = await buildTicketsToken(c, sub.id);
  const mail = await sendConfirmMail(c, email, body.locale, confirmUrl, code);

  return ok(
    c,
    { status: 'pending', referral_code: code, tickets_token, ...(isDev(c) ? { confirmUrl, mail } : {}) },
    201
  );
});

// --- Survey (T5.3) ---------------------------------------------------------
// answers sınırlı: anonim uç — boyut tavanları olmadan DB şişirilebilir (DoS/çöp veri).
const surveySchema = z.object({
  session_key: z.string().min(8).max(64),
  answers: z
    .record(
      z.string().max(32), // anahtar: q1_consumption, q4_expectation_text …
      z.union([z.string().max(300), z.array(z.string().max(64)).max(12)])
    )
    .refine((a) => Object.keys(a).length <= 12, { message: 'too_many_answers' }),
  locale: localeSchema,
});

app.post('/survey', async (c) => {
  const body = await parseBody(c, surveySchema);
  const db = createDb(c.env);
  await upsertSurveyBySession(db, body.session_key, body.answers, body.locale);
  return ok(c, { saved: true });
});

// mail.ts'i lazım olunca import et (dev log / Resend)
// Onay mailine kişisel davet linki de eklenir — "link otomatik gitsin" (SPEC-06).
async function sendConfirmMail(c: any, to: string, locale: string | null, confirmUrl: string, refCode?: string) {
  const { sendConfirmEmail } = await import('./mail');
  const refUrl = refCode ? `${c.env.SITE_URL}/?ref=${refCode}` : undefined;
  return sendConfirmEmail(c.env, { to, locale, confirmUrl, refUrl });
}

// --- Confirm (T4.3) --------------------------------------------------------
app.get('/confirm', async (c) => {
  const token = c.req.query('token');
  if (!token) fail('missing_token', 'Token gerekli.', 400);

  const payload = await verifyToken<{ id: string }>(token!, c.env.CONFIRM_TOKEN_SECRET);
  if (!payload?.id) fail('invalid_token', 'Geçersiz veya süresi dolmuş bağlantı.', 400);

  const db = createDb(c.env);
  const confirmed = await markConfirmed(db, payload!.id);

  // İlk onay anında, davet edilmişse iki-taraflı bilet ver (idempotent).
  // T7.3 Self-referral: davet eden ile gelenin ip+ua hash'i eşleşiyorsa bilet verme.
  if (confirmed?.referred_by) {
    const [inviter, invitee] = await Promise.all([
      getHashes(db, confirmed.referred_by),
      getHashes(db, payload!.id),
    ]);
    if (inviter && invitee && !isSelfReferral(inviter, invitee)) {
      await awardReferralTickets(db, confirmed.referred_by, payload!.id);
    }
  }

  // Siteye yönlendir — karşılama + paylaşım ekranı parametrelerle açılır:
  // code = kişinin referral kodu, tt = imzalı bilet token'ı (yalnız sayı sızdırır).
  const url = new URL(c.env.SITE_URL);
  url.searchParams.set('confirmed', '1');
  const code = confirmed?.referral_code ?? (await getReferralCode(db, payload!.id));
  if (code) {
    url.searchParams.set('code', code);
    url.searchParams.set('tt', await buildTicketsToken(c, payload!.id));
  }
  return c.redirect(url.toString(), 302);
});

// --- Tickets (T6.4) — imzalı kişisel bilet sayacı --------------------------
app.get('/tickets', async (c) => {
  const token = c.req.query('token');
  if (!token) fail('missing_token', 'Token gerekli.', 400);
  const payload = await verifyToken<{ sid: string }>(token!, c.env.CONFIRM_TOKEN_SECRET);
  if (!payload?.sid) fail('invalid_token', 'Geçersiz token.', 400);
  const db = createDb(c.env);
  // Toplam lodd = 1 temel katılım (onaylıysa) + referral biletleri.
  // Onaysızken 0 döner; client sayacı ancak confirmed=true iken gösterir.
  const confirmed = (await getSubscriberStatus(db, payload!.sid)) === 'confirmed';
  const referral = confirmed ? await countTickets(db, payload!.sid) : 0;
  return ok(c, { tickets: confirmed ? 1 + referral : 0, confirmed });
});

// --- Hata yönetimi ---------------------------------------------------------
app.notFound((c) => c.json({ error: { code: 'not_found', message: 'Uç bulunamadı.' } }, 404));

app.onError((err, c) => {
  if (err instanceof HTTPException) return err.getResponse();
  console.error('unhandled', err);
  return c.json({ error: { code: 'internal', message: 'Sunucu hatası.' } }, 500);
});

// --- Hatırlatma cron'u (wrangler.toml [triggers]) ---------------------------
// 24-72 saat önce kaydolup onaylamayanlara TEK seferlik "biletin bekliyor" maili.
// reminded_at damgası ikinci gönderimi engeller; 72 saati geçenler pencereden çıkar.
const REMIND_AFTER_H = 24;
const REMIND_WINDOW_H = 72;
const REMIND_BATCH = 50; // koşu başına üst sınır (Resend limitlerine nazik)

async function runReminders(env: Bindings): Promise<void> {
  const db = createDb(env);
  const now = Date.now();
  const fromIso = new Date(now - REMIND_WINDOW_H * 3_600_000).toISOString();
  const toIso = new Date(now - REMIND_AFTER_H * 3_600_000).toISOString();
  const pending = await findPendingForReminder(db, fromIso, toIso, REMIND_BATCH);
  if (!pending.length) return;

  const { sendReminderEmail } = await import('./mail');
  for (const s of pending) {
    try {
      const token = await signToken({ id: s.id, exp: now + CONFIRM_TTL_MS }, env.CONFIRM_TOKEN_SECRET);
      await sendReminderEmail(env, {
        to: s.email,
        locale: s.locale,
        confirmUrl: `${env.API_ORIGIN}/confirm?token=${token}`,
      });
      await markReminded(db, s.id);
    } catch (e) {
      console.error('reminder failed', s.id, e); // tek kayıt düşerse diğerleri devam
    }
  }
}

export default {
  fetch: app.fetch,
  scheduled(_event: unknown, env: Bindings, ctx: { waitUntil(p: Promise<unknown>): void }) {
    ctx.waitUntil(runReminders(env));
  },
};
