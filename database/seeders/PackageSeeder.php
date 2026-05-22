<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Enums\PrintType;
use App\Enums\ProductStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'title' => 'Paket Hemat Jersey Bola',
                'product_type' => 'Jersey Bola',
                'includes' => 'Baju Saja',
                'print_type' => PrintType::PRINTING,
                'min_price' => 125000,
                'max_price' => 150000,
            ],
            [
                'title' => 'Paket Pro Fullset',
                'product_type' => 'Jersey Bola',
                'includes' => 'Baju dan Celana',
                'print_type' => PrintType::BOTH,
                'min_price' => 175000,
                'max_price' => 225000,
            ],
            [
                'title' => 'Paket Casual T-Shirt',
                'product_type' => 'T-Shirt',
                'includes' => 'Baju Saja',
                'print_type' => PrintType::SABLON,
                'min_price' => 85000,
                'max_price' => 110000,
            ],
        ];

        foreach ($packages as $data) {
            Package::create([
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'product_type' => $data['product_type'],
                'includes' => $data['includes'],
                'print_type' => $data['print_type'],
                'min_price' => $data['min_price'],
                'max_price' => $data['max_price'],
                'status' => ProductStatus::PUBLISHED,
                'order_priority' => 0,
            ]);
        }
    }
}
