<?php

namespace App\Http\Requests\Admin\FAQ;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFAQRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string'],
            'order_priority' => ['required', 'integer', 'min:0'],
            'is_published' => ['required', 'boolean'],
        ];
    }
}
