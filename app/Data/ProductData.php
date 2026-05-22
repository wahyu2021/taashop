<?php

namespace App\Data;

use App\Enums\ProductStatus;
use Spatie\LaravelData\Data;

class ProductData extends Data
{
    public function __construct(
        public ?int $id,
        public string $title,
        public string $slug,
        public ?string $description,
        public bool $is_featured,
        public int $order_priority,
        public ProductStatus $status,
        public ?CategoryData $category,
        public ?string $image_url,
    ) {}

    public static function fromModel(\App\Models\Product $product): self
    {
        return new self(
            id: $product->id,
            title: $product->title,
            slug: $product->slug,
            description: $product->description,
            is_featured: $product->is_featured,
            order_priority: $product->order_priority,
            status: $product->status,
            category: $product->category ? CategoryData::from($product->category) : null,
            image_url: $product->getFirstMediaUrl('image'),
        );
    }
}
