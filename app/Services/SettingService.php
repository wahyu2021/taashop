<?php

namespace App\Services;

use App\Data\SettingData;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;

class SettingService
{
    public function __construct(
        protected SettingRepositoryInterface $repository
    ) {}

    public function getGroupedSettings(): Collection
    {
        $grouped = $this->repository->allGrouped();
        
        return $grouped->map(function ($items) {
            return SettingData::collect($items);
        });
    }

    public function updateSettings(array $settings): bool
    {
        // Basic sanitization for all values
        foreach ($settings as $key => $value) {
            if (is_string($value)) {
                // Determine if it's metadata (strip tags) or might need purification
                // For settings, we usually want to strip all tags unless it's specifically a rich text field
                // For now, let's strip all tags for safety as these are global configs.
                $settings[$key] = Sanitizer::strip($value);
            }
        }

        return $this->repository->updateMany($settings);
    }

    public function getSettingValue(string $key, $default = null)
    {
        $setting = \App\Models\Setting::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }
}
