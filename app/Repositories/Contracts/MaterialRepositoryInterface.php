<?php

namespace App\Repositories\Contracts;

use App\Models\Material;
use Illuminate\Support\Collection;

interface MaterialRepositoryInterface
{
    public function getAllPublished(): Collection;
    public function findBySlug(string $slug): ?Material;
}
