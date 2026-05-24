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
                'description' => 'Bahan Dryfit Benzema merupakan salah satu jenis kain yang sangat populer untuk pembuatan jersey olahraga, khususnya sepak bola dan futsal. Memiliki ciri khas pori-pori berbentuk diagonal atau seperti sarang lebah yang sangat baik untuk sirkulasi udara, sehingga tubuh tidak mudah gerah saat berkeringat.',
                'features' => ['Sirkulasi Udara Maksimal', 'Cepat Kering (Quick Dry)', 'Tekstur Sarang Lebah'],
                'image' => 'benzema.jpg'
            ],
            [
                'name' => 'Drifit Brazil',
                'summary' => 'Bahan premium yang sangat lembut dan elastis',
                'description' => 'Drifit Brazil memiliki karakteristik permukaan yang lebih halus dan pori-pori yang lebih rapat dibandingkan jenis kain drifit lainnya. Bahan ini dikenal sangat lentur (stretch) dan jatuh mengikuti bentuk badan, menjadikannya standar premium untuk atlet profesional.',
                'features' => ['Sangat Lembut di Kulit', 'Elastisitas Tinggi (Stretch)', 'Standar Jersey Profesional'],
                'image' => 'drifit-brazil.jpg'
            ],
            [
                'name' => 'Milano',
                'summary' => 'Kain drifit ikonik dengan tekstur rajutan zig-zag',
                'description' => 'Dikenal juga dengan sebutan Drifit Milano. Kain ini memiliki ciri khas motif rajutan zig-zag pada permukaannya yang langsung memberikan kesan elegan, sporty, dan modern. Kainnya relatif lebih tebal namun tetap sejuk.',
                'features' => ['Motif Eksklusif Zig-zag', 'Kain Lebih Tebal & Awet', 'Menyerap Tinta Sangat Tajam'],
                'image' => 'milano.jpg'
            ],
            [
                'name' => 'Milano Cool Max',
                'summary' => 'Varian premium Milano dengan teknologi pendingin',
                'description' => 'Ini adalah varian tertinggi dari keluarga bahan Milano. Dilengkapi dengan teknologi kain \'Cool Max\' yang dioptimalkan untuk cuaca tropis yang panas. Bahan ini dapat menguapkan keringat ekstra cepat dan memberikan efek sejuk.',
                'features' => ['Teknologi Cool Max (Efek Sejuk)', 'Ekstra Cepat Menguapkan Keringat', 'Sangat Cocok untuk Cuaca Panas'],
                'image' => 'milano-cool-max.jpg'
            ],
        ];

        foreach ($materials as $data) {
            $material = Material::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                [
                    'name' => $data['name'],
                    'summary' => $data['summary'],
                    'description' => $data['description'],
                    'status' => ProductStatus::PUBLISHED,
                    'order_priority' => 0,
                ]
            );

            // Sync features
            $material->features()->delete();
            foreach ($data['features'] as $feature) {
                MaterialFeature::create([
                    'material_id' => $material->id,
                    'feature' => $feature,
                ]);
            }

            // Sync image if exists
            $imagePath = public_path('images/materials/' . $data['image']);
            if (file_exists($imagePath) && $material->getMedia('image')->isEmpty()) {
                $material->addMedia($imagePath)
                    ->preservingOriginal()
                    ->toMediaCollection('image');
            }
        }
    }
}
