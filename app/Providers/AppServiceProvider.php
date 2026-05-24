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
            \App\Repositories\Contracts\CategoryRepositoryInterface::class,
            \App\Repositories\Eloquent\CategoryRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\ProductRepositoryInterface::class,
            \App\Repositories\Eloquent\ProductRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\MaterialRepositoryInterface::class,
            \App\Repositories\Eloquent\MaterialRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\PackageRepositoryInterface::class,
            \App\Repositories\Eloquent\PackageRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\ContactSubmissionRepositoryInterface::class,
            \App\Repositories\Eloquent\ContactSubmissionRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\PortfolioRepositoryInterface::class,
            \App\Repositories\Eloquent\PortfolioRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\SettingRepositoryInterface::class,
            \App\Repositories\Eloquent\SettingRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\NewsRepositoryInterface::class,
            \App\Repositories\Eloquent\NewsRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\FAQRepositoryInterface::class,
            \App\Repositories\Eloquent\FAQRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\TestimonialRepositoryInterface::class,
            \App\Repositories\Eloquent\TestimonialRepository::class
        );

        $this->app->bind(
            \App\Repositories\Contracts\PartnerRepositoryInterface::class,
            \App\Repositories\Eloquent\PartnerRepository::class
        );

        $this->app->singleton(\App\Services\DashboardService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        \Illuminate\Support\Facades\RateLimiter::for('admin', function (\Illuminate\Http\Request $request) {
            return \Illuminate\Cache\RateLimiting\Limit::perMinute(60)->by($request->ip());
        });
    }
}
