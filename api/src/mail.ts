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
    subject: 'Takk for interessen \u2014 bekreft e-posten din f\u00f8r trekningen',
    heading: 'Takk for interessen!',
    body: 'Du meldte deg p\u00e5, men har enn\u00e5 ikke bekreftet bekreftelses-e-posten vi sendte deg tidligere \u2014 derfor sender vi denne p\u00e5minnelsen. Trekningen av tre gavekort p\u00e5 500 kr skjer i morgen, og kun bekreftede p\u00e5meldinger er med. Bekreft e-posten din s\u00e5 du ikke mister plassen din i trekningen.',
    button: 'Bekreft e-posten min',
    footer: 'Takk for at du viste interesse for Ata Sucuk. Hvis du ikke meldte deg p\u00e5, kan du se bort fra denne e-posten.',
  },
  tr: {
    subject: '\u0130lgin i\u00e7in te\u015fekk\u00fcrler \u2014 \u00e7ekili\u015f yar\u0131n, e-postan\u0131 onayla',
    heading: '\u0130lgin i\u00e7in te\u015fekk\u00fcrler!',
    body: 'Kaydolmu\u015ftun ama daha \u00f6nce g\u00f6nderdi\u011fimiz onay mailini onaylamad\u0131\u011f\u0131n i\u00e7in sana bu hat\u0131rlatmay\u0131 yap\u0131yoruz. 500 kr de\u011ferinde \u00fc\u00e7 hediye \u00e7ekinin \u00e7ekili\u015fi yar\u0131n yap\u0131lacak ve \u00e7ekili\u015fe yaln\u0131zca onaylanm\u0131\u015f kay\u0131tlar kat\u0131l\u0131yor. Yar\u0131nki \u00e7ekili\u015fteki hakk\u0131n\u0131 kaybetmemek i\u00e7in l\u00fctfen e-postan\u0131 onayla.',
    button: 'E-postam\u0131 onayla',
    footer: 'Ata Sucuk\u2019a g\u00f6sterdi\u011fin ilgi i\u00e7in te\u015fekk\u00fcr ederiz. Kay\u0131t olmad\u0131ysan bu e-postay\u0131 yok sayabilirsin.',
  },
  en: {
    subject: 'Thank you for your interest \u2014 confirm your email before the draw',
    heading: 'Thank you for your interest!',
    body: 'You signed up, but you have not yet confirmed the confirmation email we sent you earlier \u2014 so here is a reminder. The draw for three 500 kr gift cards takes place tomorrow, and only confirmed sign-ups take part. Confirm your email so you don\u2019t lose your spot in the draw.',
    button: 'Confirm my email',
    footer: 'Thank you for your interest in Ata Sucuk. If you did not sign up, you can ignore this email.',
  },
};

export async function sendLastCallEmail(
  env: Bindings,
  args: { to: string; locale: string | null; confirmUrl: string }
): Promise<{ sent: boolean; dev?: boolean }> {
  const copy = LAST_CALL_COPY[args.locale ?? 'no'] ?? LAST_CALL_COPY.no;
  return deliver(env, args.to, copy.subject, renderHtml(copy, args.confirmUrl));
}
