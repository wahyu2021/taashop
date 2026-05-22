<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\Material;
use App\Repositories\Contracts\MaterialRepositoryInterface;
use Illuminate\Support\Collection;

class MaterialRepository implements MaterialRepositoryInterface
{
    public function getAllPublished(): Collection
    {
        return Material::with('features')
            ->where('status', ProductStatus::PUBLISHED)
            ->orderBy('order_priority', 'asc')
            ->orderBy('name', 'asc')
            ->get();
    }

    public function findBySlug(string $slug): ?Material
    {
        return Material::with('features')
            ->where('slug', $slug)
            ->where('status', ProductStatus::PUBLISHED)
            ->first();
    }
}
