<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicProductController;
use App\Http\Controllers\PublicPortfolioController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/faq', [PublicPageController::class, 'faq'])->name('faq');

Route::prefix('catalog')->name('catalog.')->group(function () {
    Route::get('/', [PublicProductController::class, 'index'])->name('index');
    Route::get('/{slug}', [PublicProductController::class, 'show'])->name('show');
});

Route::prefix('portfolio')->name('portfolio.')->group(function () {
    Route::get('/', [PublicPortfolioController::class, 'index'])->name('index');
    Route::get('/{slug}', [PublicPortfolioController::class, 'show'])->name('show');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->middleware('throttle:admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
        Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
        Route::resource('materials', \App\Http\Controllers\Admin\MaterialController::class);
        Route::resource('packages', \App\Http\Controllers\Admin\PackageController::class);
        Route::resource('portfolios', \App\Http\Controllers\Admin\PortfolioController::class);
        Route::resource('news', \App\Http\Controllers\Admin\NewsController::class);
        Route::resource('faqs', \App\Http\Controllers\Admin\FAQController::class);
        Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
        Route::resource('partners', \App\Http\Controllers\Admin\PartnerController::class);
        Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
        Route::patch('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
        Route::resource('inbox', \App\Http\Controllers\Admin\ContactSubmissionController::class)->only(['index', 'show', 'update', 'destroy']);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
