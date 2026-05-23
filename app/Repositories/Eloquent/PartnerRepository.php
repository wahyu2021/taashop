<?php

namespace App\Repositories\Eloquent;

use App\Models\Partner;
use App\Repositories\Contracts\PartnerRepositoryInterface;
use Illuminate\Support\Collection;

class PartnerRepository implements PartnerRepositoryInterface
{
    public function all(): Collection
    {
        return Partner::latest()->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = Partner::query();

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        return $query->latest()
            ->paginate($filters['per_page'] ?? $perPage)
            ->withQueryString();
    }

    public function findById(int $id): ?Partner
    {
        return Partner::find($id);
    }

    public function create(array $data): Partner
    {
        $partner = Partner::create($data);

        if (isset($data['logo'])) {
            $partner->addMedia($data['logo'])->toMediaCollection('logo');
        }

        return $partner;
    }

    public function update(int $id, array $data): bool
    {
        $partner = $this->findById($id);
        if (!$partner) return false;

        if (isset($data['logo'])) {
            $partner->addMedia($data['logo'])->toMediaCollection('logo');
        }

        return $partner->update($data);
    }

    public function delete(int $id): bool
    {
        $partner = $this->findById($id);
        if (!$partner) return false;
        return $partner->delete();
    }

    public function getActive(): Collection
    {
        return Partner::where('is_active', true)->latest()->get();
    }
}
