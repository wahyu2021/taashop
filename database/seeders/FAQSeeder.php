<?php

namespace Database\Seeders;

use App\Models\FAQ;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Berapa minimal order di Taaashop?',
                'answer' => 'Minimal order untuk pembuatan jersey kustom adalah 12 pcs (1 lusin) per desain. Untuk sablon satuan, silakan hubungi admin kami.',
                'order_priority' => 1
            ],
            [
                'question' => 'Berapa lama proses produksi?',
                'answer' => 'Estimasi waktu produksi normal adalah 7-14 hari kerja, tergantung pada antrian dan jumlah pesanan Anda.',
                'order_priority' => 2
            ],
            [
                'question' => 'Apakah bisa bantu desain?',
                'answer' => 'Tentu! Kami menyediakan layanan gratis konsultasi desain untuk setiap pemesanan minimal order. Tim kreatif kami siap membantu mewujudkan jersey impian Anda.',
                'order_priority' => 3
            ],
            [
                'question' => 'Bahan apa yang digunakan untuk jersey?',
                'answer' => 'Kami menggunakan bahan Dryfit premium (Milano, Brazil, bintik) yang memiliki fitur anti-UV dan cepat kering (Quick-Dry) sehingga sangat nyaman untuk olahraga.',
                'order_priority' => 4
            ],
        ];

        foreach ($faqs as $faq) {
            FAQ::create($faq);
        }
    }
}
