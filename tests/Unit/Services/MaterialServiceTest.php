<?php

namespace Tests\Unit\Services;

use App\Models\Material;
use App\Models\MaterialFeature;
use App\Enums\ProductStatus;
use App\Services\MaterialService;
use App\Repositories\Eloquent\MaterialRepository;
use App\Data\MaterialData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MaterialServiceTest extends TestCase
{
    use RefreshDatabase;

    protected MaterialService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new MaterialService(new MaterialRepository());
    }

    public function test_it_returns_collection_of_material_data()
    {
        $material = Material::create([
            'name' => 'Material 1',
            'slug' => 'material-1',
            'status' => ProductStatus::PUBLISHED,
        ]);

        MaterialFeature::create([
            'material_id' => $material->id,
            'feature' => 'Cool Feature'
        ]);

        $result = $this->service->getAllMaterials();

        $this->assertCount(1, $result);
        $this->assertInstanceOf(MaterialData::class, $result->first());
        $this->assertEquals('Material 1', $result->first()->name);
        $this->assertContains('Cool Feature', $result->first()->features);
    }
}
