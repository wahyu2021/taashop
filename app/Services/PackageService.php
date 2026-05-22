<?php

namespace App\Services;

use App\Data\PackageData;
use App\Repositories\Contracts\PackageRepositoryInterface;
use Illuminate\Support\Collection;

class PackageService
{
    public function __construct(
        protected PackageRepositoryInterface $packageRepository
    ) {}

    /**
     * @return Collection<int, PackageData>
     */
    public function getAllPackages(): Collection
    {
        $packages = $this->packageRepository->getAllPublished();

        return PackageData::collect($packages);
    }

    public function getPackageDetail(string $slug): ?PackageData
    {
        $package = $this->packageRepository->findBySlug($slug);

        return $package ? PackageData::fromModel($package) : null;
    }
}
