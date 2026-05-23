<?php

namespace App\Repositories\Eloquent;

use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;

class TestimonialRepository implements TestimonialRepositoryInterface
{
    public function getPublished(int $limit = null)
    {
        $query = Testimonial::where('is_published', true)
            ->orderBy('order_priority', 'asc');

        if ($limit) {
            return $query->take($limit)->get();
        }

        return $query->get();
    }

    public function all()
    {
        return Testimonial::orderBy('order_priority', 'asc')->get();
    }
}
