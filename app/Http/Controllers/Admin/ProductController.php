<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Enums\ProductStatus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService,
        protected CategoryService $categoryService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Product/Index', [
            'products' => $this->productService->getAllProductsForAdmin()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Product/Create', [
            'categories' => $this->categoryService->getAllCategories(),
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_featured' => 'required|boolean',
            'order_priority' => 'required|integer|min:0',
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => 'nullable|image|max:2048',
        ]);

        $this->productService->createProduct($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil ditambahkan.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Product/Edit', [
            'product' => $this->productService->getProductById($product->id),
            'categories' => $this->categoryService->getAllCategories(),
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_featured' => 'required|boolean',
            'order_priority' => 'required|integer|min:0',
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => 'nullable|image|max:2048',
        ]);

        $this->productService->updateProduct($product->id, $validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product->id);

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil dihapus.');
    }
}
