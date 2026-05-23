<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);
});

test('admin can access categories index', function () {
    $this->actingAs($this->user)
        ->get(route('admin.categories.index'))
        ->assertStatus(200);
});

test('admin can create category', function () {
    $data = [
        'name' => 'New Category',
        'type' => 'gallery',
    ];

    $this->actingAs($this->user)
        ->post(route('admin.categories.store'), $data)
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseHas('categories', [
        'name' => 'New Category',
        'type' => 'gallery',
    ]);
});

test('admin can update category', function () {
    $this->withoutExceptionHandling();
    $category = Category::factory()->create();

    $data = [
        'name' => 'Updated Category',
        'type' => 'package',
    ];

    $this->actingAs($this->user)
        ->put(route('admin.categories.update', $category), $data)
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Updated Category',
        'type' => 'package',
    ]);
});

test('admin can delete category', function () {
    $category = Category::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('admin.categories.destroy', $category))
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});
