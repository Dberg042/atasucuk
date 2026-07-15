// Anket island (T5.2 + T5.5). Tek-soru akışı, ilerleme, kısmi kayıt, kayıt, dinamik sonuç.
import {
  questions,
  fylker,
  resultByProblem,
  regionMessage,
  surveyUIFor,
  shareUIFor,
  pick,
  type Question,
} from '../i18n/survey';
import type { Lang } from '../i18n/ui';

const root = document.getElementById('survey');
if (root) initSurvey(root);

function initSurvey(root: HTMLElement) {
  const lang = (document.documentElement.lang || 'no') as Lang;
  const ui = surveyUIFor(lang);
  const API = import.meta.env.PUBLIC_API_URL;
  const ref = new URLSearchParams(location.search).get('ref') || undefined;

  const body = root.querySelector<HTMLElement>('.survey__body')!;
  const progress = root.querySelector<HTMLElement>('.survey__progress')!;
  const progressBar = root.querySelector<HTMLElement>('.survey__progress-bar')!;
  const progressLabel = root.querySelector<HTMLElement>('.survey__progress-label')!;

  const total = questions.length;
  const answers: Record<string, string | string[]> = {};
  let sessionKey = '';
  let step = 0; // 0..total-1 sorular, total = kayıt, total+1 = sonuç
  let referralCode: string | undefined;
  let ticketsToken: string | undefined;
  let turnstileToken: string | undefined;

  const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
  function renderTurnstile(container: HTMLElement) {
    if (!siteKey) return;
    const ts = (window as any).turnstile;
    if (ts) {
      ts.render(container, { sitekey: siteKey, callback: (t: string) => (turnstileToken = t) });
    } else {
      setTimeout(() => renderTurnstile(container), 300); // api.js henüz yüklenmedi
    }
  }

  // --- DOM helper ---
  function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    props: Partial<Record<string, any>> = {},
    children: (Node | string)[] = []
  ): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') node.className = v as string;
      else if (k === 'html') node.innerHTML = v as string;
      else if (k.startsWith('on') && typeof v === 'function')
        node.addEventListener(k.slice(2), v as EventListener);
      else if (v != null) node.setAttribute(k, String(v));
    }
    for (const ch of children) node.append(ch);
    return node;
  }

  // --- Açma/kapama ---
  function ensureSession() {
    if (sessionKey) return;
    sessionKey =
      sessionStorage.getItem('survey_session') ||
      (crypto.randomUUID?.() ?? String(Date.now()) + Math.random()).replace(/-/g, '');
    sessionStorage.setItem('survey_session', sessionKey);
  }
  function open() {
    ensureSession();
    step = 0;
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
  }
  function close() {
    root.hidden = true;
    document.body.style.overflow = '';
  }

  async function saveProgress() {
    try {
      await fetch(`${API}/survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_key: sessionKey, answers, locale: lang }),
      });
    } catch {
      /* kısmi kayıt best-effort */
    }
  }

  function setProgress(visible: boolean, n = 0) {
    progress.hidden = !visible;
    if (!visible) return;
    // Kayıt adımı da bir adım — payda total+1 (ör. 4 soru + kayıt = "5/5").
    progressLabel.textContent = ui.progress.replace('{n}', String(n)).replace('{total}', String(total + 1));
    progressBar.style.width = `${(n / (total + 1)) * 100}%`;
  }

  // --- Render ---
  function render() {
    body.innerHTML = '';
    if (step < total) renderQuestion(questions[step], step + 1);
    else if (step === total) renderRegistration();
    else renderResult();
  }

  // Seçenek butonu: radyo (single) / onay kutusu (multi) göstergesiyle.
  function optionButton(q: Question, label: string, isSelected: boolean): HTMLButtonElement {
    return el('button', {
      class: `survey__opt survey__opt--${q.type}` + (isSelected ? ' is-selected' : ''),
      type: 'button',
      role: q.type === 'single' ? 'radio' : 'checkbox',
      'aria-checked': String(isSelected),
    }, [
      el('span', { class: 'survey__opt-ind', 'aria-hidden': 'true' }),
      el('span', { class: 'survey__opt-label' }, [label]),
    ]) as HTMLButtonElement;
  }

  function renderQuestion(q: Question, num: number) {
    setProgress(true, num);
    body.append(el('h2', { class: 'survey__q' }, [pick(q.title, lang)]));
    body.append(
      el('p', { class: 'survey__hint' }, [q.type === 'single' ? ui.hint_single : ui.hint_multi])
    );

    if (q.type === 'single') {
      const list = el('div', { class: 'survey__options', role: 'radiogroup' });
      for (const opt of q.options) {
        const btn = optionButton(q, pick(opt.label, lang), answers[q.id] === opt.id);
        btn.addEventListener('click', () => {
          // Önce seçimi göster, kısa bir beklemeden sonra ilerle — çift tıklamayı da engelle.
          list.querySelectorAll('.survey__opt').forEach((b) => {
            b.classList.remove('is-selected');
            b.setAttribute('aria-checked', 'false');
            (b as HTMLButtonElement).disabled = true;
          });
          btn.classList.add('is-selected');
          btn.setAttribute('aria-checked', 'true');
          answers[q.id] = opt.id;
          saveProgress();
          setTimeout(() => { step++; render(); }, 350);
        });
        list.append(btn);
      }
      body.append(list);
      return;
    }

    // multi
    const selected = new Set<string>((answers[q.id] as string[]) ?? []);
    const list = el('div', { class: 'survey__options', role: 'group' });
    let otherInput: HTMLInputElement | null = null;
    let nextBtn: HTMLButtonElement;
    const syncNext = () => { nextBtn.disabled = selected.size === 0; };

    for (const opt of q.options) {
      const btn = optionButton(q, pick(opt.label, lang), selected.has(opt.id));
      btn.addEventListener('click', () => {
        if (selected.has(opt.id)) selected.delete(opt.id);
        else selected.add(opt.id);
        btn.classList.toggle('is-selected');
        btn.setAttribute('aria-checked', String(selected.has(opt.id)));
        if (q.hasOther && opt.id === 'other' && otherInput) {
          otherInput.hidden = !selected.has('other');
        }
        syncNext();
      });
      list.append(btn);
    }
    body.append(list);

    if (q.hasOther) {
      otherInput = el('input', {
        class: 'survey__other',
        type: 'text',
        maxlength: '200',
        placeholder: ui.other_placeholder,
        value: (answers[q.id + '_text'] as string) ?? '',
      }) as HTMLInputElement;
      otherInput.hidden = !selected.has('other');
      body.append(otherInput);
    }

    nextBtn = el('button', {
      class: 'survey__next',
      type: 'button',
      onclick: () => {
        answers[q.id] = [...selected];
        if (q.hasOther && otherInput && selected.has('other') && otherInput.value.trim())
          answers[q.id + '_text'] = otherInput.value.trim();
        saveProgress();
        step++;
        render();
      },
    }, [ui.next]) as HTMLButtonElement;
    syncNext();
    body.append(nextBtn);
  }

  function renderRegistration() {
    setProgress(true, total + 1);
    const form = el('form', { class: 'survey__form', novalidate: 'true' }) as HTMLFormElement;
    form.append(el('h2', { class: 'survey__q' }, [ui.reg_title]));

    const email = el('input', {
      class: 'survey__input', type: 'email', name: 'email', required: 'true',
      autocomplete: 'email', placeholder: ui.reg_email_ph, 'aria-label': ui.reg_email,
    }) as HTMLInputElement;

    const fylke = el('select', { class: 'survey__input', name: 'fylke', required: 'true', 'aria-label': ui.reg_fylke }) as HTMLSelectElement;
    fylke.append(el('option', { value: '' }, [ui.reg_fylke_ph]));
    for (const f of fylker) fylke.append(el('option', { value: f }, [f]));

    const post = el('input', {
      class: 'survey__input', type: 'text', name: 'postnummer', inputmode: 'numeric',
      maxlength: '8', placeholder: ui.reg_postnummer_ph, 'aria-label': ui.reg_postnummer,
    }) as HTMLInputElement;

    // Telefon — isteğe bağlı, kimlik değil: ödül araması + Agder teslimat koordinasyonu.
    const phone = el('input', {
      class: 'survey__input', type: 'tel', name: 'phone', autocomplete: 'tel',
      maxlength: '24', placeholder: ui.reg_phone_ph, 'aria-label': ui.reg_phone,
    }) as HTMLInputElement;
    const phoneHint = el('p', { class: 'survey__field-hint' }, [ui.reg_phone_hint]);

    const consentWrap = el('label', { class: 'survey__consent' });
    const consent = el('input', { type: 'checkbox', required: 'true' }) as HTMLInputElement;
    consentWrap.append(consent, el('span', {}, [ui.reg_consent]));

    const privacyHref = lang === 'no' ? '/personvern' : `/${lang}/personvern`;
    const privacyLink = el('a', {
      class: 'survey__privacy',
      href: privacyHref,
      target: '_blank',
      rel: 'noopener',
    }, [ui.reg_privacy]);

    const turnstileBox = el('div', { class: 'survey__turnstile' });
    const status = el('p', { class: 'survey__status', role: 'status', 'aria-live': 'polite' });
    const submit = el('button', { class: 'survey__next', type: 'submit' }, [ui.reg_submit]);

    form.append(email, fylke, post, phone, phoneHint, consentWrap, privacyLink, turnstileBox, submit, status);
    renderTurnstile(turnstileBox);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!email.value.trim() || !email.checkValidity()) { email.focus(); return; }
      if (!fylke.value) { fylke.focus(); return; }
      if (!consent.checked) { consent.focus(); return; }

      status.textContent = ui.reg_sending;
      submit.setAttribute('disabled', 'true');
      try {
        const res = await fetch(`${API}/waitlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value.trim(),
            locale: lang,
            fylke: fylke.value,
            postnummer: post.value.trim() || undefined,
            phone: phone.value.trim() || undefined,
            consent: true,
            ref,
            session_key: sessionKey,
            turnstile_token: turnstileToken,
          }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error('req');
        referralCode = data?.data?.referral_code;
        ticketsToken = data?.data?.tickets_token;
        sessionStorage.removeItem('survey_session');
        step = total + 1;
        render();
      } catch {
        status.textContent = ui.error;
        submit.removeAttribute('disabled');
      }
    });

    body.append(form);
  }

  function renderResult() {
    setProgress(false);
    const problem = answers['q3_problem'] as string | undefined;

    body.append(el('h2', { class: 'survey__result-title' }, [ui.result_title]));

    if (problem && resultByProblem[problem]) {
      body.append(el('p', { class: 'survey__result-msg' }, [pick(resultByProblem[problem], lang)]));
    }

    // Bölge mesajı — kayıt formundaki fylke seçiminden okunur.
    const chosenFylke = lastFylke;
    if (chosenFylke) {
      const tmpl =
        chosenFylke === 'Agder'
          ? pick(regionMessage.agder, lang)
          : pick(regionMessage.other, lang).replace(/\{fylke\}/g, chosenFylke);
      body.append(el('p', { class: 'survey__result-region' }, [tmpl]));
    }

    body.append(el('p', { class: 'survey__result-confirm' }, [ui.result_confirm]));

    // Referral / paylaşım (Ekran 6).
    if (referralCode) body.append(renderShare(referralCode));
  }

  function renderShare(code: string): HTMLElement {
    const sh = shareUIFor(lang);
    // Davet linki ziyaretçinin bulunduğu sayfayı korur (/v5/, /v5/tr/ …) —
    // arkadaş aynı varyantı ve dili görür.
    const link = `${location.origin}${location.pathname}?ref=${code}`;
    const full = `${sh.text} ${link}`;
    const wrap = el('div', { class: 'survey__share' });

    wrap.append(el('h3', { class: 'survey__share-title' }, [sh.title]));
    wrap.append(el('p', { class: 'survey__share-sub' }, [sh.subtitle]));
    // Beklenti yönetimi: "arkadaşım girdi ama bilet gelmedi" karışıklığını önler.
    wrap.append(el('p', { class: 'survey__share-hint' }, [sh.hint]));

    // Kişisel link (tıkla-kopyala)
    const linkBox = el('button', { class: 'survey__share-link', type: 'button', title: sh.copy }, [link]);
    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(link);
        linkBox.textContent = sh.copied;
        setTimeout(() => (linkBox.textContent = link), 2000);
      } catch {}
    };
    linkBox.addEventListener('click', copyLink);
    wrap.append(linkBox);

    // Paylaş butonları (mobil derin linkler)
    const row = el('div', { class: 'survey__share-row' });
    const enc = encodeURIComponent;
    row.append(el('a', { class: 'survey__share-btn wa', href: `https://wa.me/?text=${enc(full)}`, target: '_blank', rel: 'noopener' }, ['WhatsApp']));
    row.append(el('a', { class: 'survey__share-btn tg', href: `https://t.me/share/url?url=${enc(link)}&text=${enc(sh.text)}`, target: '_blank', rel: 'noopener' }, ['Telegram']));
    row.append(el('a', { class: 'survey__share-btn sms', href: `sms:?body=${enc(full)}` }, ['SMS']));
    const copyBtn = el('button', { class: 'survey__share-btn copy', type: 'button' }, [sh.copy]);
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(link);
        copyBtn.textContent = sh.copied;
        setTimeout(() => (copyBtn.textContent = sh.copy), 2000);
      } catch {}
    });
    row.append(copyBtn);
    wrap.append(row);

    // Web Share API (destekliyorsa tek "Paylaş" butonu — mobilde en temizi)
    if (typeof navigator.share === 'function') {
      const nb = el('button', { class: 'survey__share-native', type: 'button' }, [sh.native]);
      nb.addEventListener('click', () => navigator.share({ text: sh.text, url: link }).catch(() => {}));
      wrap.append(nb);
    }

    // Kişisel bilet sayacı (imzalı /tickets) — public sıralama yok.
    // Yalnız onaylı kullanıcıda gösterilir (onaysızda "0 bilet" moral bozar;
    // onay çağrısı zaten sonuç ekranında).
    if (ticketsToken) {
      const counter = el('p', { class: 'survey__share-tickets' });
      wrap.append(counter);
      fetch(`${API}/tickets?token=${encodeURIComponent(ticketsToken)}`)
        .then((r) => r.json())
        .then((d) => {
          if (!d?.data?.confirmed) return;
          counter.textContent = sh.tickets.replace('{n}', String(d.data.tickets ?? 0));
        })
        .catch(() => {});
    }

    return wrap;
  }

  // Kayıt formundaki fylke seçimini sonuç ekranı için sakla.
  let lastFylke: string | undefined;
  body.addEventListener('change', (e) => {
    const t = e.target as HTMLElement;
    if (t instanceof HTMLSelectElement && t.name === 'fylke') lastFylke = t.value;
  });

  // --- Olay bağlama ---
  document.querySelectorAll('[data-survey-open]').forEach((b) =>
    b.addEventListener('click', (e) => { e.preventDefault(); open(); })
  );
  root.querySelectorAll('[data-survey-close]').forEach((b) =>
    b.addEventListener('click', () => close())
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.hidden) close();
  });

  // --- E-posta onayı dönüşü (?confirmed=1&code=…&tt=…) ----------------------
  // Onay linki siteye bu parametrelerle yönlendirir; kullanıcı en motive olduğu
  // anda "biletin aktif 🎉" + kendi davet linkini görür (viral döngü).
  function renderConfirmed() {
    setProgress(false);
    body.innerHTML = '';
    body.append(el('h2', { class: 'survey__result-title' }, [ui.confirmed_title]));
    body.append(el('p', { class: 'survey__result-confirm' }, [ui.confirmed_text]));
    if (referralCode) body.append(renderShare(referralCode));
  }

  const qs = new URLSearchParams(location.search);
  if (qs.get('confirmed') === '1' && qs.get('code')) {
    referralCode = qs.get('code')!;
    ticketsToken = qs.get('tt') ?? undefined;
    history.replaceState(null, '', location.pathname); // token URL'de/geçmişte kalmasın
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    renderConfirmed();
  }
}
