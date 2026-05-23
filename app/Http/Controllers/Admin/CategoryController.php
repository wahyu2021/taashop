<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Category/Index', [
            'categories' => $this->categoryService->getAllCategories()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:gallery,package',
        ]);

        $this->categoryService->createCategory($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Category/Edit', [
            'category' => $this->categoryService->getCategoryById($category->id)
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:gallery,package',
        ]);

        $this->categoryService->updateCategory($category->id, $validated);

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
