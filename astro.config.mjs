// @ts-check
import { defineConfig } from 'astro/config';

// Static output: landing tamamen statik, anket island client-side hydrate olur,
// API ayrı Cloudflare Worker'da. Bu yüzden SSR adapter'a gerek yok —
// Cloudflare Pages'e doğrudan static deploy en hızlı/temiz yol.
// (İleride SSR gerekirse @astrojs/cloudflare adapter eklenebilir.)
export default defineConfig({
  site: 'https://atasucuk.no',
  output: 'static',
  i18n: {
    defaultLocale: 'no',
    locales: ['no', 'tr', 'en', 'ar', 'fa'],
    routing: {
      // Varsayılan dil (no) prefix'siz: '/'. Diğerleri '/tr/', '/en/' ...
      prefixDefaultLocale: false,
    },
  },
});
