// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output: landing tamamen statik, anket island client-side hydrate olur,
// API ayrı Cloudflare Worker'da. Bu yüzden SSR adapter'a gerek yok —
// Cloudflare Pages'e doğrudan static deploy en hızlı/temiz yol.
// (İleride SSR gerekirse @astrojs/cloudflare adapter eklenebilir.)
export default defineConfig({
  site: 'https://atasucuk.no',
  output: 'static',
  integrations: [
    sitemap({
      // ar/fa içerik NO'ya düştüğü için (bkz. i18n/ui.ts) duplicate content —
      // sitemap'e dahil edilmiyor, hreflang kapsamıyla tutarlı (Base.astro).
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.startsWith('/ar/') && !path.startsWith('/fa/');
      },
    }),
  ],
  i18n: {
    defaultLocale: 'no',
    locales: ['no', 'tr', 'en', 'ar', 'fa'],
    routing: {
      // Varsayılan dil (no) prefix'siz: '/'. Diğerleri '/tr/', '/en/' ...
      prefixDefaultLocale: false,
    },
  },
});
