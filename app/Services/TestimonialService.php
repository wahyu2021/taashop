<?php

namespace App\Services;

use App\Data\TestimonialData;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use Illuminate\Support\Collection;

class TestimonialService
{
    public function __construct(
        protected TestimonialRepositoryInterface $repository
    ) {}

    public function getPublishedTestimonials(int $limit = null): Collection
    {
        return TestimonialData::collect($this->repository->getPublished($limit));
    }
}
