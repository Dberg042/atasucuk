// Worker ortam değişkenleri (wrangler [vars] + secrets).
// Hono'da c.env üzerinden erişilir.
export interface Bindings {
  // [vars]
  ALLOWED_ORIGIN: string;
  SITE_URL: string;
  // secrets
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  MAIL_FROM: string;
  CONFIRM_TOKEN_SECRET: string;
}
