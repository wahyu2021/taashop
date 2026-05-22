<?php

use App\Models\Material;
use App\Models\MaterialFeature;
use App\Enums\ProductStatus;
use App\Repositories\Eloquent\MaterialRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new MaterialRepository();
});

it('can list all published materials', function () {
    $material = Material::create([
        'name' => 'Published Material',
        'slug' => 'published-material',
        'status' => ProductStatus::PUBLISHED,
        'order_priority' => 1
    ]);

    MaterialFeature::create([
        'material_id' => $material->id,
        'feature' => 'Feature 1'
    ]);

    Material::create([
        'name' => 'Draft Material',
        'slug' => 'draft-material',
        'status' => ProductStatus::DRAFT,
        'order_priority' => 2
    ]);

    $materials = $this->repository->getAllPublished();

    expect($materials)->toHaveCount(1);
    expect($materials->first()->name)->toBe('Published Material');
    expect($materials->first()->features)->toHaveCount(1);
});

it('can find a material by slug', function () {
    Material::create([
        'name' => 'Target Material',
        'slug' => 'target-slug',
        'status' => ProductStatus::PUBLISHED
    ]);

    $material = $this->repository->findBySlug('target-slug');

    expect($material)->not->toBeNull();
    expect($material->name)->toBe('Target Material');
});
