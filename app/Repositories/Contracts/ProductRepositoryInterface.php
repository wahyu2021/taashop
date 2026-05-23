<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Support\Collection;

interface ProductRepositoryInterface
{
    public function all(): Collection;
    public function getAllPublished(int $limit = null): Collection;
    public function getFeatured(): Collection;
    public function findBySlug(string $slug): ?Product;
    public function findById(int $id): ?Product;
    public function create(array $data): Product;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
