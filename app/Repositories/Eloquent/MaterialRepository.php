<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\Material;
use App\Repositories\Contracts\MaterialRepositoryInterface;
use Illuminate\Support\Collection;

class MaterialRepository implements MaterialRepositoryInterface
{
    public function all(): Collection
    {
        return Material::with('features')->latest()->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = Material::with('features');

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('summary', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()
            ->paginate($filters['per_page'] ?? $perPage)
            ->withQueryString();
    }

    public function getAllPublished(): Collection
    {
        return Material::with('features')
            ->where('status', ProductStatus::PUBLISHED)
            ->orderBy('order_priority', 'asc')
            ->get();
    }

    public function findBySlug(string $slug): ?Material
    {
        return Material::with('features')
            ->where('slug', $slug)
            ->where('status', ProductStatus::PUBLISHED)
            ->first();
    }

    public function findById(int $id): ?Material
    {
        return Material::with('features')->find($id);
    }

    public function create(array $data): Material
    {
        $material = Material::create($data);

        if (isset($data['features']) && is_array($data['features'])) {
            foreach ($data['features'] as $feature) {
                $material->features()->create(['feature' => $feature]);
            }
        }

        if (isset($data['image'])) {
            $material->addMedia($data['image'])->toMediaCollection('image');
        }

        return $material;
    }

    public function update(int $id, array $data): bool
    {
        $material = $this->findById($id);
        if (!$material) return false;

        if (isset($data['features']) && is_array($data['features'])) {
            $material->features()->delete();
            foreach ($data['features'] as $feature) {
                $material->features()->create(['feature' => $feature]);
            }
        }

        if (isset($data['image'])) {
            $material->addMedia($data['image'])->toMediaCollection('image');
        }

        return $material->update($data);
    }

    public function delete(int $id): bool
    {
        $material = $this->findById($id);
        if (!$material) return false;
        return $material->delete();
    }
}
