<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\Portfolio;
use App\Repositories\Contracts\PortfolioRepositoryInterface;
use Illuminate\Support\Collection;

class PortfolioRepository implements PortfolioRepositoryInterface
{
    public function all(): Collection
    {
        return Portfolio::with('category')->latest()->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = Portfolio::with('category');

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('client_name', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()
            ->paginate($filters['per_page'] ?? $perPage)
            ->withQueryString();
    }

    public function findById(int $id): ?Portfolio
    {
        return Portfolio::with('category')->find($id);
    }

    public function create(array $data): Portfolio
    {
        $portfolio = Portfolio::create($data);

        if (isset($data['image'])) {
            $portfolio->addMedia($data['image'])->toMediaCollection('image');
        }

        return $portfolio;
    }

    public function update(int $id, array $data): bool
    {
        $portfolio = $this->findById($id);
        if (!$portfolio) return false;

        if (isset($data['image'])) {
            $portfolio->addMedia($data['image'])->toMediaCollection('image');
        }

        return $portfolio->update($data);
    }

    public function delete(int $id): bool
    {
        $portfolio = $this->findById($id);
        if (!$portfolio) return false;
        return $portfolio->delete();
    }

    public function getPublished(int $limit = null): Collection
    {
        $query = Portfolio::with('category')
            ->where('status', ProductStatus::PUBLISHED)
            ->orderBy('order_priority', 'asc')
            ->orderBy('created_at', 'desc');

        if ($limit) {
            return $query->limit($limit)->get();
        }

        return $query->get();
    }
}
