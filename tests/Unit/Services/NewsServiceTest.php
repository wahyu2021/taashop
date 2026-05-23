<?php

namespace Tests\Unit\Services;

use App\Models\News;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Services\NewsService;
use Mockery;
use Tests\TestCase;

class NewsServiceTest extends TestCase
{
    protected $repository;
    protected $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = Mockery::mock(NewsRepositoryInterface::class);
        $this->service = new NewsService($this->repository);
    }

    public function test_create_news_sets_published_at_when_status_is_published()
    {
        $inputData = [
            'title' => 'Breaking News',
            'summary' => 'Short summary',
            'content' => '<p>Rich content</p>',
            'status' => 'published'
        ];

        $this->repository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function ($data) {
                return $data['title'] === 'Breaking News' && 
                       $data['slug'] === 'breaking-news' &&
                       isset($data['published_at']) &&
                       $data['status'] === 'published';
            }))
            ->andReturn(new News());

        $result = $this->service->createNews($inputData);
        
        $this->assertInstanceOf(News::class, $result);
    }

    public function test_create_news_does_not_set_published_at_when_status_is_draft()
    {
        $inputData = [
            'title' => 'Draft News',
            'summary' => 'Short summary',
            'content' => '<p>Rich content</p>',
            'status' => 'draft'
        ];

        $this->repository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(function ($data) {
                return $data['title'] === 'Draft News' && 
                       !isset($data['published_at']) &&
                       $data['status'] === 'draft';
            }))
            ->andReturn(new News());

        $result = $this->service->createNews($inputData);
        
        $this->assertInstanceOf(News::class, $result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
