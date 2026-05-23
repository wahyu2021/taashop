<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Portfolio extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'client_name',
        'description',
        'project_date',
        'order_priority',
        'status',
    ];

    protected $casts = [
        'project_date' => 'date',
        'status' => ProductStatus::class,
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')
            ->singleFile()
            ->useFallbackUrl('https://via.placeholder.com/600x400?text=Portfolio+Image');
    }
}
