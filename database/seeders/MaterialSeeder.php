<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\MaterialFeature;
use App\Enums\ProductStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        $materials = [
            [
                'name' => 'Benzema',
                'summary' => 'Bahan berpori dengan tekstur sarang lebah',
                'description' => 'Bahan Dryfit Benzema merupakan salah satu jenis kain yang sangat populer untuk jersey bola dan basket. Memiliki pori-pori yang baik untuk sirkulasi udara.',
                'features' => ['Sirkulasi udara maksimal', 'Cepat kering', 'Tekstur unik'],
            ],
            [
                'name' => 'Drifit Brazil',
                'summary' => 'Bahan premium yang lembut dan elastis',
                'description' => 'Drifit Brazil memiliki karakteristik kain yang lebih halus dibandingkan jenis drifit lainnya. Sangat nyaman digunakan untuk aktivitas intensitas tinggi.',
                'features' => ['Sangat lembut', 'Elastisitas tinggi', 'Standar jersey pro'],
            ],
            [
                'name' => 'Milano',
                'summary' => 'Tekstur zig-zag yang ikonik',
                'description' => 'Dikenal juga dengan sebutan Drifit Milano. Memiliki motif rajutan zig-zag yang memberikan kesan sporty dan modern.',
                'features' => ['Motif eksklusif', 'Tahan lama', 'Warna tajam'],
            ],
        ];

        foreach ($materials as $data) {
            $material = Material::create([
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'summary' => $data['summary'],
                'description' => $data['description'],
                'status' => ProductStatus::PUBLISHED,
                'order_priority' => 0,
            ]);

            foreach ($data['features'] as $feature) {
                MaterialFeature::create([
                    'material_id' => $material->id,
                    'feature' => $feature,
                ]);
            }
        }
    }
}
