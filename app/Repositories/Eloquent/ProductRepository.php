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
