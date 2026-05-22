<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Support\Collection;

interface ProductRepositoryInterface
{
    public function getAllPublished(int $limit = null): Collection;
    public function getFeatured(): Collection;
    public function findBySlug(string $slug): ?Product;
}
