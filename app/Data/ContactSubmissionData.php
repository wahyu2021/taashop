<?php

namespace App\Data;

use App\Enums\SubmissionStatus;
use Carbon\Carbon;
use Spatie\LaravelData\Data;

class ContactSubmissionData extends Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        public ?string $email,
        public ?string $phone,
        public ?string $subject,
        public ?string $message,
        public SubmissionStatus $status,
        public ?string $source_page,
        public string $submitted_at,
    ) {}

    public static function fromModel(\App\Models\ContactSubmission $model): self
    {
        return new self(
            id: $model->id,
            name: $model->name,
            email: $model->email,
            phone: $model->phone,
            subject: $model->subject,
            message: $model->message,
            status: $model->status,
            source_page: $model->source_page,
            submitted_at: $model->submitted_at->format('Y-m-d H:i:s'),
        );
    }
}
