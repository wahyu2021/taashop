<?php

namespace App\Repositories\Eloquent;

use App\Models\Setting;
use App\Repositories\Contracts\SettingRepositoryInterface;
use Illuminate\Support\Collection;

class SettingRepository implements SettingRepositoryInterface
{
    public function allGrouped(): Collection
    {
        return Setting::orderBy('group')
            ->orderBy('order_priority')
            ->get()
            ->groupBy('group');
    }

    public function updateMany(array $settings): bool
    {
        foreach ($settings as $key => $value) {
            Setting::where('key', $key)->update(['value' => $value]);
        }
        return true;
    }
}
