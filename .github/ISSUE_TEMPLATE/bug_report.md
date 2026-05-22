name: Laporan Bug
description: Laporkan kesalahan atau masalah yang ditemukan di aplikasi.
title: "[BUG] <Judul Singkat Bug>"
labels: ["bug"]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Terima kasih telah melaporkan bug! Laporan yang jelas membantu kami memperbaiki masalah lebih cepat.
  - type: textarea
    id: bug-description
    attributes:
      label: Deskripsi Bug
      description: Jelaskan bug yang ditemukan secara detail.
      placeholder: Contoh - Produk tidak muncul saat filter kategori 'Jersey' diaktifkan.
    validations:
      required: true
  - type: textarea
    id: steps-to-reproduce
    attributes:
      label: Langkah untuk Mereproduksi
      description: Bagaimana cara kami melihat bug ini terjadi?
      placeholder: |
        1. Buka halaman Katalog.
        2. Pilih filter kategori 'Jersey'.
        3. Lihat daftar produk.
    validations:
      required: true
  - type: textarea
    id: expected-behavior
    attributes:
      label: Ekspektasi Hasil
      description: Apa yang seharusnya terjadi?
      placeholder: Seharusnya muncul daftar produk dengan kategori Jersey.
    validations:
      required: true
  - type: textarea
    id: actual-behavior
    attributes:
      label: Hasil Aktual
      description: Apa yang sebenarnya terjadi?
      placeholder: Daftar produk menjadi kosong/blank.
    validations:
      required: true
  - type: textarea
    id: environment
    attributes:
      label: Environment
      description: Informasi mengenai perangkat atau browser yang digunakan.
      placeholder: Contoh - Chrome v120, Windows 11.
  - type: textarea
    id: screenshots
    attributes:
      label: Lampiran (Screenshot/Video)
      description: Lampirkan bukti visual jika memungkinkan.
