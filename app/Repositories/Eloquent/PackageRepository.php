<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\Package;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Support\Collection;

class PackageRepository implements PackageRepositoryInterface
{
    public function getAllPublished(): Collection
    {
        return Package::where('status', ProductStatus::PUBLISHED)
            ->orderBy('order_priority', 'asc')
            ->orderBy('title', 'asc')
            ->get();
    }

    public function findBySlug(string $slug): ?Package
    {
        return Package::where('slug', $slug)
            ->where('status', ProductStatus::PUBLISHED)
            ->first();
    }
}
