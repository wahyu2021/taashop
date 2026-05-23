<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Requests\Admin\Category\StoreCategoryRequest;
use App\Http\Requests\Admin\Category\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'type']);

        return Inertia::render('Admin/Category/Index', [
            'categories' => $this->categoryService->getFilteredCategoriesForAdmin($filters),
            'filters' => $filters
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $this->categoryService->createCategory($request->validated());

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Category/Edit', [
            'category' => $this->categoryService->getCategoryById($category->id)
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->categoryService->updateCategory($category->id, $request->validated());

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(Category $category)
    {
        $this->categoryService->deleteCategory($category->id);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
