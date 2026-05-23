<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Services\MaterialService;
use App\Enums\ProductStatus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class MaterialController extends Controller
{
    public function __construct(
        protected MaterialService $materialService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Material/Index', [
            'materials' => $this->materialService->getAllMaterialsForAdmin()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Material/Create', [
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'summary' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order_priority' => 'required|integer|min:0',
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => 'nullable|image|max:2048',
            'features' => 'nullable|array',
            'features.*' => 'required|string|max:255',
        ]);

        $this->materialService->createMaterial($validated);

        return redirect()->route('admin.materials.index')
            ->with('success', 'Material berhasil ditambahkan.');
    }

    public function edit(Material $material): Response
    {
        return Inertia::render('Admin/Material/Edit', [
            'material' => $this->materialService->getMaterialById($material->id),
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function update(Request $request, Material $material)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'summary' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order_priority' => 'required|integer|min:0',
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => 'nullable|image|max:2048',
            'features' => 'nullable|array',
            'features.*' => 'required|string|max:255',
        ]);

        $this->materialService->updateMaterial($material->id, $validated);

        return redirect()->route('admin.materials.index')
            ->with('success', 'Material berhasil diperbarui.');
    }

    public function destroy(Material $material)
    {
        $this->materialService->deleteMaterial($material->id);

        return redirect()->route('admin.materials.index')
            ->with('success', 'Material berhasil dihapus.');
    }
}
