# Ata Sucuk lansman sayfası — eksikler ve düzeltme listesi

Karşılaştırılan sayfalar:

- Referans: <https://atasucuk.gentic.run/lansman>
- Mevcut GitHub Pages: <https://dberg042.github.io/atasucuk/>
- İncelenen repo: `/root/atasucuk`
- Kontrol tarihi: 2026-06-18

İnceleme iki geçişte yapıldı: önce canlı sayfalar tarayıcıda açıldı, DOM/metin/stil ölçümleri alındı; sonra Playwright ile desktop `1280x720` ve mobile `390x844` tam sayfa ekran görüntüleri + computed style verileri tekrar üretildi. Tarayıcı konsolunda iki sayfada da JS hatası görülmedi.

Kanıt dosyaları repoda bırakıldı:

- `audit-artifacts/reference-desktop-full.png`
- `audit-artifacts/clone-desktop-full.png`
- `audit-artifacts/reference-mobile-full.png`
- `audit-artifacts/clone-mobile-full.png`
- `audit-artifacts/computed-comparison.json`

## Kısa hüküm

Mevcut sayfa referansın içerik iskeletini taşıyor ama görsel olarak aynı değil. Sorun tek bir küçük CSS ayarı değil; sayfa referansın premium/karanlık/serif marka dilinden uzaklaşıp daha sade, sistem-fontlu, kart tabanlı bir wireframe gibi kalmış. Claude burada “statik bağımsız sayfa” spec'ini fazla ciddiye almış, referans klonlama niyetini az ciddiye almış. Robotların da bazen brief'i yanlış yerden ısırması var.

En büyük farklar: tipografi, hizalama, renk paleti, bölüm yükseklikleri, CTA/form davranışı, görsel yerleşim, footer/son CTA atmosferi ve eksik referans metinleri.

## Ölçülebilir farklar

| Alan | Referans | Mevcut sayfa | Etki |
|---|---:|---:|---|
| Desktop toplam yükseklik | `3523px` | `2525px` | Sayfa yaklaşık `998px` daha kısa; referanstaki ferahlık ve bölüm ritmi kaybolmuş. |
| Mobile toplam yükseklik | `5039px` | `3302px` | Mobilde yaklaşık `1737px` daha kısa; referansın büyük görsel/CTA nefesi yok. |
| Body background | `rgb(253,251,247)` krem | `rgb(255,255,255)` beyaz | Marka sıcaklığı eksik. |
| Body font | `Inter` | sistem font | Genel metin dili farklı. |
| Başlık fontu | `Playfair Display` serif | sistem sans-serif | En belirgin marka farkı. |
| Desktop H1 | `72px`, centered, serif | `44px`, left aligned, sans | Hero birebir değil. |
| Mobile H1 | `48px`, centered, serif | `30.4px`, left aligned, sans | Mobil kahraman başlık etkisi çok zayıf. |
| Referans bölüm sayısı | hero + problem + image + quality + CTA + footer | hero + problem/image birleşik + quality + CTA + footer | Orijinal akış sıkıştırılmış. |
| Referans ana görsel | `1216x600`, tam genişlik, keskin köşe | `720x480`, küçük, radius 12 | Görsel bölümün ağırlığı kaybolmuş. |
| Form action | Gentic lead endpoint POST | `#`, submit engelli | İşlevsel lead toplama eksik. |

## Eksikler ve düzeltilecek noktalar

### 1. Hero bölümü referansla aynı değil — yüksek öncelik

Referansta hero tam genişlik koyu arka planlı, merkezlenmiş, premium landing hissi veren büyük bir blok. Mevcut sayfada hero sol hizalı, daha kısa ve daha klasik bir “brochure” düzeni gibi.

Referans ölçüleri:

- Desktop hero yüksekliği: `798px`
- Mobile hero yüksekliği: `900px`
- Background color/fallback: `rgb(28,25,23)`
- H1: `Playfair Display`, `72px` desktop, `48px` mobile, center aligned
- H1 rengi: `rgb(253,251,247)`
- Hero form input/button ikisi de `398px` genişlikte, dikey dizilmiş

Mevcut sayfa:

- Desktop hero yüksekliği: `655px`
- Mobile hero yüksekliği: `798px`
- H1: sans-serif, `44px` desktop, `30.4px` mobile, left aligned
- Form desktop'ta yatay dizilmiş

Düzeltme:

- Hero içeriğini merkeze al.
- H1'i referanstaki gibi iki satırlı/serif/büyük yap: `Norges første autentiske` + `lokalproduserte halal sucuk.`
- Desktop H1 hedefi: yaklaşık `72px / 72px line-height`; mobile: yaklaşık `48px / 60px`.
- Hero formu referanstaki gibi dikey yap: input üstte, button altta; ikisi de aynı genişlikte.
- Hero yüksekliğini `min-height: 90vh` yaklaşımına çek.

### 2. Logo/brand text eksik

Referans gövde metninde en üstte ve footer içinde `ATA SUCUK` marka yazısı var. Mevcut sayfada üst marka yazısı görünür metinde yok; footer'da da yalnız copyright var.

Eksik referans satırları:

- `ATA SUCUK` üst/hero marka yazısı
- `ATA SUCUK` footer marka yazısı
- `© 2023 Ata Sucuk Norge. Alle rettigheter reservert.`

Düzeltme:

- Hero/top alana `ATA SUCUK` logotype ekle.
- Footer'a `ATA SUCUK` ve tam copyright metnini ekle.

### 3. Announcement satırı yanlış biçimlendirilmiş

Referans satırı: `Lanseres snart i Norge` — küçük yazı, açık krem ton, title case.

Mevcut satır: `LANSERES SNART I NORGE` — uppercase.

Düzeltme:

- Metin birebir `Lanseres snart i Norge` olmalı.
- Uppercase/text-transform kaldırılmalı.

### 4. Hero sonrası güven rozetlerinin yerleşimi farklı

Referansta rozetler hero formu ve spam notundan sonra, hero'nun altında ayrı beyaz/cream bant gibi konumlanıyor:

- `100% Garantert Halal`
- `Produsert i Norge`
- `Tradisjonelt Fermentert`

Mevcut sayfada rozetler hero içinde formdan önce duruyor ve dark overlay içinde pill gibi görünüyor.

Düzeltme:

- Rozetleri hero altına ayrı bir strip/row olarak taşı.
- Referanstaki gibi her rozette ikon/işaret hissi ve açık zemin kullanılmalı.
- Formdan önce değil, form + spam notundan sonra konumlandırılmalı.

### 5. Hero spam/not metni eksik

Referans hero formunun altında şu metin var:

> Ingen spam. Vi varsler deg kun når vi er klare til å ta i mot bestillinger.

Mevcut sayfada yok.

Düzeltme:

- Hero formunun altına birebir bu metin eklenmeli.

### 6. Problem bölümü açıklama paragrafı eksik

Referansta `Hvorfor betale overpris...` H2'sinin altında şu paragraf var:

> I dag koster importert sucuk i Norge opp mot 370 kr/kg. Den reiser langt, ligger lenge på lager og mister sin ferskhet. Vi mener du fortjener noe bedre.

Mevcut sayfada bu paragraf yok; doğrudan kartlara geçiyor.

Düzeltme:

- H2 altına bu paragraf eklenmeli.
- Maks genişlik, center alignment ve referanstaki muted stone rengiyle verilmelidir.

### 7. Problem/Solution kartları yanlış görsel dilde

Referansta sol kart açık/krem, sağ kart koyu kırmızı/görsel overlay hissinde. Sağ `Ata-metoden` kartı cream text ile koyu kırmızı alanda duruyor. Mevcut sayfada iki kart da beyaz; sağ kart sadece üst border/accent ile ayrılmış.

Referans:

- `Dagens marked`: açık kart, serif başlık, standard list.
- `Ata-metoden`: `rgb(113,26,27)` marka kırmızısı, cream text, daha güçlü kontrast.
- Kartlar daha büyük ve daha fazla paddingli.

Mevcut:

- İki kart da küçük, beyaz, border'lı.
- `Ata-metoden` sadece kırmızı başlık ve border ile işaretlenmiş.

Düzeltme:

- `Ata-metoden` kartını koyu kırmızı dolguya geçir.
- Başlık ve liste metinlerini cream/beyaz tonuna çek.
- Kart padding/yüksekliğini referansa yaklaştır.
- Başlıklarda Playfair Display kullanılmalı.

### 8. Orta görsel bölümü birebir değil

Referansta orta görsel kendi ayrı section'ında, geniş ve sinematik:

- Desktop: `1216x600`
- Mobile: `342x400`
- Radius: `0px`
- Görsel URL: `generated_20260516_211442_c5967d2f.jpg`
- Section padding: `64px 0`

Mevcut sayfa:

- Desktop: `720x480`
- Mobile: `342x228`
- Radius: `12px`
- Görsel: `middle.png`
- Problem section içine gömülü.

Düzeltme:

- Görseli ayrı bir section'a çıkar.
- Desktop'ta container genişliğinde `~1216px` ve `600px` yüksekliğe getir.
- Mobile'da görseli referanstaki gibi daha yüksek/kırpılmış kullan (`object-fit: cover`, height `400px` civarı).
- Radius kaldırılmalı veya `0` yapılmalı.
- Eğer gerçek referans asset'i kopyalanacaksa bu S3 görseli repo asset'i olarak indirilip `middle` yerine kullanılmalı. Aksi halde mevcut `middle.png` görüntüsü de görsel kompozisyon olarak referanstan ayrışıyor.

### 9. Quality bölümü yanlış arka plan ve kart dili kullanıyor

Referansta kalite bölümü `rgb(244,239,230)` sand arka planda, üst/alt çok hafif border ile duruyor. İçerikte üç kolon var ama kart kutuları gibi ağır beyaz paneller değil; ikonlu, merkez hizalı, daha hafif bloklar gibi.

Referans:

- Section background: `rgb(244,239,230)`
- Desktop section yüksekliği: `578px`
- H2: Playfair, `48px`, center
- H3: Playfair, `24px`, center, dark text

Mevcut:

- Section background: beyaz/transparent
- Kartlar beyaz, border'lı
- H3 kırmızı ve left aligned
- H2 sans-serif `32px`

Düzeltme:

- Section background'u `#f4efe6` civarına al.
- Pillar kartlarını referanstaki hafif/iconlu bloklara dönüştür; ağır border'ı kaldır.
- H3'leri center hizala ve dark renk yap.
- Playfair Display kullan.
- Referanstaki ikon/ornament varsa ekle; mevcut sayfada ikonlar tamamen yok.

### 10. Final CTA bölümü tamamen farklı atmosferde

Referansta final CTA koyu kırmızı + background image overlay kullanan ayrı bir kampanya bloğu. Mevcut sayfada açık gri section; bu referansın en bariz görsel eksiklerinden biri.

Referans:

- Background color: `rgb(113,26,27)`
- Background image: `generated_20260516_211449_a92fbd78.jpg`
- Section height desktop: `482px`
- H2: cream, Playfair, `48px`
- Form: input cream zemin + siyah/koyu button, yatay desktop

Mevcut:

- Açık gri background
- Görsel yok
- H2 siyah, sans-serif, `32px`
- Button kırmızı

Düzeltme:

- CTA section'ını koyu kırmızı image-overlay blok yap.
- `footer.jpg` yerine referans CTA/background asset'i veya ona çok yakın lokal asset kullanılmalı.
- H2 ve paragraf cream/beyaz tonuna alınmalı.
- CTA form stili referansa göre değişmeli: input `rgb(253,251,247)`, button `rgb(28,25,23)`.

### 11. Footer referansla aynı değil

Referans footer koyu düz zeminli:

- Background: `rgb(28,25,23)`
- Text color: `rgba(253,251,247,0.6)`
- İçerik: `ATA SUCUK` + `© 2023 Ata Sucuk Norge. Alle rettigheter reservert.`

Mevcut footer:

- `footer.jpg` background image kullanıyor.
- Sadece `© 2023 Ata Sucuk Norge` yazıyor.

Düzeltme:

- Footer görselini kaldır veya referanstaki gibi çok koyu düz zemin yap.
- Marka yazısını ve tam copyright'ı ekle.

### 12. Formlar işlevsel değil; referans lead endpoint'e POST ediyor

Referans formları:

- `method="POST"`
- `action="https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070"`
- Hidden source alanları:
  - hero: `source=hero_waitlist`
  - footer: `source=footer_waitlist`
- Hero placeholder: `Din e-postadresse`
- Footer placeholder: `Skriv inn e-postadressen din`

Mevcut formlar:

- `action="#"`
- `onsubmit="return false"`
- Hidden source yok
- Placeholder ikisinde de `navn@eksempel.no`

Düzeltme:

- Eğer canlı lead toplama isteniyorsa referans endpoint + hidden source alanları birebir eklenmeli.
- Eğer statik/no-backend kalacaksa bile görsel ve placeholder birebir yapılmalı; ama “tam aynı” hedefinde current hali eksik.

### 13. Referansın dış asset/font bağımlılıkları klonda yok

Referans şu dış kaynakları kullanıyor:

- Tailwind CDN: `https://cdn.tailwindcss.com`
- Google Fonts: `Inter` + `Playfair Display`
- Lucide icons: `https://unpkg.com/lucide@latest`
- 3 görsel asset:
  - Hero background: `generated_20260516_211111_1b3a6ff1.jpg`
  - Middle image: `generated_20260516_211442_c5967d2f.jpg`
  - CTA background: `generated_20260516_211449_a92fbd78.jpg`

Mevcut spec bağımsız/statik sayfa istediği için dış bağımlılıkları kaldırmış. Fakat birebir klon hedefinde en azından fontların ve görsel kompozisyonun lokal kopyaları gerekir.

Düzeltme:

- Google fontlarını dışarıdan kullan veya fontları lokal self-host et.
- Lucide ikonları gerekiyorsa inline SVG olarak ekle.
- Referans görsellerini lokal asset olarak kaydet; uzak S3 linklerine doğrudan bağlı kalmak istemiyorsak repo içine indir.

### 14. Renk paleti yanlış

Referans ana renkleri:

- Dark: `rgb(28,25,23)` / yaklaşık `#1c1917`
- Cream: `rgb(253,251,247)` / yaklaşık `#fdfbf7`
- Sand: `rgb(244,239,230)` / yaklaşık `#f4efe6`
- Red: `rgb(113,26,27)` / yaklaşık `#711a1b`

Mevcut ana renkleri:

- Text/background: `#111`, `#fff`
- Alt bg: `#f6f4f2`
- Accent: `#8b0000`

Düzeltme:

- CSS değişkenleri referans paletine çekilmeli.
- Kırmızı `#8b0000` yerine `#711a1b` kullanılmalı.
- Beyaz zemin yerine cream/sand tonları kullanılmalı.

### 15. Section spacing ve page rhythm referansla uyuşmuyor

Referans desktop section yükseklikleri:

- Hero: `798px`
- Problem: `738px`
- Image: `728px`
- Quality: `578px`
- CTA: `482px`
- Footer: `125px`

Mevcut desktop section yükseklikleri:

- Hero: `655px`
- Problem + image: `920px`
- Quality: `431px`
- CTA: `399px`
- Footer: `120px`

Düzeltme:

- Problem ve image section ayrılmalı.
- Hero, quality ve CTA daha ferah hale getirilmeli.
- Görsel section yüksekliği ve image crop referansa göre ayarlanmalı.

### 16. Mobil davranış referansla uyuşmuyor

Referans mobile:

- H1 çok büyük (`48px`) ve center.
- Sayfa yüksekliği `5039px`; görsel ve kalite blokları daha uzun nefes alıyor.
- Middle image mobile'da `342x400`, yani dikey/cropped.
- Quality section mobile `1262px`, uzun ve ferah.

Mevcut mobile:

- H1 `30.4px`, left aligned.
- Sayfa yüksekliği `3302px`, çok kısa.
- Middle image `342x228`, yatay kalıyor.
- Quality section `884px`, kartlar sıkı.

Düzeltme:

- Mobile hero typography büyütülmeli.
- Image `height: 400px; object-fit: cover;` davranışına çekilmeli.
- Mobile quality spacing artırılmalı.

### 17. Mevcut `specs/lansman-spec.md` artık hedefle çelişiyor

Repo içindeki mevcut spec “dependency-free”, “system fonts”, “white/light gray”, “no external network” gibi maddeler içeriyor. Bu maddeler referansı birebir klonlama hedefiyle çelişiyor. Eksiklerin bir kısmı Claude'un o spec'e uymasından kaynaklanmış.

Düzeltme:

- `specs/lansman-spec.md` güncellenmeli veya yanına yeni `specs/lansman-clone-parity-spec.md` eklenmeli.
- Yeni spec “tam referans paritesi” hedefini açıkça yazmalı: fontlar, renkler, form endpoint, section ölçüleri, asset mapping.

## Ek kritik not: mobil öncelik ve ikon eksikleri

Sonradan yapılan netleştirme: bu sayfanın birincil hedef ekranı mobil. İnsanlar siteyi büyük ihtimalle telefondan açacak; bu yüzden desktop parite tek başına yeterli değil. Referans mobile sürüm mevcut GitHub Pages sürümünden belirgin şekilde daha iyi: daha büyük serif H1, merkezlenmiş hero, daha yüksek/cropped orta görsel, daha ferah kalite blokları ve koyu kırmızı görselli CTA kullanıyor.

Ayrıca mevcut sitede referans ikon sistemi yok. Referans Lucide ikonları kullanıyor ve ikonlar tasarımın önemli bir parçası: `beef`, `arrow-right`, `shield-check`, `map-pin`, `clock`, `frown`, `x-circle`, `check-circle-2`, `check`, `hourglass`, `flame`. H1 içindeki `autentiske` kelimesinin altında dekoratif SVG çizgi de mevcut sitede eksik. Bu ikonlar eklenmeden sayfa birebir hissine yaklaşmaz.

Kodlama öncesi ayrı backlog ve asset hazırlığı şu dosyaya yazıldı: `docs/parity-backlog.md`. Referans görseller de lokal olarak indirildi: `assets/reference/hero-reference.jpg`, `assets/reference/middle-reference.jpg`, `assets/reference/cta-reference.jpg`.

## Önerilen uygulama sırası

1. Mobil pariteyi P0 kabul et: önce `390x844` görünüm referansa benzetilecek, sonra desktop polish yapılacak.
2. Referans ikonlarını ekle veya inline SVG olarak göm; ikonlar olmadan görsel parite kabul edilmemeli.
3. Referans görselleri kullan: hero, middle ve CTA asset'leri `assets/reference/` altından alınmalı.
4. `styles.css` değişkenlerini referans paletine taşı: dark/cream/sand/red.
5. Google font veya self-host font ekle: Inter body, Playfair Display heading.
6. Hero'yu yeniden kur: centered layout, büyük serif H1, vertical form, spam note, logo text.
7. Rozetleri hero alt strip'e taşı.
8. Problem intro paragrafını ekle.
9. Problem kartlarını referans stile çevir; sağ kartı koyu kırmızı yap.
10. Middle görseli ayrı section'a çıkar; geniş/cropped layout yap.
11. Quality section'ı sand background + border + centered/iconlu pillar düzenine çevir.
12. Final CTA'yı kırmızı background image overlay'e dönüştür.
13. Footer'ı koyu düz zemin + `ATA SUCUK` + tam copyright yap.
14. Form endpoint, method, hidden source ve placeholder'ları referansla eşleştir.
15. Desktop + mobile tam sayfa ekran görüntülerini tekrar üret ve `computed-comparison.json` ile ölçüleri kıyasla.

## Kabul kriterleri

- Desktop toplam yükseklik referansa yakın olmalı: `3523px ± 150px`.
- Mobile toplam yükseklik referansa yakın olmalı: `5039px ± 250px`.
- Desktop H1 computed style: `Playfair Display`, `~72px`, center.
- Mobile H1 computed style: `Playfair Display`, `~48px`, center.
- Body background `rgb(253,251,247)` olmalı.
- Quality background `rgb(244,239,230)` olmalı.
- Final CTA background `rgb(113,26,27)` + image overlay olmalı.
- Footer text içinde `ATA SUCUK` ve `Alle rettigheter reservert.` bulunmalı.
- Hero spam notu ve problem intro paragrafı bulunmalı.
- Formlar referans endpoint'e POST etmeli veya bilinçli olarak statik bırakılıyorsa bu karar açıkça yazılmalı; görsel parite yine korunmalı.
- Konsolda hata olmamalı.

## İkinci kontrol notu

İlk bulgulardan sonra tekrar Playwright çıktıları ve canlı browser console kontrol edildi. İki sayfada JS console hatası yok. Eksikler tekrar üretilebilir durumda ve `audit-artifacts/computed-comparison.json` içindeki ölçümlerle doğrulanıyor. Ana problem “bug” değil; referans tasarım dilinin yaklaşık %60'ının statik sade versiyona dönüşmüş olması.
