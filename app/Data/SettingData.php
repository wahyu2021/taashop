<?php

namespace App\Data;

use App\Utils\MediaHelper;
use Spatie\LaravelData\Data;

class SettingData extends Data
{
    public function __construct(
        public ?int $id,
        public string $key,
        public ?string $value,
        public string $label,
        public string $type,
        public string $group,
        public int $order_priority,
        public ?string $image_url = null,
    ) {}

    public static function fromModel(\App\Models\Setting $model): self
    {
        return new self(
            id: $model->id,
            key: $model->key,
            value: $model->value,
            label: $model->label,
            type: $model->type,
            group: $model->group,
            order_priority: $model->order_priority,
            image_url: MediaHelper::getRelativeUrl($model, 'image'),
        );
    }
}
