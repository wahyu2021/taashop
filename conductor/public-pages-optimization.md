# Rencana Optimasi Halaman Publik (Katalog, Portofolio, Informasi)

**Tujuan:**
Menerapkan standar optimasi yang sama seperti halaman Home ke seluruh halaman publik lainnya. Fokus utamanya adalah performa pemuatan gambar (*Lazy Loading*) dan kemudahan berbagi (*Shareability*) melalui Dynamic SEO Meta Tags.

## Latar Belakang
Halaman selain Home (seperti Katalog dan Portfolio) saat ini memiliki daftar gambar yang panjang tanpa *lazy loading*, yang memicu beban muat yang berat. Selain itu, ketiadaan tag Open Graph spesifik membuat tautan produk/portofolio terlihat kurang profesional saat dibagikan ke media sosial atau WhatsApp karena tidak memunculkan gambar *thumbnail* atau deskripsi produk yang sesuai.

## Rencana Implementasi

Saya akan membagi optimasi ini berdasarkan jenis halamannya:

### Fase 1: Optimasi Halaman "Index" (Katalog & Portofolio List)
Halaman ini memuat banyak gambar sekaligus.
*   **File Target:** 
    *   `resources/js/Pages/Catalog/Index.tsx`
    *   `resources/js/Pages/Portfolio/Index.tsx`
*   **Tindakan:**
    *   **Lazy Loading:** Menambahkan `loading="lazy"` pada elemen `<img>` yang ada di dalam grid.
    *   **SEO Meta Tags:** Menambahkan tag Open Graph standar menggunakan fallback `site_settings.hero_image` dan `site_settings.hero_description`.

### Fase 2: Optimasi Halaman "Show/Detail" (Produk & Portofolio Detail)
Halaman ini adalah halaman yang paling sering dibagikan secara spesifik oleh user ke orang lain.
*   **File Target:**
    *   `resources/js/Pages/Catalog/Show.tsx`
    *   `resources/js/Pages/Portfolio/Show.tsx`
*   **Tindakan:**
    *   **Dynamic SEO Meta Tags (Krusial):** 
        *   `og:title` dan `twitter:title` akan diisi menggunakan nama produk/portofolio secara spesifik.
        *   `og:description` akan diisi menggunakan ringkasan produk.
        *   `og:image` akan diatur agar menunjuk *langsung* ke URL gambar produk/portofolio tersebut. Sehingga saat di-share, *thumbnail* yang muncul adalah foto spesifik barang tersebut.
    *   **Lazy Loading:** Menambahkan `loading="lazy"` pada gambar produk *Related/Lainnya* yang ada di bagian bawah halaman.

### Fase 3: Optimasi Halaman "Informasi" (About, FAQ, Contact)
Halaman informasi statis yang menjelaskan profil bisnis.
*   **File Target:**
    *   `resources/js/Pages/Information/About.tsx`
    *   `resources/js/Pages/Information/FAQ.tsx`
    *   `resources/js/Pages/Information/Contact.tsx`
*   **Tindakan:**
    *   **SEO Meta Tags:** Menambahkan meta description spesifik (misal: "Hubungi tim Taaashop untuk konsultasi...") dan menggunakan gambar *default* dari pengaturan web.
    *   **Lazy Loading:** Jika ada gambar pendukung (seperti di halaman About), akan ditambahkan `loading="lazy"`.

---
*Apakah Anda setuju dengan rencana 3 fase di atas untuk menyempurnakan keseluruhan website publik Taaashop? Jika ya, saya akan segera memulai modifikasi kodenya.*