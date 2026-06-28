// Onay maili (double opt-in) — Resend HTTP API (Worker uyumlu).
// Çok dilli (locale'e göre TR/NO; diğerleri NO'ya fallback).
// Dev'de (RESEND_API_KEY='test') göndermez, linki loglar.
import type { Bindings } from './env';

type MailCopy = { subject: string; heading: string; body: string; button: string; footer: string };

const COPY: Record<string, MailCopy> = {
  no: {
    subject: 'Ett siste steg — bekreft plassen din',
    heading: 'Bekreft e-posten din',
    body: 'Klikk for å bekrefte. Da er du offisielt med i trekningen på 1000 kr — og på ventelisten.',
    button: 'Bekreft plassen min',
    footer: 'Hvis du ikke meldte deg på, kan du se bort fra denne e-posten.',
  },
  tr: {
    subject: 'Son bir adım — yerini onayla',
    heading: 'E-postanı onayla',
    body: 'Onaylamak için tıkla. Onaylayınca 1000 kr çekilişine ve bekleme listesine resmen girmiş olursun.',
    button: 'Yerimi onayla',
    footer: 'Eğer kayıt olmadıysan bu e-postayı yok sayabilirsin.',
  },
};

function copyFor(locale: string | null | undefined): MailCopy {
  return COPY[locale ?? 'no'] ?? COPY.no;
}

function renderHtml(c: MailCopy, confirmUrl: string): string {
  return `<!doctype html><html><body style="margin:0;background:#FDFBF7;font-family:Arial,sans-serif;color:#1C1917">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
    <table width="100%" style="max-width:480px;background:#fff;border-radius:16px;padding:32px" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:22px;font-weight:700;padding-bottom:12px">${c.heading}</td></tr>
      <tr><td style="font-size:15px;line-height:1.6;color:#44403c;padding-bottom:24px">${c.body}</td></tr>
      <tr><td><a href="${confirmUrl}" style="display:inline-block;background:#711A1B;color:#fff;text-decoration:none;padding:14px 24px;border-radius:12px;font-weight:600">${c.button}</a></td></tr>
      <tr><td style="font-size:12px;color:#a8a29e;padding-top:28px">${c.footer}</td></tr>
      <tr><td style="font-size:12px;color:#a8a29e;padding-top:8px">Ata Sucuk</td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export async function sendConfirmEmail(
  env: Bindings,
  args: { to: string; locale: string | null; confirmUrl: string }
): Promise<{ sent: boolean; dev?: boolean }> {
  const copy = copyFor(args.locale);

  // Dev modu: gerçek gönderim yok, linki logla.
  if (!env.RESEND_API_KEY || env.RESEND_API_KEY === 'test') {
    console.log(`[mail:dev] to=${args.to} locale=${args.locale} confirm=${args.confirmUrl}`);
    return { sent: false, dev: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: args.to,
      subject: copy.subject,
      html: renderHtml(copy, args.confirmUrl),
    }),
  });

  if (!res.ok) {
    console.error('resend error', res.status, await res.text());
    throw new Error('mail_failed');
  }
  return { sent: true };
}
