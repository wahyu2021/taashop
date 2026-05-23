<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class TestimonialData extends Data
{
    public function __construct(
        public ?int $id,
        public string $customer_name,
        public ?string $customer_title,
        public string $content,
        public int $rating,
        public ?string $avatar_url,
    ) {}

    public static function fromModel(\App\Models\Testimonial $testimonial): self
    {
        return new self(
            id: $testimonial->id,
            customer_name: $testimonial->customer_name,
            customer_title: $testimonial->customer_title,
            content: $testimonial->content,
            rating: $testimonial->rating,
            avatar_url: $testimonial->getFirstMediaUrl('avatar'),
        );
    }
}
