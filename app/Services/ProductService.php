<?php

namespace App\Services;

use App\Data\ProductData;
use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;

class ProductService
{
    public function __construct(
        protected ProductRepositoryInterface $productRepository
    ) {}

    public function getAllProductsForAdmin(): Collection
    {
        return ProductData::collect($this->productRepository->all());
    }

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

    public function getProductById(int $id): ?ProductData
    {
        $product = $this->productRepository->findById($id);

        return $product ? ProductData::fromModel($product) : null;
    }

    public function createProduct(array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title'], ['description']);
        $data['slug'] = \Illuminate\Support\Str::slug($data['title']);
        return $this->productRepository->create($data);
    }

    public function updateProduct(int $id, array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title'], ['description']);
        if (isset($data['title'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['title']);
        }
        return $this->productRepository->update($id, $data);
    }

    public function deleteProduct(int $id)
    {
        return $this->productRepository->delete($id);
    }
}
