<?php

namespace App\Repositories\Contracts;

use App\Models\News;
use Illuminate\Support\Collection;

interface NewsRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?News;
    public function create(array $data): News;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function getPublished(int $limit = null): Collection;
}
