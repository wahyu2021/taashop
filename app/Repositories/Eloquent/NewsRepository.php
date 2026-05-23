<?php

namespace App\Repositories\Eloquent;

use App\Enums\ProductStatus;
use App\Models\News;
use App\Repositories\Contracts\NewsRepositoryInterface;
use Illuminate\Support\Collection;

class NewsRepository implements NewsRepositoryInterface
{
    public function all(): Collection
    {
        return News::latest()->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = News::query();

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('summary', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()
            ->paginate($filters['per_page'] ?? $perPage)
            ->withQueryString();
    }

    public function findById(int $id): ?News
    {
        return News::find($id);
    }

    public function create(array $data): News
    {
        $news = News::create($data);

        if (isset($data['image'])) {
            $news->addMedia($data['image'])->toMediaCollection('image');
        }

        return $news;
    }

    public function update(int $id, array $data): bool
    {
        $news = $this->findById($id);
        if (!$news) return false;

        if (isset($data['image'])) {
            $news->addMedia($data['image'])->toMediaCollection('image');
        }

        return $news->update($data);
    }

    public function delete(int $id): bool
    {
        $news = $this->findById($id);
        if (!$news) return false;
        return $news->delete();
    }

    public function getPublished(int $limit = null): Collection
    {
        $query = News::where('status', ProductStatus::PUBLISHED)
            ->orderBy('published_at', 'desc')
            ->orderBy('order_priority', 'asc');

        if ($limit) {
            return $query->limit($limit)->get();
        }

        return $query->get();
    }
}
