// TÜM DB erişimi bu modülde izole (specs/SPEC-03).
// Taşınabilirlik garantisi: Postgres swap'ı için yalnız bu dosya değişir.
// Lansmanda @supabase/supabase-js (service_role, server-side) kullanılır;
// service_role RLS'i bypass eder — fraud kontrolleri Worker'da yapılır.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Bindings } from './env';

export type Db = SupabaseClient;

export function createDb(env: Bindings): Db {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'x-application-name': 'atasucuk-api' } },
  });
}

// --- Sağlık kontrolü -------------------------------------------------------
// Bağlantıyı doğrular (posts public okunabilir; hafif sorgu).
export async function pingDb(db: Db): Promise<boolean> {
  const { error } = await db.from('posts').select('id', { count: 'exact', head: true });
  return !error;
}

// Proof sayacı (SPEC-10): onaylı toplam abone sayısı (public, yalnız sayı).
export async function countConfirmed(db: Db): Promise<number> {
  const { count, error } = await db
    .from('subscribers')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'confirmed');
  if (error) throw error;
  return count ?? 0;
}

// --- Subscribers (Faz 4: waitlist + double opt-in) -------------------------

export interface NewSubscriber {
  email: string;
  referral_code: string;
  referred_by: string | null;
  locale: string;
  ip_hash: string | null;
  ua_hash: string | null;
  fylke: string | null;
  postnummer: string | null;
  consent: boolean;
}

export interface SubscriberRow {
  id: string;
  email: string;
  status: 'pending' | 'confirmed';
  locale: string | null;
  referral_code: string;
  referred_by: string | null;
}

// E-posta normalize edilmiş (lowercase) gelmeli.
export async function findByEmail(db: Db, email: string): Promise<SubscriberRow | null> {
  const { data, error } = await db
    .from('subscribers')
    .select('id,email,status,locale,referral_code,referred_by')
    .eq('email', email)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function findIdByReferralCode(db: Db, code: string): Promise<string | null> {
  const { data, error } = await db
    .from('subscribers')
    .select('id')
    .eq('referral_code', code)
    .maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}

export async function referralCodeExists(db: Db, code: string): Promise<boolean> {
  const { data, error } = await db
    .from('subscribers')
    .select('id')
    .eq('referral_code', code)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

// Fraud: aynı ip_hash'ten son `sinceIso`'dan beri kaç kayıt (velocity).
export async function countRecentByIpHash(
  db: Db,
  ipHash: string,
  sinceIso: string
): Promise<number> {
  const { count, error } = await db
    .from('subscribers')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', sinceIso);
  if (error) throw error;
  return count ?? 0;
}

// Fraud: self-referral için iki tarafın hash'leri.
export async function getHashes(
  db: Db,
  id: string
): Promise<{ ip_hash: string | null; ua_hash: string | null } | null> {
  const { data, error } = await db
    .from('subscribers')
    .select('ip_hash,ua_hash')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function insertSubscriber(db: Db, s: NewSubscriber): Promise<SubscriberRow> {
  const { data, error } = await db
    .from('subscribers')
    .insert(s)
    .select('id,email,status,locale,referral_code,referred_by')
    .single();
  if (error) throw error;
  return data as SubscriberRow;
}

// pending → confirmed geçişi (idempotent). Zaten confirmed ise null döner.
export async function markConfirmed(
  db: Db,
  id: string
): Promise<{ id: string; referred_by: string | null } | null> {
  const { data, error } = await db
    .from('subscribers')
    .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
    .eq('id', id)
    .eq('status', 'pending')
    .select('id,referred_by')
    .maybeSingle();
  if (error) throw error;
  return data;
}

// --- Survey (Faz 5: anket kısmi kayıt + bağlama) ---------------------------

export type SurveyAnswers = Record<string, string | string[]>;

// session_key başına upsert: her adımda kümülatif cevapları kaydet.
export async function upsertSurveyBySession(
  db: Db,
  sessionKey: string,
  answers: SurveyAnswers,
  locale: string
): Promise<void> {
  const { error } = await db.from('survey_responses').upsert(
    { session_key: sessionKey, answers, locale, updated_at: new Date().toISOString() },
    { onConflict: 'session_key' }
  );
  if (error) throw error;
}

// Kayıt sonunda anketi subscriber'a bağla (yalnız henüz bağlanmamışsa).
export async function linkSurveyToSubscriber(
  db: Db,
  sessionKey: string,
  subscriberId: string
): Promise<void> {
  const { error } = await db
    .from('survey_responses')
    .update({ subscriber_id: subscriberId, updated_at: new Date().toISOString() })
    .eq('session_key', sessionKey)
    .is('subscriber_id', null);
  if (error) throw error;
}

// --- Raffle tickets (Faz 6: iki-taraflı referral) --------------------------
// Davet onaylanınca her iki tarafa birer bilet. unique kısıt → idempotent.
export async function awardReferralTickets(
  db: Db,
  inviterId: string,
  inviteeId: string
): Promise<void> {
  const rows = [
    { subscriber_id: inviterId, source_id: inviteeId },
    { subscriber_id: inviteeId, source_id: inviterId },
  ];
  const { error } = await db
    .from('raffle_tickets')
    .upsert(rows, { onConflict: 'subscriber_id,source_id', ignoreDuplicates: true });
  if (error) throw error;
}

// Kişisel bilet sayısı (subscriber_tickets view — yalnız confirmed sayılır).
// Pending/satır yoksa 0.
export async function countTickets(db: Db, subscriberId: string): Promise<number> {
  const { data, error } = await db
    .from('subscriber_tickets')
    .select('tickets')
    .eq('id', subscriberId)
    .maybeSingle();
  if (error) throw error;
  return data?.tickets ?? 0;
}
