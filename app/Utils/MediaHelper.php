<?php

namespace App\Utils;

use Spatie\MediaLibrary\HasMedia;

class MediaHelper
{
    /**
     * Get the relative URL path for a model's first media in a collection.
     *
     * Returns a relative path (e.g., /storage/2/image.jpg) instead of a full URL,
     * so it works correctly regardless of APP_URL configuration or port mismatches
     * in development environments.
     *
     * Returns null if no media exists in the collection.
     */
    public static function getRelativeUrl(HasMedia $model, string $collection): ?string
    {
        $media = $model->getFirstMedia($collection);

        if (!$media) {
            return null;
        }

        $fullUrl = $media->getUrl();

        return parse_url($fullUrl, PHP_URL_PATH) ?: $fullUrl;
    }
}
