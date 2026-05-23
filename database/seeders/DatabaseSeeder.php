<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin Taashop',
            'email' => 'admin@taashop.com',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            SettingSeeder::class,
            CategorySeeder::class,
            MaterialSeeder::class,
            PackageSeeder::class,
            ProductSeeder::class,
            PortfolioSeeder::class,
            NewsSeeder::class,
            FAQSeeder::class,
            TestimonialSeeder::class,
            PartnerSeeder::class,
        ]);
    }
}
