<?php

namespace App\Models;

use App\Enums\PrintType;
use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Package extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'product_type',
        'includes',
        'print_type',
        'min_price',
        'max_price',
        'order_priority',
        'status',
    ];

    protected $casts = [
        'print_type' => PrintType::class,
        'status' => ProductStatus::class,
        'min_price' => 'decimal:2',
        'max_price' => 'decimal:2',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')
            ->singleFile()
            ->useFallbackUrl('/images/placeholder.svg');
    }
}
