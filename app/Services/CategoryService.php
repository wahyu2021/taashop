<?php

namespace App\Services;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Data\CategoryData;
use Illuminate\Support\Str;

class CategoryService
{
    public function __construct(
        protected CategoryRepositoryInterface $repository
    ) {}

    public function getAllCategories()
    {
        return CategoryData::collect($this->repository->all());
    }

    public function getCategoryById(int $id)
    {
        $category = $this->repository->findById($id);
        return $category ? CategoryData::from($category) : null;
    }

    public function createCategory(array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        return $this->repository->create($data);
    }

    public function updateCategory(int $id, array $data)
    {
        $data['slug'] = Str::slug($data['name']);
        return $this->repository->update($id, $data);
    }

    public function deleteCategory(int $id)
    {
        return $this->repository->delete($id);
    }
}
