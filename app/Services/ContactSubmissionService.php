<?php

namespace App\Services;

use App\Data\ContactSubmissionData;
use App\Repositories\Contracts\ContactSubmissionRepositoryInterface;
use Illuminate\Support\Collection;

class ContactSubmissionService
{
    public function __construct(
        protected ContactSubmissionRepositoryInterface $repository
    ) {}

    public function getFilteredSubmissions(array $filters = [], int $perPage = 10)
    {
        $paginator = $this->repository->getFiltered($filters, $perPage);
        
        return ContactSubmissionData::collect($paginator);
    }

    public function getAllSubmissions(): Collection
    {
        return ContactSubmissionData::collect($this->repository->all());
    }

    public function getSubmissionById(int $id): ?ContactSubmissionData
    {
        $submission = $this->repository->findById($id);
        return $submission ? ContactSubmissionData::fromModel($submission) : null;
    }

    public function updateSubmissionStatus(int $id, string $status): bool
    {
        return $this->repository->updateStatus($id, $status);
    }

    public function deleteSubmission(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function getLatestSubmissions(int $limit = 5): Collection
    {
        return ContactSubmissionData::collect($this->repository->getLatest($limit));
    }
}
