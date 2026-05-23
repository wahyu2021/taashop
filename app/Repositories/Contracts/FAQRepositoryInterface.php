<?php

namespace App\Repositories\Contracts;

interface FAQRepositoryInterface
{
    public function getPublished(int $limit = null);
    public function all();
}
