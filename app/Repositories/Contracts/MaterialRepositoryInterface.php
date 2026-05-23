<?php

namespace App\Repositories\Contracts;

use App\Models\Material;
use Illuminate\Support\Collection;

interface MaterialRepositoryInterface
{
    public function all(): Collection;
    public function getAllPublished(): Collection;
    public function findBySlug(string $slug): ?Material;
    public function findById(int $id): ?Material;
    public function create(array $data): Material;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
