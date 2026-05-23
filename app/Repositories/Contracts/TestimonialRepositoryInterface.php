<?php

namespace App\Repositories\Contracts;

interface TestimonialRepositoryInterface
{
    public function getPublished(int $limit = null);
    public function all();
}
