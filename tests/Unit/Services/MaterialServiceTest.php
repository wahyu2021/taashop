<?php

namespace Tests\Unit\Services;

use App\Models\Material;
use App\Repositories\Contracts\MaterialRepositoryInterface;
use App\Services\MaterialService;
use Mockery;
use Tests\TestCase;

class MaterialServiceTest extends TestCase
{
    protected $repository;
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = Mockery::mock(MaterialRepositoryInterface::class);
        $this->service = new MaterialService($this->repository);
    }

    public function test_create_material_sanitizes_input_and_generates_slug()
    {
        $inputData = [
            'name' => '<b>Super Jersey</b>',
            'summary' => 'This is a summary with <script>alert("xss")</script>',
            'description' => '<p>Good description</p>',
            'features' => ['Feature 1', 'Feature 2'],
            'status' => 'published'
        ];

        // Sanitizer::strip strips tags from 'name', 'summary', 'features'
        // Sanitizer::clean purifies 'description'
        $expectedData = [
            'name' => 'Super Jersey',
            'summary' => 'This is a summary with alert("xss")',
            'description' => '<p>Good description</p>',
            'features' => ['Feature 1', 'Feature 2'],
            'status' => 'published',
            'slug' => 'super-jersey'
        ];

        $this->repository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function ($data) use ($expectedData) {
                return $data['name'] === $expectedData['name'] &&
                       $data['summary'] === $expectedData['summary'] &&
                       $data['slug'] === $expectedData['slug'] &&
                       $data['description'] === $expectedData['description'];
            }))
            ->andReturn(new Material($expectedData));

        $result = $this->service->createMaterial($inputData);
        
        $this->assertInstanceOf(Material::class, $result);
    }

    public function test_update_material_updates_slug_if_name_changed()
    {
        $materialId = 1;
        $inputData = [
            'name' => 'Brand New Name',
        ];

        $this->repository->shouldReceive('update')
            ->once()
            ->with($materialId, Mockery::on(function ($data) {
                return $data['name'] === 'Brand New Name' && 
                       $data['slug'] === 'brand-new-name';
            }))
            ->andReturn(true);

        $result = $this->service->updateMaterial($materialId, $inputData);
        
        $this->assertTrue($result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
