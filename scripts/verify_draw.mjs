#!/usr/bin/env node
// Çekiliş doğrulayıcı — BAĞIMSIZ uygulama.
//
// Amaç: "sonucu siz uydurdunuz" itirazına cevap. Bu script Worker koduna,
// veritabanına veya internete DOKUNMAZ. Yayımlanan iki girdiden (katılımcı
// listesi + seed) kazananları sıfırdan yeniden hesaplar. Çıkan liste ilan
// edilenle aynıysa çekiliş dürüsttür.
//
// Kullanım:
//   node scripts/verify_draw.mjs --entries entries.csv --seed "<seed>" [--prizes 3] [--reserves 3]
//
// entries.csv biçimi (başlıksız, çekiliş sonrası yayımlanan dosya):
//   <subscriber_id>,<bilet_sayısı>
//
// Algoritma api/src/raffle.ts ile birebir aynıdır; ikisi bilerek ayrı
// yazılmıştır (tek bir hatanın iki tarafta birden aynı yanlışı üretmemesi için).

import { createHmac, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
}

const entriesPath = arg('entries');
const seed = arg('seed');
const prizeCount = Number(arg('prizes', 3));
const reserveCount = Number(arg('reserves', 3));

if (!entriesPath || !seed) {
  console.error('Kullanım: node scripts/verify_draw.mjs --entries entries.csv --seed "<seed>" [--prizes 3] [--reserves 3]');
  process.exit(1);
}

// --- 1) Katılımcı listesi ---------------------------------------------------
const entries = readFileSync(entriesPath, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean)
  .map((line) => {
    const [subscriber_id, tickets] = line.split(',');
    return { subscriber_id: subscriber_id.trim(), tickets: Number(tickets) };
  })
  .filter((e) => e.tickets > 0)
  // Sıralama sonucu etkiler → id'ye göre artan, DB sırasından bağımsız.
  .sort((a, b) => (a.subscriber_id < b.subscriber_id ? -1 : a.subscriber_id > b.subscriber_id ? 1 : 0));

const ticketTotal = entries.reduce((s, e) => s + e.tickets, 0);

// Listenin parmak izi: yayımlanan entries_hash ile eşleşmeli.
const entriesHash = createHash('sha256')
  .update(entries.map((e) => `${e.subscriber_id}:${e.tickets}`).join('\n'))
  .digest('hex');

// --- 2) Seed'den kazanan türetme -------------------------------------------
const U64 = 1n << 64n;

function derive(label) {
  const sig = createHmac('sha256', seed).update(label).digest();
  let n = 0n;
  for (let i = 0; i < 8; i++) n = (n << 8n) | BigInt(sig[i]);
  return n;
}

function pickIndex(label, total) {
  const t = BigInt(total);
  const limit = U64 - (U64 % t); // modulo bias'ı reddet
  for (let attempt = 0; attempt < 100; attempt++) {
    const n = derive(`${label}#${attempt}`);
    if (n < limit) return Number(n % t);
  }
  throw new Error('draw_derive_exhausted');
}

const pool = entries.slice();
const winners = [];
const wanted = Math.min(prizeCount + reserveCount, pool.length);
let remaining = ticketTotal;

for (let k = 0; k < wanted; k++) {
  const hit = pickIndex(`draw:${k}`, remaining);
  let acc = 0;
  let idx = 0;
  for (; idx < pool.length; idx++) {
    acc += pool[idx].tickets;
    if (hit < acc) break;
  }
  const [picked] = pool.splice(idx, 1);
  remaining -= picked.tickets;
  winners.push({
    rank: k + 1,
    subscriber_id: picked.subscriber_id,
    tickets: picked.tickets,
    is_reserve: k >= prizeCount,
  });
}

// --- 3) Rapor ---------------------------------------------------------------
console.log(`Katılımcı  : ${entries.length}`);
console.log(`Toplam bilet: ${ticketTotal}`);
console.log(`entries_hash: ${entriesHash}`);
console.log(`seed        : ${seed}`);
console.log('');
for (const w of winners) {
  console.log(`${String(w.rank).padStart(2)}. ${w.is_reserve ? 'YEDEK   ' : 'KAZANAN '} ${w.subscriber_id}  (${w.tickets} bilet)`);
}
