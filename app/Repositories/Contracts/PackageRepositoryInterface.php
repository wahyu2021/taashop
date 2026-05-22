<?php

namespace App\Repositories\Contracts;

use App\Models\Package;
use Illuminate\Support\Collection;

interface PackageRepositoryInterface
{
    public function getAllPublished(): Collection;
    public function findBySlug(string $slug): ?Package;
}
