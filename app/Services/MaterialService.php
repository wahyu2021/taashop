<?php

namespace App\Services;

use App\Data\MaterialData;
use App\Repositories\Contracts\MaterialRepositoryInterface;
use Illuminate\Support\Collection;

class MaterialService
{
    public function __construct(
        protected MaterialRepositoryInterface $materialRepository
    ) {}

    /**
     * @return Collection<int, MaterialData>
     */
    public function getAllMaterials(): Collection
    {
        $materials = $this->materialRepository->getAllPublished();

        return MaterialData::collect($materials);
    }

    public function getMaterialDetail(string $slug): ?MaterialData
    {
        $material = $this->materialRepository->findBySlug($slug);

        return $material ? MaterialData::fromModel($material) : null;
    }
}
