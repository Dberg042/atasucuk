// Ortak yardımcılar: hata formatı, locale doğrulama, zod helper (specs/SPEC-03).
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import type { Context } from 'hono';

// --- Locale ----------------------------------------------------------------
export const LOCALES = ['tr', 'no', 'en', 'ar', 'fa'] as const;
export type Locale = (typeof LOCALES)[number];
export const localeSchema = z.enum(LOCALES).default('no');

// --- JSON hata formatı -----------------------------------------------------
// Tutarlı gövde: { error: { code, message } }
export function fail(code: string, message: string, status = 400): never {
  throw new HTTPException(status as any, {
    res: new Response(JSON.stringify({ error: { code, message } }), {
      status,
      headers: { 'content-type': 'application/json' },
    }),
  });
}

export function ok<T>(c: Context, data: T, status = 200) {
  return c.json({ data }, status as any);
}

// --- zod gövde doğrulama ---------------------------------------------------
// JSON body'yi şemaya göre parse eder; hata → 400 tutarlı format.
export async function parseBody<S extends z.ZodTypeAny>(
  c: Context,
  schema: S
): Promise<z.infer<S>> {
  let raw: unknown;
  try {
    raw = await c.req.json();
  } catch {
    fail('invalid_json', 'İstek gövdesi geçerli JSON değil.');
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    const first = result.error.issues[0];
    fail('validation_error', `${first.path.join('.')}: ${first.message}`);
  }
  return result.data;
}
