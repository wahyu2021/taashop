# Analisis Proyek Web: Taaashop

## 1. Ringkasan Eksekutif
Proyek **Taaashop** adalah sebuah aplikasi web yang dibangun untuk platform e-commerce atau profil perusahaan yang menjual jersey dan *apparel* kustom (kemungkinan besar berfokus pada jersey olahraga dan kaos). Proyek ini menggunakan arsitektur modern berbasis **Next.js (App Router)** yang terintegrasi dengan **Sanity CMS** untuk manajemen konten yang dinamis (Headless CMS).

---

## 2. Arsitektur & Teknologi Utama (*Tech Stack*)

Proyek ini dibangun menggunakan *stack* teknologi yang sangat modern dan optimal:

*   **Framework:** Next.js 16 (dengan React 19)
*   **Styling & UI:**
    *   Tailwind CSS v4 (sebagai kerangka utilitas utama)
    *   Radix UI (primitif komponen yang *accessible*, digunakan untuk Dialog, Accordion, Dropdown, Navigation, dll - pola *shadcn/ui*)
    *   Lucide React (library ikon)
    *   Embla Carousel (untuk elemen *slider* otomatis)
*   **Animasi:** `tw-animate-css` dan pengaturan *flip card* CSS kustom 3D.
*   **Data & CMS (Headless):** Sanity CMS (`@sanity/client`, `next-sanity`)
*   **Keamanan & Autentikasi:** 
    *   `bcryptjs` (untuk hash password)
    *   `jose` / `jsonwebtoken` (untuk autentikasi *custom admin*)
    *   Implementasi *rate-limiting* kustom (`rate-limit.ts`)
*   **Validasi:** Zod (validasi form dan skema)
*   **Lain-lain:** ApexCharts (untuk grafik di panel admin/dashboard).

---

## 3. Struktur Direktori Utama

Proyek mengikuti struktur standar Next.js `src` yang terorganisir dengan rapi:

*   📂 **`src/app/`**: Struktur *routing* utama berbasis *App Router*.
    *   `/admin`: *Routing* untuk dashboard admin kustom (termasuk sub-folder `(dashboard)`, `login`, `studio` untuk akses langsung CMS).
    *   `/api`: Endpoint API backend *serverless*.
    *   `/faq`, `/galeri`, `/kontak`, `/tentang-kami`, `/ukuran-harga`: Halaman publik (statis/dinamis).
*   📂 **`src/components/`**: Komponen UI yang dapat digunakan kembali (*reusable*).
    *   `/beranda`: Komponen khusus halaman utama (Hero, Services, Portfolio, Testimonial, dll).
    *   `/ui`: Komponen dasar (*base components*) yang dibangun menggunakan *Tailwind/Radix* (seperti *button*, *card*, *input*).
    *   `JerseyModel.tsx`: Komponen khusus yang menampilkan visualisasi produk dengan efek *3D Flip Card* interaktif.
*   📂 **`src/sanity/`**: Konfigurasi lokal dan skema untuk Sanity CMS.
    *   `/schemaTypes`: Berisi semua definisi model data (*schemas*).
*   📂 **`src/lib/`**: Fungsi utilitas dan bantuan (*helper functions*).
    *   `sanity-api.ts`: Konfigurasi *client* Sanity untuk akses tulis (*write access*) via token `SANITY_API_TOKEN`.
    *   `rate-limit.ts`, `products.ts`, dll.

---

## 4. Skema Database (Sanity CMS)

Aplikasi ini mendefinisikan beberapa entitas yang sangat komprehensif di dalam CMS, sehingga hampir semua bagian website dapat diubah melalui dashboard Sanity:

1.  **Entitas Produk & Penjualan:**
    *   `product.ts`: Detail produk individual.
    *   `productPackage.ts`: Paket penawaran atau *bundle*.
    *   `material.ts`: Penjelasan/detail bahan yang digunakan.
    *   `orderingStep.ts`: Langkah-langkah cara pemesanan.
2.  **Entitas Halaman Publik:**
    *   `feature.ts` & `service.ts`: Konten untuk bagian "Layanan" dan "Mengapa memilih kami".
    *   `faq.ts`: Pertanyaan yang sering diajukan.
    *   `testimonial.ts`: Review/Testimoni dari klien/pembeli.
3.  **Pengaturan & Admin:**
    *   `siteSettings.ts`: Konfigurasi global web (logo, info kontak, sosial media, SEO meta).
    *   `adminUser.ts`: Akun khusus untuk *custom dashboard*.
    *   `contactSubmission.ts`: Data dari formulir kontak web.
    *   `pageView.ts`: Pelacakan analitik lalu lintas atau *views*.

---

## 5. Fitur Utama (*Key Features*)

Berdasarkan struktur kodenya, berikut adalah fitur utama yang menonjol pada proyek Taaashop:

### A. *Landing Page* Dinamis (Halaman Utama)
Halaman depan menggunakan struktur modular dengan optimasi *Lazy Loading* (kelas `.section-lazy`) untuk menjaga performa skor yang tinggi, yang mencakup:
*   *Hero Section*
*   *Services & Why Choose Us*
*   *Portfolio* & *Customer Compliments* (Testimoni)
*   *How To Order*
*   *CTA (Call to Action)*

### B. Dashboard Admin Kustom & Analytics
Alih-alih hanya mengandalkan Sanity Studio, proyek ini membuat **Custom Admin Dashboard** (`/app/admin`) menggunakan autentikasi mandiri (`bcryptjs`, `jose`). Terdapat fitur untuk melihat grafik menggunakan **ApexCharts** dan sistem analitik sederhana (`AnalyticsTracker.tsx`).

### C. UI yang Kaya dan Interaktif
Mengadopsi tema modern dengan dukungan **Dark Mode** (`next-themes`, `ThemeToggle.tsx`). Penyajian produk di halaman seperti `/galeri` memanfaatkan efek balik 3D yang sangat interaktif (`JerseyModel.tsx`).

### D. Keamanan (*Security Measures*)
Proyek ini mengimplementasikan lapisan keamanan tingkat lanjut untuk endpoint *server-side*, terlihat dari eksistensi modul `rate-limit.ts` (pembatasan request mencegah *DDoS* sederhana atau brute-force) dan manipulasi otentikasi JWT yang di-encode secara mandiri.

---

## 6. Kesimpulan
Proyek **Taaashop Web** adalah sebuah sistem yang sudah diarsiteki dengan sangat kokoh, menggabungkan kecepatan pengiriman halaman statis dari Next.js, manajemen UI modern (*Tailwind + Radix*), kontrol konten yang 100% dinamis melalui Sanity, serta dasbor kustom tersendiri yang dilengkapi dengan pelacakan *page views* yang mandiri.
