# Taaashop Web - Company Profile & Katalog Custom

Taaashop Web adalah platform Company Profile dan Katalog Produk modern yang dirancang khusus untuk bisnis sablon dan jersey kustom. Proyek ini merupakan hasil *rebuild* dari arsitektur lama ke sistem **Modern Monolith** yang lebih efisien, aman, dan mudah dikelola.

## 🚀 Fitur Utama
- **Landing Page Modern**: Hero section dinamis, showcase layanan, dan keunggulan bisnis.
- **Katalog Produk**: Daftar produk jersey dan sablon dengan sistem filter.
- **Galeri Portfolio**: Menampilkan hasil kerja nyata untuk membangun kepercayaan klien.
- **Manajemen Media**: Optimasi gambar otomatis (WebP & Responsive) menggunakan Spatie MediaLibrary.
- **Admin Panel Kustom**: Dashboard internal untuk mengelola konten tanpa pihak ketiga.
- **Integrasi WhatsApp**: Alur pemesanan yang diarahkan langsung ke tim sales melalui WhatsApp.

## 🛠 Tech Stack
- **Backend**: [Laravel 12](https://laravel.com) (PHP 8.2+)
- **Frontend**: [React 19](https://react.dev) via [Inertia.js](https://inertiajs.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Database**: MySQL
- **Data Layer**: [Spatie Laravel Data](https://spatie.be/docs/laravel-data) (Type-safe DTOs)

## 📦 Persyaratan Sistem
- PHP 8.2 atau lebih tinggi
- Node.js (LTS) & NPM
- Composer
- MySQL 8.0+

## 🛠 Instalasi Cepat
1. Clone repository.
2. Jalankan `composer install` & `npm install`.
3. Salin `.env.example` ke `.env` dan atur database.
4. Jalankan `php artisan key:generate`.
5. Jalankan migrasi: `php artisan migrate --seed`.
6. Jalankan server: `php artisan serve` & `npm run dev`.

*Detail langkah-langkah instalasi dan standar kode dapat dilihat di [CONTRIBUTING.md](./CONTRIBUTING.md).*

## 🤝 Kontribusi
Kami sangat menghargai kontribusi dari tim. Sebelum memulai, harap baca **[Panduan Kontribusi](./CONTRIBUTING.md)** kami untuk memahami standar arsitektur dan alur kerja (SOP) yang digunakan.

## 🛡 Keamanan
Jika Anda menemukan celah keamanan, harap laporkan secara privat melalui prosedur yang ada di **[SECURITY.md](./SECURITY.md)**.

## 📄 Lisensi
Proyek ini dilindungi oleh lisensi **Proprietary** milik Taaashop. Lihat file [LICENSE](./LICENSE) untuk detail lebih lanjut.
