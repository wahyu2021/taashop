<?php

namespace App\Repositories\Contracts;

use Illuminate\Support\Collection;

interface SettingRepositoryInterface
{
    public function allGrouped(): Collection;
    public function updateMany(array $settings): bool;
}
