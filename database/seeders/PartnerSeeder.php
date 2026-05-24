<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partners = [
            ['name' => 'Persib Bandung', 'is_active' => true],
            ['name' => 'EVOS Esports', 'is_active' => true],
            ['name' => 'Rex Regum Qeon (RRQ)', 'is_active' => true],
            ['name' => 'Bigetron Esports', 'is_active' => true],
            ['name' => 'Bank Mandiri', 'is_active' => true],
            ['name' => 'Telkom Indonesia', 'is_active' => true],
        ];

        foreach ($partners as $partnerData) {
            Partner::updateOrCreate(['name' => $partnerData['name']], $partnerData);
        }
    }
}
