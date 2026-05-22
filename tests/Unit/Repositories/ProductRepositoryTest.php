<?php

use App\Models\Category;
use App\Models\Product;
use App\Enums\ProductStatus;
use App\Repositories\Eloquent\ProductRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->repository = new ProductRepository();
    $this->category = Category::create([
        'name' => 'Jersey',
        'slug' => 'jersey',
        'type' => 'gallery'
    ]);
});

it('can list all published products', function () {
    Product::create([
        'category_id' => $this->category->id,
        'title' => 'Published Product',
        'slug' => 'published-product',
        'status' => ProductStatus::PUBLISHED,
        'order_priority' => 1
    ]);

    Product::create([
        'category_id' => $this->category->id,
        'title' => 'Draft Product',
        'slug' => 'draft-product',
        'status' => ProductStatus::DRAFT,
        'order_priority' => 2
    ]);

    $products = $this->repository->getAllPublished();

    expect($products)->toHaveCount(1);
    expect($products->first()->title)->toBe('Published Product');
});

it('can list featured products', function () {
    Product::create([
        'category_id' => $this->category->id,
        'title' => 'Featured Product',
        'slug' => 'featured-product',
        'status' => ProductStatus::PUBLISHED,
        'is_featured' => true
    ]);

    Product::create([
        'category_id' => $this->category->id,
        'title' => 'Regular Product',
        'slug' => 'regular-product',
        'status' => ProductStatus::PUBLISHED,
        'is_featured' => false
    ]);

    $featured = $this->repository->getFeatured();

    expect($featured)->toHaveCount(1);
    expect($featured->first()->title)->toBe('Featured Product');
});

it('can find a product by slug', function () {
    Product::create([
        'category_id' => $this->category->id,
        'title' => 'Target Product',
        'slug' => 'target-slug',
        'status' => ProductStatus::PUBLISHED
    ]);

    $product = $this->repository->findBySlug('target-slug');

    expect($product)->not->toBeNull();
    expect($product->title)->toBe('Target Product');
});
