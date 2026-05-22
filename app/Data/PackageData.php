<?php

namespace App\Data;

use App\Enums\PrintType;
use App\Enums\ProductStatus;
use Spatie\LaravelData\Data;

class PackageData extends Data
{
    public function __construct(
        public ?int $id,
        public string $title,
        public string $slug,
        public string $product_type,
        public ?string $includes,
        public ?PrintType $print_type,
        public float $min_price,
        public float $max_price,
        public int $order_priority,
        public ProductStatus $status,
        public ?string $image_url,
    ) {}

    public static function fromModel(\App\Models\Package $package): self
    {
        return new self(
            id: $package->id,
            title: $package->title,
            slug: $package->slug,
            product_type: $package->product_type,
            includes: $package->includes,
            print_type: $package->print_type,
            min_price: (float) $package->min_price,
            max_price: (float) $package->max_price,
            order_priority: $package->order_priority,
            status: $package->status,
            image_url: $package->getFirstMediaUrl('image'),
        );
    }
}
