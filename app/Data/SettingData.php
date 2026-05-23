<?php

namespace App\Data;

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
    ) {}
}
