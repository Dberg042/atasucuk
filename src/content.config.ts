import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Uzun formatlı editoryal yazılar (tarif değil) — src/content/blog/*.md.
// Dosya adı deseni: {slug}.{lang}.md — aynı slug farklı dillerde ayrı dosya.
// recipes.ts (kart/tarif tipi içerik) ile ayrı tutulur, BlogIndex + [slug]
// route'larında ikisi birleştirilir.
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    // ID'yi açıkça üretiyoruz: dosya adından türetilen varsayılan id
    // ("sucuk-historie.en" → "sucuk-historieen") sync + build aynı çalışmada
    // iki kez işlendiğinde "duplicate id" uyarısı veriyordu. postSlug+lang
    // hem benzersiz hem okunur.
    generateId: ({ data }) => `${data.postSlug}-${data.lang}`,
  }),
  schema: z.object({
    // "slug" ismi bilinçli kullanılmıyor — Astro glob loader'ı frontmatter'da
    // "slug" alanı gördüğünde onu otomatik entry id'si yapıyor ve aynı postSlug'ı
    // paylaşan no/tr/en dosyaları birbirinin üzerine yazıyordu (duplicate id).
    postSlug: z.string(),
    lang: z.enum(['no', 'tr', 'en']),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    date: z.coerce.date(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
