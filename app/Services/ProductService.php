<?php

namespace App\Services;

use App\Data\ProductData;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Collection;

class ProductService
{
    public function __construct(
        protected ProductRepositoryInterface $productRepository
    ) {}

    /**
     * @return Collection<int, ProductData>
     */
    public function getCatalogProducts(int $limit = null): Collection
    {
        $products = $this->productRepository->getAllPublished($limit);

        return ProductData::collect($products);
    }

    /**
     * @return Collection<int, ProductData>
     */
    public function getFeaturedProducts(): Collection
    {
        $products = $this->productRepository->getFeatured();

        return ProductData::collect($products);
    }

    public function getProductDetail(string $slug): ?ProductData
    {
        $product = $this->productRepository->findBySlug($slug);

        return $product ? ProductData::fromModel($product) : null;
    }
}
