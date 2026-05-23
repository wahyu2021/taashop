<?php

namespace App\Data;

use App\Enums\ProductStatus;
use Spatie\LaravelData\Data;

class PortfolioData extends Data
{
    public function __construct(
        public ?int $id,
        public string $title,
        public string $slug,
        public ?string $client_name,
        public ?string $description,
        public ?string $project_date,
        public int $order_priority,
        public ProductStatus $status,
        public ?CategoryData $category,
        public ?string $image_url,
    ) {}

    public static function fromModel(\App\Models\Portfolio $portfolio): self
    {
        return new self(
            id: $portfolio->id,
            title: $portfolio->title,
            slug: $portfolio->slug,
            client_name: $portfolio->client_name,
            description: $portfolio->description,
            project_date: $portfolio->project_date?->format('Y-m-d'),
            order_priority: $portfolio->order_priority,
            status: $portfolio->status,
            category: $portfolio->category ? CategoryData::from($portfolio->category) : null,
            image_url: $portfolio->getFirstMediaUrl('image'),
        );
    }
}
