<?php

namespace App\Repositories\Contracts;

use App\Models\Portfolio;
use Illuminate\Support\Collection;

interface PortfolioRepositoryInterface
{
    public function all(): Collection;
    public function getFiltered(array $filters = [], int $perPage = 10);
    public function findById(int $id): ?Portfolio;
    public function create(array $data): Portfolio;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function getPublished(int $limit = null): Collection;
}
