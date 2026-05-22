# Project Context: Taashop Web (Rebuild & Redesign)

## 1. Identitas Project

Taashop adalah website Company Profile & Katalog untuk bisnis sablon dan jersey kustom.
Project ini adalah proses **Rebuild & Redesign** dari arsitektur lama (Next.js + Sanity) menjadi sistem Monolith modern dengan Custom Admin Panel (tanpa layanan CMS pihak ketiga).

## 2. Tech Stack & Environment

- **Backend:** Laravel 12 (PHP 8.2)
- **Frontend Server-Side Routing:** Inertia.js
- **Frontend UI:** React.js (Functional Components & Hooks)
- **Styling:** Tailwind CSS + shadcn/ui + Lucide React
- **Database:** MySQL (`db_taashop`)
- **Autentikasi Admin:** Laravel Session (menggunakan Laravel Breeze)
- **Media Management:** Spatie MediaLibrary (WebP, Responsive Images)
- **Data Layer:** Spatie Laravel Data (DTO for Type-Safety)

## 3. Direktori & Referensi Legacy (SANGAT PENTING)

- **Project Baru (Kerja di sini):** `D:\Coding\taashop-web`
- **Project Lama (Hanya untuk referensi):** `D:\Coding\taashop-web-legacy`
- **ATURAN DESAIN:** Jangan menyalin mentah-mentah desain/CSS dari project lama. Gunakan project lama **hanya** untuk memahami alur fitur, melihat skema data (Sanity Schema), dan mengambil aset (gambar/logo). Buatkan UI/UX baru yang lebih fresh, modern, premium, dan clean menggunakan komponen `shadcn/ui`.

## 4. Aturan Ketat (Anti-Halu & Anti-Overengineering)

1. **Pola Pikir Inertia:** DILARANG membuat endpoint REST API terpisah (seperti `/api/products`) untuk frontend React. Selalu oper data menggunakan `Inertia::render('PageName', $data)` dari Controller Laravel.
2. **Tidak Ada Payment Gateway:** Proses "Checkout" difokuskan pada "Lihat Katalog -> Hubungi via WhatsApp". Jangan buat sistem keranjang belanja yang rumit dengan kalkulasi ongkir.
3. **Database Relasional:** Tinggalkan pola pikir NoSQL Sanity. Semua data dinamis harus punya Migration dan Model yang jelas berelasi di MySQL. Jangan gunakan tabel JSON kecuali untuk pengaturan global (`site_settings`).

## 5. Scope Fitur Utama

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

## 6. Arsitektur & Standar Kode

**A. Backend (Laravel - Scalable Monolith):**
Gunakan pola **Repository & Service** dengan penguatan pada Type-Safety.
1. **Models:** Definisi skema database dan relasi. Gunakan Enums untuk status/tipe.
2. **Enums (`app/Enums`):** Gunakan Native PHP Enums untuk semua nilai konstan (Status Produk, Tipe Bahan, dll).
3. **Data Transfer Objects (`app/Data`):** Gunakan `spatie/laravel-data` untuk mengirim data dari Service ke Frontend. Ini menjamin sinkronisasi type antara PHP dan TypeScript.
4. **Requests (`app/Http/Requests`):** Validasi input dan otorisasi request sebelum masuk ke controller.
5. **Repositories (`app/Repositories`):** Fokus pada query data. Pisahkan antara `Interface` (kontrak) dan `EloquentImplementation`.
6. **Services (`app/Services`):** Tempat Business Logic utama. Mengoordinasikan Repository, Media handling, dan SEO logic.
7. **Controllers:** *Thin Controller*. Hanya bertugas memanggil Service dan me-render `Inertia::render` menggunakan DTO.

**B. Frontend (React 19 + TypeScript):**
Gunakan struktur modular untuk mendukung reusability dan type-safety.
1. **Types (`resources/js/types`):** Pusat definisi interface TypeScript. Gunakan generated types dari backend jika memungkinkan.
2. **Components (`resources/js/Components`):**
   - `ui/`: Komponen dasar dari shadcn/ui.
   - `shared/`: Komponen reusable lintas halaman (Navbar, Footer, Layout-related).
   - `features/`: Komponen kompleks yang terikat fitur tertentu (misal: `ProductCard`, `OrderForm`).
3. **Pages (`resources/js/Pages`):** Terorganisir per modul (misal: `Product/Index.tsx`, `Admin/Dashboard.tsx`). Gunakan subfolder `Partials/` untuk komponen yang hanya dipakai di satu halaman tersebut.
4. **Hooks (`resources/js/hooks`):** Custom hooks untuk logic frontend yang reusable.
5. **Utils (`resources/js/utils`):** Helper functions (formatting currency, date, dll).

**C. Standar Testing (Quality Assurance):**
Gunakan **Pest PHP** sebagai framework testing utama.
1. **Unit Tests (`tests/Unit`):** Fokus pada logika murni di `Services` dan `Repositories`.
2. **Feature Tests (`tests/Feature`):** Fokus pada validasi route dan Inertia response.
3. **Mandatory Testing:** Setiap penambahan logic di Service WAJIB disertai Unit Test.

**D. Standar Git & Komitmen (Atomic Commits):**
Gunakan pola **Conventional Commits** dan lakukan commit setelah setiap sub-fitur/langkah teknis selesai.
1. **Format:** `type: [fitur] - penjelasan` (Contoh: `feat: product - migration & model`).
2. **Kapan Harus Commit:**
   - Setelah membuat Migration & Model.
   - Setelah membuat Repository & Service.
   - Setelah membuat Controller & Routes.
   - Setelah membuat Komponen UI & Page.
   - Setelah melakukan bug fix atau refactoring besar.
3. **Aturan:** Jangan menggabungkan terlalu banyak perubahan berbeda dalam satu commit (Atomic).

## 7. Alur Eksekusi AI (Standard Operating Procedure)

Setiap kali diminta membuat fitur baru, lakukan berurutan:

1. **Research & Mapping:** Inspeksi folder legacy.
2. **Enum & Database Layer:** Buat `Enums`, `Migration`, dan `Model`. **[COMMIT]**
3. **Data Layer (DTO):** Buat `Data` class (DTO).
4. **Repository Layer:** Buat `Interface` dan `Implementation`.
5. **Service Layer:** Buat logic bisnis. **[COMMIT]**
6. **Request & Controller Layer:** Buat `FormRequest` dan `Controller`. **[COMMIT]**
7. **Frontend Layer:** Implementasikan UI (Types, Components, Pages). **[COMMIT]**
8. **Verification & Testing:** Jalankan test dan build. **[COMMIT FINAL]**
