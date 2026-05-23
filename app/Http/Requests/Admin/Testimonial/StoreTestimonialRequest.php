<?php

namespace App\Http\Requests\Admin\Testimonial;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_title' => ['nullable', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'order_priority' => ['required', 'integer', 'min:0'],
            'is_published' => ['required', 'boolean'],
            'avatar' => ['nullable', 'image', 'max:1024'],
        ];
    }
}
