<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicProductController extends Controller
{
    public function __construct(
        protected ProductService $productService,
        protected CategoryService $categoryService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'category_id', 'per_page']);

        return Inertia::render('Catalog/Index', [
            'products' => $this->productService->getFilteredProductsForAdmin($filters, 12),
            'categories' => $this->categoryService->getAllCategories(),
            'filters' => $filters
        ]);
    }

    public function show(string $slug): Response
    {
        $product = $this->productService->getProductDetail($slug);

        if (!$product) {
            abort(404);
        }

        return Inertia::render('Catalog/Show', [
            'product' => $product,
            'related_products' => $this->productService->getCatalogProducts(4) // Simple related logic
        ]);
    }
}
