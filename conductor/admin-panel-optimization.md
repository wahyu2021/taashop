# Rencana Optimasi UI/UX Admin Panel

**Tujuan:**
Memberikan sentuhan animasi *entrance* yang elegan dan memastikan *user experience* (UX) yang halus di area Admin Panel menggunakan `framer-motion`, sejalan dengan identitas "Premium Sporty & Energetic". Serta memastikan tata letak dan performa berjalan optimal.

*Sesuai instruksi, setiap kali satu fase selesai dikerjakan, saya akan otomatis melakukan Git Commit (Atomic Commit) agar perubahan bisa dikembalikan dengan mudah jika terjadi kesalahan.*

## Latar Belakang
Admin Panel saat ini sudah berfungsi dengan baik (CRUD beres), namun tampilannya terasa statis saat berpindah halaman atau membuka menu baru. Menambahkan efek transisi sederhana akan memberikan kesan panel manajemen yang canggih dan responsif.

## Rencana Implementasi

### Fase 1: Animasi Layout Utama (AdminLayout)
*   **File Target:** `resources/js/Layouts/AdminLayout.tsx`
*   **Tindakan:**
    *   Membungkus area `{children}` (konten utama) dengan `<motion.main>` untuk memberikan efek *fade-in* atau *slide-up* halus setiap kali admin berpindah halaman. Ini menciptakan efek transisi halaman tanpa *loading* yang kasar.
    *   Menambahkan `framer-motion` import.
*   **Atomic Commit:** `git commit -m "feat: add page transition animation to admin layout"`

### Fase 2: Animasi Dashboard (Statistik & Kartu)
*   **File Target:** `resources/js/Pages/Admin/Dashboard.tsx`
*   **Tindakan:**
    *   Menerapkan *staggered animation* pada kartu-kartu statistik (seperti Total Produk, Pesan Masuk, dll). Kartu akan muncul secara berurutan saat *dashboard* dimuat.
    *   Memberikan efek *hover* yang sedikit membesar (`scale`) menggunakan class Tailwind atau framer-motion untuk kartu interaktif.
*   **Atomic Commit:** `git commit -m "feat: add staggered animation to admin dashboard cards"`

### Fase 3: Animasi pada Halaman Tabel (Index / Data List)
*   **File Target:** Halaman `Index.tsx` pada folder CRUD utama (seperti `Product/Index.tsx`, `Portfolio/Index.tsx`, `Inbox/Index.tsx`).
*   **Tindakan:**
    *   Membungkus tabel data atau *grid* gambar (di Portfolio/Produk) dengan animasi masuk (*fade-in*).
    *   Jika ada gambar dalam tabel/grid di area Admin, pastikan menambahkan `loading="lazy"` agar *browser* admin tidak berat saat data yang diinput sudah ratusan.
*   **Atomic Commit:** `git commit -m "perf: apply animation and lazy loading to admin tables"`

### Fase 4: Optimasi Sidebar (Interaksi)
*   **File Target:** `resources/js/Layouts/AdminLayout.tsx`
*   **Tindakan:**
    *   Mengganti elemen statis Sidebar di *mobile* menggunakan `<AnimatePresence>` dari `framer-motion` agar menu samping (*drawer*) meluncur mulus dari kiri ke kanan.
*   **Atomic Commit:** `git commit -m "feat: add smooth slide animation to mobile admin sidebar"`

---
*Apakah Anda setuju dengan rencana ini beserta alur Atomic Commit-nya?*