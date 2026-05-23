<?php

namespace App\Repositories\Eloquent;

use App\Models\ContactSubmission;
use App\Repositories\Contracts\ContactSubmissionRepositoryInterface;
use Illuminate\Support\Collection;

class ContactSubmissionRepository implements ContactSubmissionRepositoryInterface
{
    public function all(): Collection
    {
        return ContactSubmission::latest('submitted_at')->get();
    }

    public function findById(int $id): ?ContactSubmission
    {
        return ContactSubmission::find($id);
    }

    public function updateStatus(int $id, string $status): bool
    {
        $submission = $this->findById($id);
        if (!$submission) return false;

        return $submission->update(['status' => $status]);
    }

    public function delete(int $id): bool
    {
        $submission = $this->findById($id);
        if (!$submission) return false;

        return $submission->delete();
    }

    public function getLatest(int $limit = 5): Collection
    {
        return ContactSubmission::latest('submitted_at')->limit($limit)->get();
    }
}
