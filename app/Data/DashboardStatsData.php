<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DashboardStatsData extends Data
{
    public function __construct(
        public int $total_products,
        public int $total_materials,
        public int $total_packages,
        public int $new_messages,
    ) {}
}
