<?php

namespace Tests\Unit\Services;

use App\Models\Category;
use App\Models\Product;
use App\Enums\ProductStatus;
use App\Services\ProductService;
use App\Repositories\Eloquent\ProductRepository;
use App\Data\ProductData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ProductService $service;
    protected Category $category;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->category = Category::create([
            'name' => 'Jersey',
            'slug' => 'jersey',
            'type' => 'gallery'
        ]);

        $this->service = new ProductService(new ProductRepository());
    }

    public function test_it_returns_collection_of_product_data()
    {
        Product::create([
            'category_id' => $this->category->id,
            'title' => 'Product 1',
            'slug' => 'product-1',
            'status' => ProductStatus::PUBLISHED,
        ]);

        $result = $this->service->getCatalogProducts();

        $this->assertCount(1, $result);
        $this->assertInstanceOf(ProductData::class, $result->first());
        $this->assertEquals('Product 1', $result->first()->title);
    }

    public function test_it_returns_null_if_product_not_found()
    {
        $result = $this->service->getProductDetail('non-existent');
        $this->assertNull($result);
    }
}
