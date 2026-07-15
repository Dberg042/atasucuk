// v5 (revidert v4-innhold) — ANA SİTEDEN AYRI.
// v4'e göre değişenler: fiyat konumlandırması "uten høy pris / rettferdig pris"
// (somut rakam ve "importpris" yok), sertifika cümlesi kaldırıldı, offer bölümü
// lansman/teslimat bölümüne dönüştürüldü (tekrar azaltma), founder foto+imza,
// footer'da iletişim + personvern, çekiliş: 4 × 500 kr, trekning 20. august 2026.
import { defaultLang, type Lang } from './ui';

const no = {
  'meta.title': 'Ata Sucuk | Ekte, fullfermentert halal sucuk — laget i Norge',
  'meta.description':
    'Ekte, fullfermentert sucuk laget i Norge — rene råvarer og en rettferdig pris. Bli med på ventelisten og vær med å forme produktet.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Lansering høsten 2026 · Bli med på ventelisten',
  'hero.title_pre': 'Ekte, fullfermentert sucuk — helt uten ',
  'hero.title_accent': 'høy pris',
  'hero.title_post': ' og tvilsomt innhold.',
  'hero.lead':
    'Sucuk i Norge betyr i dag dyr import eller grensehandel — og begrenset utvalg. Vi lager den skikkelig her hjemme: ekte fermentering, rene råvarer og smaken du savner.',
  'hero.email_label': 'E-postadresse',
  'hero.email_placeholder': 'Din e-postadresse',
  'hero.cta': 'Sikre deg de første smaksbitene',
  'hero.note': 'Ingen spam — vi varsler deg kun når vi er klare.',
  'hero.survey_trigger': 'Svar på 4 spørsmål — vinn gavekort på 500 kr',
  'hero.waitlist_heading': 'Eller — bli med på ventelisten',

  'trust.halal': '100% Halal',
  'trust.local': 'Produsert i Norge',
  'trust.fermented': 'Tradisjonelt Fermentert',

  'price.title': 'Hvorfor er sucuk så dyr i Norge?',
  'price.lead':
    'Sucuken du kjøper i dag har reist langt og byttet hender flere ganger. Toll, transport og to–tre mellomledd legges på prisen — lenge før den når deg. Vi mener du fortjener noe bedre.',
  'price.today_title': 'Slik er det i dag',
  'price.today_1': 'Importert, med høy toll på toppen',
  'price.today_2': 'To–tre mellomledd som alle skal tjene',
  'price.today_3': 'Ukesvis på lager før den når butikken',
  'price.today_4': 'Hurtigproduksjon på bekostning av smaken',
  'price.ata_title': 'Ata-måten',
  'price.ata_1': 'Laget i Norge — ingen toll, ingen mellomledd',
  'price.ata_2': 'Fersk — rett fra oss til deg',
  'price.ata_3': 'Du betaler for råvarer og håndverk, ikke fordyrende ledd',
  'price.ata_4': 'Tid og tradisjon — aldri snarveier',
  'price.bar_import_label': 'Importert sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_import_parts': 'råvare + toll + transport + mellomledd',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'rettferdig pris',
  'price.bar_ata_parts': 'råvare + lokal produksjon',

  'clean.title': 'Stoler du på det du spiser?',
  'clean.lead':
    'Mange sucuk-typer i Norge er fulle av tilsetninger, fargestoffer — og hurtigproduksjon. Vi tar tiden ekte fermentering krever, og holder innholdslisten så kort som mulig.',
  'clean.import_title': 'Importert (typisk)',
  'clean.import_text': 'Lang innholdsliste, konserveringsmidler, fargestoffer, E-stoffer du ikke kjenner igjen.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Storfekjøtt fra Norge, hvitløk, krydder, salt, starterkultur. Ingenting annet.',
  'clean.img_alt': 'Ata Sucuk — kort innholdsliste: storfekjøtt, hvitløk, krydder, salt og starterkultur.',

  // Lansman + teslimat (v4'teki offer bölümünün yerine — tekrar yerine yeni bilgi)
  'launch.title': 'Lansering høsten 2026',
  'launch.text':
    'Vi starter i Agder — der leverer vi selv, helt hjem til døra. Bor du et annet sted i Norge? Da sender vi med posten. Ventelisten får smake først.',
  'launch.tag1': 'Høsten 2026',
  'launch.tag2': 'Agder: levering på døra',
  'launch.tag3': 'Resten av landet: post',

  'founder.title': 'Hvorfor vi gjør dette',
  'founder.text':
    'Vi er ikke et stort matkonsern — vi er en liten familie. Barna våre elsker sucuk, men den vi fikk tak i var både dyr og full av spørsmålstegn: vi kunne aldri være helt sikre på hva de egentlig spiste. Som foreldre ville vi ikke måtte velge mellom pris og trygghet. Så vi begynte å lage sucuk selv, hjemme på kjøkkenet — prøvde, justerte og prøvde igjen, til den ble slik den skal være. Nå vil vi dele den med dere, som et ekte produkt laget i Norge. Og vi bygger det sammen med dere som melder dere på.',
  'founder.sign': '— Gründerparet bak Ata Sucuk',
  'founder.img_alt': 'Familien bak Ata Sucuk',

  'proof.title': 'Vi er i oppstartsfasen — og vi mener alvor',
  'proof.counter_pre': 'Allerede',
  'proof.counter_post': 'på ventelisten — og listen vokser hver uke.',
  'proof.p1': 'Vi spør før vi lager. Fire spørsmål former oppskriften, prisen og produktet.',
  'proof.p2': 'Full åpenhet. Du ser innholdet og prosessen — ingenting skjult.',
  'proof.p3': 'Vi gjør grundige undersøkelser, snakker med erfarne produsenter og ønsker å lage Europas beste sucuk her i Norge.',

  'engine.title': 'Svar på 4 spørsmål — vinn ett av fire gavekort på 500 kr',
  'engine.text':
    'Vi trekker fire vinnere 20. august. Samtidig hjelper du oss å lage sucuken slik du faktisk vil ha den.',
  'engine.terms': 'Trekning 20. august 2026 · Fire gavekort à 500 kr · Vinnerne kontaktes på e-post.',
  'engine.terms_link': 'Vilkår og personvern',

  // Fiyat barı segment etiketleri
  'price.seg_ravare': 'råvare',
  'price.seg_produksjon': 'produksjon',
  'price.seg_transport': 'transport',
  'price.seg_toll': 'toll',
  'price.seg_mellomledd': 'mellomledd',

  // Hva er sucuk?
  'whatis.title': 'Hva er sucuk?',
  'whatis.text':
    'Sucuk er en krydret, fermentert tørrpølse av storfe — en klassiker fra det tyrkiske kjøkkenet. Stekt til kantene blir sprø, spises den til frokost: med egg, i brød eller rett fra pannen. Tenk chorizo, men med sitt eget krydderspråk — hvitløk, spisskummen og paprika.',
  'whatis.tag1': 'Til frokost',
  'whatis.tag2': 'På tur',
  'whatis.tag3': 'Med egg',

  // Oppskrifter
  'recipes.title': 'Slik bruker du den',
  'recipes.lead': 'Tre enkle måter å nyte sucuk på. Klikk for hele oppskriften.',
  'recipes.cta': 'Les oppskriften →',

  'cta.title': 'Hjelp oss å bringe ekte sucuk til Norge',
  'cta.lead':
    'Oppskriften og planen er klar. Meld din interesse i dag — helt uforpliktende — så får du beskjed først når vi lanserer.',
  'cta.email_label': 'E-postadresse',
  'cta.email_placeholder': 'Skriv inn e-postadressen din',
  'cta.button': 'Bli med på listen',

  'footer.copy': '© 2026 Ata Sucuk Norge. Alle rettigheter reservert.',
  'footer.contact_title': 'Kontakt',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Personvernerklæring',

  'form.sending': 'Sender …',
  'form.ok': 'Sjekk e-posten din for å bekrefte plassen din. 📩',
  'form.already': 'Du er allerede påmeldt. 🎉',
  'form.error': 'Noe gikk galt. Prøv igjen.',
} as const;

export type V5Key = keyof typeof no;

const tr: Partial<Record<V5Key, string>> = {
  'meta.title': 'Ata Sucuk | Norveç’te üretilen gerçek, tam fermente helal sucuk',
  'meta.description':
    'Norveç’te üretilen gerçek, tam fermente sucuk — katkısız, adil fiyatlı. Bekleme listesine katıl, sucuğu birlikte şekillendirelim.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Lansman: 2026 Sonbaharı · Bekleme listesine katıl',
  'hero.title_pre': 'Gerçek ve tam fermente sucuk — ',
  'hero.title_accent': ' adil fiyat,',
  'hero.title_post': ' temiz içerik.',
  'hero.lead':
    'Norveç’te canınız iyi bir sucuk çektiğinde önünüzde sadece iki yol var: Ya çok pahalı ithal ürünler ya da İsveç’ten koliyle taşımak. Üstelik çeşit bulmak neredeyse imkansız. Biz bu gidişata son veriyoruz ve sucuğu burada, tam olması gerektiği gibi üretiyoruz: Gerçek fermantasyon, katkısız içerik ve özlediğiniz o geleneksel lezzet.',
  'hero.email_label': 'E-posta adresi',
  'hero.email_placeholder': 'E-posta adresinizi yazın',
  'hero.cta': 'İlk tadanlardan olun',
  'hero.note': 'Spam yok — sadece ürünlerimiz hazır olduğunda haber vereceğiz.',
  'hero.survey_trigger': '4 soruluk ankete katılın, 500 kr değerinde hediye çeki kazanın',
  'hero.waitlist_heading': 'Veya sadece bekleme listemize kaydolun',

  'trust.halal': '%100 Helal',
  'trust.local': 'Norveç’te Üretim',
  'trust.fermented': 'Geleneksel Fermantasyon',

 'price.title': 'Norveç’te sucuk neden bu kadar pahalı?',
  'price.lead':
    'Market raflarından aldığınız ithal bir sucuk, sofranıza ulaşana kadar uzun bir yol kat ediyor. Gümrük vergileri, uluslararası nakliye ve araya giren iki-üç farklı aracı derken, tüm bu ekstra maliyetler daha ürün rafa bile gelmeden fiyata yansıyor. Siz çok daha iyisini, çok daha adil bir fiyata hak ediyorsunuz.',
  'price.today_title': 'Bugünkü durum (İthalat)',
  'price.today_1': 'İthal ürün — üstüne binen yüksek gümrük vergisi',
  'price.today_2': 'Nakliye ve aracı maliyetleri',
  'price.today_3': 'Rafa çıkana kadar haftalarca yollarda ve depolarda bekleyen ürünler',
  'price.today_4': 'Maliyeti düşürmek için lezzetten ödün veren aceleci üretim',
  'price.ata_title': 'Ata yöntemi (Bizim Yolumuz)',
  'price.ata_1': 'Norveç’te yerel üretim — gümrük yok, aracı yok',
  'price.ata_2': 'Taptaze — doğrudan üretimden sofranıza',
  'price.ata_3': 'Ödediğiniz para gümrük ve nakliye maliyetine değil; doğrudan kaliteli ete ve emeğe gider',
  'price.ata_4': 'Zaman alan geleneksel yöntemlerle olgunlaştırma — kestirme yol yok',
  'price.bar_import_label': 'İthal sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_import_parts': 'hammadde + gümrük + nakliye + aracılar',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'Adil fiyat',
  'price.bar_ata_parts': 'kaliteli hammadde + yerel işçilik',

  'clean.title': 'Yediğin şeyin içinde ne var, biliyor musun?',
  'clean.lead':
    'Norveç’te satılan sucukların çoğu katkı maddesi ve renklendirici dolu — üstelik aceleye getirilmiş. Biz gerçek fermantasyona gereken zamanı tanıyoruz; içindekiler listemiz de olabildiğince kısa.',
  'clean.import_title': 'İthal (tipik)',
  'clean.import_text': 'Upuzun bir içindekiler listesi: koruyucular, renklendiriciler, adını bilmediğin E-kodları.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Dana eti, sarımsak, baharat, tuz, başlangıç kültürü. Hepsi bu.',
  'clean.img_alt': 'Ata Sucuk — kısa içindekiler listesi: dana eti, sarımsak, baharat, tuz ve başlangıç kültürü.',

  'launch.title': 'Lansman: 2026 sonbaharı',
  'launch.text':
    'İlk durağımız Agder — orada siparişini kapına kadar kendimiz getiriyoruz. Başka bir şehirde misin? Sorun değil, kargoyla yolluyoruz. İlk tadım her zaman bekleme listesindekilerin.',
  'launch.tag1': '2026 sonbaharı',
  'launch.tag2': 'Agder: kapıya teslim',
  'launch.tag3': 'Diğer bölgeler: kargo',

  'founder.title': 'Bu yola neden çıktık?',
  'founder.text':
    'Biz dev bir gıda şirketi değiliz; kendi halinde küçük bir aileyiz. Çocuklarımız sucuğu çok seviyor ama piyasada bulabildiğimiz ürünlerin içindeki katkı maddeleri yüzünden içimiz rahat etmiyor; ayrıca bu ürünler olması gerekenden de pahalı. Biz de buna bir çözüm bulabileceğimizi düşündük, kolları sıvadık ve işe kendi mutfağımızda başladık: Kendi sucuğumuzu evde ürettik, reçetelerimizi geliştirdik, her seferinde daha iyisini aradık — ta ki o özlediğimiz "işte bu!" dediğimiz lezzete ulaşana kadar. Şimdi bu gerçek, katkısız sucuğu Norveç’te üreterek sofralarınıza taşımak istiyoruz. Ve bu heyecan verici yolculuğu, topluluğumuza katılan sizlerle birlikte inşa ediyoruz.',
  'founder.sign': '— Ata Sucuk Kurucuları',
  'founder.img_alt': 'Ata Sucuk’un arkasındaki aile',

  'proof.title': 'Daha yolun başındayız — ama niyetimiz ciddi',
  'proof.counter_pre': 'Şimdiden',
  'proof.counter_post': 'kişi listede — liste her hafta büyüyor.',
  'proof.p1': 'Önce soruyor, sonra üretiyoruz. Dört kısa soru ile ürünü şekillendiriyoruz.',
  'proof.p2': 'Tam şeffaflık: üretim sürecini bizi takip ederek tanık olabilirsiniz.',
  'proof.p3': 'Ciddi araştırmalar yapıyor, deneyimli üreticilerle görüşüyor ve Avrupa’nın en iyi sucuğunu Norveç’te üretmek istiyoruz.',

  'engine.title': 'Ankete katıl — 500 kr değerinde dört hediye çekinden biri senin olsun',
  'engine.text':
    'Kazananları 20 Ağustos’ta çekilişle belirliyoruz. Cevaplarınla da sucuğu tam istediğin gibi yapmamıza yardımcı oluyorsun.',
  'engine.terms': 'Çekiliş: 20 Ağustos 2026 · 4 × 500 kr hediye çeki · Kazananlara e-postayla haber verilir.',
  'engine.terms_link': 'Şartlar ve gizlilik',

  'price.seg_ravare': 'hammadde',
  'price.seg_produksjon': 'üretim',
  'price.seg_transport': 'nakliye',
  'price.seg_toll': 'gümrük',
  'price.seg_mellomledd': 'aracı',

  // TR kitle sucuğu zaten bilir — tanım yerine "bizimki nasıl" anlatılır.
  'whatis.title': 'Bizim sucuk nasıl?',
  'whatis.text':
    'Sucuğun ne olduğunu sana anlatacak değiliz — ama bizimkini anlatalım: kaliteli dana etinden ve güvenilir içerikle üretilmiş, tam fermente, güvenle tüketeceğiniz bir sucuk. Kahvaltıda yumurtanın yanında, ekmek arasında ya da doğrudan tavadan… Özlediğin o sucuk, olması gerektiği gibi.',
  'whatis.tag1': 'Kahvaltıda',
  'whatis.tag2': 'Doğada',
  'whatis.tag3': 'Yumurtayla',

  'recipes.title': 'Nasıl yersen daha güzel?',
  'recipes.lead': 'Sucuğun tadını çıkarmanın üç kolay yolu. Tarifin tamamı için karta tıkla.',
  'recipes.cta': 'Tarife git →',

  'cta.title': 'Gerçek sucuğu Norveç’e birlikte getirelim',
  'cta.lead':
    'Tarif hazır, plan hazır. Bugün listeye yazıl — hiçbir yükümlülük yok — lansman gününde haberi ilk sen al.',
  'cta.email_label': 'E-posta adresi',
  'cta.email_placeholder': 'E-posta adresini yaz',
  'cta.button': 'Listeye katıl',

  'footer.copy': '© 2026 Ata Sucuk Norge. Tüm hakları saklıdır.',
  'footer.contact_title': 'İletişim',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Gizlilik bildirimi',

  'form.sending': 'Gönderiliyor …',
  'form.ok': 'E-postana bir onay bağlantısı gönderdik — kontrol et. 📩',
  'form.already': 'Zaten listedesin. 🎉',
  'form.error': 'Bir şeyler ters gitti. Tekrar dener misin?',
};

const en: Partial<Record<V5Key, string>> = {
  'meta.title': 'Ata Sucuk | Real, fully fermented halal sucuk — made in Norway',
  'meta.description':
    'Real, fully fermented sucuk made in Norway — clean ingredients and a fair price. Join the waitlist and help shape the product.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Launching autumn 2026 · Join the waitlist',
  'hero.title_pre': 'Real, fully fermented sucuk — without the ',
  'hero.title_accent': 'high price',
  'hero.title_post': ' or the questionable ingredients.',
  'hero.lead':
    'Sucuk in Norway today means expensive imports or cross-border shopping — with very little to choose from. We make it properly, right here at home: real fermentation, clean ingredients and the taste you have been missing.',
  'hero.email_label': 'Email address',
  'hero.email_placeholder': 'Your email address',
  'hero.cta': 'Be among the first to taste',
  'hero.note': 'No spam — we only email you when we are ready.',
  'hero.survey_trigger': 'Answer 4 questions — win a 500 kr gift card',
  'hero.waitlist_heading': 'Or just join the waitlist',

  'trust.halal': '100% Halal',
  'trust.local': 'Made in Norway',
  'trust.fermented': 'Traditionally Fermented',

  'price.title': 'Why is sucuk so expensive in Norway?',
  'price.lead':
    'The sucuk you buy today has travelled far and changed hands many times. Customs duties, transport and two or three middlemen are added to the price — long before it reaches you. We think you deserve better.',
  'price.today_title': 'How it is today',
  'price.today_1': 'Imported, with high customs duty on top',
  'price.today_2': 'Two or three middlemen, each taking their cut',
  'price.today_3': 'Weeks in storage before it reaches the shop',
  'price.today_4': 'Rushed production at the expense of flavour',
  'price.ata_title': 'The Ata way',
  'price.ata_1': 'Made in Norway — no customs, no middlemen',
  'price.ata_2': 'Fresh — straight from us to you',
  'price.ata_3': 'You pay for ingredients and craft, not extra links in the chain',
  'price.ata_4': 'Time and tradition — never shortcuts',
  'price.bar_import_label': 'Imported sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_import_parts': 'ingredients + customs + transport + middlemen',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'a fair price',
  'price.bar_ata_parts': 'ingredients + local production',

  'clean.title': 'Do you trust what you eat?',
  'clean.lead':
    'Much of the sucuk sold in Norway is full of additives and colourings — and made in a hurry. We give real fermentation the time it needs, and keep the ingredient list as short as possible.',
  'clean.import_title': 'Imported (typical)',
  'clean.import_text': 'A long ingredient list: preservatives, colourings, E-numbers you do not recognise.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Norwegian beef, garlic, spices, salt, starter culture. Nothing else.',
  'clean.img_alt': 'Ata Sucuk — a short ingredient list: beef, garlic, spices, salt and starter culture.',

  'launch.title': 'Launching autumn 2026',
  'launch.text':
    'We start in Agder — there we deliver to your door ourselves. Live somewhere else in Norway? We ship by post. The waitlist gets to taste first.',
  'launch.tag1': 'Autumn 2026',
  'launch.tag2': 'Agder: door delivery',
  'launch.tag3': 'Rest of Norway: post',

  'founder.title': 'Why we do this',
  'founder.text':
    'We are not a big food company — we are a small family. Our kids love sucuk, but what we could find was expensive, and we could never be quite sure what they were actually eating. As parents, we did not want to choose between price and peace of mind. So we started making sucuk ourselves, at home in our kitchen — testing, adjusting, testing again, until it was the way it should be. Now we want to share it with you, as a real product made in Norway. And we are building it together with everyone who signs up.',
  'founder.sign': '— The couple behind Ata Sucuk',
  'founder.img_alt': 'The family behind Ata Sucuk',

  'proof.title': 'We are just getting started — and we mean it',
  'proof.counter_pre': 'Already',
  'proof.counter_post': 'on the waitlist — and it grows every week.',
  'proof.p1': 'We ask before we make. Four questions shape the recipe, the price and the product.',
  'proof.p2': 'Full transparency. You see the ingredients and the process — nothing hidden.',
  'proof.p3': 'We are conducting deep research, consulting with experienced producers, and aiming to produce Europe’s best sucuk right here in Norway.',

  'engine.title': 'Answer 4 questions — win one of four 500 kr gift cards',
  'engine.text':
    'We draw four winners on 20 August. And your answers help us make sucuk exactly the way you want it.',
  'engine.terms': 'Draw on 20 August 2026 · Four 500 kr gift cards · Winners are contacted by email.',
  'engine.terms_link': 'Terms & privacy',

  'price.seg_ravare': 'ingredients',
  'price.seg_produksjon': 'production',
  'price.seg_transport': 'transport',
  'price.seg_toll': 'customs',
  'price.seg_mellomledd': 'middlemen',

  'whatis.title': 'What is sucuk?',
  'whatis.text':
    'Sucuk is a spiced, fermented dry sausage made from beef — a classic of Turkish cuisine. Fried until the edges turn crispy, it is eaten for breakfast: with eggs, in bread, or straight from the pan. Think chorizo, but with its own language of spices — garlic, cumin and paprika.',
  'whatis.tag1': 'For breakfast',
  'whatis.tag2': 'On a hike',
  'whatis.tag3': 'With eggs',

  'recipes.title': 'How to enjoy it',
  'recipes.lead': 'Three easy ways to enjoy sucuk. Click for the full recipe.',
  'recipes.cta': 'Read the recipe →',

  'cta.title': 'Help us bring real sucuk to Norway',
  'cta.lead':
    'The recipe and the plan are ready. Register your interest today — no strings attached — and be the first to know when we launch.',
  'cta.email_label': 'Email address',
  'cta.email_placeholder': 'Enter your email address',
  'cta.button': 'Join the list',

  'footer.copy': '© 2026 Ata Sucuk Norway. All rights reserved.',
  'footer.contact_title': 'Contact',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Privacy policy',

  'form.sending': 'Sending …',
  'form.ok': 'Check your email to confirm your spot. 📩',
  'form.already': 'You are already on the list. 🎉',
  'form.error': 'Something went wrong. Please try again.',
};
const ar: Partial<Record<V5Key, string>> = {};
const fa: Partial<Record<V5Key, string>> = {};

export const v5ui: Record<Lang, Partial<Record<V5Key, string>>> = { no, tr, en, ar, fa };

export function useV5(lang: Lang) {
  return (key: V5Key): string => v5ui[lang]?.[key] ?? v5ui[defaultLang][key] ?? key;
}
