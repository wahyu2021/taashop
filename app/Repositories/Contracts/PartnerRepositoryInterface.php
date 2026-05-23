<?php

namespace App\Repositories\Contracts;

use App\Models\Partner;
use Illuminate\Support\Collection;

interface PartnerRepositoryInterface
{
    public function all(): Collection;
    public function getFiltered(array $filters = [], int $perPage = 10);
    public function findById(int $id): ?Partner;
    public function create(array $data): Partner;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function getActive(): Collection;
}
