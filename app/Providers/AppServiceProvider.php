<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Repositories\Contracts\ProductRepositoryInterface::class,
            \App\Repositories\Eloquent\ProductRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\MaterialRepositoryInterface::class,
            \App\Repositories\Eloquent\MaterialRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
