# Panduan Kontribusi Taashop Web

Pertama-tama, terima kasih telah meluangkan waktu untuk berkontribusi di Taashop Web! Kontribusi dari Anda sangat berarti bagi pengembangan proyek ini.

Dokumen ini berfungsi sebagai panduan standar untuk berkontribusi. Gunakan penilaian terbaik Anda, dan jangan ragu untuk mengusulkan perubahan pada dokumen ini melalui *pull request*.

## Daftar Isi

- [Kode Etik](#kode-etik)
- [Ringkasan Tech Stack](#ringkasan-tech-stack)
- [Setup Pengembangan Lokal](#setup-pengembangan-lokal)
- [Arsitektur & Standar Kode](#arsitektur--standar-kode)
- [SOP (Standard Operating Procedure) Fitur Baru](#sop-standard-operating-procedure-fitur-baru)
- [Panduan Branching & Commit](#panduan-branching--commit)
- [Proses Pull Request](#proses-pull-request)

## Kode Etik

Dengan berpartisipasi dalam proyek ini, Anda diharapkan untuk menjunjung tinggi etika profesional. Harap perlakukan semua kontributor dengan hormat, jaga diskusi tetap konstruktif, dan ciptakan lingkungan yang ramah bagi semua orang.

## Ringkasan Tech Stack

Taashop Web dibangun sebagai aplikasi **Modern Monolith** yang berfokus pada *type-safety* dan pengalaman pengembang yang mulus.

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React.js 19 (TypeScript)
- **Routing**: Inertia.js (Server-side routing, dilarang membuat REST API terpisah untuk frontend)
- **Styling**: Tailwind CSS + shadcn/ui + Lucide React
- **Database**: MySQL
- **Packages Utama**: Spatie Laravel Data (DTOs), Spatie MediaLibrary, Laravel Breeze

## Setup Pengembangan Lokal

Untuk menjalankan proyek secara lokal, pastikan Anda telah menginstal PHP 8.2+, Node.js (LTS), Composer, dan MySQL.

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd taashop-web
   ```

2. **Instal dependensi PHP dan Node:**
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   Update file `.env` Anda dengan kredensial MySQL lokal (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

4. **Migrasi Database dan Seeding:**
   ```bash
   php artisan migrate --seed
   ```

5. **Link Storage (untuk Spatie MediaLibrary):**
   ```bash
   php artisan storage:link
   ```

6. **Jalankan Development Server:**
   Anda akan membutuhkan dua tab terminal:
   ```bash
   # Terminal 1: Jalankan Vite untuk aset frontend
   npm run dev

   # Terminal 2: Jalankan Laravel development server
   php artisan serve
   ```

## Arsitektur & Standar Kode

Kami mengikuti aturan arsitektur yang ketat untuk mencegah *over-engineering* dan menjaga integritas tipe data.

### Backend (Laravel)
- **Thin Controllers**: Controller hanya boleh menangani request HTTP dan mengembalikan response (`Inertia::render`). Letakkan logika bisnis di dalam Service.
- **Repository Pattern**: Gunakan Repository (Interface + Implementation) untuk semua query database.
- **Data Transfer Objects (DTOs)**: Gunakan `spatie/laravel-data` untuk mengirim data dari Service ke Controller/Frontend. Ini menjamin sinkronisasi tipe antara PHP dan TypeScript.
- **Enums**: Gunakan Native PHP Enums untuk semua nilai konstan (seperti Status, Tipe) yang terletak di `app/Enums`.
- **Media**: Gunakan Spatie MediaLibrary untuk manajemen file/gambar. Jangan menggunakan logika penyimpanan manual.

### Frontend (React & TypeScript)
- **TypeScript**: Gunakan *strict typing*. Hindari penggunaan `any`. Manfaatkan tipe data yang di-generate dari DTO backend.
- **UI Components**: Gunakan `shadcn/ui`. Jangan menambahkan library UI eksternal kecuali sangat mendesak. Jaga komponen tetap modular di folder `ui/`, `shared/`, dan `features/`.
- **Inertia.js**: Jangan menulis pemanggilan `fetch` atau `axios` secara manual ke endpoint API. Gunakan link komponen dan form helper dari Inertia.

## SOP (Standard Operating Procedure) Fitur Baru

Saat membuat fitur baru, ikuti alur dari Database hingga UI sebagai berikut:

1. **Enum & Database Layer**: Buat Enums, Migrasi, dan Model. Integrasikan Spatie MediaLibrary jika diperlukan.
2. **Data Layer (DTO)**: Buat class Data di `app/Data`.
3. **Repository Layer**: Buat Interface dan Implementation di `app/Repositories`.
4. **Service Layer**: Tulis logika bisnis utama di `app/Services`.
5. **Request & Controller**: Buat `FormRequest` untuk validasi dan Controller yang memanggil Service.
6. **Frontend Layer**: Update `resources/js/types`, implementasikan UI di folder `Components` dan `Pages`.
7. **Verifikasi**: Jalankan test (Pest) dan pastikan build frontend berhasil (`npm run build`).

## Panduan Branching & Commit

### Penamaan Branch
Gunakan nama branch yang deskriptif dengan awalan jenis pekerjaan:
- `feature/deskripsi` (misal: `feature/katalog-produk`)
- `bugfix/deskripsi` (misal: `bugfix/error-upload-gambar`)
- `hotfix/deskripsi` (misal: `hotfix/login-crash`)
- `chore/deskripsi` (misal: `chore/update-dependencies`)

### Pesan Commit
Kami mengikuti standar [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: tambah filter produk baru`
- `fix: perbaiki issue responsif pada kartu produk`
- `docs: update instruksi instalasi`
- `style: format file dengan prettier`
- `refactor: pindahkan logika ke ProductService`
- `test: tambah unit test untuk pembuatan pesanan`

## Proses Pull Request

1. Pastikan kode Anda mengikuti standar yang telah dijelaskan di atas.
2. Jalankan test backend secara lokal menggunakan Pest: `./vendor/bin/pest`.
3. Pastikan frontend dapat di-*build* tanpa error: `npm run build`.
4. Ajukan Pull Request ke branch `main`.
5. Berikan deskripsi yang jelas dan detail mengenai perubahan apa yang dilakukan dan mengapa.
6. Maintainer akan mereview kode Anda. Harap segera tanggapi jika ada permintaan perubahan.

Setelah disetujui, PR Anda akan di-*merge*. Terima kasih atas kontribusi Anda!
