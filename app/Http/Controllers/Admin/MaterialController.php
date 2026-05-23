<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Services\MaterialService;
use App\Enums\ProductStatus;
use App\Http\Requests\Admin\Material\StoreMaterialRequest;
use App\Http\Requests\Admin\Material\UpdateMaterialRequest;
use Illuminate\Http\Request;
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

    public function store(StoreMaterialRequest $request)
    {
        $this->materialService->createMaterial($request->validated());

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

    public function update(UpdateMaterialRequest $request, Material $material)
    {
        $this->materialService->updateMaterial($material->id, $request->validated());

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
