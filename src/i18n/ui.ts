// i18n sözlük + helper'lar (ana site = v1). v2 içerik ayrı: src/i18n/v4.ts
// TR + NO dolu (lansman aktif). EN/AR/FA iskelet → NO fallback. RTL: ar/fa.

export const languages = {
  no: 'Norsk',
  tr: 'Türkçe',
  en: 'English',
  ar: 'العربية',
  fa: 'فارسی',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'no';
export const activeLanguages: Lang[] = ['no', 'tr'];
export const rtlLangs: Lang[] = ['ar', 'fa'];

export function isRtl(lang: Lang): boolean {
  return rtlLangs.includes(lang);
}
export function dirFor(lang: Lang): 'ltr' | 'rtl' {
  return isRtl(lang) ? 'rtl' : 'ltr';
}

const no = {
  'meta.title': 'Ata Sucuk | Norges første autentiske, lokalproduserte halal sucuk',
  'meta.description':
    'Tradisjonelt fermentert. Ferske norske råvarer. Ekte tyrkisk smak – til en rettferdig pris. Meld deg på ventelisten for lansering.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Lanseres snart i Norge',
  'hero.title_pre': 'Norges første ',
  'hero.title_accent': 'autentiske',
  'hero.title_post': ' lokalproduserte halal sucuk.',
  'hero.lead':
    'Tradisjonelt fermentert. Ferske norske råvarer. Ekte tyrkisk smak – til en rettferdig pris. Meld deg på ventelisten for å sikre deg din første smakebit når vi starter produksjonen.',
  'hero.email_label': 'E-postadresse',
  'hero.email_placeholder': 'Din e-postadresse',
  'hero.cta': 'Få tidlig tilgang',
  'hero.note': 'Ingen spam. Vi varsler deg kun når vi er klare til å ta i mot bestillinger.',

  'trust.halal': '100% Garantert Halal',
  'trust.local': 'Produsert i Norge',
  'trust.fermented': 'Tradisjonelt Fermentert',

  'problem.title': 'Hvorfor betale overpris for importert sucuk?',
  'problem.lead':
    'I dag koster importert sucuk i Norge opp mot 370 kr/kg. Den reiser langt, ligger lenge på lager og mister sin ferskhet. Vi mener du fortjener noe bedre.',
  'problem.market_title': 'Dagens marked',
  'problem.market_1': 'Dyr import (ofte over 370 kr/kg).',
  'problem.market_2': 'Lang transporttid og ukesvis på lager.',
  'problem.market_3': 'Hurtigproduksjon på bekostning av tradisjonell smak.',
  'problem.ata_title': 'Ata-metoden',
  'problem.ata_1': 'Lokal produksjon = Rettferdig, tilgjengelig pris.',
  'problem.ata_2': 'Ferske, norske råvarer fra anerkjent kjøttprodusent.',
  'problem.ata_3': 'Tradisjonell fermentering og autentisk krydderblanding.',

  'showcase.alt': 'Tradisjonelt fermentert Ata Sucuk servert med tilbehør.',

  'quality.title': 'Kompromissløs kvalitet',
  'quality.p1_title': 'Langtidsfermentert',
  'quality.p1_text':
    'Vi tar ingen snarveier. En ekte sucuk krever tid. Vi benytter tradisjonelle metoder for langsom fermentering, som gir den dype, komplekse smaken og den perfekte teksturen.',
  'quality.p2_title': 'Premium Norsk Kjøtt',
  'quality.p2_text':
    'Produsert i Norge med ferskt, kortreist storfekjøtt av høyeste kvalitet. Vi samarbeider kun med de beste lokale leverandørene under strenge halal-sertifiseringer.',
  'quality.p3_title': 'Autentisk Krydder',
  'quality.p3_text':
    'Vår hemmelige familieoppskrift benytter krydder importert direkte fra Tyrkia. Hvitløk, spisskummen og rød pepper i perfekt harmoni for den gjenkjennelige smaken.',

  'cta.title': 'Hjelp oss å bringe Ata Sucuk til live',
  'cta.lead':
    'Vi har oppskriften, produsenten og råvarene klare. Nå trenger vi kun å bevise at Norge er klart for en ekte premium sucuk. Meld din interesse i dag, helt uforpliktende.',
  'cta.email_label': 'E-postadresse',
  'cta.email_placeholder': 'Skriv inn e-postadressen din',
  'cta.button': 'Bli med på listen',

  'footer.copy': '© 2026 Ata Sucuk Norge. Alle rettigheter reservert.',

  'form.sending': 'Sender …',
  'form.ok': 'Sjekk e-posten din for å bekrefte plassen din. 📩',
  'form.already': 'Du er allerede påmeldt. 🎉',
  'form.error': 'Noe gikk galt. Prøv igjen.',
} as const;

export type UIKey = keyof typeof no;

const tr: Partial<Record<UIKey, string>> = {
  'meta.title': 'Ata Sucuk | Norveç’in ilk otantik, yerel üretim helal sucuğu',
  'meta.description':
    'Geleneksel fermente. Taze Norveç malzemeleri. Gerçek Türk lezzeti – adil bir fiyata. Lansman için bekleme listesine katıl.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Norveç’te çok yakında',
  'hero.title_pre': 'Norveç’in ilk ',
  'hero.title_accent': 'otantik',
  'hero.title_post': ', yerel üretim helal sucuğu.',
  'hero.lead':
    'Geleneksel fermente. Taze Norveç malzemeleri. Gerçek Türk lezzeti – adil bir fiyata. Üretime başladığımızda ilk lokmanı kapmak için bekleme listesine katıl.',
  'hero.email_label': 'E-posta adresi',
  'hero.email_placeholder': 'E-posta adresin',
  'hero.cta': 'Erken erişim al',
  'hero.note': 'Spam yok. Sadece sipariş almaya hazır olduğumuzda haber veririz.',

  'trust.halal': '%100 Garantili Helal',
  'trust.local': 'Norveç’te Üretildi',
  'trust.fermented': 'Geleneksel Fermente',

  'problem.title': 'İthal sucuğa neden fazladan para ödeyesin?',
  'problem.lead':
    'Bugün Norveç’te ithal sucuk kilosu 370 kr’a kadar çıkıyor. Uzun yol kat ediyor, depolarda bekliyor ve tazeliğini kaybediyor. Daha iyisini hak ettiğine inanıyoruz.',
  'problem.market_title': 'Bugünkü pazar',
  'problem.market_1': 'Pahalı ithalat (çoğu zaman 370 kr/kg üzeri).',
  'problem.market_2': 'Uzun nakliye süresi ve haftalarca depoda bekleme.',
  'problem.market_3': 'Geleneksel lezzetten ödün veren hızlı üretim.',
  'problem.ata_title': 'Ata yöntemi',
  'problem.ata_1': 'Yerel üretim = Adil, erişilebilir fiyat.',
  'problem.ata_2': 'Tanınmış bir et üreticisinden taze, Norveç malzemeleri.',
  'problem.ata_3': 'Geleneksel fermantasyon ve otantik baharat karışımı.',

  'showcase.alt': 'Geleneksel fermente Ata Sucuk, garnitürüyle servis edilmiş.',

  'quality.title': 'Ödünsüz kalite',
  'quality.p1_title': 'Uzun süre fermente',
  'quality.p1_text':
    'Kestirme yol seçmeyiz. Gerçek bir sucuk zaman ister. Derin, kompleks lezzeti ve kusursuz dokuyu veren geleneksel yavaş fermantasyon yöntemlerini kullanırız.',
  'quality.p2_title': 'Premium Norveç Eti',
  'quality.p2_text':
    'En yüksek kalitede, taze ve yerel dana etiyle Norveç’te üretildi. Yalnızca en iyi yerel tedarikçilerle, sıkı helal sertifikaları altında çalışıyoruz.',
  'quality.p3_title': 'Otantik Baharat',
  'quality.p3_text':
    'Gizli aile tarifimiz doğrudan Türkiye’den getirilen baharatları kullanır. O tanıdık lezzet için sarımsak, kimyon ve kırmızı biber kusursuz bir uyumda.',

  'cta.title': 'Ata Sucuk’u hayata geçirmemize yardım et',
  'cta.lead':
    'Tarif, üretici ve malzemeler hazır. Şimdi tek ihtiyacımız Norveç’in gerçek premium sucuğa hazır olduğunu kanıtlamak. Bugün ilgini bildir, hiçbir yükümlülük yok.',
  'cta.email_label': 'E-posta adresi',
  'cta.email_placeholder': 'E-posta adresini yaz',
  'cta.button': 'Listeye katıl',

  'footer.copy': '© 2026 Ata Sucuk Norge. Tüm hakları saklıdır.',

  'form.sending': 'Gönderiliyor …',
  'form.ok': 'Yerini onaylamak için e-postanı kontrol et. 📩',
  'form.already': 'Zaten kayıtlısın. 🎉',
  'form.error': 'Bir şeyler ters gitti. Tekrar dene.',
};

const en: Partial<Record<UIKey, string>> = {};
const ar: Partial<Record<UIKey, string>> = {};
const fa: Partial<Record<UIKey, string>> = {};

export const ui: Record<Lang, Partial<Record<UIKey, string>>> = { no, tr, en, ar, fa };

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  if (seg in languages) return seg as Lang;
  return defaultLang;
}
