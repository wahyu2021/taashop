<?php

namespace Database\Seeders;

use App\Enums\ProductStatus;
use App\Models\Category;
use App\Models\Portfolio;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $jerseyCat = Category::where('slug', 'jersey-sportswear')->first();
        $uniformCat = Category::where('slug', 'kemeja-seragam')->first();

        $portfolios = [
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Futsal Tim Garuda FC',
                'client_name' => 'Garuda FC',
                'description' => 'Jersey futsal dengan desain gradasi merah-hitam dan logo bordir premium.',
                'project_date' => now()->subMonths(1),
            ],
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Basket Wisuda Teknik Informatika UNSRI',
                'client_name' => 'Teknik Informatika UNSRI',
                'description' => 'Jersey basket wisuda dengan desain angkatan dan nama masing-masing mahasiswa.',
                'project_date' => now()->subMonths(2),
            ],
            [
                'category_id' => $uniformCat->id ?? $jerseyCat->id,
                'title' => 'Seragam Komunitas Trail Adventure Palembang',
                'client_name' => 'Trail Adventure Palembang',
                'description' => 'Jersey trail motor dengan bahan premium dan desain full-print dua sisi.',
                'project_date' => now()->subMonths(3),
            ],
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Sepakbola SMAN 1 Palembang',
                'client_name' => 'SMAN 1 Palembang',
                'description' => 'Jersey sepakbola tim sekolah dengan cutting modern dan bahan dry-fit.',
                'project_date' => now()->subMonths(4),
            ],
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Voli Komunitas Volley Sriwijaya',
                'client_name' => 'Volley Sriwijaya',
                'description' => 'Jersey voli sublimasi printing dengan desain gelombang biru-putih.',
                'project_date' => now()->subMonths(5),
            ],
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Badminton PB Rajawali',
                'client_name' => 'PB Rajawali',
                'description' => 'Jersey badminton ringan dengan aksen neon hijau dan cutting slim-fit.',
                'project_date' => now()->subMonths(6),
            ],
        ];

        foreach ($portfolios as $data) {
            Portfolio::create([
                'category_id' => $data['category_id'],
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'client_name' => $data['client_name'],
                'description' => $data['description'],
                'project_date' => $data['project_date'],
                'status' => ProductStatus::PUBLISHED,
                'order_priority' => 0,
            ]);
        }
    }
}
