<?php

namespace App\Http\Requests\Admin\Package;

use App\Enums\PrintType;
use App\Enums\ProductStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdatePackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'product_type' => ['required', 'string', 'max:255'],
            'includes' => ['nullable', 'string', 'max:255'],
            'print_type' => ['nullable', new Enum(PrintType::class)],
            'min_price' => ['required', 'numeric', 'min:0'],
            'max_price' => ['required', 'numeric', 'min:0', 'gte:min_price'],
            'order_priority' => ['required', 'integer', 'min:0'],
            'status' => ['required', new Enum(ProductStatus::class)],
            'image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
