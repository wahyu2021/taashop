<?php

namespace App\Services;

use App\Data\PortfolioData;
use App\Repositories\Contracts\PortfolioRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class PortfolioService
{
    public function __construct(
        protected PortfolioRepositoryInterface $repository
    ) {}

    public function getAllPortfoliosForAdmin(): Collection
    {
        return PortfolioData::collect($this->repository->all());
    }

    public function getPortfolioById(int $id): ?PortfolioData
    {
        $portfolio = $this->repository->findById($id);
        return $portfolio ? PortfolioData::fromModel($portfolio) : null;
    }

    public function createPortfolio(array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title', 'client_name'], ['description']);
        $data['slug'] = Str::slug($data['title']);
        return $this->repository->create($data);
    }

    public function updatePortfolio(int $id, array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title', 'client_name'], ['description']);
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        return $this->repository->update($id, $data);
    }

    public function deletePortfolio(int $id)
    {
        return $this->repository->delete($id);
    }

    public function getPublishedPortfolios(int $limit = null): Collection
    {
        return PortfolioData::collect($this->repository->getPublished($limit));
    }
}
