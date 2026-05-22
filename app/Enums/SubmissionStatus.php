<?php

namespace App\Enums;

enum SubmissionStatus: string
{
    case NEW = 'new';
    case CONTACTED = 'contacted';
    case CLOSED = 'closed';

    public function label(): string
    {
        return match($this) {
            self::NEW => 'New',
            self::CONTACTED => 'Contacted',
            self::CLOSED => 'Closed',
        };
    }
}
