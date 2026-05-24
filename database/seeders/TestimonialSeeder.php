<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'customer_name' => 'Budi Santoso',
                'customer_title' => 'Kapten FC Maju Jaya',
                'content' => 'Gila sih hasilnya! Bahannya adem banget buat main siang bolong. Desainnya juga persis banget sama mockup awal. Sukses terus Taaashop!',
                'rating' => 5,
                'order_priority' => 1
            ],
            [
                'customer_name' => 'Andini Putri',
                'customer_title' => 'Manager E-Sport Community',
                'content' => 'Udah langganan di sini dari tahun lalu. Pelayanannya ramah, adminnya fast respon. Jersey tim kami selalu jadi pusat perhatian tiap turnamen.',
                'rating' => 5,
                'order_priority' => 2
            ],
            [
                'customer_name' => 'Riko Wijaya',
                'customer_title' => 'Ketua Geng Sepeda santai',
                'content' => 'Sablonnya rapi banget, gak pecah meskipun udah dicuci berkali-kali. Pengerjaannya juga on-time, malah lebih cepet dari estimasi.',
                'rating' => 4,
                'order_priority' => 3
            ],
        ];

        foreach ($testimonials as $item) {
            Testimonial::create($item);
        }
    }
}
