<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Enums\ProductStatus;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use Illuminate\Http\Request;
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

    public function store(StoreProductRequest $request)
    {
        $this->productService->createProduct($request->validated());

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

    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->productService->updateProduct($product->id, $request->validated());

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
