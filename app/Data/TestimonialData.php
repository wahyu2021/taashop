<?php

namespace App\Data;

use App\Utils\MediaHelper;
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
        public ?string $proof_url,
    ) {}

    public static function fromModel(\App\Models\Testimonial $testimonial): self
    {
        return new self(
            id: $testimonial->id,
            customer_name: $testimonial->customer_name,
            customer_title: $testimonial->customer_title,
            content: $testimonial->content,
            rating: $testimonial->rating,
            avatar_url: MediaHelper::getRelativeUrl($testimonial, 'avatar'),
            proof_url: MediaHelper::getRelativeUrl($testimonial, 'proof'),
        );
    }
}
