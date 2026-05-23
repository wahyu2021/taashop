<?php

namespace Tests\Unit\Services;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Services\CategoryService;
use Mockery;
use Tests\TestCase;

class CategoryServiceTest extends TestCase
{
    protected $categoryRepository;
    protected $categoryService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->categoryRepository = Mockery::mock(CategoryRepositoryInterface::class);
        $this->categoryService = new CategoryService($this->categoryRepository);
    }

    public function test_create_category_sanitizes_name_and_generates_slug()
    {
        $inputData = [
            'name' => '<h1>New Category</h1>',
            'type' => 'gallery'
        ];

        // Sanitizer will strip <h1>, Str::slug will convert 'New Category' to 'new-category'
        $expectedData = [
            'name' => 'New Category',
            'type' => 'gallery',
            'slug' => 'new-category'
        ];

        $this->categoryRepository->shouldReceive('create')
            ->once()
            ->with($expectedData)
            ->andReturn(new Category($expectedData));

        $result = $this->categoryService->createCategory($inputData);

        $this->assertInstanceOf(Category::class, $result);
    }

    public function test_update_category_sanitizes_name_and_updates_slug()
    {
        $categoryId = 1;
        $inputData = [
            'name' => 'Updated Category & Co.',
            'type' => 'package'
        ];

        $expectedData = [
            'name' => 'Updated Category & Co.',
            'type' => 'package',
            'slug' => 'updated-category-co'
        ];

        $this->categoryRepository->shouldReceive('update')
            ->once()
            ->with($categoryId, $expectedData)
            ->andReturn(true);

        $result = $this->categoryService->updateCategory($categoryId, $inputData);

        $this->assertTrue($result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
