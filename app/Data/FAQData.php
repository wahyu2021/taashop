<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class FAQData extends Data
{
    public function __construct(
        public ?int $id,
        public string $question,
        public string $answer,
    ) {}

    public static function fromModel(\App\Models\FAQ $faq): self
    {
        return new self(
            id: $faq->id,
            question: $faq->question,
            answer: $faq->answer,
        );
    }
}
