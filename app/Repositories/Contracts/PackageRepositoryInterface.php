<?php

namespace App\Repositories\Contracts;

use App\Models\Package;
use Illuminate\Support\Collection;

interface PackageRepositoryInterface
{
    public function all(): Collection;
    public function getFiltered(array $filters = [], int $perPage = 10);
    public function getAllPublished(): Collection;
    public function findBySlug(string $slug): ?Package;
    public function findById(int $id): ?Package;
    public function create(array $data): Package;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
