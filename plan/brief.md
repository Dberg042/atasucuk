# Atasucuk — Proje Brief

## Ürün
Norveç'te üretilen ilk yerel helal sucuk. Jens Eide AS ile üretim ortaklığı
(Camilla Eide — sertifikalı pølsemaker pitch hedefi). Test batch sürüyor.

## Kim yapıyor
David Berg (Ake) — fullstack developer + AppSec, Bouvet Norge AS, Kristiansand.
Yan proje, tam zamanlı iş yanında yürütülüyor.

## Hedef pazar
Norveç'teki Türk, Suriyeli, Afgan diasporası + helal ürüne ilgili genel pazar.

## Şu anki aşama
Pre-launch. Waitlist sitesi var (GitHub Pages, statik HTML).
Hedef: Astro + Cloudflare Pages + Supabase Postgres'e taşımak.

## Öncelikler (sırayla)
1. Landing page mesajı + anket copy (RAG cevaplarından damıtılacak)
2. Teknik: şema + RLS + fraud-dayanıklı referral
3. Jens Eide pitch + ortaklık yapısı kararı

## Karar verilmemiş kritik konular
- Business model: royalty vs direkt sahiplik
- Kura tarihi ve yapısı
- Arapça/Farsça çeviri için native göz

## RAG sistemi
Hormozi, Dunford, Priestley, Welsh, Shapiro, Harry Dry NotebookLM RAG'leri kurulu.
Cevaplar rag-cevaplar/ klasöründe. Prensip için RAG, karar için David + Claude.