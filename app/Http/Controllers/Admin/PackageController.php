<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Services\PackageService;
use App\Enums\ProductStatus;
use App\Enums\PrintType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function __construct(
        protected PackageService $packageService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Package/Index', [
            'packages' => $this->packageService->getAllPackagesForAdmin()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Package/Create', [
            'statuses' => ProductStatus::cases(),
            'printTypes' => PrintType::cases()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'product_type' => 'required|string|max:255',
            'includes' => 'nullable|string|max:255',
            'print_type' => ['nullable', new Enum(PrintType::class)],
            'min_price' => 'required|numeric|min:0',
            'max_price' => 'required|numeric|min:0|gte:min_price',
            'order_priority' => 'required|integer|min:0',
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => 'nullable|image|max:2048',
        ]);

        $this->packageService->createPackage($validated);

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

    public function update(Request $request, Package $package)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'product_type' => 'required|string|max:255',
            'includes' => 'nullable|string|max:255',
            'print_type' => ['nullable', new Enum(PrintType::class)],
            'min_price' => 'required|numeric|min:0',
            'max_price' => 'required|numeric|min:0|gte:min_price',
            'order_priority' => 'required|integer|min:0',
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => 'nullable|image|max:2048',
        ]);

        $this->packageService->updatePackage($package->id, $validated);

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
