<?php

namespace Database\Seeders;

use App\Enums\ProductStatus;
use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Tips Memilih Bahan Jersey yang Tepat untuk Tim Anda',
                'summary' => 'Panduan lengkap memilih material kain jersey sesuai kebutuhan olahraga dan budget tim Anda.',
                'content' => '<p>Memilih bahan jersey yang tepat sangat penting untuk kenyamanan dan performa tim. Ada beberapa jenis bahan yang umum digunakan seperti Dry-Fit, Hyget, dan Paragon.</p><p>Dry-Fit adalah pilihan terbaik untuk jersey olahraga karena kemampuannya menyerap keringat dan cepat kering. Material ini juga ringan dan sangat nyaman dipakai saat berolahraga.</p><p>Hyget memiliki karakteristik yang mirip dengan Dry-Fit namun dengan harga yang lebih terjangkau. Cocok untuk tim yang ingin kualitas baik dengan budget yang efisien.</p>',
                'published_at' => now()->subDays(2),
            ],
            [
                'title' => 'Tren Desain Jersey 2026: Bold, Minimal, dan Futuristik',
                'summary' => 'Eksplorasi tren terbaru dalam desain jersey olahraga dan sportswear yang sedang populer tahun ini.',
                'content' => '<p>Tren desain jersey tahun 2026 mengarah ke gaya yang lebih bold namun tetap clean. Penggunaan warna-warna berani seperti neon gradients dan pola geometris asimetris menjadi favorit.</p><p>Desain minimalis dengan aksen kuat juga semakin diminati. Tim-tim modern cenderung memilih desain yang simpel namun memiliki identitas yang kuat.</p>',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Panduan Perawatan Jersey Agar Tetap Awet dan Nyaman',
                'summary' => 'Cara merawat jersey kustom agar warna tidak pudar dan bahan tetap nyaman dipakai dalam jangka panjang.',
                'content' => '<p>Jersey yang dirawat dengan baik bisa bertahan bertahun-tahun. Berikut tips perawatan yang tepat:</p><p>1. Cuci dengan air dingin untuk menjaga warna tetap cerah. 2. Hindari penggunaan pemutih. 3. Jangan dikeringkan dengan mesin pengering, cukup dijemur di tempat teduh. 4. Setrika dengan suhu rendah atau gunakan steamer.</p>',
                'published_at' => now()->subDays(10),
            ],
        ];

        foreach ($articles as $data) {
            News::create([
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'summary' => $data['summary'],
                'content' => $data['content'],
                'status' => ProductStatus::PUBLISHED,
                'published_at' => $data['published_at'],
                'order_priority' => 0,
            ]);
        }
    }
}
