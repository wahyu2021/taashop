<?php

namespace App\Data;

use App\Enums\ProductStatus;
use Spatie\LaravelData\Data;

class NewsData extends Data
{
    public function __construct(
        public ?int $id,
        public string $title,
        public string $slug,
        public ?string $summary,
        public ?string $content,
        public ProductStatus $status,
        public ?string $published_at,
        public int $order_priority,
        public ?string $image_url,
    ) {}

    public static function fromModel(\App\Models\News $news): self
    {
        return new self(
            id: $news->id,
            title: $news->title,
            slug: $news->slug,
            summary: $news->summary,
            content: $news->content,
            status: $news->status,
            published_at: $news->published_at?->format('Y-m-d H:i'),
            order_priority: $news->order_priority,
            image_url: $news->getFirstMediaUrl('image'),
        );
    }
}
