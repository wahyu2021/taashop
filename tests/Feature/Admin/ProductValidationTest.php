<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    // Bypass CSRF for validation testing
    $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);
});

test('product validation: title is required', function () {
    $this->withoutExceptionHandling();
    $category = Category::factory()->create();

    $this->actingAs($this->user)
        ->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'title' => '', // Empty title
            'is_featured' => false,
            'order_priority' => 0,
            'status' => 'published'
        ])
        ->assertSessionHasErrors(['title']);
});

test('product validation: category must exist', function () {
    $this->actingAs($this->user)
        ->post(route('admin.products.store'), [
            'category_id' => 999, // Non-existent ID
            'title' => 'Valid Title',
            'is_featured' => false,
            'order_priority' => 0,
            'status' => 'published'
        ])
        ->assertSessionHasErrors(['category_id']);
});

test('product validation: order_priority must be non-negative', function () {
    $category = Category::factory()->create();

    $this->actingAs($this->user)
        ->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'title' => 'Valid Title',
            'is_featured' => false,
            'order_priority' => -1, // Negative priority
            'status' => 'published'
        ])
        ->assertSessionHasErrors(['order_priority']);
});

test('product validation: status must be a valid enum value', function () {
    $category = Category::factory()->create();

    $this->actingAs($this->user)
        ->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'title' => 'Valid Title',
            'is_featured' => false,
            'order_priority' => 0,
            'status' => 'invalid-status' // Invalid enum
        ])
        ->assertSessionHasErrors(['status']);
});
