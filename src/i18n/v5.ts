// v5 (revidert v4-innhold) — ANA SİTEDEN AYRI.
// v4'e göre değişenler: fiyat konumlandırması "uten høy pris / rettferdig pris"
// (somut rakam ve "importpris" yok), sertifika cümlesi kaldırıldı, offer bölümü
// lansman/teslimat bölümüne dönüştürüldü (tekrar azaltma), founder foto+imza,
// footer'da iletişim + personvern, çekiliş: 3 × 500 kr, trekning 20. august 2026.
import { defaultLang, type Lang } from './ui';

const no = {
  'meta.title': 'Ata Sucuk | Ekte, fullfermentert halal sucuk — laget i Norge',
  'meta.description':
    'Ekte, fullfermentert sucuk laget i Norge — rene råvarer og en rettferdig pris. Bli med på ventelisten og vær med å forme produktet.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Lansering høsten 2026 · Bli med på ventelisten',
  'hero.title_top': 'Ekte, fermentert sucuk',
  'hero.title_pre': 'Rettferdig pris',
  'hero.title_accent': 'Kort innholdsliste',
  'hero.title_post': '-Laget i Norge-',
  'hero.lead':
    'Storfekjøtt, hvitløk, krydder, salt og starterkultur. <strong>Tradisjonell fermentering</strong> på ekte vis, her hjemme. Og fordi den ikke krysser grenser og mellomledd, <strong>koster den mindre</strong> enn importert.',
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

  // Problem — tek zincir (v7 kurgusu): import → katkı VE fiyat
  'problem.title': 'Sucuken i butikken har reist langt. Det ser du på både innholdslisten og prisen.',
  'problem.lead': 'Nesten all sucuk i Norge er importert. Og import former produktet:',
  'problem.p1_title': 'Lang reise krever holdbarhet',
  'problem.p1_text':
    'Derfor får du konserveringsmidler, fargestoffer og hurtigproduksjon i stedet for ekte fermentering. Ikke fordi det smaker bedre — men fordi pølsa må tåle uker på lager og landeveien.',
  'problem.p2_title': 'Lang reise koster penger',
  'problem.p2_text':
    'Toll, transport og to–tre mellomledd som alle skal tjene. Regningen havner hos deg: opp mot 375 kr/kg for en pølse som ble laget på hurtigmetoden.',
  'problem.punchline': 'Du betaler altså mer — for mindre.',
  'ata.title': 'Ata-måten',
  'ata.intro': 'Vi lager sucuken her i Agder. Da forsvinner hele problemet ved roten:',
  'ata.b1':
    'Ingen lang reise → ingen grunn til tilsetninger. Kort innholdsliste, ekte fermentering og tiden håndverket krever.',
  'ata.b2':
    'Ingen toll, ingen mellomledd → du betaler for råvarer og håndverk, ikke for fordyrende ledd.',
  'ata.outro':
    'Renere og rimeligere er ikke et markedsføringstriks. Det er det som skjer når pølsa lages der den spises.',

  'clean.title': 'Stoler du på det du spiser?',
  'clean.lead':
    'Mange sucuk-typer i Norge er fulle av tilsetninger, fargestoffer — og hurtigproduksjon. Vi tar tiden ekte fermentering krever, og holder innholdslisten så kort som mulig.',
  'clean.import_title': 'Importert (typisk)',
  'clean.import_text': 'Lang innholdsliste, konserveringsmidler, fargestoffer, E-stoffer du ikke kjenner igjen.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Storfekjøtt fra Norge, hvitløk, krydder, salt, starterkultur. Ingenting annet.',
  'clean.img_alt': 'Ata Sucuk — kort innholdsliste: storfekjøtt, hvitløk, krydder, salt og starterkultur.',

  // İçindekiler — saf kanıt, tek cümle (v7 kurgusu)
  'ing.title': 'Hele innholdslisten vår får plass i én setning.',
  'ing.sentence': 'Storfekjøtt. Hvitløk. Krydder. Salt. Starterkultur.',
  'ing.text':
    'Det er alt. Ingen E-numre du må google, ingen fargestoffer, ingen snarveier. Sammenlign gjerne med pakken du har i kjøleskapet.',
  'ing.img_alt': 'Ata Sucuk — kort innholdsliste: storfekjøtt, hvitløk, krydder, salt og starterkultur.',

  // Lansman + teslimat (v4'teki offer bölümünün yerine — tekrar yerine yeni bilgi)
  'launch.title': 'Lansering høsten 2026',
  'launch.text':
    'Vi planlegger å starte i Agder. Her leverer vi selv helt hjem til døra. Til resten av Norge planlegger vi å sende med posten eller via samarbeidspunktene våre. Ventelisten får smake først.',
  'launch.tag1': 'Høsten 2026',
  'launch.tag2': 'Agder: levering på døra',
  'launch.tag3': 'Resten av Norge: post eller samarbeidspunkter',

  'founder.title': 'Gründerne',
  'founder.text':
    'Hei! Vi er David og Ashley, en liten familie i Kristiansand. Barna våre elsker sucuk, men sucuk i Norge var både dyrt og innholdet føltes ikke helt riktig for oss. Som foreldre ville vi ikke velge mellom pris og trygghet. Så vi begynte å lage den hjemme, på vårt eget kjøkken: vi prøvde, testet og prøvde igjen, helt til barna ville ha mer. Nå skal vi jobbe med erfarne norske produsenter for å lage den i større skala, uten å endre innholdet.',
  'founder.text2':
    'Har du spørsmål? Send oss en e-post eller ring. Svaret får du direkte fra oss, ikke fra et kundesenter.',
  'founder.sign': 'Familien bak Ata Sucuk, Kristiansand',
  'founder.img_alt': 'Familien bak Ata Sucuk',

  'proof.title': 'Vi er i oppstartsfasen — og vi mener alvor',
  'proof.counter_pre': 'Allerede',
  'proof.counter_post': 'på ventelisten — og listen vokser hver uke.',
  'proof.p1': 'Vi spør før vi lager. Fire spørsmål former oppskriften, prisen og produktet.',
  'proof.p2': 'Full åpenhet. Du ser innholdet og prosessen — ingenting skjult.',
  'proof.p3': 'Vi gjør grundige undersøkelser, snakker med erfarne produsenter og ønsker å lage Europas beste sucuk her i Norge.',

  'engine.title': 'Sucuken er ikke ferdig. Du er med og bestemmer.',
  'engine.text':
    'Hvor sterk? Hvor stor pakke? Hva er en riktig pris? Fire spørsmål —30 sekunder. Svarene dine former oppskriften og produktet vi lanserer.',
  'engine.thanks':
    'Som takk trekker vi tre gavekort à 500 kr blant alle som svarer, 20. august.',
  'engine.button': 'Svar på 4 spørsmål',
  'engine.terms': 'Trekning 20. august 2026 · Vinnerne kontaktes på e-post ·',
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

  'cta.title': 'Ekte sucuk er på vei. Vær blant de første.',
  'cta.lead':
    'Meld deg på — helt uforpliktende. Du hører fra oss når det er noe å smake.',
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
    'Norveç’te üretilen gerçek, tam fermente sucuk: sade içerik, adil fiyat. Bekleme listesine katıl, ürünü birlikte şekillendirelim.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': '2026 sonbaharında çıkıyor · Bekleme listesine katıl',
  'hero.title_top': 'Gerçek, fermente sucuk',
  'hero.title_pre': 'Adil fiyat',
  'hero.title_accent': 'Sade içerik',
  'hero.title_post': 'Norveç’te üretiliyor',
  'hero.lead':
    'Dana eti, sarımsak, baharat, tuz ve maya. Gerçek usulle, <strong>geleneksel fermantasyonla</strong> burada, Norveç’te üretiliyor. Sınır aşmadığı, aracı dolaşmadığı için de ithal sucuğa göre <strong>daha uygun fiyatlı</strong>.',
  'hero.email_label': 'E-posta adresi',
  'hero.email_placeholder': 'E-posta adresin',
  'hero.cta': 'İlk tadanlardan ol',
  'hero.note': 'Spam yok. Sadece hazır olduğumuzda haber veririz.',
  'hero.survey_trigger': '4 soruyu cevapla, 500 kr hediye çeki kazanma şansı yakala',
  'hero.waitlist_heading': 'Ya da bekleme listesine katıl',

  'trust.halal': '%100 Helal',
  'trust.local': 'Norveç’te Üretim',
  'trust.fermented': 'Geleneksel Fermantasyon',

  'price.title': 'Norveç’te sucuk neden bu kadar pahalı?',
  'price.lead':
    'Bugün aldığın sucuk, sofrana gelene kadar uzun yol yapıyor ve birkaç kez el değiştiriyor. Gümrük, nakliye ve iki-üç aracı derken maliyet daha sana ulaşmadan büyüyor. Bizce sen daha iyisini hak ediyorsun.',
  'price.today_title': 'Bugün durum böyle',
  'price.today_1': 'İthal geliyor, üstüne yüksek gümrük biniyor',
  'price.today_2': 'İki-üç aracı, her biri kendi payını ekliyor',
  'price.today_3': 'Markete gelmeden önce haftalarca depoda bekliyor',
  'price.today_4': 'Lezzetten ödün veren hızlı üretim tercih ediliyor',
  'price.ata_title': 'Ata yöntemi',
  'price.ata_1': 'Norveç’te üretiliyor. Gümrük yok, aracı yok',
  'price.ata_2': 'Taze. Doğrudan bizden sana',
  'price.ata_3': 'Paran şişen maliyetlere değil, malzemeye ve emeğe gidiyor',
  'price.ata_4': 'Zaman ve gelenek. Kestirme yol yok',
  'price.bar_import_label': 'İthal sucuk',
  'price.bar_import_value': '~375 kr/kg',
  'price.bar_import_parts': 'hammadde + gümrük + nakliye + aracılar',
  'price.bar_ata_label': 'Ata Sucuk',
  'price.bar_ata_value': 'adil fiyat',
  'price.bar_ata_parts': 'hammadde + yerel üretim',

  'problem.title': 'Marketteki sucuk uzun yoldan geliyor. Bunu hem içindekiler listesinde hem de fiyatında görüyorsun.',
  'problem.lead': 'Norveç’te satılan sucukların neredeyse tamamı ithal. İthalat da ürünün kendisini değiştiriyor:',
  'problem.p1_title': 'Uzun yol, raf ömrü ister',
  'problem.p1_text':
    'Bu yüzden gerçek fermantasyonun yerini koruyucular, renklendiriciler ve hızlı üretim alıyor. Daha lezzetli olduğu için değil, sucuk haftalarca depoya ve yola dayanmak zorunda olduğu için.',
  'problem.p2_title': 'Uzun yol, yüksek maliyet demek',
  'problem.p2_text':
    'Gümrük, nakliye ve iki-üç aracı, hepsi fiyata ekleniyor. Son hesap sana kalıyor: hızlı yöntemle üretilmiş bir sucuk için kilosu 375 kr’a varan fiyatlar.',
  'problem.punchline': 'Kısacası: daha azına daha çok ödüyorsun.',
  'ata.title': 'Ata yöntemi',
  'ata.intro': 'Biz sucuğu burada, Agder’de üretiyoruz. Böylece sorun kökünden çözülüyor:',
  'ata.b1':
    'Uzun yol yok → katkı için sebep yok. Sade içerik, gerçek fermantasyon ve zaman.',
  'ata.b2':
    'Gümrük yok, aracı yok → paran malzemeye ve emeğe gidiyor; fiyatı şişiren halkalara değil.',
  'ata.outro':
    'Daha sade ve daha uygun fiyatlı olması bir pazarlama numarası değil. Sucuk yenildiği yerde üretilince sonuç bu oluyor.',

  'clean.title': 'Yediğine güveniyor musun?',
  'clean.lead':
    'Norveç’te satılan birçok sucuk katkı maddesi ve renklendirici dolu. Üstelik hızlı üretiliyor. Biz gerçek fermantasyona gereken zamanı veriyoruz ve içindekiler listesini olabildiğince kısa tutuyoruz.',
  'clean.import_title': 'İthal (tipik)',
  'clean.import_text': 'Uzun bir içerik listesi: koruyucular, renklendiriciler, tanımadığın E-kodları.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Norveç dana eti, sarımsak, baharat, tuz, maya. Başka hiçbir şey.',
  'clean.img_alt': 'Ata Sucuk: sade içerik listesi, dana eti, sarımsak, baharat, tuz ve maya.',

  'ing.title': 'İçindekiler listemizin tamamı tek cümleye sığıyor.',
  'ing.sentence': 'Dana eti. Sarımsak. Baharat. Tuz. Maya.',
  'ing.text':
    'Hepsi bu. Google’da araman gereken E-kodları yok, renklendirici yok, kestirme yol yok. İstersen buzdolabındaki paketle karşılaştır.',
  'ing.img_alt': 'Ata Sucuk: sade içerik listesi, dana eti, sarımsak, baharat, tuz ve maya.',

  'launch.title': '2026 sonbaharında çıkıyor',
  'launch.text':
    'Agder’den başlamayı planlıyoruz. Burada kapıya teslimi kendimiz yapacağız. Norveç’in geri kalanına postayla ya da aracı noktalarımız üzerinden ulaştırmayı planlıyoruz. İlk tadım hakkı bekleme listesinde.',
  'launch.tag1': '2026 sonbaharı',
  'launch.tag2': 'Agder: kapıya teslim',
  'launch.tag3': 'Norveç’in kalanı: posta',

  'founder.title': 'Kurucular',
  'founder.text':
    'Merhaba! Biz Davud ve Aslı, Kristiansand’da yaşayan küçük bir aileyiz. Çocuklarımız sucuğu çok seviyor; ama sucuk Norveç’te hem maliyetli hem de içerik olarak içimize tam sinmiyordu. Anne baba olarak fiyatla iç rahatlığı arasında seçim yapmak istemedik. Biz de evde, kendi mutfağımızda yapmaya başladık: denedik, test ettik, tekrar denedik; çocuklar yeniden isteyene kadar. Şimdi aynı içeriği hiç değiştirmeden daha büyük ölçekte üretebilmek için deneyimli Norveçli üreticilerle çalışacağız.',
  'founder.text2':
    'Sorun mu var? Bize e-posta at ya da ara. Cevabı bir çağrı merkezinden değil, doğrudan bizden alırsın.',
  'founder.sign': 'Ata Sucuk’un arkasındaki aile, Kristiansand',
  'founder.img_alt': 'Ata Sucuk’un arkasındaki aile',

  'proof.title': 'Daha yolun başındayız, ama niyetimiz ciddi',
  'proof.counter_pre': 'Şimdiden',
  'proof.counter_post': 'kişi listede. Liste her hafta büyüyor.',
  'proof.p1': 'Üretmeden önce soruyoruz. Dört soru; tarifi, fiyatı ve ürünü şekillendiriyor.',
  'proof.p2': 'Tam şeffaflık. İçeriği ve süreci göreceksin, saklı bir şey yok.',
  'proof.p3': 'Detaylı araştırma yapıyor, deneyimli üreticilerle görüşüyor ve Avrupa’nın en iyi sucuğunu burada, Norveç’te üretmek istiyoruz.',

  'engine.title': 'Sucuk henüz son halini almadı. Kararda sen de varsın.',
  'engine.text':
    'Ne kadar acılı olsun? Paket kaç gram olsun? Doğru fiyat ne? Dört soru, 30 saniye. Cevapların, lansmanda çıkacak tarifi ve ürünü şekillendiriyor.',
  'engine.thanks':
    'Teşekkür olarak 20 Ağustos’ta, cevap verenler arasından üç adet 500 kr hediye çeki çekiyoruz.',
  'engine.button': '4 soruyu cevapla',
  'engine.terms': 'Çekiliş: 20 Ağustos 2026 · Kazananlara e-postayla haber verilir ·',
  'engine.terms_link': 'Şartlar ve gizlilik',

  'price.seg_ravare': 'hammadde',
  'price.seg_produksjon': 'üretim',
  'price.seg_transport': 'nakliye',
  'price.seg_toll': 'gümrük',
  'price.seg_mellomledd': 'aracı',

  'whatis.title': 'Fermente sucuk nedir?',
  'whatis.text':
    'Fermente sucuk, aceleye getirilmeden olgunlaştırılan sucuktur. Yoğurt mayalamaya benzer: sucuk yaklaşık 72 saat fermente olur, ardından dinlenmeye bırakılır. Bu süreç geleneksel tadı ortaya çıkarır; lezzeti derinleşir, kıvamı oturur. Böylece ekstra kıvam artırıcıya veya gereksiz koruyucuya ihtiyaç duymadan güvenilir ve lezzetli bir sucuk elde edilir.',
  'whatis.tag1': 'Kahvaltıda',
  'whatis.tag2': 'Doğada',
  'whatis.tag3': 'Yumurtayla',

  'recipes.title': 'Nasıl yenir?',
  'recipes.lead': 'Sucuğun tadını çıkarmanın üç kolay yolu. Tarifin tamamı için karta tıkla.',
  'recipes.cta': 'Tarifi oku →',

  'cta.title': 'Gerçek sucuk yolda. İlk tadanlardan ol.',
  'cta.lead':
    'Listeye katıl. Hiçbir yükümlülük yok. Tadılacak bir şey olduğunda ilk sen duyarsın.',
  'cta.email_label': 'E-posta adresi',
  'cta.email_placeholder': 'E-posta adresin',
  'cta.button': 'Listeye katıl',

  'footer.copy': '© 2026 Ata Sucuk Norge. Tüm hakları saklıdır.',
  'footer.contact_title': 'İletişim',
  'footer.email': 'info@atasucuk.no',
  'footer.phone': '+47 461 25 025',
  'footer.privacy': 'Gizlilik bildirimi',

  'form.sending': 'Gönderiliyor …',
  'form.ok': 'Yerini onaylamak için e-postanı kontrol et. 📩',
  'form.already': 'Zaten listedesin. 🎉',
  'form.error': 'Bir şeyler ters gitti. Tekrar dener misin?',
};

const en: Partial<Record<V5Key, string>> = {
  'meta.title': 'Ata Sucuk | Real, fully fermented halal sucuk — made in Norway',
  'meta.description':
    'Real, fully fermented sucuk made in Norway — clean ingredients and a fair price. Join the waitlist and help shape the product.',

  'nav.brand': 'Ata Sucuk',

  'hero.badge': 'Launching autumn 2026 · Join the waitlist',
  'hero.title_top': 'Real, fermented sucuk',
  'hero.title_pre': 'A fair price',
  'hero.title_accent': 'A short ingredient list',
  'hero.title_post': 'Made in Norway',
  'hero.lead':
    'Beef, garlic, spices, salt and starter culture. <strong>Truly fermented</strong> the real way, right here at home. And because it never crosses borders or middlemen, it <strong>costs less</strong> than the imported kind.',
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

  'problem.title': 'The sucuk in the shop has travelled far. You can tell — from the ingredient list and the price.',
  'problem.lead': 'Almost all sucuk in Norway is imported. And import shapes the product:',
  'problem.p1_title': 'A long journey demands shelf life',
  'problem.p1_text':
    'That is why you get preservatives, colourings and rushed production instead of real fermentation. Not because it tastes better — but because the sausage has to survive weeks in storage and on the road.',
  'problem.p2_title': 'A long journey costs money',
  'problem.p2_text':
    'Customs, transport and two or three middlemen who all take their cut. The bill lands on you: up to 375 kr/kg for a sausage made the fast way.',
  'problem.punchline': 'So you pay more — for less.',
  'ata.title': 'The Ata way',
  'ata.intro': 'We make our sucuk here in Agder. That removes the whole problem at the root:',
  'ata.b1':
    'No long journey → no reason for additives. A short ingredient list, real fermentation and the time the craft requires.',
  'ata.b2':
    'No customs, no middlemen → you pay for ingredients and craftsmanship, not for extra links in the chain.',
  'ata.outro':
    'Cleaner and cheaper is not a marketing trick. It is what happens when the sausage is made where it is eaten.',

  'clean.title': 'Do you trust what you eat?',
  'clean.lead':
    'Much of the sucuk sold in Norway is full of additives and colourings — and made in a hurry. We give real fermentation the time it needs, and keep the ingredient list as short as possible.',
  'clean.import_title': 'Imported (typical)',
  'clean.import_text': 'A long ingredient list: preservatives, colourings, E-numbers you do not recognise.',
  'clean.ata_title': 'Ata Sucuk',
  'clean.ata_text': 'Norwegian beef, garlic, spices, salt, starter culture. Nothing else.',
  'clean.img_alt': 'Ata Sucuk — a short ingredient list: beef, garlic, spices, salt and starter culture.',

  'ing.title': 'Our entire ingredient list fits in one sentence.',
  'ing.sentence': 'Beef. Garlic. Spices. Salt. Starter culture.',
  'ing.text':
    'That is all. No E-numbers to google, no colourings, no shortcuts. Feel free to compare with the pack in your fridge.',
  'ing.img_alt': 'Ata Sucuk — a short ingredient list: beef, garlic, spices, salt and starter culture.',

  'launch.title': 'Launching autumn 2026',
  'launch.text':
    'We plan to start in Agder. There, we will deliver to your door ourselves. For the rest of Norway, we plan to ship by post or through our partner points. The waitlist gets the first taste.',
  'launch.tag1': 'Autumn 2026',
  'launch.tag2': 'Agder: door delivery',
  'launch.tag3': 'Rest of Norway: post or partner points',

  'founder.title': 'The founders',
  'founder.text':
    'Hi! We are David and Ashley, a small family in Kristiansand. Our kids love sucuk, but sucuk in Norway was expensive, and the ingredients did not feel quite right to us. As parents, we did not want to choose between price and peace of mind. So we started making it at home, in our own kitchen: testing, tasting and trying again until the kids wanted more. Now we will work with experienced Norwegian producers to make it at a larger scale, without changing the ingredients.',
  'founder.text2':
    'Questions? Send us an email or give us a call. The answer will come directly from us, not from a call centre.',
  'founder.sign': 'David and Ashley, the family behind Ata Sucuk, Kristiansand',
  'founder.img_alt': 'The family behind Ata Sucuk',

  'proof.title': 'We are just getting started — and we mean it',
  'proof.counter_pre': 'Already',
  'proof.counter_post': 'on the waitlist — and it grows every week.',
  'proof.p1': 'We ask before we make. Four questions shape the recipe, the price and the product.',
  'proof.p2': 'Full transparency. You see the ingredients and the process — nothing hidden.',
  'proof.p3': 'We are conducting deep research, consulting with experienced producers, and aiming to produce Europe’s best sucuk right here in Norway.',

  'engine.title': 'The sucuk is not finished yet. You help decide.',
  'engine.text':
    'How spicy? What pack size? What is a fair price? Four questions — tw minutes. Your answers shape the recipe and the product we launch.',
  'engine.thanks':
    'As a thank you, we draw three 500 kr gift cards among everyone who answers, on 20 August.',
  'engine.button': 'Answer 4 questions',
  'engine.terms': 'Draw on 20 August 2026 · Winners are contacted by email ·',
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

  'cta.title': 'Real sucuk is on its way. Be among the first.',
  'cta.lead':
    'Sign up — no strings attached. You will hear from us when there is something to taste.',
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
