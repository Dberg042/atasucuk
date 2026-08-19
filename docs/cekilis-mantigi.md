# Çekiliş mantığı

> Yürürlükteki şartlar: `src/components/Personvern.astro` → "Çekiliş şartları" / "Vilkår for trekningen".
> Kod: `api/src/raffle.ts` (çekirdek) · `api/src/index.ts` (`/admin/raffle/draw`) · `scripts/verify_draw.mjs` (bağımsız doğrulayıcı).

## 1. İlan edilen şartlar

| | |
|---|---|
| Ödül | 3 kazanan × 500 kr hediye çeki |
| Tarih | 20 Ağustos 2026 |
| Katılım | Ücretsiz; anketi tamamlayıp **e-postasını onaylayan** herkes |
| Ek bilet | Davet ettiğin her arkadaş onaylayınca **ikinize de +1** |
| Kazanan yanıt vermezse | 14 gün içinde ulaşılamazsa yeni kazanan |
| Düzenleyen | Ata Sucuk |

Kod bu tabloya uymak zorundadır; tablo değişirse önce burası, sonra kod güncellenir.

## 2. Kim katılır, kaç bileti var

**Katılan:** yalnız `subscribers.status = 'confirmed'`. Onaylamayan kişi çekilişte **yoktur** — double opt-in'in tüm anlamı bu (sahte e-posta çiftçiliği burada ölür, bkz. SPEC-07).

**Bilet sayısı:**

```
bilet = 1 (temel katılım) + raffle_tickets satır sayısı (referral)
```

Bu formül, kişinin sitede gördüğü `/tickets` sayacıyla **birebir aynı** olmak zorundadır (`loadRaffleEntries` ve `/tickets` aynı `subscriber_tickets` view'ından okur). Gösterilen sayı ile çekilişe giren sayı ayrışırsa güvenilirlik biter.

Referral biletleri `unique(subscriber_id, source_id)` ile korunur: aynı ilişkiden ikinci bilet çıkmaz. Self-referral (davet eden ve gelenin ip+ua hash'i aynı) bilet üretmez.

## 3. Neden `Math.random()` değil

`Math.random()` ile çekilen bir kura **sonradan doğrulanamaz.** Katılımcının elinde "sonucu beğenmeyip tekrar çekmediniz" diyebileceği hiçbir kanıt olmaz. Bu yüzden kazanan rastgele seçilmez, **herkese açık bir girdiden türetilir**:

```
kazanan_k = HMAC-SHA256(seed, "draw:k") mod (kalan bilet sayısı)
```

Çekilişten sonra `seed` ve katılımcı listesi yayımlanır. Elinde bu ikisi olan herkes `scripts/verify_draw.mjs` ile aynı kazananları yeniden üretir. Sonucu değiştirmenin tek yolu seed'i veya listeyi değiştirmektir — ikisi de kayıtlı ve hash'li.

### Seed nereden gelir

Seed'in tek şartı: **çekilişten önce kimse bilemeyecek, çekilişten sonra herkes doğrulayabilecek.**

**Önerilen — drand (League of Entropy) beacon.** Hazırlık gerektirmez, tarafsız, herkese açık:

```bash
# 20 Ağustos 2026, 12:00 Oslo saatine denk gelen tur:
curl -s https://api.drand.sh/public/6392966 | jq -r .randomness
```

Tur numarası zamandan hesaplanır (`genesis_time=1595431050`, `period=30s`), yani **çekiliş tarihi önceden ilan edildiği için tur da önceden bellidir; değeri ise o an gelene kadar üretilmez.** Sonradan aynı URL'den tekrar okunabilir.

Alternatif (Norveçli katılımcıya daha okunaklı): o haftanın **Norsk Tipping Lotto** kazanan sayıları, `2026-08-20:04-11-19-23-28-31-33` gibi tek satıra yazılır.

**Yasak:** kendi uydurduğun bir dize. Doğrulanabilirliği sıfırlar.

## 4. Çekiliş algoritması

`api/src/raffle.ts` → `drawWinners(entries, seed, prizeCount, reserveCount)`

1. **Sırala.** Katılımcılar `subscriber_id` (uuid) artan sıraya konur. Veritabanının satır döndürme sırası sonucu etkilemesin diye şart.
2. **Parmak izini al.** `entries_hash = SHA-256("id:bilet\nid:bilet\n…")` — listeyi sonradan değiştirmediğimizin kanıtı.
3. **Bilet aralıkları.** Herkes bileti kadar yer kaplar; 5 biletli, 1 biletlinin 5 katı alan tutar.
4. **k'ıncı kazanan.** `HMAC-SHA256(seed, "draw:k#deneme")` → ilk 8 bayt → uint64 → `mod kalan_bilet`. Düşen aralığın sahibi kazanır.
   - **Modulo bias temizliği:** 2^64, kalan bilet sayısına tam bölünmüyorsa üst kuyruk reddedilip bir sonraki deneme türetilir. Bileti çok/az olanın lehine milimetrik sapma bırakmamak için.
5. **Kazanan havuzdan çıkar.** Tüm biletleri düşer → **aynı kişi iki ödül alamaz.**
6. **Yedekler.** 3 asıl kazanandan sonra aynı koşuda 3 yedek daha çekilir (`is_reserve = true`).

### Yedek mantığı — "14 gün içinde yanıt yoksa yeni kazanan"

Yeni bir çekiliş **yapılmaz.** Sıradaki yedek geçer:

- Kazanan yanıtladı → `raffle_draw_winners.claimed_at` damgalanır.
- 14 gün doldu → `forfeited_at` damgalanır, `rank` sırasıyla ilk boştaki yedek devreye girer.

Böylece ikinci tur da ilk turun seed'iyle önceden belirlenmiştir; "yedek seçimini de mi siz yaptınız" sorusu doğmaz.

## 5. Neler kaydedilir

`supabase/migrations/20260819120000_last_call_and_draw.sql`

| Tablo | İçerik |
|---|---|
| `raffle_draws` | seed, ödül/yedek sayısı, katılımcı sayısı, toplam bilet, `entries_hash`, tarih |
| `raffle_draw_entries` | çekiliş anındaki **donmuş** katılımcı listesi (id, bilet, sıra) |
| `raffle_draw_winners` | kazanan + yedekler, `rank`, o anki bilet sayısı, `claimed_at`, `forfeited_at` |

Liste donduğu için sonradan biri abonelikten çıksa veya yeni bilet kazansa bile çekiliş yeniden doğrulanabilir kalır.

Üç tablo da RLS altında, `anon`'a hiç GRANT yok — kazanan listesi kişisel veridir, public okunmaz.

## 6. Çekilişi yürütme

```bash
API=https://api.atasucuk.no
ADMIN=$ADMIN_TOKEN

# 1) Seed'i al ve KAYDET (aynısını sonra yayımlayacaksın)
SEED=$(curl -s https://api.drand.sh/public/6392966 | jq -r .randomness)
echo "$SEED"

# 2) PROVA — hiçbir şey yazılmaz. Katılımcı/bilet sayısı doğru mu bak.
curl -s -X POST $API/admin/raffle/draw \
  -H "Authorization: Bearer $ADMIN" -H 'Content-Type: application/json' \
  -d "{\"seed\":\"$SEED\",\"dry_run\":true}" | jq

# 3) GERÇEK çekiliş (kaydeder, kazananları e-postalarıyla döndürür)
curl -s -X POST $API/admin/raffle/draw \
  -H "Authorization: Bearer $ADMIN" -H 'Content-Type: application/json' \
  -d "{\"seed\":\"$SEED\",\"prize_count\":3,\"reserve_count\":3,\"notes\":\"20.08.2026 · drand round 6392966\"}" | jq

# 4) Sonucu sonradan görüntüle
curl -s $API/admin/raffle/draws -H "Authorization: Bearer $ADMIN" | jq
```

> **Prova kuralı:** `dry_run` yalnız katılımcı/bilet sayısını kontrol etmek içindir. Sonucu beğenmediğin için seed değiştirmek **hiledir** — ve `raffle_draws` tablosundaki kayıt bunu görünür kılar.

## 7. Şeffaflık — çekilişten sonra yayımlanacaklar

1. **seed** ve kaynağı (drand tur numarası / Lotto tarihi)
2. **entries_hash**
3. **Katılımcı listesi**: `subscriber_id,bilet` — e-posta **yok**, uuid takma ad görevi görür (GDPR)
4. Kazananların yalnız maskeli e-postası (`a***@gmail.com`) veya uuid'si

Katılımcı bunlarla:

```bash
node scripts/verify_draw.mjs --entries entries.csv --seed "<seed>"
```

çalıştırıp ilan edilen kazananları kendi bilgisayarında yeniden üretir. `verify_draw.mjs`, Worker kodundan **bağımsız** yazılmıştır (tek bir hatanın iki tarafta aynı yanlışı üretmemesi için).

## 8. Doğrulanmış özellikler

`drawWinners` üzerinde koşulan testlerde:

- **Ağırlık doğru:** 1/2/5 biletli üç grupla 20.000 çekiliş → beklenen %12.50/%25.00/%62.50, ölçülen %12.68/%24.95/%62.36.
- **Kimse dışlanmıyor:** 900 katılımcının 900'ü en az bir kez kazandı.
- **Tekrar yok:** 2.000 çekilişin hiçbirinde aynı kişi iki kez çıkmadı.
- **Deterministik:** girdi sırası ters çevrilse bile aynı seed aynı kazananları verdi.
- **İki uygulama uyuşuyor:** `api/src/raffle.ts` ile `scripts/verify_draw.mjs` 500 kişilik listede birebir aynı sonucu üretti.
