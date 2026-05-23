<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\Package;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Support\Collection;

class PackageRepository implements PackageRepositoryInterface
{
    public function all(): Collection
    {
        return Package::latest()->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = Package::query();

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('product_type', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['print_type'])) {
            $query->where('print_type', $filters['print_type']);
        }

        return $query->latest()->paginate($perPage)->withQueryString();
    }

    public function getAllPublished(): Collection
    {
        return Package::where('status', ProductStatus::PUBLISHED)
            ->orderBy('order_priority', 'asc')
            ->get();
    }

    public function findBySlug(string $slug): ?Package
    {
        return Package::where('slug', $slug)
            ->where('status', ProductStatus::PUBLISHED)
            ->first();
    }

    public function findById(int $id): ?Package
    {
        return Package::find($id);
    }

    public function create(array $data): Package
    {
        $package = Package::create($data);

        if (isset($data['image'])) {
            $package->addMedia($data['image'])->toMediaCollection('image');
        }

        return $package;
    }

    public function update(int $id, array $data): bool
    {
        $package = $this->findById($id);
        if (!$package) return false;

        if (isset($data['image'])) {
            $package->addMedia($data['image'])->toMediaCollection('image');
        }

        return $package->update($data);
    }

    public function delete(int $id): bool
    {
        $package = $this->findById($id);
        if (!$package) return false;
        return $package->delete();
    }
}
