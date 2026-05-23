<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Services\PortfolioService;
use App\Services\CategoryService;
use App\Enums\ProductStatus;
use App\Http\Requests\Admin\Portfolio\StorePortfolioRequest;
use App\Http\Requests\Admin\Portfolio\UpdatePortfolioRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __construct(
        protected PortfolioService $portfolioService,
        protected CategoryService $categoryService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Portfolio/Index', [
            'portfolios' => $this->portfolioService->getAllPortfoliosForAdmin()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Portfolio/Create', [
            'categories' => $this->categoryService->getAllCategories(),
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function store(StorePortfolioRequest $request)
    {
        $this->portfolioService->createPortfolio($request->validated());

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio berhasil ditambahkan.');
    }

    public function edit(Portfolio $portfolio): Response
    {
        return Inertia::render('Admin/Portfolio/Edit', [
            'portfolio' => $this->portfolioService->getPortfolioById($portfolio->id),
            'categories' => $this->categoryService->getAllCategories(),
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio)
    {
        $this->portfolioService->updatePortfolio($portfolio->id, $request->validated());

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio berhasil diperbarui.');
    }

    public function destroy(Portfolio $portfolio)
    {
        $this->portfolioService->deletePortfolio($portfolio->id);

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio berhasil dihapus.');
    }
}
