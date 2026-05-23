<?php

namespace App\Services;

use App\Data\PackageData;
use App\Repositories\Contracts\PackageRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;

class PackageService
{
    public function __construct(
        protected PackageRepositoryInterface $packageRepository
    ) {}

    public function getAllPackagesForAdmin(): Collection
    {
        return PackageData::collect($this->packageRepository->all());
    }

    /**
     * @return Collection<int, PackageData>
     */
    public function getPublishedPackages(): Collection
    {
        $packages = $this->packageRepository->getAllPublished();

        return PackageData::collect($packages);
    }

    public function getPackageDetail(string $slug): ?PackageData
    {
        $package = $this->packageRepository->findBySlug($slug);

        return $package ? PackageData::fromModel($package) : null;
    }

    public function getPackageById(int $id): ?PackageData
    {
        $package = $this->packageRepository->findById($id);

        return $package ? PackageData::fromModel($package) : null;
    }

    public function createPackage(array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title', 'product_type', 'includes']);
        $data['slug'] = \Illuminate\Support\Str::slug($data['title']);
        return $this->packageRepository->create($data);
    }

    public function updatePackage(int $id, array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title', 'product_type', 'includes']);
        if (isset($data['title'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['title']);
        }
        return $this->packageRepository->update($id, $data);
    }

    public function deletePackage(int $id)
    {
        return $this->packageRepository->delete($id);
    }
}
