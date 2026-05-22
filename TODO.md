# Taashop Web Rebuild - Roadmap & TODO List

File ini berfungsi sebagai panduan langkah-demi-langkah dan pelacakan progres project.

## 🟢 FASE 1: Inisialisasi & Fondasi (COMPLETED)
- [x] Install Laravel 12 (Core)
- [x] Install Laravel Breeze (React + Inertia + TypeScript)
- [x] Inisialisasi shadcn/ui
- [x] Setup Arsitektur (Repository & Service Pattern)
- [x] Install Premium Packages (`spatie/laravel-data`, `spatie/laravel-medialibrary`)
- [x] Pembuatan struktur folder (`app/Data`, `app/Enums`, `app/Repositories`, `app/Services`, `resources/js/types`, dll)

## 🟡 FASE 2: Database & Core Backend (Katalog) (COMPLETED)
- [x] Research: Mapping skema data Produk & Bahan dari `legacy`
- [x] Database: Buat Migration & Model untuk `Categories`, `Products`, `Materials`, `MaterialFeatures`, `Packages`
- [x] Enums: Definisikan status produk dan tipe cetak
- [x] DTO: Buat class `ProductData`, `CategoryData`, `MaterialData`, `PackageData`
- [x] Repositories: Implementasi `ProductRepository`
- [x] Services: Implementasi `ProductService`
- [x] **Testing:** Buat Unit Test untuk `ProductService` & `ProductRepository`
- [x] Implementasi Repository & Service untuk **Materials**
- [x] **Testing:** Buat Unit Test untuk `MaterialService`
- [x] Implementasi Repository & Service untuk **Packages**
- [x] **Testing:** Buat Unit Test untuk `PackageService`
- [x] Seeding: Buat Dummy Data untuk testing awal

## 🔵 FASE 3: Custom Admin Panel (Manajemen Konten) (IN PROGRESS)
- [x] Admin: Dashboard Analytics (Total produk, Inbox pesan)
- [ ] Admin: CRUD Kategori & Produk (dengan upload gambar)
- [ ] Admin: CRUD Portfolio / Galeri
- [ ] Admin: CRUD Konten Statis (FAQ, Testimoni)
- [ ] Admin: Inbox Pesan (Membaca pesan dari formulir kontak)
- [ ] Admin: Pengaturan Web (Site Settings: No WA, Sosmed, Hero Text)
- [ ] **Testing:** Feature Test untuk semua modul Admin Panel

## 🟠 FASE 4: Frontend Publik (Landing & Catalog)
- [ ] Components: Layout Utama (Navbar, Footer, Mobile Menu)
- [ ] Public: Landing Page (Hero, Highlighted Products, Portfolio Preview)
- [ ] Public: Katalog Page (List Produk dengan Filter & Search)
- [ ] Public: Detail Produk (Deskripsi, Galeri, Tombol Order via WA)
- [ ] Public: Galeri / Portfolio Page
- [ ] Public: Info Page (About, FAQ, Cara Order)
- [ ] Public: Contact Form (Submit ke Database/Inbox Admin)
- [ ] **Testing:** Feature Test untuk navigasi dan tampilan data publik

## 🔴 FASE 5: Finalisasi & Optimasi
- [ ] SEO: Implementasi dynamic Meta Tags (OpenGraph)
- [ ] Performance: Optimasi gambar (WebP) & Lazy Loading
- [ ] Verification: Smoke test keseluruhan dan build check
- [ ] Final Build: `npm run build`

---
*Status Terakhir: Selesai implementasi Admin Dashboard Analytics. Siap masuk ke CRUD Produk & Kategori.*
