<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Collection;

class ProductRepository implements ProductRepositoryInterface
{
    public function all(): Collection
    {
        return Product::with('category')
            ->latest()
            ->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = Product::with('category');

        if (!empty($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['is_featured']) && $filters['is_featured'] !== '') {
            $query->where('is_featured', (bool) $filters['is_featured']);
        }

        return $query->latest()
            ->paginate($filters['per_page'] ?? $perPage)
            ->withQueryString();
    }

    public function getAllPublished(int $limit = null): Collection
    {
        $query = Product::with('category')
            ->where('status', ProductStatus::PUBLISHED)
            ->orderBy('order_priority', 'asc')
            ->orderBy('created_at', 'desc');

        if ($limit) {
            return $query->limit($limit)->get();
        }

        return $query->get();
    }

    public function getFeatured(): Collection
    {
        return Product::with('category')
            ->where('status', ProductStatus::PUBLISHED)
            ->where('is_featured', true)
            ->orderBy('order_priority', 'asc')
            ->get();
    }

    public function findBySlug(string $slug): ?Product
    {
        return Product::with('category')
            ->where('slug', $slug)
            ->where('status', ProductStatus::PUBLISHED)
            ->first();
    }

    public function findById(int $id): ?Product
    {
        return Product::find($id);
    }

    public function create(array $data): Product
    {
        $product = Product::create($data);

        if (isset($data['image'])) {
            $product->addMedia($data['image'])->toMediaCollection('image');
        }

        return $product;
    }

    public function update(int $id, array $data): bool
    {
        $product = $this->findById($id);
        if (!$product) return false;

        if (isset($data['image'])) {
            $product->addMedia($data['image'])->toMediaCollection('image');
        }

        return $product->update($data);
    }

    public function delete(int $id): bool
    {
        $product = $this->findById($id);
        if (!$product) return false;
        return $product->delete();
    }
}
