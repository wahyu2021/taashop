<?php

namespace App\Services;

use App\Data\NewsData;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class NewsService
{
    public function __construct(
        protected NewsRepositoryInterface $repository
    ) {}

    public function getFilteredNewsForAdmin(array $filters = [], int $perPage = 10)
    {
        $paginator = $this->repository->getFiltered($filters, $perPage);
        
        return NewsData::collect($paginator);
    }

    public function getAllNewsForAdmin(): Collection
    {
        return NewsData::collect($this->repository->all());
    }

    public function getNewsById(int $id): ?NewsData
    {
        $news = $this->repository->findById($id);
        return $news ? NewsData::fromModel($news) : null;
    }

    public function createNews(array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title', 'summary'], ['content']);
        $data['slug'] = Str::slug($data['title']);
        
        if (isset($data['status']) && $data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        return $this->repository->create($data);
    }

    public function updateNews(int $id, array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['title', 'summary'], ['content']);
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        return $this->repository->update($id, $data);
    }

    public function deleteNews(int $id)
    {
        return $this->repository->delete($id);
    }

    public function getPublishedNews(int $limit = null): Collection
    {
        return NewsData::collect($this->repository->getPublished($limit));
    }
}
