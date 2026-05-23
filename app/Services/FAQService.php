<?php

namespace App\Services;

use App\Data\FAQData;
use App\Repositories\Contracts\FAQRepositoryInterface;
use Illuminate\Support\Collection;

class FAQService
{
    public function __construct(
        protected FAQRepositoryInterface $repository
    ) {}

    public function getPublishedFAQs(int $limit = null): Collection
    {
        return FAQData::collect($this->repository->getPublished($limit));
    }
}
