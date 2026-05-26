<?php

namespace App\Services;

use App\Data\SettingData;
use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;

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

    public function updateSettings(array $data): bool
    {
        $settings = $data['settings'] ?? [];
        $files = $data['files'] ?? [];

        // Handle text settings
        foreach ($settings as $key => $value) {
            if (is_string($value)) {
                $sanitizedValue = Sanitizer::strip($value);
                Setting::where('key', $key)->update(['value' => $sanitizedValue]);
            }
        }

        // Handle file/image settings with validation
        if (!empty($files)) {
            $validator = \Illuminate\Support\Facades\Validator::make(['files' => $files], [
                'files.*' => ['image', 'mimes:jpg,jpeg,png,webp,svg', 'max:2048'],
            ]);

            if ($validator->fails()) {
                throw new \Illuminate\Validation\ValidationException($validator);
            }

            foreach ($files as $key => $file) {
                if ($file instanceof UploadedFile) {
                    $setting = Setting::where('key', $key)->first();
                    if ($setting) {
                        $setting->addMedia($file)->toMediaCollection('image');
                    }
                }
            }
        }

        return true;
    }

    public function getSettingValue(string $key, $default = null)
    {
        $setting = Setting::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    public function getSettingImageUrl(string $key)
    {
        $setting = Setting::where('key', $key)->first();
        return $setting ? $setting->getFirstMediaUrl('image') : null;
    }

    public function getSiteSettings(): array
    {
        $settings = Setting::all();
        $siteSettings = [];

        foreach ($settings as $setting) {
            if ($setting->type === 'image') {
                $siteSettings[$setting->key] = $setting->getFirstMediaUrl('image', 'webp') ?: $setting->getFirstMediaUrl('image');
            } else {
                $siteSettings[$setting->key] = $setting->value;
            }
        }

        return $siteSettings;
    }
}
