<?php

namespace App\Data;

use App\Utils\MediaHelper;
use Spatie\LaravelData\Data;

class PartnerData extends Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        public bool $is_active,
        public ?string $logo_url,
    ) {}

    public static function fromModel(\App\Models\Partner $partner): self
    {
        return new self(
            id: $partner->id,
            name: $partner->name,
            is_active: $partner->is_active,
            logo_url: MediaHelper::getRelativeUrl($partner, 'logo'),
        );
    }
}
