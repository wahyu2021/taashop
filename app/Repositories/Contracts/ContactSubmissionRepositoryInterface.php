<?php

namespace App\Repositories\Contracts;

use App\Models\ContactSubmission;
use Illuminate\Support\Collection;

interface ContactSubmissionRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?ContactSubmission;
    public function updateStatus(int $id, string $status): bool;
    public function delete(int $id): bool;
    public function getLatest(int $limit = 5): Collection;
}
