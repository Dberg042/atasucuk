// Waitlist formları → Worker /waitlist (T4.4). Tüm form[data-signup]'lara bağlanır.
// Mesajlar form'un data-msg-* attribute'larından gelir (i18n tek kaynak: ui.ts).
const API = import.meta.env.PUBLIC_API_URL;

const lang = document.documentElement.lang || 'no';
const ref = new URLSearchParams(location.search).get('ref') || undefined;

document.querySelectorAll<HTMLFormElement>('form[data-signup]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.signup__status');
  const input = form.querySelector<HTMLInputElement>('input[type="email"]');
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const msg = (k: string) => form.dataset[k] ?? '';
  const setStatus = (text: string) => {
    if (status) status.textContent = text;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!input) return;
    const email = input.value.trim();
    if (!email) return;

    setStatus(msg('msgSending'));
    if (btn) btn.disabled = true;
    const turnstileToken =
      form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value || undefined;
    try {
      const res = await fetch(`${API}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale: lang, consent: true, ref, turnstile_token: turnstileToken }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error('request_failed');
      const s = data?.data?.status;
      setStatus(s === 'already_confirmed' ? msg('msgAlready') : msg('msgOk'));
      form.reset();
    } catch {
      setStatus(msg('msgError'));
    } finally {
      if (btn) btn.disabled = false;
    }
  });
});
