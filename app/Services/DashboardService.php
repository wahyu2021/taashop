<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Material;
use App\Models\Package;
use App\Models\ContactSubmission;
use App\Enums\SubmissionStatus;
use App\Data\DashboardStatsData;

class DashboardService
{
    public function getAnalytics(): DashboardStatsData
    {
        return new DashboardStatsData(
            total_products: Product::count(),
            total_materials: Material::count(),
            total_packages: Package::count(),
            new_messages: ContactSubmission::where('status', SubmissionStatus::NEW)->count(),
        );
    }
}
