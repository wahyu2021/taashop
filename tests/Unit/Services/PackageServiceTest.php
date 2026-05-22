<?php

namespace Tests\Unit\Services;

use App\Models\Package;
use App\Enums\ProductStatus;
use App\Enums\PrintType;
use App\Services\PackageService;
use App\Repositories\Eloquent\PackageRepository;
use App\Data\PackageData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PackageServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PackageService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new PackageService(new PackageRepository());
    }

    public function test_it_returns_collection_of_package_data()
    {
        Package::create([
            'title' => 'Package 1',
            'slug' => 'package-1',
            'product_type' => 'Jersey Bola',
            'print_type' => PrintType::SABLON,
            'min_price' => 100000,
            'max_price' => 150000,
            'status' => ProductStatus::PUBLISHED,
        ]);

        $result = $this->service->getAllPackages();

        $this->assertCount(1, $result);
        $this->assertInstanceOf(PackageData::class, $result->first());
        $this->assertEquals('Package 1', $result->first()->title);
    }
}
