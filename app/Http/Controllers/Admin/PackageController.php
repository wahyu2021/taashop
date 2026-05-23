<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Services\PackageService;
use App\Enums\ProductStatus;
use App\Enums\PrintType;
use App\Http\Requests\Admin\Package\StorePackageRequest;
use App\Http\Requests\Admin\Package\UpdatePackageRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function __construct(
        protected PackageService $packageService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'print_type', 'per_page']);

        return Inertia::render('Admin/Package/Index', [
            'packages' => $this->packageService->getFilteredPackagesForAdmin($filters),
            'filters' => $filters,
            'statuses' => ProductStatus::cases(),
            'printTypes' => PrintType::cases()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Package/Create', [
            'statuses' => ProductStatus::cases(),
            'printTypes' => PrintType::cases()
        ]);
    }

    public function store(StorePackageRequest $request)
    {
        $this->packageService->createPackage($request->validated());

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil ditambahkan.');
    }

    public function edit(Package $package): Response
    {
        return Inertia::render('Admin/Package/Edit', [
            'package' => $this->packageService->getPackageById($package->id),
            'statuses' => ProductStatus::cases(),
            'printTypes' => PrintType::cases()
        ]);
    }

    public function update(UpdatePackageRequest $request, Package $package)
    {
        $this->packageService->updatePackage($package->id, $request->validated());

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil diperbarui.');
    }

    public function destroy(Package $package)
    {
        $this->packageService->deletePackage($package->id);

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil dihapus.');
    }
}
