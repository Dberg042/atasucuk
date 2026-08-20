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

// Toplam kayıt (pending + confirmed). Ana sayfadaki sayaç bunu gösteriyor:
// "şimdiye kadar N kişi kaydoldu". E-posta gönderimi için DEĞİL — oraya yalnız
// countConfirmed() girer (double opt-in tamamlanmayana e-posta atılmaz).
export async function countAll(db: Db): Promise<number> {
  const { count, error } = await db
    .from('subscribers')
    .select('id', { count: 'exact', head: true });
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
  phone: string | null; // isteğe bağlı — ödül/teslimat iletişimi (kimlik değil)
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

// Bilet sayacı için abone durumu (confirmed/pending).
export async function getSubscriberStatus(db: Db, id: string): Promise<string | null> {
  const { data, error } = await db.from('subscribers').select('status').eq('id', id).maybeSingle();
  if (error) throw error;
  return data?.status ?? null;
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
): Promise<{ id: string; referred_by: string | null; referral_code: string } | null> {
  const { data, error } = await db
    .from('subscribers')
    .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
    .eq('id', id)
    .eq('status', 'pending')
    .select('id,referred_by,referral_code')
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Onay dönüş ekranı için (tekrar tıklamada markConfirmed null döner — kodu ayrıca çek).
export async function getReferralCode(db: Db, id: string): Promise<string | null> {
  const { data, error } = await db.from('subscribers').select('referral_code').eq('id', id).maybeSingle();
  if (error) throw error;
  return data?.referral_code ?? null;
}

// Hatırlatma cron'u: 24-72 saat önce kaydolmuş, pending ve henüz hatırlatılmamış aboneler.
export async function findPendingForReminder(
  db: Db,
  fromIso: string,
  toIso: string,
  limit: number
): Promise<{ id: string; email: string; locale: string | null }[]> {
  const { data, error } = await db
    .from('subscribers')
    .select('id,email,locale')
    .eq('status', 'pending')
    .is('reminded_at', null)
    .gte('created_at', fromIso)
    .lte('created_at', toIso)
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function markReminded(db: Db, id: string): Promise<void> {
  const { error } = await db
    .from('subscribers')
    .update({ reminded_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
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

// --- Son çağrı maili (çekiliş öncesi) --------------------------------------
// Hatırlatma cron'undan AYRI: yaş penceresi yok, reminded_at'e bakmaz.
// Kendi damgası (last_call_at) ile idempotent — kimseye iki kez gitmez.
export async function findPendingForLastCall(
  db: Db,
  limit: number
): Promise<{ id: string; email: string; locale: string | null }[]> {
  const { data, error } = await db
    .from('subscribers')
    .select('id,email,locale')
    .eq('status', 'pending')
    .is('last_call_at', null)
    .order('created_at', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function markLastCall(db: Db, id: string): Promise<void> {
  const { error } = await db
    .from('subscribers')
    .update({ last_call_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

// Kaç kişi son çağrı bekliyor (dry-run / ilerleme raporu).
export async function countPendingForLastCall(db: Db): Promise<number> {
  const { count, error } = await db
    .from('subscribers')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending')
    .is('last_call_at', null);
  if (error) throw error;
  return count ?? 0;
}

// --- Çekiliş (denetlenebilir kura) -----------------------------------------
// Katılımcı anlık görüntüsü: onaylı herkes. Bilet = 1 temel + referral biletleri
// (/tickets ucundaki formülün AYNISI — kişiye gösterilen sayı ile çekilişe giren
// sayı ayrışırsa güven biter).
export async function loadRaffleEntries(
  db: Db
): Promise<{ subscriber_id: string; tickets: number }[]> {
  const { data, error } = await db.from('subscriber_tickets').select('id,tickets');
  if (error) throw error;
  return (data ?? []).map((r: { id: string; tickets: number }) => ({
    subscriber_id: r.id,
    tickets: 1 + (r.tickets ?? 0),
  }));
}

export interface DrawRecord {
  seed: string;
  prize_count: number;
  reserve_count: number;
  entrant_count: number;
  ticket_total: number;
  entries_hash: string;
  notes: string | null;
}

export async function insertDraw(db: Db, d: DrawRecord): Promise<{ id: string; drawn_at: string }> {
  const { data, error } = await db.from('raffle_draws').insert(d).select('id,drawn_at').single();
  if (error) throw error;
  return data as { id: string; drawn_at: string };
}

export async function insertDrawEntries(
  db: Db,
  drawId: string,
  entries: { subscriber_id: string; tickets: number }[]
): Promise<void> {
  // Katılımcı listesi binlerce satır olabilir — Supabase istek boyutu için parçala.
  const CHUNK = 500;
  for (let i = 0; i < entries.length; i += CHUNK) {
    const rows = entries.slice(i, i + CHUNK).map((e, j) => ({
      draw_id: drawId,
      subscriber_id: e.subscriber_id,
      tickets: e.tickets,
      position: i + j,
    }));
    const { error } = await db.from('raffle_draw_entries').insert(rows);
    if (error) throw error;
  }
}

export async function insertDrawWinners(
  db: Db,
  drawId: string,
  winners: { subscriber_id: string; rank: number; tickets: number; is_reserve: boolean }[]
): Promise<void> {
  const { error } = await db
    .from('raffle_draw_winners')
    .insert(winners.map((w) => ({ draw_id: drawId, ...w })));
  if (error) throw error;
}

// Sonuç raporu: kazananları e-posta ile birlikte döndür (ödül teslimi için).
export async function getDrawWithWinners(
  db: Db,
  drawId: string
): Promise<{ draw: Record<string, unknown>; winners: Record<string, unknown>[] } | null> {
  const { data: draw, error: e1 } = await db.from('raffle_draws').select('*').eq('id', drawId).maybeSingle();
  if (e1) throw e1;
  if (!draw) return null;

  const { data: rows, error: e2 } = await db
    .from('raffle_draw_winners')
    .select('subscriber_id,rank,tickets,is_reserve,claimed_at,forfeited_at')
    .eq('draw_id', drawId)
    .order('rank', { ascending: true });
  if (e2) throw e2;

  const ids = (rows ?? []).map((r: { subscriber_id: string }) => r.subscriber_id);
  const { data: subs, error: e3 } = await db
    .from('subscribers')
    .select('id,email,phone,locale,fylke')
    .in('id', ids.length ? ids : ['00000000-0000-0000-0000-000000000000']);
  if (e3) throw e3;

  const byId = new Map((subs ?? []).map((s: { id: string }) => [s.id, s]));
  const winners = (rows ?? []).map((r: { subscriber_id: string }) => ({
    ...r,
    ...(byId.get(r.subscriber_id) ?? {}),
  }));
  return { draw, winners };
}

export async function listDraws(db: Db): Promise<Record<string, unknown>[]> {
  const { data, error } = await db
    .from('raffle_draws')
    .select('id,seed,prize_count,entrant_count,ticket_total,entries_hash,drawn_at')
    .order('drawn_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// --- Public çekiliş ekranı --------------------------------------------------
// En son çekiliş (yoksa null). Public ekran buna bakıp "çekildi mi" karar verir.
export async function getLatestDraw(db: Db): Promise<{
  id: string; seed: string; prize_count: number; entrant_count: number;
  ticket_total: number; drawn_at: string;
} | null> {
  const { data, error } = await db
    .from('raffle_draws')
    .select('id,seed,prize_count,entrant_count,ticket_total,drawn_at')
    .order('drawn_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Çekiliş anındaki DONMUŞ katılımcı listesi, position sırasında.
// Public ekran şeridi bundan çizer — canlı veriden değil; yoksa animasyon
// resmi kayıtla ayrışır (çekilişten sonra biri onaylarsa şerit kayardı).
export async function getDrawEntriesOrdered(
  db: Db,
  drawId: string
): Promise<{ subscriber_id: string; tickets: number; position: number }[]> {
  const out: { subscriber_id: string; tickets: number; position: number }[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from('raffle_draw_entries')
      .select('subscriber_id,tickets,position')
      .eq('draw_id', drawId)
      .order('position', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    out.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

// Admin ekranı: tam liste (e-posta dahil). Yalnız token'lı erişim.
export async function loadEntriesWithEmail(
  db: Db
): Promise<{ subscriber_id: string; email: string; tickets: number }[]> {
  const { data: t, error: e1 } = await db.from('subscriber_tickets').select('id,tickets');
  if (e1) throw e1;
  const { data: s, error: e2 } = await db
    .from('subscribers')
    .select('id,email')
    .eq('status', 'confirmed');
  if (e2) throw e2;
  const byId = new Map((s ?? []).map((r: { id: string; email: string }) => [r.id, r.email]));
  return (t ?? [])
    .map((r: { id: string; tickets: number }) => ({
      subscriber_id: r.id,
      email: byId.get(r.id) ?? '',
      tickets: 1 + (r.tickets ?? 0),
    }))
    .sort((a, b) => (a.subscriber_id < b.subscriber_id ? -1 : 1));
}
