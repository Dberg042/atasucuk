// Onay + hatırlatma mailleri (double opt-in) — Resend HTTP API (Worker uyumlu).
// Çok dilli (locale'e göre TR/NO/EN; diğerleri NO'ya fallback).
// Dev'de (RESEND_API_KEY='test') göndermez, linki loglar.
import type { Bindings } from './env';

type MailCopy = {
  subject: string;
  heading: string;
  body: string;
  button: string;
  footer: string;
  ref_heading: string; // referral linki bloğu (confirm mailinde)
  ref_body: string;
};

const COPY: Record<string, MailCopy> = {
  no: {
    subject: 'Ett klikk igjen: bekreft plassen din 🎟️',
    heading: 'Bekreft e-posten din',
    body: 'Klikk for å bekrefte. Da er loddet ditt i trekningen av tre gavekort på 500 kr offisielt — og du står på ventelisten.',
    button: 'Bekreft plassen min',
    footer: 'Hvis du ikke meldte deg på, kan du se bort fra denne e-posten.',
    ref_heading: 'Din personlige invitasjonslenke',
    ref_body: 'Del den med venner — for hver venn som bekrefter, får dere begge ett lodd ekstra:',
  },
  tr: {
    subject: 'Tek tık kaldı: yerini onayla 🎟️',
    heading: 'E-postanı onayla',
    body: 'Onaylamak için tıkla. Onaylayınca 500 kr değerinde üç hediye çeki çekilişindeki biletin kesinleşir — bekleme listesine de resmen girmiş olursun.',
    button: 'Yerimi onayla',
    footer: 'Eğer kayıt olmadıysan bu e-postayı yok sayabilirsin.',
    ref_heading: 'Kişisel davet linkin',
    ref_body: 'Arkadaşlarınla paylaş — onaylayan her arkadaş için ikinize de +1 bilet:',
  },
  en: {
    subject: 'One click left: confirm your spot 🎟️',
    heading: 'Confirm your email',
    body: 'Click to confirm. That makes your ticket in the draw for three 500 kr gift cards official — and puts you on the waitlist.',
    button: 'Confirm my spot',
    footer: 'If you did not sign up, you can ignore this email.',
    ref_heading: 'Your personal invite link',
    ref_body: 'Share it with friends — for every friend who confirms, you both get an extra ticket:',
  },
};

type ReminderCopy = { subject: string; heading: string; body: string; button: string; footer: string };

const REMINDER_COPY: Record<string, ReminderCopy> = {
  no: {
    subject: 'Loddet ditt venter fortsatt 🎟️',
    heading: 'Bare ett klikk igjen',
    body: 'Du meldte deg på trekningen av tre gavekort på 500 kr — men plassen din er ikke bekreftet ennå. Bekreft nå, så er loddet ditt aktivt.',
    button: 'Bekreft nå',
    footer: 'Dette er den eneste påminnelsen vi sender. Hvis du ikke meldte deg på, kan du se bort fra denne e-posten.',
  },
  tr: {
    subject: 'Biletin seni bekliyor 🎟️',
    heading: 'Sadece tek tık kaldı',
    body: '500 kr değerinde üç hediye çeki çekilişine kaydoldun ama yerin henüz onaylı değil. Şimdi onayla, biletin aktifleşsin.',
    button: 'Şimdi onayla',
    footer: 'Bu göndereceğimiz tek hatırlatma. Eğer kayıt olmadıysan bu e-postayı yok sayabilirsin.',
  },
  en: {
    subject: 'Your ticket is still waiting 🎟️',
    heading: 'Just one click left',
    body: 'You signed up for the draw for three 500 kr gift cards — but your spot is not confirmed yet. Confirm now to activate your ticket.',
    button: 'Confirm now',
    footer: 'This is the only reminder we send. If you did not sign up, you can ignore this email.',
  },
};

function copyFor(locale: string | null | undefined): MailCopy {
  return COPY[locale ?? 'no'] ?? COPY.no;
}

function renderHtml(
  c: { heading: string; body: string; button: string; footer: string },
  confirmUrl: string,
  ref?: { heading: string; body: string; url: string }
): string {
  const refBlock = ref
    ? `<tr><td style="font-size:15px;font-weight:700;padding-top:28px;padding-bottom:6px">${ref.heading}</td></tr>
      <tr><td style="font-size:14px;line-height:1.6;color:#44403c;padding-bottom:8px">${ref.body}</td></tr>
      <tr><td style="font-size:14px;padding-bottom:4px"><a href="${ref.url}" style="color:#711A1B">${ref.url}</a></td></tr>`
    : '';
  return `<!doctype html><html><body style="margin:0;background:#FDFBF7;font-family:Arial,sans-serif;color:#1C1917">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
    <table width="100%" style="max-width:480px;background:#fff;border-radius:16px;padding:32px" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:22px;font-weight:700;padding-bottom:12px">${c.heading}</td></tr>
      <tr><td style="font-size:15px;line-height:1.6;color:#44403c;padding-bottom:24px">${c.body}</td></tr>
      <tr><td><a href="${confirmUrl}" style="display:inline-block;background:#711A1B;color:#fff;text-decoration:none;padding:14px 24px;border-radius:12px;font-weight:600">${c.button}</a></td></tr>
      ${refBlock}
      <tr><td style="font-size:12px;color:#a8a29e;padding-top:28px">${c.footer}</td></tr>
      <tr><td style="font-size:12px;color:#a8a29e;padding-top:8px">Ata Sucuk</td></tr>
    </table>
  </td></tr></table></body></html>`;
}

async function deliver(env: Bindings, to: string, subject: string, html: string): Promise<{ sent: boolean; dev?: boolean }> {
  // Dev modu: gerçek gönderim yok, logla.
  if (!env.RESEND_API_KEY || env.RESEND_API_KEY === 'test') {
    console.log(`[mail:dev] to=${to} subject=${subject}`);
    return { sent: false, dev: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.MAIL_FROM, to, subject, html }),
  });
  if (!res.ok) {
    console.error('resend error', res.status, await res.text());
    throw new Error('mail_failed');
  }
  return { sent: true };
}

export async function sendConfirmEmail(
  env: Bindings,
  args: { to: string; locale: string | null; confirmUrl: string; refUrl?: string }
): Promise<{ sent: boolean; dev?: boolean }> {
  const copy = copyFor(args.locale);
  if (!env.RESEND_API_KEY || env.RESEND_API_KEY === 'test') {
    console.log(`[mail:dev] to=${args.to} locale=${args.locale} confirm=${args.confirmUrl} ref=${args.refUrl ?? '-'}`);
    return { sent: false, dev: true };
  }
  const ref = args.refUrl ? { heading: copy.ref_heading, body: copy.ref_body, url: args.refUrl } : undefined;
  return deliver(env, args.to, copy.subject, renderHtml(copy, args.confirmUrl, ref));
}

// Tek seferlik onay hatırlatması (cron; reminded_at ile idempotent).
export async function sendReminderEmail(
  env: Bindings,
  args: { to: string; locale: string | null; confirmUrl: string }
): Promise<{ sent: boolean; dev?: boolean }> {
  const copy = REMINDER_COPY[args.locale ?? 'no'] ?? REMINDER_COPY.no;
  return deliver(env, args.to, copy.subject, renderHtml(copy, args.confirmUrl));
}

// --- Son çağrı (çekiliş arifesi) -------------------------------------------
// Hatırlatmadan farkı: tarih verir ve aciliyet taşır ("yarın çekiliyor").
// Yalnız pending kayıtlara, kişi başına BİR kez gider (last_call_at damgası).
type LastCallCopy = { subject: string; heading: string; body: string; button: string; footer: string };

const LAST_CALL_COPY: Record<string, LastCallCopy> = {
  no: {
    subject: 'Siste sjanse: trekningen er i morgen 🎟️',
    heading: 'Loddet ditt er ikke aktivt ennå',
    body: 'I morgen trekker vi tre gavekort på 500 kr. Du meldte deg på, men e-postadressen din er fortsatt ikke bekreftet — og kun bekreftede lodd er med i trekningen. Ett klikk, så er du med.',
    button: 'Bekreft e-posten min',
    footer: 'Etter trekningen sender vi ikke flere påminnelser. Hvis du ikke meldte deg på, kan du se bort fra denne e-posten.',
  },
  tr: {
    subject: 'Son şans: çekiliş yarın 🎟️',
    heading: 'Biletin henüz aktif değil',
    body: 'Yarın 500 kr değerinde üç hediye çeki çekiyoruz. Kaydoldun ama e-posta adresin hâlâ onaylı değil — çekilişe yalnızca onaylanmış biletler giriyor. Tek tık, hakkın korunur.',
    button: 'E-postamı onayla',
    footer: 'Çekilişten sonra başka hatırlatma göndermiyoruz. Eğer kayıt olmadıysan bu e-postayı yok sayabilirsin.',
  },
  en: {
    subject: 'Last chance: the draw is tomorrow 🎟️',
    heading: 'Your ticket is not active yet',
    body: 'Tomorrow we draw three 500 kr gift cards. You signed up, but your email is still unconfirmed — and only confirmed tickets go into the draw. One click keeps you in.',
    button: 'Confirm my email',
    footer: 'We send no further reminders after the draw. If you did not sign up, you can ignore this email.',
  },
};

export async function sendLastCallEmail(
  env: Bindings,
  args: { to: string; locale: string | null; confirmUrl: string }
): Promise<{ sent: boolean; dev?: boolean }> {
  const copy = LAST_CALL_COPY[args.locale ?? 'no'] ?? LAST_CALL_COPY.no;
  return deliver(env, args.to, copy.subject, renderHtml(copy, args.confirmUrl));
}
