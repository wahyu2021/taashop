<?php

namespace App\Data;

use App\Enums\ProductStatus;
use App\Utils\MediaHelper;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class MaterialData extends Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        public string $slug,
        public ?string $summary,
        public ?string $description,
        public int $order_priority,
        public ProductStatus $status,
        /** @var string[] */
        public array $features,
        public ?string $image_url,
    ) {}

    public static function fromModel(\App\Models\Material $material): self
    {
        return new self(
            id: $material->id,
            name: $material->name,
            slug: $material->slug,
            summary: $material->summary,
            description: $material->description,
            order_priority: $material->order_priority,
            status: $material->status,
            features: $material->features->pluck('feature')->toArray(),
            image_url: MediaHelper::getRelativeUrl($material, 'image'),
        );
    }
}
