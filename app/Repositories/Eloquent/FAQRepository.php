<?php

namespace App\Repositories\Eloquent;

use App\Models\FAQ;
use App\Repositories\Contracts\FAQRepositoryInterface;

class FAQRepository implements FAQRepositoryInterface
{
    public function getPublished(int $limit = null)
    {
        $query = FAQ::where('is_published', true)
            ->orderBy('order_priority', 'asc');

        if ($limit) {
            return $query->take($limit)->get();
        }

        return $query->get();
    }

    public function all()
    {
        return FAQ::orderBy('order_priority', 'asc')->get();
    }
}
