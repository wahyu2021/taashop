<?php

use App\Models\Partner;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class);
    Storage::fake('public');
});

test('admin can access partners index', function () {
    $this->actingAs($this->user)
        ->get(route('admin.partners.index'))
        ->assertStatus(200);
});

test('admin can create partner', function () {
    $data = [
        'name' => 'New Partner',
        'is_active' => true,
        'logo' => UploadedFile::fake()->image('logo.jpg'),
    ];

    $this->actingAs($this->user)
        ->post(route('admin.partners.store'), $data)
        ->assertRedirect(route('admin.partners.index'));

    $this->assertDatabaseHas('partners', [
        'name' => 'New Partner',
        'is_active' => true,
    ]);

    $partner = Partner::where('name', 'New Partner')->first();
    expect($partner->getFirstMediaUrl('logo'))->not->toBeEmpty();
});

test('admin can update partner', function () {
    $partner = Partner::create([
        'name' => 'Old Partner',
        'is_active' => true,
    ]);

    $data = [
        'name' => 'Updated Partner',
        'is_active' => false,
    ];

    $this->actingAs($this->user)
        ->put(route('admin.partners.update', $partner), $data)
        ->assertRedirect(route('admin.partners.index'));

    $this->assertDatabaseHas('partners', [
        'id' => $partner->id,
        'name' => 'Updated Partner',
        'is_active' => false,
    ]);
});

test('admin can delete partner', function () {
    $partner = Partner::create([
        'name' => 'To Be Deleted',
        'is_active' => true,
    ]);

    $this->actingAs($this->user)
        ->delete(route('admin.partners.destroy', $partner))
        ->assertRedirect(route('admin.partners.index'));

    $this->assertDatabaseMissing('partners', [
        'id' => $partner->id,
    ]);
});
