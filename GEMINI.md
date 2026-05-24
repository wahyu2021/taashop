# Project Context: Taaashop Web (Rebuild & Redesign)

## 1. Identitas Project

Taaashop adalah website Company Profile & Katalog untuk bisnis sablon dan jersey kustom.
Project ini adalah proses **Rebuild & Redesign** dari arsitektur lama (Next.js + Sanity) menjadi sistem Monolith modern dengan Custom Admin Panel (tanpa layanan CMS pihak ketiga).

## 2. Tech Stack & Environment

- **Backend:** Laravel 12 (PHP 8.2)
- **Frontend Server-Side Routing:** Inertia.js
- **Frontend UI:** React.js 19 (Functional Components & Hooks)
- **Styling:** Tailwind CSS + shadcn/ui + Lucide React
- **Database:** MySQL (`db_taaashop`)
- **Autentikasi Admin:** Laravel Session (menggunakan Laravel Breeze)
- **Media Management:** Spatie MediaLibrary (WebP, Responsive Images)
- **Data Layer:** Spatie Laravel Data (DTO for Type-Safety)

## 3. Direktori & Referensi Legacy (SANGAT PENTING)

- **Project Baru (Kerja di sini):** `D:\Coding\taaashop-web`
- **Project Lama (Hanya untuk referensi):** `D:\Coding\taaashop-web-legacy`
- **ATURAN DESAIN:** Jangan menyalin mentah-mentah desain/CSS dari project lama. Gunakan project lama **hanya** untuk memahami alur fitur, melihat skema data (Sanity Schema), dan mengambil aset (gambar/logo). Buatkan UI/UX baru yang lebih fresh, modern, premium, dan clean menggunakan komponen `shadcn/ui`.

## 4. UI Design System (Brand Identity)

Berdasarkan analisis logo legacy, identitas visual Taaashop mengusung tema **"Premium Sporty & Energetic"**.

### A. Palet Warna (Color Palette)
- **Primary (Orange):** `#EF8313` (Main action, Highlights, Brand identity).
- **Foreground/Text:** `#1C1917` (Stone 900 - Deep brown/black for premium readability).
- **Background:** 
  - Light: `#FFFFFF` (White - for Clean/Minimalist look).
  - Dark: `#0C0A09` (Stone 950 - for Premium/Dark mode sections).
- **Muted/Secondary:** `#78716C` (Stone 500 - for sub-labels and secondary info).

### B. Style & Layout Guidelines
1. **Mobile First Design:** Prioritaskan tampilan smartphone (portrait) sebelum desktop. Gunakan *stacking layout* yang nyaman dibaca dengan jempol.
2. **Typography:** Gunakan font Sans-serif yang modern (Inter atau Default Tailwind sans). Header harus tegas (*Bold/ExtraBold*) untuk kesan *sporty*.
3. **Glassmorphism & Shadows:** Gunakan *subtle shadows* dan sesekali *glassmorphism* (blur background) untuk elemen card agar terlihat modern.
4. **Interactive Feedback:** Pastikan setiap tombol dan link memiliki *hover/active states* yang jelas.

## 5. Aturan Ketat (Anti-Halu & Anti-Overengineering)

1. **Pola Pikir Inertia:** DILARANG membuat endpoint REST API terpisah (seperti `/api/products`) untuk frontend React. Selalu oper data menggunakan `Inertia::render('PageName', $data)` dari Controller Laravel.
2. **Tidak Ada Payment Gateway:** Proses "Checkout" difokuskan pada "Lihat Katalog -> Hubungi via WhatsApp". Jangan buat sistem keranjang belanja yang rumit dengan kalkulasi ongkir.
3. **Database Relasional:** Tinggalkan pola pikir NoSQL Sanity. Semua data dinamis harus punya Migration dan Model yang jelas berelasi di MySQL. Jangan gunakan tabel JSON kecuali untuk pengaturan global (`site_settings`).

## 6. Scope Fitur Utama

**A. Frontend Publik:**
1. Landing Page (Hero modern, Layanan, Keunggulan, Highlight Portfolio).
2. Katalog Produk (Daftar jersey/sablon dengan filter sederhana).
3. Galeri / Portfolio (Menampilkan hasil jadi).
4. Halaman Info (FAQ, Tentang Kami, Cara Order).
5. Formulir Kontak Web.

**B. Custom Admin Panel:**
1. Dashboard Analytics sederhana (Total produk, Pesan masuk).
2. Manajemen Katalog (CRUD Produk & Bahan/Paket).
3. Manajemen Konten (CRUD Portfolio, FAQ, Testimoni).
4. Inbox Pesan (Membaca pesan dari formulir kontak).
5. Pengaturan Web (Key-Value tabel untuk mengubah teks Hero, Nomor WA, Link Sosmed).

## 7. Arsitektur & Standar Kode

**A. Backend (Laravel - Scalable Monolith):**
Gunakan pola **Repository & Service** dengan penguatan pada Type-Safety.
1. **Models:** Definisi skema database dan relasi. Gunakan Enums untuk status/tipe.
2. **Enums (`app/Enums`):** Gunakan Native PHP Enums untuk semua nilai konstan.
3. **Data Transfer Objects (`app/Data`):** Gunakan `spatie/laravel-data` untuk mengirim data dari Service ke Frontend.
4. **Requests (`app/Http/Requests`):** Validasi input dan otorisasi.
5. **Repositories (`app/Repositories`):** Fokus pada query data (Interface + Eloquent).
6. **Services (`app/Services`):** Business Logic utama (Media, SEO, dll).
7. **Controllers:** *Thin Controller*. Hanya memanggil Service dan me-render `Inertia::render`.

**B. Frontend (React 19 + TypeScript):**
1. **Types (`resources/js/types`):** Pusat definisi interface TypeScript.
2. **Components (`resources/js/Components`):**
   - `ui/`: Komponen dasar dari shadcn/ui.
   - `shared/`: Komponen reusable lintas halaman.
   - `features/`: Komponen kompleks yang terikat fitur tertentu.
3. **Pages (`resources/js/Pages`):** Terorganisir per modul.
4. **Hooks (`resources/js/hooks` & `resources/js/utils`).**

**C. Standar Testing (Quality Assurance):**
Gunakan **Pest PHP** sebagai framework testing utama.
1. **Unit Tests:** Fokus pada logic di `Services` dan `Repositories`.
2. **Feature Tests:** Fokus pada validasi route dan Inertia response.

**D. Standar Git & Komitmen (Atomic Commits):**
Gunakan **Conventional Commits** dan lakukan commit setelah setiap sub-fitur selesai.

## 8. Alur Eksekusi AI (Standard Operating Procedure)

1. **Research & Mapping:** Inspeksi folder legacy.
2. **Enum & Database Layer:** Buat `Enums`, `Migration`, dan `Model`. **[COMMIT]**
3. **Data Layer (DTO):** Buat `Data` class (DTO).
4. **Repository Layer:** Buat `Interface` dan `Implementation`.
5. **Service Layer:** Buat logic bisnis. **[COMMIT]**
6. **Request & Controller Layer:** Buat `FormRequest` dan `Controller`. **[COMMIT]**
7. **Frontend Layer:** Implementasikan UI (Types, Components, Pages) dengan prinsip **Mobile First**. **[COMMIT]**
8. **Verification & Testing:** Jalankan test dan build. **[COMMIT FINAL]**
