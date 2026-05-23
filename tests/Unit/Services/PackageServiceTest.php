<?php

namespace Tests\Unit\Services;

use App\Models\Package;
use App\Services\PackageService;
use App\Repositories\Contracts\PackageRepositoryInterface;
use App\Data\PackageData;
use Mockery;
use Tests\TestCase;

class PackageServiceTest extends TestCase
{
    protected $repository;
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = Mockery::mock(PackageRepositoryInterface::class);
        $this->service = new PackageService($this->repository);
    }

    public function test_it_returns_collection_of_package_data()
    {
        $package = new Package([
            'id' => 1,
            'title' => 'Package 1',
            'slug' => 'package-1',
            'product_type' => 'Jersey',
            'includes' => 'Standard',
            'print_type' => \App\Enums\PrintType::SABLON,
            'min_price' => 100000,
            'max_price' => 200000,
            'order_priority' => 0,
            'status' => \App\Enums\ProductStatus::PUBLISHED
        ]);

        $this->repository->shouldReceive('all')
            ->once()
            ->andReturn(collect([$package]));

        $result = $this->service->getAllPackagesForAdmin();

        $this->assertCount(1, $result);
        $this->assertEquals('Package 1', $result->first()->title);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
