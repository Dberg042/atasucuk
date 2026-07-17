// v7 (plan/updatedstory.md kurgusu) — ÖNİZLEME, ana sayfadan ayrı (/v7/).
// v5'e göre değişenler:
//  - Hero: çekiliş çıktı, tek CTA = venteliste. Başlık güvenle açıyor
//    ("kort innholdsliste"), fiyat ikinci cümlede nedensellikle geliyor.
//  - Problem: eski "pris" + "stoler du" bölümleri tek nedensellik zincirinde
//    birleşti (uzak yol → katkı VE fiyat). Punchline: "mer — for mindre".
//  - İçindekiler: kısa kanıt bölümü — tek cümlelik liste + middle.png.
//  - "Vi mener alvor" (proof) bölümü silindi; maddeleri anket/founder'a dağıldı.
//  - Anket: çerçeve katılım ("du er med og bestemmer"), gavekort "som takk".
//
// AÇIK KARARLAR (updatedstory.md sonu — lansmandan önce doldurulacak):
//  1. founder.text içine gerçek isimler ("Vi er X og Y") eklenebilir.
//  2. founder.text içindeki somut detay ("til barna ba om mer") gerçek bir
//     anıyla değiştirilebilir (ör. "batch nummer sju").
//  3. Fiyat çıpası: bar_ata_value hâlâ "rettferdig pris" — rakam kararı açık.
import { defaultLang, type Lang } from './ui';

const no = {
  'meta.title': 'Ata Sucuk | Ekte sucuk. Kort innholdsliste. Laget i Norge.',
  'meta.description':
    'Storfekjøtt, hvitløk, krydder, salt og starterkultur — ingenting annet. Fullfermentert på ekte vis, laget i Norge. Bli med på ventelisten.',

  'nav.brand': 'Ata Sucuk',

  // 1) Hero — tek CTA: venteliste
  'hero.badge': 'Lansering høsten 2026 · Bli med på ventelisten',
  'hero.title_pre': 'Ekte sucuk. ',
  'hero.title_accent': 'Kort innholdsliste.',
  'hero.title_post': ' Laget i Norge.',
  'hero.lead':
    'Storfekjøtt, hvitløk, krydder, salt og starterkultur — ingenting annet. Fullfermentert på ekte vis, her hjemme. Og fordi den ikke krysser grenser og mellomledd, koster den mindre enn importert.',
  'hero.email_label': 'E-postadresse',
  'hero.email_placeholder': 'Din e-postadresse',
  'hero.cta': 'Sikre deg de første smaksbitene',
  'hero.note': 'Ingen spam — vi varsler deg kun når vi er klare.',

  'trust.halal': '100% Halal',
  'trust.local': 'Produsert i Norge',
  'trust.fermented': 'Tradisjonelt Fermentert',

  // 2) Problem — tek bölüm, tek zincir: import → katkı VE fiyat
  'problem.title': 'Sucuken i butikken har reist langt. Det ser du på både innholdslisten og prisen.',
  'problem.lead': 'Nesten all sucuk i Norge er importert. Og import former produktet:',
  'problem.p1_title': 'Lang reise krever holdbarhet',
  'problem.p1_text':
    'Derfor får du konserveringsmidler, fargestoffer og hurtigproduksjon i stedet for ekte fermentering. Ikke fordi det smaker bedre — men fordi pølsa må tåle uker på lager og landeveien.',
  'problem.p2_title': 'Lang reise koster penger',
  'problem.p2_text':
    'Toll, transport og to–tre mellomledd som alle skal tjene. Regningen havner hos deg: opp mot 375 kr/kg for en pølse som ble laget på hurtigmetoden.',
  'problem.punchline': 'Du betaler altså mer — for mindre.',

  // Fiyat barı (v5'ten aynen — 375 kr/kg görseli kalıyor)
  'price.bar_import_label': 'Importert sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'rettferdig pris',
  'price.seg_ravare': 'råvare',
  'price.seg_produksjon': 'produksjon',
  'price.seg_transport': 'transport',
  'price.seg_toll': 'toll',
  'price.seg_mellomledd': 'mellomledd',

  // Ata-måten — problemi kökünden çözen tek blok
  'ata.title': 'Ata-måten',
  'ata.intro': 'Vi lager sucuken her i Agder. Da forsvinner hele problemet ved roten:',
  'ata.b1':
    'Ingen lang reise → ingen grunn til tilsetninger. Kort innholdsliste, ekte fermentering og tiden håndverket krever.',
  'ata.b2':
    'Ingen toll, ingen mellomledd → du betaler for råvarer og håndverk, ikke for fordyrende ledd.',
  'ata.outro':
    'Renere og rimeligere er ikke et markedsføringstriks. Det er det som skjer når pølsa lages der den spises.',

  // 3) Hva er sucuk? (mevcut hali iyi, ufak rötuş)
  'whatis.title': 'Hva er sucuk?',
  'whatis.text':
    'Sucuk er en krydret, fermentert tørrpølse av storfe — en klassiker fra det tyrkiske kjøkkenet. Stekt til kantene blir sprø, spises den til frokost: med egg, i brød eller rett fra pannen. Tenk chorizo — men med sitt eget krydderspråk: hvitløk, spisskummen og paprika.',
  'whatis.tag1': 'Til frokost',
  'whatis.tag2': 'På tur',
  'whatis.tag3': 'Med egg',

  // 4) Slik bruker du den (aynen kalıyor)
  'recipes.title': 'Slik bruker du den',
  'recipes.lead': 'Tre enkle måter å nyte sucuk på. Klikk for hele oppskriften.',
  'recipes.cta': 'Les oppskriften →',

  // 5) Innholdslisten — kısaldı, saf kanıt
  'ing.title': 'Hele innholdslisten vår får plass i én setning.',
  'ing.sentence': 'Storfekjøtt. Hvitløk. Krydder. Salt. Starterkultur.',
  'ing.text':
    'Det er alt. Ingen E-numre du må google, ingen fargestoffer, ingen snarveier. Sammenlign gjerne med pakken du har i kjøleskapet.',
  'ing.img_alt': 'Ata Sucuk — kort innholdsliste: storfekjøtt, hvitløk, krydder, salt og starterkultur.',

  // 6) Founder — yüz + somutluk + "ikke et kundesenter"
  'founder.title': 'Hvem står bak?',
  'founder.text':
    'Hei! Vi er en liten familie i Kristiansand. Barna våre elsker sucuk — men den vi fikk kjøpt var dyr, og innholdslisten var full av ting vi måtte google. Som foreldre ville vi ikke velge mellom pris og trygghet. Så vi begynte å lage den selv, hjemme på kjøkkenet: prøvde, justerte og prøvde igjen, til barna ba om mer. Nå letter etter vi erfarne norske produsenter for å lage den i skala — uten å endre en eneste ingrediens.',
  'founder.text2':
    'Har du spørsmål? Send oss en e-post eller ring. Det er oss du får svar fra, ikke et kundesenter.',
  'founder.sign': '— Familien bak Ata Sucuk, Kristiansand',
  'founder.img_alt': 'Familien bak Ata Sucuk',

  // 8) Lansering & levering (hafif rötuş: "smaker først")
  'launch.title': 'Lansering høsten 2026',
  'launch.text':
    'Vi starter i Agder — der leverer vi selv, helt hjem til døra. Resten av landet? Vi sender med posten. Ventelisten smaker først.',
  'launch.tag1': 'Høsten 2026',
  'launch.tag2': 'Agder: levering på døra',
  'launch.tag3': 'Resten av landet: post',

  // 9) Anket + çekiliş — çerçeve: katılım; gavekort "som takk"
  'engine.title': 'Sucuken er ikke ferdig. Du er med og bestemmer.',
  'engine.text':
    'Hvor sterk? Hvor stor pakke? Hva er en riktig pris? Fire spørsmål — to minutter. Svarene dine former oppskriften og produktet vi lanserer.',
  'engine.thanks':
    'Som takk trekker vi tre gavekort à 500 kr blant alle som svarer, 20. august.',
  'engine.button': 'Svar på 4 spørsmål',
  'engine.terms': 'Trekning 20. august 2026 · Vinnerne kontaktes på e-post ·',
  'engine.terms_link': 'Vilkår og personvern',

  // 10) Kapanış CTA
  'cta.title': 'Ekte sucuk er på vei. Vær blant de første.',
  'cta.lead': 'Meld deg på — helt uforpliktende. Du hører fra oss når det er noe å smake.',
  'cta.email_label': 'E-postadresse',
  'cta.email_placeholder': 'Skriv inn e-postadressen din',
  'cta.button': 'Bli med på listen',

  'footer.copy': '© 2026 Ata Sucuk Norge. Alle rettigheter reservert.',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Personvernerklæring',

  'form.sending': 'Sender …',
  'form.ok': 'Sjekk e-posten din for å bekrefte plassen din. 📩',
  'form.already': 'Du er allerede påmeldt. 🎉',
  'form.error': 'Noe gikk galt. Prøv igjen.',
} as const;

export type V7Key = keyof typeof no;

const tr: Partial<Record<V7Key, string>> = {
  'meta.title': 'Ata Sucuk | Gerçek sucuk. Kısa içindekiler listesi. Norveç’te üretim.',
  'meta.description':
    'Dana eti, sarımsak, baharat, tuz ve başlangıç kültürü — başka hiçbir şey. Gerçek yöntemle tam fermente, Norveç’te üretiliyor. Bekleme listesine katıl.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Lansman: 2026 sonbaharı · Bekleme listesine katıl',
  'hero.title_pre': 'Gerçek sucuk. ',
  'hero.title_accent': 'Kısa içindekiler listesi.',
  'hero.title_post': ' Norveç’te üretim.',
  'hero.lead':
    'Dana eti, sarımsak, baharat, tuz ve başlangıç kültürü — başka hiçbir şey. Gerçek yöntemle tam fermente, burada, evimizde. Sınırları ve aracıları aşıp gelmediği için de ithal olandan daha ucuz.',
  'hero.email_label': 'E-posta adresi',
  'hero.email_placeholder': 'E-posta adresiniz',
  'hero.cta': 'İlk tadımlıklar sizin olsun',
  'hero.note': 'Spam yok — sadece hazır olduğumuzda haber veririz.',

  'trust.halal': '%100 Helal',
  'trust.local': 'Norveç’te Üretim',
  'trust.fermented': 'Geleneksel Fermantasyon',

  'problem.title': 'Marketteki sucuk uzun yoldan gelmiş. Bunu hem içindekiler listesinde hem de fiyatta görüyorsun.',
  'problem.lead': 'Norveç’teki sucukların neredeyse tamamı ithal. Ve ithalat, ürünü şekillendiriyor:',
  'problem.p1_title': 'Uzun yol, dayanıklılık ister',
  'problem.p1_text':
    'Bu yüzden gerçek fermantasyon yerine koruyucular, renklendiriciler ve aceleci üretim alırsın. Daha lezzetli olduğu için değil — sucuk haftalarca depoya ve yollara dayanmak zorunda olduğu için.',
  'problem.p2_title': 'Uzun yol, para demek',
  'problem.p2_text':
    'Gümrük, nakliye ve her biri kazanmak isteyen iki-üç aracı. Fatura sana kesiliyor: aceleci yöntemle üretilmiş bir sucuk için kilosu 375 kr’a varan fiyatlar.',
  'problem.punchline': 'Yani daha azına, daha fazla ödüyorsun.',

  'price.bar_import_label': 'İthal sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'adil fiyat',
  'price.seg_ravare': 'hammadde',
  'price.seg_produksjon': 'üretim',
  'price.seg_transport': 'nakliye',
  'price.seg_toll': 'gümrük',
  'price.seg_mellomledd': 'aracı',

  'ata.title': 'Ata yöntemi',
  'ata.intro': 'Sucuğu burada, Agder’de üretiyoruz. Böylece sorun kökünden ortadan kalkıyor:',
  'ata.b1':
    'Uzun yol yok → katkı maddesine gerek yok. Kısa içindekiler listesi, gerçek fermantasyon ve zanaatın gerektirdiği zaman.',
  'ata.b2':
    'Gümrük yok, aracı yok → paran hammaddeye ve emeğe gidiyor; fiyatı şişiren halkalara değil.',
  'ata.outro':
    'Hem daha temiz hem daha uygun fiyatlı olması bir pazarlama numarası değil. Sucuk yendiği yerde üretilince olan şey tam olarak bu.',

  // TR kitle sucuğu zaten bilir — tanım yerine "bizimki nasıl" anlatılır (v5'teki gibi).
  'whatis.title': 'Bizim sucuk nasıl?',
  'whatis.text':
    'Sucuğun ne olduğunu sana anlatacak değiliz — ama bizimkini anlatalım: kaliteli dana etinden, güvenilir içerikle üretilmiş, tam fermente bir sucuk. Kahvaltıda yumurtanın yanında, ekmek arasında ya da doğrudan tavadan… Özlediğin o sucuk, olması gerektiği gibi.',
  'whatis.tag1': 'Kahvaltıda',
  'whatis.tag2': 'Doğada',
  'whatis.tag3': 'Yumurtayla',

  'recipes.title': 'Nasıl yersen daha güzel?',
  'recipes.lead': 'Sucuğun tadını çıkarmanın üç kolay yolu. Tarifin tamamı için karta tıkla.',
  'recipes.cta': 'Tarife git →',

  'ing.title': 'Bütün içindekiler listemiz tek cümleye sığıyor.',
  'ing.sentence': 'Dana eti. Sarımsak. Baharat. Tuz. Başlangıç kültürü.',
  'ing.text':
    'Hepsi bu. Google’lamak zorunda kalacağın E-kodları yok, renklendirici yok, kestirme yol yok. İstersen buzdolabındaki paketle karşılaştır.',
  'ing.img_alt': 'Ata Sucuk — kısa içindekiler listesi: dana eti, sarımsak, baharat, tuz ve başlangıç kültürü.',

  'founder.title': 'Arkasında kim var?',
  'founder.text':
    'Merhaba! Biz Kristiansand’da yaşayan küçük bir aileyiz. Çocuklarımız sucuğa bayılıyor — ama bulabildiklerimiz hem pahalıydı hem de içindekiler listesi Google’lamamız gereken maddelerle doluydu. Ebeveyn olarak fiyatla güven arasında seçim yapmak istemedik. Biz de kendi mutfağımızda üretmeye başladık: denedik, ayarladık, yeniden denedik — çocuklar "bir daha" diyene kadar. Şimdi, tek bir malzemeyi bile değiştirmeden bunu ölçekli üretmek için deneyimli Norveçli üreticilerle çalışıyoruz.',
  'founder.text2':
    'Sorunuz mu var? Bize e-posta atın ya da arayın. Karşınızda bir çağrı merkezi değil, doğrudan biz oluruz.',
  'founder.sign': '— Ata Sucuk’un arkasındaki aile, Kristiansand',
  'founder.img_alt': 'Ata Sucuk’un arkasındaki aile',

  'launch.title': 'Lansman: 2026 sonbaharı',
  'launch.text':
    'İlk durağımız Agder — orada siparişi kapına kadar kendimiz getiriyoruz. Norveç’in geri kalanına kargoyla yolluyoruz. İlk tadım, bekleme listesinin.',
  'launch.tag1': '2026 sonbaharı',
  'launch.tag2': 'Agder: kapıya teslim',
  'launch.tag3': 'Diğer bölgeler: kargo',

  'engine.title': 'Sucuk daha bitmedi. Sen de karar veriyorsun.',
  'engine.text':
    'Ne kadar acılı? Ne kadar büyük paket? Doğru fiyat ne? Dört soru — iki dakika. Cevapların, lansmana çıkacak tarifi ve ürünü şekillendiriyor.',
  'engine.thanks':
    'Teşekkür olarak da 20 Ağustos’ta, yanıt verenler arasından 500 kr değerinde üç hediye çeki çekiyoruz.',
  'engine.button': '4 soruyu yanıtla',
  'engine.terms': 'Çekiliş: 20 Ağustos 2026 · Kazananlara e-postayla haber verilir ·',
  'engine.terms_link': 'Şartlar ve gizlilik',

  'cta.title': 'Gerçek sucuk yolda. İlk tadanlardan ol.',
  'cta.lead': 'Listeye yazıl — hiçbir yükümlülük yok. Tadılacak bir şey olduğunda ilk sen duyarsın.',
  'cta.email_label': 'E-posta adresi',
  'cta.email_placeholder': 'E-posta adresini yaz',
  'cta.button': 'Listeye katıl',

  'footer.copy': '© 2026 Ata Sucuk Norge. Tüm hakları saklıdır.',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Gizlilik bildirimi',

  'form.sending': 'Gönderiliyor …',
  'form.ok': 'E-postana bir onay bağlantısı gönderdik — kontrol et. 📩',
  'form.already': 'Zaten listedesin. 🎉',
  'form.error': 'Bir şeyler ters gitti. Tekrar dener misin?',
};

const en: Partial<Record<V7Key, string>> = {
  'meta.title': 'Ata Sucuk | Real sucuk. A short ingredient list. Made in Norway.',
  'meta.description':
    'Beef, garlic, spices, salt and starter culture — nothing else. Fully fermented the real way, made in Norway. Join the waitlist.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Launching autumn 2026 · Join the waitlist',
  'hero.title_pre': 'Real sucuk. ',
  'hero.title_accent': 'A short ingredient list.',
  'hero.title_post': ' Made in Norway.',
  'hero.lead':
    'Beef, garlic, spices, salt and starter culture — nothing else. Fully fermented the real way, right here at home. And because it never crosses borders or middlemen, it costs less than the imported kind.',
  'hero.email_label': 'Email address',
  'hero.email_placeholder': 'Your email address',
  'hero.cta': 'Be among the first to taste',
  'hero.note': 'No spam — we only email you when we are ready.',

  'trust.halal': '100% Halal',
  'trust.local': 'Made in Norway',
  'trust.fermented': 'Traditionally Fermented',

  'problem.title': 'The sucuk in the shop has travelled far. You can tell — from the ingredient list and the price.',
  'problem.lead': 'Almost all sucuk in Norway is imported. And import shapes the product:',
  'problem.p1_title': 'A long journey demands shelf life',
  'problem.p1_text':
    'That is why you get preservatives, colourings and rushed production instead of real fermentation. Not because it tastes better — but because the sausage has to survive weeks in storage and on the road.',
  'problem.p2_title': 'A long journey costs money',
  'problem.p2_text':
    'Customs, transport and two or three middlemen who all take their cut. The bill lands on you: up to 375 kr/kg for a sausage made the fast way.',
  'problem.punchline': 'So you pay more — for less.',

  'price.bar_import_label': 'Imported sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'a fair price',
  'price.seg_ravare': 'ingredients',
  'price.seg_produksjon': 'production',
  'price.seg_transport': 'transport',
  'price.seg_toll': 'customs',
  'price.seg_mellomledd': 'middlemen',

  'ata.title': 'The Ata way',
  'ata.intro': 'We make our sucuk here in Agder. That removes the whole problem at the root:',
  'ata.b1':
    'No long journey → no reason for additives. A short ingredient list, real fermentation and the time the craft requires.',
  'ata.b2':
    'No customs, no middlemen → you pay for ingredients and craftsmanship, not for extra links in the chain.',
  'ata.outro':
    'Cleaner and cheaper is not a marketing trick. It is what happens when the sausage is made where it is eaten.',

  'whatis.title': 'What is sucuk?',
  'whatis.text':
    'Sucuk is a spiced, fermented dry sausage made from beef — a classic of Turkish cuisine. Fried until the edges turn crispy, it is eaten for breakfast: with eggs, in bread, or straight from the pan. Think chorizo — but with its own language of spices: garlic, cumin and paprika.',
  'whatis.tag1': 'For breakfast',
  'whatis.tag2': 'On a hike',
  'whatis.tag3': 'With eggs',

  'recipes.title': 'How to enjoy it',
  'recipes.lead': 'Three easy ways to enjoy sucuk. Click for the full recipe.',
  'recipes.cta': 'Read the recipe →',

  'ing.title': 'Our entire ingredient list fits in one sentence.',
  'ing.sentence': 'Beef. Garlic. Spices. Salt. Starter culture.',
  'ing.text':
    'That is all. No E-numbers to google, no colourings, no shortcuts. Feel free to compare with the pack in your fridge.',
  'ing.img_alt': 'Ata Sucuk — a short ingredient list: beef, garlic, spices, salt and starter culture.',

  'founder.title': 'Who is behind this?',
  'founder.text':
    'Hi! We are a small family in Kristiansand. Our kids love sucuk — but what we could buy was expensive, and the ingredient list was full of things we had to google. As parents, we did not want to choose between price and peace of mind. So we started making it ourselves, at home in our kitchen: testing, adjusting and testing again, until the kids asked for more. Now we are working with experienced Norwegian producers to make it at scale — without changing a single ingredient.',
  'founder.text2':
    'Questions? Send us an email or give us a call. You will hear back from us — not a call centre.',
  'founder.sign': '— The family behind Ata Sucuk, Kristiansand',
  'founder.img_alt': 'The family behind Ata Sucuk',

  'launch.title': 'Launching autumn 2026',
  'launch.text':
    'We start in Agder — there we deliver to your door ourselves. Rest of Norway? We ship by post. The waitlist gets the first taste.',
  'launch.tag1': 'Autumn 2026',
  'launch.tag2': 'Agder: door delivery',
  'launch.tag3': 'Rest of Norway: post',

  'engine.title': 'The sucuk is not finished yet. You help decide.',
  'engine.text':
    'How spicy? What pack size? What is a fair price? Four questions — two minutes. Your answers shape the recipe and the product we launch.',
  'engine.thanks':
    'As a thank you, we draw three 500 kr gift cards among everyone who answers, on 20 August.',
  'engine.button': 'Answer 4 questions',
  'engine.terms': 'Draw on 20 August 2026 · Winners are contacted by email ·',
  'engine.terms_link': 'Terms & privacy',

  'cta.title': 'Real sucuk is on its way. Be among the first.',
  'cta.lead': 'Sign up — no strings attached. You will hear from us when there is something to taste.',
  'cta.email_label': 'Email address',
  'cta.email_placeholder': 'Enter your email address',
  'cta.button': 'Join the list',

  'footer.copy': '© 2026 Ata Sucuk Norway. All rights reserved.',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Privacy policy',

  'form.sending': 'Sending …',
  'form.ok': 'Check your email to confirm your spot. 📩',
  'form.already': 'You are already on the list. 🎉',
  'form.error': 'Something went wrong. Please try again.',
};

const ar: Partial<Record<V7Key, string>> = {};
const fa: Partial<Record<V7Key, string>> = {};

export const v7ui: Record<Lang, Partial<Record<V7Key, string>>> = { no, tr, en, ar, fa };

export function useV7(lang: Lang) {
  return (key: V7Key): string => v7ui[lang]?.[key] ?? v7ui[defaultLang][key] ?? key;
}
