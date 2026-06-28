// Anket veri modeli (T5.1) — 4 soru + fylke listesi + dinamik sonuç metinleri.
// Veri tek (ID'ler), sunum çok dilli (NO/TR dolu; EN/AR/FA sonra → NO fallback).
// Kaynak: plan/plan.md §3 + plan/anket-akisi-ekran-metinleri.md
import type { Lang } from './ui';

export type Loc = Partial<Record<Lang, string>>;
export const pick = (m: Loc, lang: Lang): string => m[lang] ?? m.no ?? '';

export interface Option {
  id: string;
  label: Loc;
}
export interface Question {
  id: string;
  type: 'single' | 'multi';
  title: Loc;
  options: Option[];
  hasOther?: boolean; // q4: "Diğer" seçilince serbest metin
}

export const questions: Question[] = [
  {
    id: 'q1_consumption',
    type: 'single',
    title: { no: 'Hvor mye sucuk spiser du i måneden?', tr: 'Ayda ne kadar sucuk tüketiyorsun?' },
    options: [
      { id: 'none', label: { no: 'Aldri', tr: 'Hiç' } },
      { id: '0_5kg', label: { no: '0,5 kg', tr: '0,5 kg' } },
      { id: '1kg', label: { no: '1 kg', tr: '1 kg' } },
      { id: '1_5kg', label: { no: '1,5 kg', tr: '1,5 kg' } },
      { id: '2kg_plus', label: { no: '2+ kg', tr: '2+ kg' } },
    ],
  },
  {
    id: 'q2_source',
    type: 'multi',
    title: { no: 'Hvor kjøper du sucuk i dag?', tr: 'Sucuğu şu an nereden alıyorsun?' },
    options: [
      { id: 'abroad', label: { no: 'Fra utlandet (Sverige/Danmark)', tr: 'Yurt dışından (İsveç/Danimarka)' } },
      { id: 'norway', label: { no: 'Norske butikker', tr: 'Norveç’teki marketler' } },
      { id: 'self', label: { no: 'Lager selv', tr: 'Kendim yapıyorum' } },
    ],
  },
  {
    id: 'q3_problem',
    type: 'single',
    title: { no: 'Hva er det største problemet med sucuk i dag?', tr: 'Sence sucukta en büyük sorun ne?' },
    options: [
      { id: 'price', label: { no: 'For dyr', tr: 'Pahalı olması' } },
      { id: 'additives', label: { no: 'Tilsetninger', tr: 'İçindeki katkılar' } },
      { id: 'taste', label: { no: 'Smaken', tr: 'Tadı' } },
      { id: 'trust', label: { no: 'Stoler ikke på produsenten', tr: 'Üreticiye güven' } },
    ],
  },
  {
    id: 'q4_expectation',
    type: 'multi',
    hasOther: true,
    title: {
      no: 'Hva er viktigst for deg hvis vi lager halal sucuk i Norge?',
      tr: 'Norveç’te helal sucuk üretsek senin için en önemlisi ne?',
    },
    options: [
      { id: 'low_price', label: { no: 'Rimelig pris', tr: 'Uygun fiyat' } },
      { id: 'min_preservatives', label: { no: 'Rene råvarer', tr: 'Katkısız içerik' } },
      { id: 'full_fermented', label: { no: 'Ekte, fullfermentert', tr: 'Tam fermente, yüksek kalite' } },
      { id: 'other', label: { no: 'Annet', tr: 'Diğer' } },
    ],
  },
];

// Norveç fylke listesi (2024, 15 fylke). Agder = lansman bölgesi.
export const fylker: string[] = [
  'Agder',
  'Akershus',
  'Buskerud',
  'Finnmark',
  'Innlandet',
  'Møre og Romsdal',
  'Nordland',
  'Oslo',
  'Østfold',
  'Rogaland',
  'Telemark',
  'Troms',
  'Trøndelag',
  'Vestfold',
  'Vestland',
];

// Dinamik sonuç — q3 (problem) cevabına göre (anket-akisi Ekran 5/A)
export const resultByProblem: Record<string, Loc> = {
  price: {
    no: 'Du er ikke alene — de fleste på listen sier det samme. Derfor lager vi ekte sucuk til importpris, uten toll og mellomledd.',
    tr: 'Yalnız değilsin — listedekilerin çoğu aynısını diyor. Tam da bu yüzden ithal fiyatına, gümrüksüz ve aracısız üretiyoruz.',
  },
  additives: {
    no: 'Helt enig. Derfor: bare storfe, hvitløk, krydder, salt og kultur. Ingenting annet.',
    tr: 'Sana katılıyoruz. Bu yüzden: sadece et, sarımsak, baharat, tuz ve kültür. Başka hiçbir şey.',
  },
  taste: {
    no: 'Nettopp derfor fullfermenterer vi — ingen snarveier, ekte smak.',
    tr: 'Tam da bu yüzden tam fermente ediyoruz — kestirme yok, gerçek lezzet.',
  },
  trust: {
    no: 'Derfor bygger vi dette åpent, sammen med deg — du ser innholdet og prosessen.',
    tr: 'Bu yüzden bunu açıkça, seninle birlikte inşa ediyoruz — içeriği de süreci de görüyorsun.',
  },
};

// Dinamik sonuç — fylke'ye göre bölge mesajı (anket-akisi Ekran 5/B). {fylke} placeholder.
export const regionMessage = {
  agder: {
    no: 'Og det beste: vi starter nettopp her i Agder. Du er blant de aller første. 🌄',
    tr: 'Üstelik: tam da burada, Agder’de başlıyoruz. İlk sıradakilerdensin. 🌄',
  } as Loc,
  other: {
    no: 'Vi starter i Agder, men nå står {fylke} på kartet. Jo flere fra {fylke}, jo før kommer vi dit — og du er først til å få beskjed.',
    tr: 'Agder’de başlıyoruz, ama artık {fylke} haritada. {fylke}’den ne kadar çok kişi olursa o kadar erken geliriz — ve ilk sen haber alırsın.',
  } as Loc,
};

// Anket UI metinleri (butonlar, etiketler, kayıt adımı, sonuç).
export interface SurveyUI {
  trigger: string;
  intro_title: string;
  intro_text: string;
  intro_start: string;
  progress: string; // "{n}/{total}"
  next: string;
  other_placeholder: string;
  reg_title: string;
  reg_email: string;
  reg_email_ph: string;
  reg_fylke: string;
  reg_fylke_ph: string;
  reg_postnummer: string;
  reg_postnummer_ph: string;
  reg_consent: string;
  reg_submit: string;
  reg_sending: string;
  result_title: string;
  result_confirm: string;
  error: string;
  close: string;
}

export const surveyUI: Record<string, SurveyUI> = {
  no: {
    trigger: 'Svar på 4 spørsmål + bli med i trekningen →',
    intro_title: 'Ekte sucuk kommer til Norge.',
    intro_text: '30 sekunder, 4 spørsmål. Vær med å forme produktet — og bli med i trekningen på 1000 kr.',
    intro_start: 'Start →',
    progress: '{n}/{total}',
    next: 'Neste →',
    other_placeholder: 'Skriv kort (valgfritt)',
    reg_title: 'Siste steg — sikre plassen din og bli med i trekningen.',
    reg_email: 'E-post',
    reg_email_ph: 'din@epost.no',
    reg_fylke: 'Hvilket fylke bor du i?',
    reg_fylke_ph: 'Velg fylke',
    reg_postnummer: 'Postnummer (valgfritt)',
    reg_postnummer_ph: 'F.eks. 4630',
    reg_consent:
      'Jeg vil bli varslet på e-post og samtykker til at svarene mine brukes anonymt for å utvikle produktet.',
    reg_submit: 'Bli med + sikre loddet →',
    reg_sending: 'Sender …',
    result_title: 'Takk! 🎉',
    result_confirm: '📩 Sjekk e-posten din og bekreft plassen — da er loddet ditt offisielt.',
    error: 'Noe gikk galt. Prøv igjen.',
    close: 'Lukk',
  },
  tr: {
    trigger: '4 soruyu yanıtla + çekilişe katıl →',
    intro_title: 'Norveç’te ekte sucuk geliyor.',
    intro_text: '30 saniye, 4 soru. Sucuğu birlikte şekillendirelim — ve 1000 kr çekilişine gir.',
    intro_start: 'Başla →',
    progress: '{n}/{total}',
    next: 'İleri →',
    other_placeholder: 'Birkaç kelimeyle yaz (isteğe bağlı)',
    reg_title: 'Son adım — yerini ayırt ve çekilişe gir.',
    reg_email: 'E-posta',
    reg_email_ph: 'senin@eposta.com',
    reg_fylke: 'Hangi bölgedesin?',
    reg_fylke_ph: 'Fylke seç',
    reg_postnummer: 'Posta kodu (isteğe bağlı)',
    reg_postnummer_ph: 'Örn. 4630',
    reg_consent:
      'E-posta ile haber almak istiyorum ve cevaplarımın ürünü geliştirmek için anonim kullanılmasına izin veriyorum.',
    reg_submit: 'Katıl + biletimi al →',
    reg_sending: 'Gönderiliyor …',
    result_title: 'Teşekkürler! 🎉',
    result_confirm: '📩 E-postanı kontrol et ve yerini onayla — bileti böyle kesinleşir.',
    error: 'Bir şeyler ters gitti. Tekrar dene.',
    close: 'Kapat',
  },
};

export function surveyUIFor(lang: Lang): SurveyUI {
  return surveyUI[lang] ?? surveyUI.no;
}

// Referral / paylaşım metinleri (Ekran 6) — iki-taraflı, hazır metin.
export interface ShareUI {
  title: string;
  subtitle: string;
  text: string; // paylaşım mesajı (link otomatik eklenir)
  copy: string;
  copied: string;
  native: string;
  tickets: string; // "{n}" placeholder
}

export const shareUI: Record<string, ShareUI> = {
  no: {
    title: 'Inviter en venn — dere vinner begge.',
    subtitle: 'Del lenken din. Når en venn blir med, får begge ett lodd til.',
    text: 'Endelig ekte, fullfermentert sucuk i Norge — til importpris. Bli med, så får vi begge ett lodd til 👇',
    copy: 'Kopiér lenke',
    copied: 'Kopiert! ✓',
    native: 'Del',
    tickets: 'Du har nå {n} lodd 🎟️',
  },
  tr: {
    title: 'Arkadaşını davet et — ikiniz de kazanın.',
    subtitle: 'Linkini paylaş. Arkadaşın katılınca ikinize de birer bilet daha.',
    text: 'Norveç’te nihayet katkısız, tam fermente sucuk — ithal fiyatına. Katıl, ikimize de birer bilet 👇',
    copy: 'Linki kopyala',
    copied: 'Kopyalandı! ✓',
    native: 'Paylaş',
    tickets: 'Şu an {n} biletin var 🎟️',
  },
};

export function shareUIFor(lang: Lang): ShareUI {
  return shareUI[lang] ?? shareUI.no;
}
