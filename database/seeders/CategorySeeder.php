<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Jersey & Sportswear', 'type' => 'gallery'],
            ['name' => 'Kemeja & Seragam', 'type' => 'gallery'],
            ['name' => 'Kaos & Poloshirt', 'type' => 'gallery'],
            ['name' => 'Jaket & Outerwear', 'type' => 'gallery'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'type' => $category['type'],
            ]);
        }
    }
}
