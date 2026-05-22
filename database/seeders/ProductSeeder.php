<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Enums\ProductStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $jerseyCat = Category::where('slug', 'jersey-sportswear')->first();
        $uniformCat = Category::where('slug', 'kemeja-seragam')->first();

        $products = [
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Basket Agriculture UNSRI',
                'description' => 'Jersey basket kustom untuk tim Pertanian UNSRI dengan desain gradasi modern.',
                'is_featured' => true,
            ],
            [
                'category_id' => $jerseyCat->id,
                'title' => 'Jersey Football Home DBASCOM',
                'description' => 'Jersey sepakbola kustom dengan motif geometris eksklusif.',
                'is_featured' => true,
            ],
            [
                'category_id' => $uniformCat->id,
                'title' => 'Kemeja BPN Kab. Lahat',
                'description' => 'Seragam kemeja kerja kustom dengan bahan drill premium dan bordir komputer.',
                'is_featured' => false,
            ],
        ];

        foreach ($products as $data) {
            Product::create([
                'category_id' => $data['category_id'],
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'description' => $data['description'],
                'is_featured' => $data['is_featured'],
                'status' => ProductStatus::PUBLISHED,
                'order_priority' => 0,
            ]);
        }
    }
}
