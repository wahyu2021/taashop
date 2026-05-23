<?php

namespace App\Repositories\Eloquent;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use Illuminate\Support\Collection;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function all(): Collection
    {
        return Category::latest()->get();
    }

    public function getFiltered(array $filters = [], int $perPage = 10)
    {
        $query = Category::query();

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        return $query->latest()->paginate($perPage)->withQueryString();
    }

    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $category = $this->findById($id);
        if (!$category) return false;
        return $category->update($data);
    }

    public function delete(int $id): bool
    {
        $category = $this->findById($id);
        if (!$category) return false;
        return $category->delete();
    }
}
