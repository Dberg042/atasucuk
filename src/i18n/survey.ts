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
    title: {
      no: 'Hvor mye sucuk spiser du i måneden?',
      tr: 'Ayda ne kadar sucuk tüketiyorsun?',
      en: 'How much sucuk do you eat per month?',
    },
    options: [
      { id: 'none', label: { no: 'Spiser ikke sucuk', tr: 'Hiç', en: 'I don’t eat sucuk' } },
      { id: '0_5kg', label: { no: '0,5 kg', tr: '0,5 kg', en: '0.5 kg' } },
      { id: '1kg', label: { no: '1 kg', tr: '1 kg', en: '1 kg' } },
      { id: '1_5kg', label: { no: '1,5 kg', tr: '1,5 kg', en: '1.5 kg' } },
      { id: '2kg_plus', label: { no: '2+ kg', tr: '2+ kg', en: '2+ kg' } },
    ],
  },
  {
    id: 'q2_source',
    type: 'multi',
    title: {
      no: 'Hvor kjøper du sucuk i dag?',
      tr: 'Sucuğu şu an nereden alıyorsun?',
      en: 'Where do you buy sucuk today?',
    },
    options: [
      { id: 'abroad', label: { no: 'Fra utlandet (Sverige/Danmark)', tr: 'Yurt dışından (İsveç/Danimarka)', en: 'Abroad (Sweden/Denmark)' } },
      { id: 'norway', label: { no: 'Norske butikker', tr: 'Norveç’teki marketlerden', en: 'Norwegian shops' } },
      { id: 'self', label: { no: 'Lager selv', tr: 'Kendim yapıyorum', en: 'I make it myself' } },
      { id: 'dont_buy', label: { no: 'Kjøper ikke sucuk i dag', tr: 'Şu an sucuk almıyorum', en: 'I don’t buy sucuk today' } },
    ],
  },
  {
    id: 'q3_problem',
    type: 'single',
    title: {
      no: 'Hva er det største problemet med sucuk i dag?',
      tr: 'Sence bugün sucuktaki en büyük sorun ne?',
      en: 'What is the biggest problem with sucuk today?',
    },
    options: [
      { id: 'price', label: { no: 'For dyr', tr: 'Çok pahalı', en: 'Too expensive' } },
      { id: 'additives', label: { no: 'Tilsetninger', tr: 'İçindeki katkı maddeleri', en: 'Additives' } },
      { id: 'taste', label: { no: 'Smaken', tr: 'Tadı tatmin etmiyor', en: 'The taste' } },
      { id: 'trust', label: { no: 'Stoler ikke på produsenten', tr: 'Üreticiye güvenmiyorum', en: 'I don’t trust the producer' } },
    ],
  },
  {
    id: 'q4_expectation',
    type: 'multi',
    hasOther: true,
    title: {
      no: 'Hva er viktigst for deg hvis vi lager halal sucuk i Norge?',
      tr: 'Norveç’te helal sucuk üretirsek senin için en önemlisi ne olur?',
      en: 'What matters most to you if we make halal sucuk in Norway?',
    },
    options: [
      { id: 'low_price', label: { no: 'Rimelig pris', tr: 'Uygun fiyat', en: 'A fair price' } },
      { id: 'min_preservatives', label: { no: 'Rene råvarer', tr: 'Katkısız içerik', en: 'Clean ingredients' } },
      { id: 'full_fermented', label: { no: 'Ekte, fullfermentert', tr: 'Tam fermente, gerçek kalite', en: 'Real, fully fermented' } },
      { id: 'other', label: { no: 'Annet', tr: 'Diğer', en: 'Other' } },
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
    no: 'Du er ikke alene. De fleste på listen sier det samme. Derfor lager vi ekte sucuk her hjemme, uten toll og med få mellomledd, til en rettferdig pris.',
    tr: 'Yalnız değilsin. Listedekilerin çoğu da aynı şeyi söylüyor. Tam da bu yüzden burada, gümrüksüz ve çok az aracıyla üretiyoruz: adil bir fiyata.',
    en: 'You’re not alone. Most people on the list say the same. That’s why we make real sucuk here at home, without customs and with few middlemen, at a fair price.',
  },
  additives: {
    no: 'Helt enig. Derfor: bare storfe, hvitløk, krydder, salt og kultur. Ingenting annet.',
    tr: 'Aynı fikirdeyiz. O yüzden içinde sadece şunlar var: dana eti, sarımsak, baharat, tuz ve kültür. Hepsi bu.',
    en: 'We couldn’t agree more. That’s why: just beef, garlic, spices, salt and culture. Nothing else.',
  },
  taste: {
    no: 'Nettopp derfor fullfermenterer vi: ingen snarveier, ekte smak.',
    tr: 'Tam da bu yüzden tam fermente ediyoruz: kestirme yok, gerçek lezzet var.',
    en: 'That’s exactly why we fully ferment: no shortcuts, real flavour.',
  },
  trust: {
    no: 'Derfor bygger vi dette åpent, sammen med deg. Du ser innholdet og prosessen.',
    tr: 'Bu yüzden her şeyi açık açık, seninle birlikte yapıyoruz. İçindekileri de süreci de görüyorsun.',
    en: 'That’s why we’re building this in the open, together with you. You see the ingredients and the process.',
  },
};

// Dinamik sonuç — fylke'ye göre bölge mesajı (anket-akisi Ekran 5/B). {fylke} placeholder.
export const regionMessage = {
  agder: {
    no: 'Og det beste: vi starter nettopp her i Agder. Du er blant de aller første. 🌄',
    tr: 'En güzeli de şu: işe tam da burada, Agder’de başlıyoruz. En öndekilerden birisin. 🌄',
    en: 'And the best part: we’re starting right here in Agder. You’re among the very first. 🌄',
  } as Loc,
  other: {
    no: 'Vi starter i Agder, men nå står {fylke} på kartet. Jo flere fra {fylke}, jo før kommer vi dit, og du er først til å få beskjed.',
    tr: 'Agder’den başlıyoruz ama {fylke} artık haritamızda. {fylke}’den katılan arttıkça oraya daha erken geliriz, haberi de ilk sen alırsın.',
    en: 'We’re starting in Agder, but {fylke} is now on the map. The more people join from {fylke}, the sooner we get there, and you’ll be the first to know.',
  } as Loc,
};

// Anket UI metinleri (butonlar, etiketler, kayıt adımı, sonuç).
export interface SurveyUI {
  trigger: string;
  intro_title: string;
  intro_text: string;
  intro_start: string;
  progress: string; // "{n}/{total}"
  hint_single: string;
  hint_multi: string;
  next: string;
  other_placeholder: string;
  reg_title: string;
  reg_email: string;
  reg_email_ph: string;
  reg_fylke: string;
  reg_fylke_ph: string;
  reg_postnummer: string;
  reg_postnummer_ph: string;
  reg_phone: string;
  reg_phone_ph: string;
  reg_phone_hint: string;
  reg_consent: string;
  reg_privacy: string;
  reg_submit: string;
  reg_sending: string;
  result_title: string;
  result_confirm: string;
  confirmed_title: string;
  confirmed_text: string;
  error: string;
  close: string;
}

export const surveyUI: Record<string, SurveyUI> = {
  no: {
    trigger: 'Svar på 4 spørsmål + bli med i trekningen →',
    intro_title: 'Ekte sucuk kommer til Norge.',
    intro_text: '30 sekunder, 4 spørsmål. Vær med å forme produktet, og bli med i trekningen av tre gavekort på 500 kr (trekning 20. august 2026).',
    intro_start: 'Start →',
    progress: '{n}/{total}',
    hint_single: 'Velg ett alternativ',
    hint_multi: 'Velg alle som passer, flere valg mulig',
    next: 'Neste →',
    other_placeholder: 'Skriv kort (valgfritt)',
    reg_title: 'Siste steg: sikre plassen din og bli med i trekningen.',
    reg_email: 'E-post',
    reg_email_ph: 'din@epost.no',
    reg_fylke: 'Hvilket fylke bor du i?',
    reg_fylke_ph: 'Velg fylke',
    reg_postnummer: 'Postnummer (valgfritt)',
    reg_postnummer_ph: 'F.eks. 4630',
    reg_phone: 'Telefon (valgfritt)',
    reg_phone_ph: '+47 …',
    reg_phone_hint: 'Vinner du, ringer vi deg. I Agder avtaler vi levering på dette nummeret.',
    reg_consent:
      'Jeg vil bli varslet på e-post og samtykker til at svarene mine brukes anonymt for å utvikle produktet.',
    reg_privacy: 'Personvernerklæring og vilkår for trekningen',
    reg_submit: 'Bli med + sikre loddet →',
    reg_sending: 'Sender …',
    result_title: 'Takk! 🎉',
    result_confirm: '📩 Sjekk e-posten din og bekreft plassen. Da er loddet ditt offisielt.',
    confirmed_title: 'Plassen din er bekreftet! 🎉',
    confirmed_text: 'Loddet ditt er aktivt. Vil du øke sjansene? Inviter venner. For hver venn som bekrefter, får dere begge ett lodd ekstra.',
    error: 'Noe gikk galt. Prøv igjen.',
    close: 'Lukk',
  },
  tr: {
    trigger: '4 soruya cevap ver + çekilişe katıl →',
    intro_title: 'Gerçek sucuk Norveç’e geliyor.',
    intro_text: '30 saniye, 4 soru. Sucuğu birlikte şekillendirelim, üstelik 500 kr değerinde üç hediye çekinden birini kazanma şansın var (çekiliş: 20 Ağustos 2026).',
    intro_start: 'Başla →',
    progress: '{n}/{total}',
    hint_single: 'Bir seçenek işaretle',
    hint_multi: 'Uygun olanların hepsini işaretleyebilirsin',
    next: 'İleri →',
    other_placeholder: 'Birkaç kelimeyle yaz (isteğe bağlı)',
    reg_title: 'Son adım: yerini ayır, çekilişe katıl.',
    reg_email: 'E-posta',
    reg_email_ph: 'senin@eposta.com',
    reg_fylke: 'Hangi fylkede yaşıyorsun?',
    reg_fylke_ph: 'Fylke seç',
    reg_postnummer: 'Posta kodu (isteğe bağlı)',
    reg_postnummer_ph: 'Örn. 4630',
    reg_phone: 'Telefon (isteğe bağlı)',
    reg_phone_ph: '+47 …',
    reg_phone_hint: 'Kazanırsan seni telefonla arıyoruz. Agder’de teslimatı da bu numarayla ayarlıyoruz.',
    reg_consent:
      'E-postayla haber almak istiyorum; cevaplarımın ürünü geliştirmek için anonim olarak kullanılmasına izin veriyorum.',
    reg_privacy: 'Gizlilik bildirimi ve çekiliş şartları',
    reg_submit: 'Katıl, biletimi ayır →',
    reg_sending: 'Gönderiliyor …',
    result_title: 'Teşekkürler! 🎉',
    result_confirm: '📩 E-postana bir onay bağlantısı gönderdik, tıkladığın anda biletin kesinleşir.',
    confirmed_title: 'Yerin onaylandı! 🎉',
    confirmed_text: 'Biletin artık aktif. Şansını artırmak ister misin? Arkadaşlarını davet et. Onaylayan her arkadaş için ikinize de +1 bilet.',
    error: 'Bir şeyler ters gitti. Tekrar dener misin?',
    close: 'Kapat',
  },
  en: {
    trigger: 'Answer 4 questions + join the draw →',
    intro_title: 'Real sucuk is coming to Norway.',
    intro_text: '30 seconds, 4 questions. Help shape the product, and join the draw for one of three 500 kr gift cards (drawn 20 August 2026).',
    intro_start: 'Start →',
    progress: '{n}/{total}',
    hint_single: 'Pick one option',
    hint_multi: 'Select all that apply',
    next: 'Next →',
    other_placeholder: 'A few words (optional)',
    reg_title: 'Last step: save your spot and join the draw.',
    reg_email: 'Email',
    reg_email_ph: 'you@email.com',
    reg_fylke: 'Which county do you live in?',
    reg_fylke_ph: 'Select county',
    reg_postnummer: 'Postcode (optional)',
    reg_postnummer_ph: 'E.g. 4630',
    reg_phone: 'Phone (optional)',
    reg_phone_ph: '+47 …',
    reg_phone_hint: 'If you win, we call you. In Agder we arrange delivery on this number.',
    reg_consent:
      'I want to be notified by email and agree that my answers are used anonymously to develop the product.',
    reg_privacy: 'Privacy policy and draw terms',
    reg_submit: 'Join + secure my ticket →',
    reg_sending: 'Sending …',
    result_title: 'Thank you! 🎉',
    result_confirm: '📩 Check your email and confirm your spot. That makes your ticket official.',
    confirmed_title: 'Your spot is confirmed! 🎉',
    confirmed_text: 'Your ticket is active. Want better odds? Invite friends. For every friend who confirms, you both get an extra ticket.',
    error: 'Something went wrong. Please try again.',
    close: 'Close',
  },
};

export function surveyUIFor(lang: Lang): SurveyUI {
  return surveyUI[lang] ?? surveyUI.no;
}

// Referral / paylaşım metinleri (Ekran 6) — iki-taraflı, hazır metin.
export interface ShareUI {
  title: string;
  subtitle: string;
  hint: string; // beklenti yönetimi: bilet, arkadaş onaylayınca yazılır
  text: string; // paylaşım mesajı (link otomatik eklenir)
  copy: string;
  copied: string;
  native: string;
  tickets: string; // "{n}" placeholder
}

export const shareUI: Record<string, ShareUI> = {
  no: {
    title: 'Inviter en venn. Dere vinner begge.',
    subtitle: 'Del lenken din. Når en venn blir med, får begge ett lodd til.',
    hint: 'Loddene deles ut når vennen din har bekreftet e-postadressen sin.',
    text: 'Endelig ekte, fullfermentert sucuk laget i Norge. Bli med, så får vi begge ett lodd til 👇',
    copy: 'Kopiér lenke',
    copied: 'Kopiert! ✓',
    native: 'Del',
    tickets: 'Du har nå {n} lodd 🎟️',
  },
  tr: {
    title: 'Bir arkadaşını davet et. İkiniz de kazanın.',
    subtitle: 'Linkini paylaş; arkadaşın katıldığında ikinize de birer bilet daha.',
    hint: 'Biletler, arkadaşın e-postasını onayladığı anda ikinize de yazılır.',
    text: 'Sonunda: Norveç’te üretilen katkısız, tam fermente sucuk. Sen de katıl, ikimiz de birer bilet daha kazanalım 👇',
    copy: 'Linki kopyala',
    copied: 'Kopyalandı! ✓',
    native: 'Paylaş',
    tickets: 'Şu an {n} biletin var 🎟️',
  },
  en: {
    title: 'Invite a friend. You both win.',
    subtitle: 'Share your link. When a friend joins, you both get an extra ticket.',
    hint: 'Tickets are awarded once your friend confirms their email address.',
    text: 'Finally: real, fully fermented sucuk made in Norway. Join in and we both get an extra ticket 👇',
    copy: 'Copy link',
    copied: 'Copied! ✓',
    native: 'Share',
    tickets: 'You now have {n} tickets 🎟️',
  },
};

export function shareUIFor(lang: Lang): ShareUI {
  return shareUI[lang] ?? shareUI.no;
}
