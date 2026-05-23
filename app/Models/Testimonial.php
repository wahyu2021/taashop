<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Testimonial extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'customer_name',
        'customer_title',
        'content',
        'rating',
        'is_published',
        'order_priority'
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile()
            ->useFallbackUrl('https://via.placeholder.com/600x400?text=Avatar');
    }
}
