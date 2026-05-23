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

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = ContactSubmission::query();

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('email', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('subject', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest('submitted_at')
            ->paginate($filters['per_page'] ?? $perPage)
            ->withQueryString();
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
