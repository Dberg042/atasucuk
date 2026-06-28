// v4 (geliştirilmiş v2 içerik, SPEC-10) — ANA SİTEDEN AYRI.
// Kaynak: plan/landing-page-innhold-NO.md. NO+TR dolu, EN/AR/FA iskelet → NO fallback.
import { defaultLang, type Lang } from './ui';

const no = {
  'meta.title': 'Ata Sucuk | Ekte, fullfermentert halal sucuk — til importpris',
  'meta.description':
    'Ekte, fullfermentert sucuk laget i Norge — rene råvarer, ingen toll, ingen mellomledd. Bli med på ventelisten og vær med å forme produktet.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Kommer snart i Norge · Bli med på ventelisten',
  'hero.title_pre': 'Ekte, fullfermentert sucuk — uten ',
  'hero.title_accent': 'importprisen',
  'hero.title_post': ' og uten tvilsomt innhold.',
  'hero.lead':
    'Sucuk i Norge betyr i dag dyr import eller grensehandel — og begrenset utvalg. Vi lager den skikkelig her hjemme: ekte fermentering, rene råvarer og smaken du savner.',
  'hero.email_label': 'E-postadresse',
  'hero.email_placeholder': 'Din e-postadresse',
  'hero.cta': 'Sikre deg de første smaksbitene',
  'hero.note': 'Ingen spam — vi varsler deg kun når vi er klare.',
  'hero.survey_trigger': 'Bli med i undersøkelsen — vinn 1000 kr',
  'hero.waitlist_heading': 'Eller — bli med på ventelisten',

  'trust.halal': '100% Garantert Halal',
  'trust.local': 'Produsert i Norge',
  'trust.fermented': 'Tradisjonelt Fermentert',

  'price.title': 'Hvorfor koster sucuk dobbelt så mye i Norge?',
  'price.lead':
    'Sucuken du kjøper her har reist langt og byttet hender flere ganger. Toll, transport og to–tre mellomledd legges på prisen — lenge før den når deg. Mange gir opp og kjøper inn store mengder fra Sverige og Danmark i stedet.',
  'price.today_title': 'Slik er det i dag',
  'price.today_1': 'Importert, med toll på toppen',
  'price.today_2': 'To–tre mellomledd, hvert med påslag',
  'price.today_3': 'Ukesvis på lager før den når butikk',
  'price.today_4': 'Ofte halvfermentert eller varmebehandlet for å spare tid',
  'price.ata_title': 'Ata-måten',
  'price.ata_1': 'Produsert lokalt — du kjøper rett fra oss',
  'price.ata_2': 'Ingen toll, ingen unødvendige mellomledd',
  'price.ata_3': 'Fersk, ikke lagret i ukevis',
  'price.ata_4': 'Fullfermentert, slik den skal være',
  'price.bar_import_label': 'Importert sucuk',
  'price.bar_import_value': '~370 kr/kg',
  'price.bar_import_parts': 'råvare + toll + transport + mellomledd',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'importpris',
  'price.bar_ata_parts': 'råvare + lokal produksjon',

  'clean.title': 'Hva står egentlig på baksiden?',
  'clean.lead':
    'Mange sucuk-typer i Norge er fulle av tilsetninger — eller bare halvfermentert og varmebehandlet i hui og hast. Vi tar tiden ekte fermentering krever, og holder innholdslisten så kort som mulig.',
  'clean.import_title': 'Importert (typisk)',
  'clean.import_text': 'Lang innholdsliste, konserveringsmidler, fargestoffer, E-stoffer du ikke kjenner igjen.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Storfekjøtt, hvitløk, krydder, salt, starterkultur. Ingenting annet.',

  'offer.title': 'Premium kvalitet — til importpris.',
  'offer.text':
    'Du skal ikke måtte velge mellom billig og ekte. Fordi vi kutter toll og mellomledd, kan vi lage fullfermentert sucuk av høy kvalitet til samme pris som den importerte. Samme pris — ferskere, renere, og laget skikkelig.',
  'offer.tag1': 'Fullfermentert',
  'offer.tag2': 'Ren',
  'offer.tag3': 'Importpris',

  'founder.title': 'Hvorfor vi gjør dette',
  'founder.text':
    'Vi er ikke et stort matkonsern. Ata Sucuk startet fordi vi var lei av det samme som deg: å betale dobbelt for sucuk som er gammel, full av tilsetninger, eller bare halvveis fermentert. Vi tenkte: dette går an å gjøre skikkelig, her hjemme. Nå bygger vi det — sammen med dere som melder dere på.',

  'proof.title': 'Vi er i oppstartsfasen — og vi mener alvor',
  'proof.counter_pre': 'Allerede',
  'proof.counter_post': 'på ventelisten — og listen vokser hver uke.',
  'proof.p1': 'Vi spør før vi lager. Fire spørsmål former oppskriften, prisen og produktet. Du er med fra start.',
  'proof.p2': 'Full åpenhet. Vi viser innholdet og prosessen — ingenting skjult.',
  'proof.p3': 'Sertifisering underveis. Halal- og Debio-sertifisering er en del av planen før full produksjon.',

  'engine.title': 'Bli med — og vinn et gavekort på 1000 kr',
  'engine.text':
    'Svar på fire korte spørsmål og bli med i trekningen. Du hjelper oss å lage sucuken slik du faktisk vil ha den.',

  // Fiyat barı segment etiketleri
  'price.seg_ravare': 'råvare',
  'price.seg_produksjon': 'produksjon',
  'price.seg_transport': 'transport',
  'price.seg_toll': 'toll',
  'price.seg_mellomledd': 'mellomledd',

  // Hva er sucuk?
  'whatis.title': 'Hva er sucuk?',
  'whatis.text':
    'Sucuk er en krydret, fullfermentert tørrpølse av storfe — en klassiker fra det tyrkiske kjøkkenet. Stekt til kantene blir sprø, spises den til frokost: med egg, i brød eller rett fra pannen. Tenk chorizo, men med sitt eget krydderspråk — hvitløk, spisskummen og paprika.',
  'whatis.tag1': 'Til frokost',
  'whatis.tag2': 'Stekt sprø',
  'whatis.tag3': 'Med egg',

  // Oppskrifter
  'recipes.title': 'Slik bruker du den',
  'recipes.lead': 'Tre enkle måter å nyte sucuk på. Klikk for hele oppskriften.',
  'recipes.cta': 'Les oppskriften →',

  'cta.title': 'Hjelp oss å bringe ekte sucuk til Norge',
  'cta.lead':
    'Vi har oppskriften og planen klar. Nå vil vi vise at Norge er klart for skikkelig, fullfermentert sucuk — til en rettferdig pris. Meld din interesse i dag, helt uforpliktende.',
  'cta.email_label': 'E-postadresse',
  'cta.email_placeholder': 'Skriv inn e-postadressen din',
  'cta.button': 'Bli med på listen',

  'footer.copy': '© 2026 Ata Sucuk Norge. Alle rettigheter reservert.',

  'form.sending': 'Sender …',
  'form.ok': 'Sjekk e-posten din for å bekrefte plassen din. 📩',
  'form.already': 'Du er allerede påmeldt. 🎉',
  'form.error': 'Noe gikk galt. Prøv igjen.',
} as const;

export type V4Key = keyof typeof no;

const tr: Partial<Record<V4Key, string>> = {
  'meta.title': 'Ata Sucuk | Gerçek, tam fermente helal sucuk — ithal fiyatına',
  'meta.description':
    'Norveç’te üretilen gerçek, tam fermente sucuk — katkısız, gümrüksüz, aracısız. Bekleme listesine katıl, ürünü birlikte şekillendir.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Norveç’te çok yakında · Bekleme listesine katıl',
  'hero.title_pre': 'Gerçek, tam fermente sucuk — ',
  'hero.title_accent': 'ithal fiyatı',
  'hero.title_post': ' ve şüpheli içerik olmadan.',
  'hero.lead':
    'Norveç’te sucuk bugün ya pahalı ithalat ya sınır ticareti — üstelik sınırlı çeşit. Biz onu burada doğru dürüst yapıyoruz: gerçek fermantasyon, katkısız içerik ve özlediğin lezzet.',
  'hero.email_label': 'E-posta adresi',
  'hero.email_placeholder': 'E-posta adresin',
  'hero.cta': 'İlk lokmaları kap',
  'hero.note': 'Spam yok — sadece hazır olduğumuzda haber veririz.',
  'hero.survey_trigger': 'Ankete katıl — 1000 kr kazan',
  'hero.waitlist_heading': 'Ya da — bekleme listesine katıl',

  'trust.halal': '%100 Garantili Helal',
  'trust.local': 'Norveç’te Üretildi',
  'trust.fermented': 'Geleneksel Fermente',

  'price.title': 'Norveç’te sucuk neden iki katı pahalı?',
  'price.lead':
    'Burada aldığın sucuk uzun yol kat etti ve birçok el değiştirdi. Gümrük, nakliye ve iki-üç aracı fiyata bineriyor — daha sana ulaşmadan. Çoğu kişi vazgeçip İsveç ve Danimarka’dan kasayla getiriyor.',
  'price.today_title': 'Bugün durum böyle',
  'price.today_1': 'İthal, üstüne gümrük',
  'price.today_2': 'İki-üç aracı, her biri kâr koyuyor',
  'price.today_3': 'Markete ulaşana dek haftalarca depoda',
  'price.today_4': 'Zaman kazanmak için çoğu zaman yarım fermente veya ısıl işlemli',
  'price.ata_title': 'Ata yöntemi',
  'price.ata_1': 'Yerel üretim — doğrudan bizden alırsın',
  'price.ata_2': 'Gümrük yok, gereksiz aracı yok',
  'price.ata_3': 'Taze, haftalarca depoda beklemez',
  'price.ata_4': 'Tam fermente, olması gerektiği gibi',
  'price.bar_import_label': 'İthal sucuk',
  'price.bar_import_value': '~370 kr/kg',
  'price.bar_import_parts': 'hammadde + gümrük + nakliye + aracılar',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'ithal fiyatı',
  'price.bar_ata_parts': 'hammadde + yerel üretim',

  'clean.title': 'Arkasında gerçekte ne yazıyor?',
  'clean.lead':
    'Norveç’teki birçok sucuk katkı dolu — ya da apar topar yarım fermente edilip ısıl işlemden geçirilmiş. Biz gerçek fermantasyonun gerektirdiği zamanı veriyoruz ve içindekiler listesini olabildiğince kısa tutuyoruz.',
  'clean.import_title': 'İthal (tipik)',
  'clean.import_text': 'Uzun içindekiler listesi, koruyucular, renklendiriciler, tanımadığın E-kodları.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Dana eti, sarımsak, baharat, tuz, başlangıç kültürü. Başka hiçbir şey.',

  'offer.title': 'Premium kalite — ithal fiyatına.',
  'offer.text':
    'Ucuz ile gerçek arasında seçim yapmak zorunda kalmamalısın. Gümrüğü ve aracıları kestiğimiz için, yüksek kaliteli tam fermente sucuğu ithal ürünle aynı fiyata yapabiliyoruz. Aynı fiyat — daha taze, daha temiz ve doğru dürüst yapılmış.',
  'offer.tag1': 'Tam fermente',
  'offer.tag2': 'Temiz',
  'offer.tag3': 'İthal fiyatı',

  'founder.title': 'Bunu neden yapıyoruz',
  'founder.text':
    'Büyük bir gıda firması değiliz. Ata Sucuk, senin de bıktığın şeyden bıktığımız için başladı: eski, katkı dolu ya da yarım fermente sucuğa iki katı para ödemekten. Düşündük ki: bu iş burada, doğru dürüst yapılabilir. Şimdi onu inşa ediyoruz — listeye katılan sizlerle birlikte.',

  'proof.title': 'Başlangıç aşamasındayız — ve ciddiyiz',
  'proof.counter_pre': 'Şimdiden',
  'proof.counter_post': 'kişi listede — ve liste her hafta büyüyor.',
  'proof.p1': 'Üretmeden önce soruyoruz. Dört soru tarifi, fiyatı ve ürünü şekillendiriyor. En baştan birliktesin.',
  'proof.p2': 'Tam şeffaflık. İçeriği ve süreci gösteriyoruz — saklı hiçbir şey yok.',
  'proof.p3': 'Sertifikasyon yolda. Helal ve Debio sertifikası, tam üretime geçmeden önce planın parçası.',

  'engine.title': 'Katıl — ve 1000 kr’lik hediye çeki kazan',
  'engine.text':
    'Dört kısa soruyu yanıtla, çekilişe gir. Sucuğu tam da istediğin gibi yapmamıza yardım ediyorsun.',

  'price.seg_ravare': 'hammadde',
  'price.seg_produksjon': 'üretim',
  'price.seg_transport': 'nakliye',
  'price.seg_toll': 'gümrük',
  'price.seg_mellomledd': 'aracı',

  'whatis.title': 'Sucuk nedir?',
  'whatis.text':
    'Sucuk, dana etinden yapılan baharatlı, tam fermente bir kurutulmuş sosistir — Türk mutfağının klasiği. Kenarları kıtırlaşana dek kızartılır; kahvaltıda, yumurtayla, ekmek arası ya da doğrudan tavadan yenir. Chorizo gibi düşün, ama kendi baharat diliyle: sarımsak, kimyon ve kırmızı biber.',
  'whatis.tag1': 'Kahvaltıya',
  'whatis.tag2': 'Kıtır kızarmış',
  'whatis.tag3': 'Yumurtayla',

  'recipes.title': 'Nasıl kullanılır',
  'recipes.lead': 'Sucuğun tadını çıkarmanın üç kolay yolu. Tarifin tamamı için tıkla.',
  'recipes.cta': 'Tarifi oku →',

  'cta.title': 'Norveç’e gerçek sucuğu getirmemize yardım et',
  'cta.lead':
    'Tarif ve plan hazır. Şimdi Norveç’in gerçek, tam fermente sucuğa — adil bir fiyata — hazır olduğunu göstermek istiyoruz. Bugün ilgini bildir, hiçbir yükümlülük yok.',
  'cta.email_label': 'E-posta adresi',
  'cta.email_placeholder': 'E-posta adresini yaz',
  'cta.button': 'Listeye katıl',

  'footer.copy': '© 2026 Ata Sucuk Norge. Tüm hakları saklıdır.',

  'form.sending': 'Gönderiliyor …',
  'form.ok': 'Yerini onaylamak için e-postanı kontrol et. 📩',
  'form.already': 'Zaten kayıtlısın. 🎉',
  'form.error': 'Bir şeyler ters gitti. Tekrar dene.',
};

const en: Partial<Record<V4Key, string>> = {};
const ar: Partial<Record<V4Key, string>> = {};
const fa: Partial<Record<V4Key, string>> = {};

export const v4ui: Record<Lang, Partial<Record<V4Key, string>>> = { no, tr, en, ar, fa };

export function useV4(lang: Lang) {
  return (key: V4Key): string => v4ui[lang]?.[key] ?? v4ui[defaultLang][key] ?? key;
}
