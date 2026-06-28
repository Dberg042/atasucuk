# Ata Sucuk — Anket Akışı: Ekran Ekran Metinler (TR / NO)

> Kullanıma hazır ekran metinleri. 3 çekirdek soru + kayıt adımı (fylke dahil) + dinamik sonuç ekranı.
> Mobil öncelikli, tek soru tek ekran. Dil tarayıcıdan otomatik (TR/NO/AR/FA) + manuel seçici.
> Zemin: B-anket (3 soru ideal, değer-CTA, sunk-cost sırası, kısmi kayıt, dinamik sonuç).

## Alan mantığı (kayıt adımı)
- **Zorunlu:** E-posta · Fylke (dropdown)
- **Opsiyonel:** Postnummer (teşvik et — teslimat için) · İsim · Telefon
- **Zorunlu onay kutusu:** GDPR rızası
- Sıra: **önce 3 soru, e-posta + alanlar EN SON** (sunk-cost → daha yüksek dönüşüm).
- Kısmi cevaplar her adımda anında kaydedilsin (yarıda kalsa bile veri durur).

---

## Ekran 0 — Davet (opt-in tetik)

Kesintili pop-up değil. Hero'da/CTA'da butona basınca veya scroll sonrası nazik şerit.

**TR**
> 🌙 **Norveç'te ekte sucuk geliyor.**
> 30 saniye, 3 soru. Sucuğu birlikte şekillendirelim — ve 1000 kr'lik çekilişe gir.
> [ Başla → ]

**NO**
> 🌙 **Ekte sucuk kommer til Norge.**
> 30 sekunder, 3 spørsmål. Vær med å forme produktet — og bli med i trekningen på 1000 kr.
> [ Start → ]

**Görsel:** dilimlenmiş sucuk yakın çekim, sıcak ton. İlerleme göstergesi henüz yok.

---

## Ekran 1 — Soru 1 / Tüketim  (segmentasyon + hacim)

**TR** — İlerleme: 1/3
> **Ayda ne kadar sucuk tüketiyorsun?**
> ◯ Hiç  ◯ 0,5 kg  ◯ 1 kg  ◯ 1,5 kg  ◯ 2+ kg

**NO** — Fremdrift: 1/3
> **Hvor mye sucuk spiser du i måneden?**
> ◯ Aldri  ◯ 0,5 kg  ◯ 1 kg  ◯ 1,5 kg  ◯ 2+ kg

Tek seçim → seçince otomatik ilerle (buton bile gerekmez).

---

## Ekran 2 — Soru 2 / En büyük problem  (← positioning'in ana mesajı buradan çıkar)

**TR** — İlerleme: 2/3
> **Sucukta en büyük sorun ne?**
> ◯ Pahalı olması  ◯ İçindeki katkılar  ◯ Tadı  ◯ Üreticiye güven

**NO** — Fremdrift: 2/3
> **Hva er det største problemet med sucuk i dag?**
> ◯ For dyr  ◯ Tilsetninger  ◯ Smaken  ◯ Stoler ikke på produsenten

> Not: Bu sorunun cevabı hem v2 hero copy'sini hem de Ekran 5'teki dinamik mesajı belirler.

---

## Ekran 3 — Soru 3 / Beklenti  (← ürün kararı: ısıl-işlem mi, tam fermente mi)

**TR** — İlerleme: 3/3
> **Norveç'te helal sucuk üretsek, senin için en önemlisi ne?**
> ◯ Uygun fiyat  ◯ Katkısız içerik  ◯ Tam fermente, yüksek kalite  ◯ Diğer

**NO** — Fremdrift: 3/3
> **Hva er viktigst for deg hvis vi lager halal sucuk i Norge?**
> ◯ Rimelig pris  ◯ Rene råvarer  ◯ Ekte, fullfermentert  ◯ Annet

"Diğer / Annet" seçilirse **opsiyonel** tek satır metin kutusu açılır (atlanabilir — tek sürtünme noktası burası, zorunlu yapma).
TR placeholder: "Birkaç kelimeyle yaz (isteğe bağlı)" · NO: "Skriv kort (valgfritt)"

> **3 soru kararı:** Tüketim (hacim) + problem (mesaj) + beklenti (ürün tipi) = senin üç kararına denk gelir.
> İstersen "Sucuğu nereden alıyorsun?" (yurt dışı/Norveç/kendim) sorusunu **tek-dokunuş 4. soru** olarak
> ekleyebilirsin — düşük sürtünme, fiyat/gümrük tezini doğrular. Ama 4'ü geçme.

---

## Ekran 4 — Kayıt (e-posta + fylke zorunlu, gerisi opsiyonel)

**TR**
> **Son adım — yerini ayırt ve çekilişe gir.**
> E-posta *(zorunlu)*: [ ____ ]
> Hangi bölgedesin? *(zorunlu)*: [ Fylke seç ▾ ]
> Postnummer *(isteğe bağlı, teslimat için işimize yarar)*: [ ____ ]
> İsim *(isteğe bağlı)*: [ ____ ]
> Telefon *(isteğe bağlı)*: [ ____ ]
> ☐ E-posta ile haber almak istiyorum ve cevaplarımın ürünü geliştirmek için **anonim** kullanılmasına izin veriyorum.
> [ Bli med + loddet mitt → ]
> _Spam yok. Sadece hazır olunca haber veririz._

**NO**
> **Siste steg — sikre plassen din og bli med i trekningen.**
> E-post *(påkrevd)*: [ ____ ]
> Hvilket fylke bor du i? *(påkrevd)*: [ Velg fylke ▾ ]
> Postnummer *(valgfritt, hjelper oss med levering)*: [ ____ ]
> Navn *(valgfritt)*: [ ____ ]
> Telefon *(valgfritt)*: [ ____ ]
> ☐ Jeg vil bli varslet på e-post og samtykker til at svarene mine brukes **anonymt** for å utvikle produktet.
> [ Bli med + sikre loddet → ]
> _Ingen spam. Vi varsler deg kun når vi er klare._

**Görsel:** sade form, fylke dropdown'ı net. CTA değer odaklı ("loddet/çekiliş"), "Gönder" deme.

---

## Ekran 5 — Dinamik sonuç + bölge dalı  (jenerik "teşekkürler" YAZMA)

İki parça birleşir: **(A) Soru 2'ye göre mesaj** + **(B) Fylke'ye göre bölge mesajı**.

### A) Soru 2 (problem) cevabına göre

| Cevap | NO mesaj | TR mesaj |
|---|---|---|
| For dyr / Pahalı | "Du er ikke alene — de fleste på listen sier det samme. Derfor lager vi ekte sucuk til **importpris**, uten toll og mellomledd." | "Yalnız değilsin — listedekilerin çoğu aynısını diyor. Tam da bu yüzden **ithal fiyatına**, gümrüksüz ve aracısız üretiyoruz." |
| Tilsetninger / Katkılar | "Helt enig. Derfor: **bare storfe, hvitløk, krydder, salt og kultur. Ingenting annet.**" | "Sana katılıyoruz. Bu yüzden: **sadece et, sarımsak, baharat, tuz ve kültür. Başka hiçbir şey.**" |
| Smaken / Tadı | "Nettopp derfor **fullfermenterer** vi — ingen snarveier, ekte smak." | "Tam da bu yüzden **tam fermente** ediyoruz — kestirme yok, gerçek lezzet." |
| Stoler ikke / Güven | "Derfor bygger vi dette **åpent**, sammen med deg — du ser innholdet og prosessen." | "Bu yüzden bunu **açıkça**, seninle birlikte inşa ediyoruz — içeriği de süreci de görüyorsun." |

### B) Fylke'ye göre bölge mesajı

**Agder ise**
> NO: "Og det beste: vi **starter nettopp her i Agder**. Du er blant de aller første. 🌄"
> TR: "Üstelik: **tam da burada, Agder'de başlıyoruz.** İlk sıradakilerdensin. 🌄"

**Agder dışı ise**
> NO: "Vi starter i Agder, men nå står **[Fylke]** på kartet. Jo flere fra [Fylke], jo før kommer vi dit — og du er først til å få beskjed."
> TR: "Agder'de başlıyoruz, ama artık **[Fylke]** haritada. [Fylke]'den ne kadar çok kişi olursa o kadar erken geliriz — ve ilk sen haber alırsın."

### Sonra: doğrulama + referral'a köprü
> NO: "📩 Sjekk e-posten din og bekreft plassen — da er loddet ditt offisielt. Vil du øke sjansen?"
> TR: "📩 E-postanı kontrol et ve yerini onayla — bileti böyle kesinleşir. Şansını artırmak ister misin?"
>
> [ Inviter en venn → / Arkadaşını davet et → ]  (Ekran 6)

**Görsel:** sıcak kutlama hissi; bölge mesajında küçük Norveç/Agder harita vurgusu hoş durur.

---

## Ekran 6 — Referral (iki taraflı, hazır metin)

> NO başlık: "Inviter en venn — dere vinner begge."
> "Del lenken din. Når en venn blir med, får **begge** ett lodd til."
> Kişisel link: atasucuk.no/?ref=ABC123
> [ WhatsApp ] [ Telegram ] [ SMS ] [ Kopiér ]

> TR başlık: "Arkadaşını davet et — ikiniz de kazanın."
> "Linkini paylaş. Arkadaşın katılınca **ikinize de** birer bilet daha."

**Hazır paylaşım metni** (link otomatik eklenir):
> NO: "Endelig ekte, fullfermentert sucuk i Norge — til importpris. Bli med, så får vi begge ett lodd til 👇"
> TR: "Norveç'te nihayet katkısız, tam fermente sucuk — ithal fiyatına. Katıl, ikimize de birer bilet 👇"

---

## Onay maili (double opt-in)

**NO** — Emne: *Ett siste steg — bekreft plassen din*
> "Klikk for å bekrefte e-posten din. Da er du offisielt med i trekningen på 1000 kr — og på ventelisten. [Bekreft]"

**TR** — Konu: *Son bir adım — yerini onayla*
> "E-postanı onaylamak için tıkla. Onaylayınca 1000 kr çekilişine ve bekleme listesine resmen girmiş olursun. [Onayla]"

> Referral bileti **onaya bağlı** — onaylanmayan kayıt davet edene bilet kazandırmaz (fraud savunması).

---

## Mikro-metin / UX kuralları
- İlerleme hep görünür: "1/3 · 2/3 · 3/3".
- Tek seçimli sorularda seçince otomatik ilerle — "İleri" butonu bekletme.
- Soru metinleri kısa (≈5 kelime), 3. sınıf seviye, jargonsuz.
- CTA'lar değer odaklı ("loddet/çekiliş/yerini ayır"), asla "Gönder/Kaydol".
- Hata durumu nazik: "E-post mangler 🙂" gibi, suçlayıcı değil.
- RTL: Arapça/Farsça'da layout sağdan sola; native göz şart (makine çeviri güven kırar).
