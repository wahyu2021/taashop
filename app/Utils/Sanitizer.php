<?php

namespace App\Utils;

use Mews\Purifier\Facades\Purifier;

class Sanitizer
{
    /**
     * Strip all HTML tags from a string.
     * Ideal for titles, names, and slugs.
     */
    public static function strip(?string $value): ?string
    {
        if (is_null($value)) return null;
        return strip_tags($value);
    }

    /**
     * Sanitize HTML content using HTML Purifier.
     * Ideal for descriptions and summaries that might allow some formatting.
     */
    public static function clean(?string $value): ?string
    {
        if (is_null($value)) return null;
        return Purifier::clean($value);
    }

    /**
     * Helper to sanitize an entire array based on keys.
     * 
     * @param array $data Input data
     * @param array $metadataFields Keys to be fully stripped
     * @param array $richTextFields Keys to be purified
     */
    public static function sanitizeArray(array $data, array $metadataFields = [], array $richTextFields = []): array
    {
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                if (in_array($key, $metadataFields)) {
                    $data[$key] = self::strip($value);
                } elseif (in_array($key, $richTextFields)) {
                    $data[$key] = self::clean($value);
                }
            }
        }
        return $data;
    }
}
