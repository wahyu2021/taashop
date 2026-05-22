<?php

namespace App\Enums;

enum PrintType: string
{
    case SABLON = 'Sablon';
    case PRINTING = 'Printing';
    case BOTH = 'Sablon & Printing';

    public function label(): string
    {
        return match($this) {
            self::SABLON => 'Sablon',
            self::PRINTING => 'Printing',
            self::BOTH => 'Sablon & Printing',
        };
    }
}
