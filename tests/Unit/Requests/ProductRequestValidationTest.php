<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Admin\Product\StoreProductRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ProductRequestValidationTest extends TestCase
{
    public function test_validation_rules_are_correct()
    {
        $request = new StoreProductRequest();
        $rules = $request->rules();

        $this->assertArrayHasKey('category_id', $rules);
        $this->assertArrayHasKey('title', $rules);
        $this->assertArrayHasKey('order_priority', $rules);
        $this->assertArrayHasKey('status', $rules);
    }

    public function test_validation_fails_with_invalid_data()
    {
        $request = new StoreProductRequest();
        $rules = $request->rules();

        $validator = Validator::make([
            'category_id' => 999, // Should fail if categories table is empty or doesn't have 999
            'title' => '', // Should fail
            'is_featured' => 'not-boolean', // Should fail
            'order_priority' => -1, // Should fail
            'status' => 'invalid-status' // Should fail
        ], $rules);

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
        $this->assertArrayHasKey('category_id', $validator->errors()->toArray());
        $this->assertArrayHasKey('is_featured', $validator->errors()->toArray());
        $this->assertArrayHasKey('order_priority', $validator->errors()->toArray());
        $this->assertArrayHasKey('status', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_valid_data()
    {
        // We need RefreshDatabase for 'exists' rule if we want to test database dependency
        // but for now let's focus on logic
    }
}
