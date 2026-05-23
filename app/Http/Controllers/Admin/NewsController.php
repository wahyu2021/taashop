<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Services\NewsService;
use App\Enums\ProductStatus;
use App\Http\Requests\Admin\News\StoreNewsRequest;
use App\Http\Requests\Admin\News\UpdateNewsRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function __construct(
        protected NewsService $service
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status']);

        return Inertia::render('Admin/News/Index', [
            'news' => $this->service->getFilteredNewsForAdmin($filters),
            'filters' => $filters,
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/News/Create', [
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function store(StoreNewsRequest $request)
    {
        $this->service->createNews($request->validated());

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil diterbitkan.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $this->service->getNewsById($news->id),
            'statuses' => ProductStatus::cases()
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news)
    {
        $this->service->updateNews($news->id, $request->validated());

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(News $news)
    {
        $this->service->deleteNews($news->id);

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}
