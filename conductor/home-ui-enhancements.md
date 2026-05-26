# Rencana Peningkatan UI/UX Halaman Home

**Tujuan:**
Meningkatkan kesan "Premium Sporty & Energetic" pada halaman utama (Home) dan memperbaiki User Experience secara umum.

**Fokus Saat Ini: Fase 1 - Entrance Animations (Scroll Animations)**

## Latar Belakang
Halaman Home saat ini merender komponen secara statis (langsung muncul semua). Untuk website *company profile* modern, animasi elemen yang muncul secara mulus (fade in, slide up) saat user melakukan *scroll* (viewport detection) sangat penting untuk memberikan kesan dinamis dan premium.

## Rencana Implementasi (Fase 1)

Kita akan menggunakan library `framer-motion` (yang sudah terinstall di project dan digunakan pada *marquee* partner/testimoni) untuk memberikan efek kemunculan saat user men-scroll ke bawah.

### Komponen Target:
Berikut adalah daftar komponen di dalam `resources/js/Components/features/home/` yang akan ditambahkan animasi `whileInView`:

1.  **`HowToOrder.tsx`**
    *   **Judul/Header:** Fade-in up.
    *   **Kartu Langkah (Grid):** Staggered fade-in up (muncul berurutan).

2.  **`FeaturedProducts.tsx`**
    *   **Judul & Link "Semua Produk":** Fade-in up.
    *   **Grid Produk:** Staggered fade-in (muncul berurutan satu per satu atau dua per dua).

3.  **`PortfolioShowcase.tsx`**
    *   **Judul & Deskripsi:** Fade-in up.
    *   **Grid Gambar:** Staggered fade-in scale (muncul dengan efek sedikit membesar dari dalam).

4.  **`KeyBenefits.tsx`**
    *   *Catatan:* Perlu mengecek isi file ini, tapi umumnya akan menggunakan pendekatan staggered untuk kartu/poin keunggulan.

5.  **`MaterialShowcase.tsx` & `FAQSection.tsx` & `LatestNews.tsx`** (Optional/Next Step)
    *   Penerapan animasi sederhana pada kontainer utama tiap seksi.

### Teknis Eksekusi
- Kita akan membungkus elemen HTML standar (seperti `<div>`, `<h2>`, `<p>`) dengan komponen dari framer-motion (seperti `<motion.div>`, `<motion.h2>`).
- Menggunakan properti `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, dan `viewport={{ once: true, margin: "-100px" }}`.
- *Once: true* memastikan animasi hanya berjalan satu kali agar tidak mengganggu jika user scroll naik-turun berkali-kali.

## Fase Selanjutnya (Akan direncanakan setelah Fase 1 selesai)
*   **Fase 2:** Optimasi SEO & Open Graph Meta Tags (`Home.tsx`).
*   **Fase 3:** Floating WhatsApp Global & Tombol Back to Top (`PublicLayout.tsx`).
*   **Fase 4:** Swipeable Mobile Slider (`FeaturedProducts.tsx` / `HowToOrder.tsx`).
*   **Fase 5:** Lazy Loading Images.

---
*Apakah Anda setuju dengan rencana eksekusi Fase 1 (Scroll Animations) ini? Jika ya, saya akan langsung memulai modifikasi pada komponen.*