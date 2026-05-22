<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('product_type'); // misal: Jersey Bola, T-Shirt
            $table->string('includes')->nullable();
            $table->string('print_type')->nullable(); // sablon, printing, both
            $table->decimal('min_price', 15, 2);
            $table->decimal('max_price', 15, 2);
            $table->integer('order_priority')->default(0);
            $table->string('status')->default('published');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
