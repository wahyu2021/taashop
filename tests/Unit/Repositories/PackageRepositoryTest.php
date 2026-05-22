<?php

use App\Models\Package;
use App\Enums\ProductStatus;
use App\Enums\PrintType;
use App\Repositories\Eloquent\PackageRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new PackageRepository();
});

it('can list all published packages', function () {
    Package::create([
        'title' => 'Published Package',
        'slug' => 'published-package',
        'product_type' => 'Jersey Bola',
        'print_type' => PrintType::PRINTING,
        'min_price' => 150000,
        'max_price' => 200000,
        'status' => ProductStatus::PUBLISHED,
        'order_priority' => 1
    ]);

    Package::create([
        'title' => 'Draft Package',
        'slug' => 'draft-package',
        'product_type' => 'T-Shirt',
        'min_price' => 50000,
        'max_price' => 75000,
        'status' => ProductStatus::DRAFT,
        'order_priority' => 2
    ]);

    $packages = $this->repository->getAllPublished();

    expect($packages)->toHaveCount(1);
    expect($packages->first()->title)->toBe('Published Package');
});

it('can find a package by slug', function () {
    Package::create([
        'title' => 'Target Package',
        'slug' => 'target-slug',
        'product_type' => 'Jersey Bola',
        'min_price' => 100000,
        'max_price' => 120000,
        'status' => ProductStatus::PUBLISHED
    ]);

    $package = $this->repository->findBySlug('target-slug');

    expect($package)->not->toBeNull();
    expect($package->title)->toBe('Target Package');
});
