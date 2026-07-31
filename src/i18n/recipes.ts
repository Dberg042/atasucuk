// Tarifler (3) — kart önizleme + blog içeriği. NO+TR. Görseller şimdilik gradient placeholder.
import { defaultLang, type Lang } from './ui';

export type L = Partial<Record<Lang, string>>;
export type LA = Partial<Record<Lang, string[]>>;
export const pickL = (m: L, lang: Lang): string => m[lang] ?? m[defaultLang] ?? '';
export const pickA = (m: LA, lang: Lang): string[] => m[lang] ?? m[defaultLang] ?? [];

export interface Recipe {
  slug: string;
  emoji: string;
  tone: 'egg' | 'pizza' | 'tur';
  image: string;
  time: L;
  title: L;
  excerpt: L;
  ingredients: LA;
  steps: LA;
}

export const recipes: Recipe[] = [
  {
    slug: 'sucuk-og-egg',
    emoji: '🍳',
    tone: 'egg',
    image: '/assets/sucukegg.jpg',
    time: { no: '10 min', tr: '10 dk', en: '10 min' },
    title: { no: 'Sucuk og egg', tr: 'Sucuklu yumurta', en: 'Sucuk and eggs' },
    excerpt: {
      no: 'Den enkleste klassikeren — sprøstekt sucuk med egg, klar på fem minutter.',
      tr: 'Klasiklerin en kolayı — kızarmış sucuk, yanında yumurta; beş dakikada hazır.',
      en: 'The simplest classic — crispy fried sucuk with eggs, ready in five minutes.',
    },
    ingredients: {
      no: ['6–8 skiver sucuk', '3 egg', 'En klype salt og pepper', 'Brød til servering'],
      tr: ['6–8 dilim sucuk', '3 yumurta', 'Tuz ve karabiber', 'Yanına ekmek'],
      en: ['6–8 slices of sucuk', '3 eggs', 'A pinch of salt and pepper', 'Bread for serving'],
    },
    steps: {
      no: [
        'Stek sucukskivene i en tørr panne på middels varme til de blir sprø, ca. 2 min per side.',
        'Knekk eggene rett i pannen mellom skivene.',
        'Stek til hviten har satt seg, dryss på salt og pepper.',
        'Server rykende varmt med brød.',
      ],
      tr: [
        'Sucuk dilimlerini kuru tavada, orta ateşte her iki yüzü de kıtırlaşana kadar (yüz başına ~2 dk) kızart.',
        'Yumurtaları dilimlerin arasına kır.',
        'Beyazı tutana kadar pişir; tuz ve karabiber serp.',
        'Sıcak sıcak, yanında ekmekle servis et.',
      ],
      en: [
        'Fry the sucuk slices in a dry pan over medium heat until crispy, about 2 minutes per side.',
        'Crack the eggs straight into the pan between the slices.',
        'Cook until the whites have set, then season with salt and pepper.',
        'Serve piping hot with bread.',
      ],
    },
  },
  {
    slug: 'sucuk-pizza',
    emoji: '🍕',
    tone: 'pizza',
    image: '/assets/pizzasucuk.jpg',
    time: { no: '15 min', tr: '15 dk', en: '15 min' },
    title: { no: 'Sucukpizza', tr: 'Sucuklu pizza', en: 'Sucuk pizza' },
    excerpt: {
      no: 'To raske måter: legg sucuk oppå en ferdig Grandiosa, eller bygg din egen på pizzabunn med saus, ost og grønnsaker.',
      tr: 'İki pratik yolu var: sucuğu hazır Grandiosa’nın üzerine dizmek, ya da hazır hamurla sosunu, peynirini, sebzesini koyup sıfırdan yapmak.',
      en: 'Two quick ways: top a ready-made Grandiosa with sucuk, or build your own on a pizza base with sauce, cheese and vegetables.',
    },
    ingredients: {
      no: [
        '1 Grandiosa (eller ferdig pizzabunn)',
        '8–10 skiver sucuk',
        'Pizzasaus',
        'Revet ost (mozzarella/gulost)',
        'Paprika, løk og sopp etter smak',
      ],
      tr: [
        '1 Grandiosa (ya da hazır pizza hamuru)',
        '8–10 dilim sucuk',
        'Pizza sosu',
        'Rendelenmiş peynir (mozzarella/kaşar)',
        'Biber, soğan, mantar (isteğe göre)',
      ],
      en: [
        '1 Grandiosa (or a ready-made pizza base)',
        '8–10 slices of sucuk',
        'Pizza sauce',
        'Grated cheese (mozzarella or gouda)',
        'Pepper, onion and mushrooms to taste',
      ],
    },
    steps: {
      no: [
        'Rask variant: legg sucukskiver utover en ferdig Grandiosa og stek etter anvisningen på pakken.',
        'Egen variant: smør pizzasaus på bunnen og strø over rikelig med ost.',
        'Fordel sucuk, paprika, løk og sopp på toppen.',
        'Stek på 225 °C til bunnen er sprø og osten gyllen, ca. 12–15 min.',
      ],
      tr: [
        'Pratik yol: sucuk dilimlerini hazır Grandiosa’nın üzerine diz, paketteki süreye göre pişir.',
        'Kendin yapacaksan: hamura pizza sosunu sür, üzerine bolca peynir serp.',
        'Sucuğu, biberi, soğanı ve mantarı üzerine yay.',
        '225 derece fırında, taban kıtırlaşıp peynir kızarana kadar ~12–15 dk pişir.',
      ],
      en: [
        'Quick version: spread sucuk slices over a ready-made Grandiosa and bake as instructed on the packet.',
        'Your own version: spread pizza sauce on the base and add plenty of cheese.',
        'Top with sucuk, pepper, onion and mushrooms.',
        'Bake at 225 °C until the base is crispy and the cheese golden, about 12–15 minutes.',
      ],
    },
  },
  {
    slug: 'sucuk-polsebrod',
    emoji: '🌭',
    tone: 'tur',
    image: '/assets/outdoor.webp',
    time: { no: '10 min', tr: '10 dk', en: '10 min' },
    title: { no: 'Sucuk i pølsebrød', tr: 'Doğada sucuklu ekmek', en: 'Sucuk in a hot dog bun' },
    excerpt: {
      no: 'Perfekt på tur: skjær sucuken i lengderetningen, stek på stormkjøkken eller bål, og legg i pølsebrød med ketchup og sprøstekt løk.',
      tr: 'Doğa yürüyüşünün klasiği: sucuğu boydan kes, kamp ocağında ya da ateşte pişir; sosisli ekmeğine koy, ketçabını ve kızarmış soğanını ekle.',
      en: 'Perfect for a hike: slice the sucuk lengthwise, grill it on a camping stove or over a fire, and serve in a hot dog bun with ketchup and crispy onions.',
    },
    ingredients: {
      no: ['1 hel sucuk', 'Pølsebrød', 'Ketchup', 'Sprøstekt løk', 'Sennep etter smak'],
      tr: ['1 bütün sucuk', 'Sosisli ekmeği', 'Ketçap', 'Kızarmış soğan (sprøstekt løk)', 'İsteğe göre hardal'],
      en: ['1 whole sucuk', 'Hot dog buns', 'Ketchup', 'Crispy fried onions', 'Mustard to taste'],
    },
    steps: {
      no: [
        'Skjær sucuken i to på langs så den ligger flatt.',
        'Stek på stormkjøkken eller over bål til den er sprø og gjennomvarm.',
        'Legg sucuken i et pølsebrød.',
        'Topp med ketchup og sprøstekt løk — klar til å spises.',
      ],
      tr: [
        'Sucuğu boydan ikiye kes ki düz dursun.',
        'Kamp ocağında ya da ateşin üzerinde, kıtırlaşıp iyice ısınana kadar pişir.',
        'Sucuğu sosisli ekmeğinin arasına yerleştir.',
        'Üzerine ketçap ve kızarmış soğan — afiyet olsun.',
      ],
      en: [
        'Slice the sucuk in half lengthwise so it lies flat.',
        'Grill on a camping stove or over a fire until crispy and heated through.',
        'Place the sucuk in a hot dog bun.',
        'Top with ketchup and crispy onions — ready to eat.',
      ],
    },
  },
];

export const recipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
// Blog kökte yaşar (v5 ana sayfa oldu): /blog/… ve /tr/blog/…
export const recipeHref = (lang: Lang, slug: string) =>
  lang === defaultLang ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
export const blogHref = (lang: Lang) => (lang === defaultLang ? '/blog' : `/${lang}/blog`);
