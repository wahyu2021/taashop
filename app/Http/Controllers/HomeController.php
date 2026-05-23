<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Services\PortfolioService;
use App\Services\NewsService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        protected ProductService $productService,
        protected PortfolioService $portfolioService,
        protected NewsService $newsService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Home', [
            'featured_products' => $this->productService->getFeaturedProducts(),
            'latest_portfolios' => $this->portfolioService->getPublishedPortfolios(6),
            'latest_news' => $this->newsService->getPublishedNews(3),
        ]);
    }
}
