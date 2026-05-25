<?php

namespace App\Http\Controllers;

use App\Services\PortfolioService;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPortfolioController extends Controller
{
    public function __construct(
        protected PortfolioService $portfolioService,
        protected CategoryService $categoryService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'category_id', 'per_page']);

        return Inertia::render('Portfolio/Index', [
            'portfolios' => $this->portfolioService->getFilteredPortfoliosForPublic($filters, 12),
            'categories' => $this->categoryService->getAllCategories(),
            'filters' => $filters
        ]);
    }

    public function show(string $slug): Response
    {
        $portfolio = $this->portfolioService->getPortfolioDetail($slug);

        if (!$portfolio) {
            abort(404);
        }

        return Inertia::render('Portfolio/Show', [
            'portfolio' => $portfolio,
            'related_portfolios' => $this->portfolioService->getPublishedPortfolios(4)
        ]);
    }
}
