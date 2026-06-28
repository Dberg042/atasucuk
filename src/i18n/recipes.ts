// Tarifler (3) — kart önizleme + blog içeriği. NO+TR. Görseller şimdilik gradient placeholder.
import { defaultLang, type Lang } from './ui';

export type L = Partial<Record<Lang, string>>;
export type LA = Partial<Record<Lang, string[]>>;
export const pickL = (m: L, lang: Lang): string => m[lang] ?? m[defaultLang] ?? '';
export const pickA = (m: LA, lang: Lang): string[] => m[lang] ?? m[defaultLang] ?? [];

export interface Recipe {
  slug: string;
  emoji: string;
  tone: 'egg' | 'menemen' | 'toast';
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
    time: { no: '10 min', tr: '10 dk' },
    title: { no: 'Sucuk og egg', tr: 'Sucuklu yumurta' },
    excerpt: {
      no: 'Den enkleste klassikeren — sprøstekt sucuk med egg, klar på fem minutter.',
      tr: 'En basit klasik — kıtır kızarmış sucuk ve yumurta, beş dakikada hazır.',
    },
    ingredients: {
      no: ['6–8 skiver sucuk', '3 egg', 'En klype salt og pepper', 'Brød til servering'],
      tr: ['6–8 dilim sucuk', '3 yumurta', 'Tuz ve karabiber', 'Yanına ekmek'],
    },
    steps: {
      no: [
        'Stek sucukskivene i en tørr panne på middels varme til de blir sprø, ca. 2 min per side.',
        'Knekk eggene rett i pannen mellom skivene.',
        'Stek til hviten har satt seg, dryss på salt og pepper.',
        'Server rykende varmt med brød.',
      ],
      tr: [
        'Sucuk dilimlerini kuru tavada orta ateşte, her yüzü ~2 dk kıtırlaşana dek kızart.',
        'Yumurtaları dilimlerin arasına kır.',
        'Beyazı tutana dek pişir, tuz ve karabiber serp.',
        'Sıcak sıcak, ekmekle servis et.',
      ],
    },
  },
  {
    slug: 'menemen',
    emoji: '🍅',
    tone: 'menemen',
    time: { no: '20 min', tr: '20 dk' },
    title: { no: 'Menemen med sucuk', tr: 'Sucuklu menemen' },
    excerpt: {
      no: 'Tyrkisk eggerøre med tomat, paprika og sucuk — fyldig og smaksrik.',
      tr: 'Domates, biber ve sucuklu Türk usulü yumurta — doyurucu ve lezzetli.',
    },
    ingredients: {
      no: ['8 skiver sucuk', '2 tomater i terninger', '1 grønn spisspaprika', '3 egg', 'Olivenolje, salt'],
      tr: ['8 dilim sucuk', '2 domates (küp)', '1 sivri biber', '3 yumurta', 'Zeytinyağı, tuz'],
    },
    steps: {
      no: [
        'Stek sucuk lett i litt olje, ta opp halvparten til pynt.',
        'Tilsett paprika, stek mykt, så tomat — la putre til saus.',
        'Pisk eggene lett og rør inn, trekk til kremet.',
        'Topp med resten av sucuken og server med brød.',
      ],
      tr: [
        'Sucuğu az yağda hafif kızart, yarısını süs için ayır.',
        'Biberi ekle, yumuşat; domatesi ekle, sos olana dek pişir.',
        'Yumurtaları çırpıp karıştır, kremamsı olana dek pişir.',
        'Kalan sucukla süsle, ekmekle servis et.',
      ],
    },
  },
  {
    slug: 'sucuk-toast',
    emoji: '🥪',
    tone: 'toast',
    time: { no: '12 min', tr: '12 dk' },
    title: { no: 'Sucuk-toast', tr: 'Sucuklu tost' },
    excerpt: {
      no: 'Sprøstekt sucuk og smelteost mellom to brødskiver — perfekt mellommåltid.',
      tr: 'Kıtır sucuk ve eriyen peynir iki dilim ekmek arası — ideal ara öğün.',
    },
    ingredients: {
      no: ['6 skiver sucuk', '4 brødskiver', 'Revet ost', 'Litt smør'],
      tr: ['6 dilim sucuk', '4 dilim ekmek', 'Rendelenmiş peynir', 'Biraz tereyağı'],
    },
    steps: {
      no: [
        'Stek sucuken sprø i panne.',
        'Legg sucuk og ost mellom brødskivene.',
        'Smør utsiden lett og stek i panne til gyllen og ostesmeltet.',
        'Del i to og server varmt.',
      ],
      tr: [
        'Sucuğu tavada kıtırlaştır.',
        'Sucuk ve peyniri ekmek arasına koy.',
        'Dışını hafif yağla, tavada altın rengi olup peynir eriyene dek kızart.',
        'İkiye böl, sıcak servis et.',
      ],
    },
  },
];

export const recipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
export const recipeHref = (lang: Lang, slug: string) =>
  lang === defaultLang ? `/v4/blog/${slug}` : `/v4/${lang}/blog/${slug}`;
