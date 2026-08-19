// Çekiliş çekirdeği — SAF fonksiyonlar, DB/ağ yok (bilerek: test edilebilir ve
// bağımsız olarak yeniden hesaplanabilir olsun diye; bkz. scripts/verify_draw.mjs).
//
// TASARIM KARARI — "rastgele" değil, "seed'den türetilmiş":
// Math.random() ile çekilen bir kura sonradan DOĞRULANAMAZ; katılımcıya
// "sonucu sonradan uydurmadık" diyebilmenin tek yolu, çıktının herkese açık
// bir girdiden deterministik olarak üretilmesi. Burada:
//     kazanan_k = HMAC-SHA256(seed, "draw:k") mod (kalan bilet sayısı)
// Seed çekilişten SONRA yayımlanır; anlık katılımcı görüntüsü de saklanır
// (raffle_draw_entries). İkisiyle birlikte herkes aynı sonucu yeniden üretir.
//
// SEED NEREDEN GELİR: çekilişten önce kimsenin bilemeyeceği, sonradan herkesin
// kontrol edebileceği herkese açık bir değer olmalı. Bkz. docs/cekilis-mantigi.md.

const enc = new TextEncoder();

export interface Entry {
  subscriber_id: string;
  tickets: number;
}

export interface Winner {
  subscriber_id: string;
  rank: number; // 1..prizeCount = asıl kazanan, sonrası yedek
  tickets: number;
  is_reserve: boolean;
}

export interface DrawResult {
  winners: Winner[];
  entries: Entry[];      // sıralanmış, donmuş anlık görüntü
  entrant_count: number;
  ticket_total: number;
  entries_hash: string;
}

// Katılımcı sırası sonucu etkiler → deterministik olmak ZORUNDA.
// subscriber_id (uuid) artan: DB'nin satır döndürme sırasından bağımsız.
export function normalizeEntries(entries: Entry[]): Entry[] {
  return entries
    .filter((e) => e.tickets > 0)
    .slice()
    .sort((a, b) => (a.subscriber_id < b.subscriber_id ? -1 : a.subscriber_id > b.subscriber_id ? 1 : 0));
}

// Anlık görüntünün parmak izi. Çekilişten sonra yayımlanır: listeyi sonradan
// değiştirmediğimizi kanıtlar (aynı liste → aynı hash).
export async function hashEntries(entries: Entry[]): Promise<string> {
  const canonical = entries.map((e) => `${e.subscriber_id}:${e.tickets}`).join('\n');
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(canonical));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// HMAC-SHA256(seed, label) → ilk 8 bayt → big-endian uint64.
async function derive(seed: string, label: string): Promise<bigint> {
  const key = await crypto.subtle.importKey('raw', enc.encode(seed), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(label)));
  let n = 0n;
  for (let i = 0; i < 8; i++) n = (n << 8n) | BigInt(sig[i]);
  return n;
}

// Modulo bias'ı at: 2^64'ün kalan havuzuna tam bölünmeyen üst kuyruğunu
// reddedip bir sonraki türetmeye geç. Pratikte tur sayısı ~1, ama bileti çok
// olanın lehine/aleyhine milimetrik sapma bırakmamak için doğrusu bu.
const U64 = 1n << 64n;

async function pickIndex(seed: string, label: string, total: number): Promise<number> {
  const t = BigInt(total);
  const limit = U64 - (U64 % t); // [0, limit) tam bölünür → bias yok
  for (let attempt = 0; attempt < 100; attempt++) {
    const n = await derive(seed, `${label}#${attempt}`);
    if (n < limit) return Number(n % t);
  }
  throw new Error('draw_derive_exhausted'); // istatistiksel olarak imkansız
}

/**
 * Bilet ağırlıklı, tekrarsız çekiliş.
 * - Her onaylı katılımcı bilet sayısı kadar "ağırlık" taşır (çok bilet = çok şans).
 * - Kazanan seçilince TÜM biletleri havuzdan düşer → aynı kişi iki ödül alamaz.
 * - prizeCount asıl kazanan + reserveCount yedek aynı koşuda çekilir: bir kazanan
 *   14 gün içinde yanıtlamazsa yeni çekiliş yapılmaz, sıradaki yedek geçer
 *   (şartlarda ilan edilen "yeni kazanan çekilir" maddesinin denetlenebilir hâli).
 */
export async function drawWinners(
  rawEntries: Entry[],
  seed: string,
  prizeCount: number,
  reserveCount = 3
): Promise<DrawResult> {
  const entries = normalizeEntries(rawEntries);
  const entries_hash = await hashEntries(entries);
  const ticket_total = entries.reduce((s, e) => s + e.tickets, 0);

  const pool = entries.slice();
  const winners: Winner[] = [];
  const wanted = Math.min(prizeCount + reserveCount, pool.length);

  let remaining = ticket_total;
  for (let k = 0; k < wanted; k++) {
    const hit = await pickIndex(seed, `draw:${k}`, remaining);
    // Kümülatif bilet aralıklarında yürü: hit hangi katılımcının aralığına düşüyor?
    let acc = 0;
    let idx = 0;
    for (; idx < pool.length; idx++) {
      acc += pool[idx].tickets;
      if (hit < acc) break;
    }
    const [picked] = pool.splice(idx, 1);
    remaining -= picked.tickets;
    winners.push({
      subscriber_id: picked.subscriber_id,
      rank: k + 1,
      tickets: picked.tickets,
      is_reserve: k >= prizeCount,
    });
  }

  return { winners, entries, entrant_count: entries.length, ticket_total, entries_hash };
}
