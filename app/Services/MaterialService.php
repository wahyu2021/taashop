<?php

namespace App\Services;

use App\Data\MaterialData;
use App\Repositories\Contracts\MaterialRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;

class MaterialService
{
    public function __construct(
        protected MaterialRepositoryInterface $materialRepository
    ) {}

    public function getFilteredMaterialsForAdmin(array $filters = [], int $perPage = 10)
    {
        $paginator = $this->materialRepository->getFiltered($filters, $perPage);
        
        return MaterialData::collect($paginator);
    }

    public function getAllMaterialsForAdmin(): Collection
    {
        return MaterialData::collect($this->materialRepository->all());
    }

    /**
     * @return Collection<int, MaterialData>
     */
    public function getPublishedMaterials(): Collection
    {
        $materials = $this->materialRepository->getAllPublished();

        return MaterialData::collect($materials);
    }

    public function getMaterialDetail(string $slug): ?MaterialData
    {
        $material = $this->materialRepository->findBySlug($slug);

        return $material ? MaterialData::fromModel($material) : null;
    }

    public function getMaterialById(int $id): ?MaterialData
    {
        $material = $this->materialRepository->findById($id);

        return $material ? MaterialData::fromModel($material) : null;
    }

    public function createMaterial(array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['name', 'summary', 'features'], ['description']);
        $data['slug'] = \Illuminate\Support\Str::slug($data['name']);
        return $this->materialRepository->create($data);
    }

    public function updateMaterial(int $id, array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['name', 'summary', 'features'], ['description']);
        if (isset($data['name'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['name']);
        }
        return $this->materialRepository->update($id, $data);
    }

    public function deleteMaterial(int $id)
    {
        return $this->materialRepository->delete($id);
    }
}
