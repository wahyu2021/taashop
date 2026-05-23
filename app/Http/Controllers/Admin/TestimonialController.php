<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Http\Requests\Admin\Testimonial\StoreTestimonialRequest;
use App\Http\Requests\Admin\Testimonial\UpdateTestimonialRequest;
use App\Data\TestimonialData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(Request $request): Response
    {
        $testimonials = Testimonial::orderBy('order_priority', 'asc')->get();

        return Inertia::render('Admin/Testimonial/Index', [
            'testimonials' => TestimonialData::collect($testimonials)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Testimonial/Create');
    }

    public function store(StoreTestimonialRequest $request)
    {
        $data = $request->validated();
        $avatar = $request->file('avatar');
        unset($data['avatar']);

        $testimonial = Testimonial::create($data);

        if ($avatar) {
            $testimonial->addMedia($avatar)->toMediaCollection('avatar');
        }

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil ditambahkan.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('Admin/Testimonial/Edit', [
            'testimonial' => TestimonialData::fromModel($testimonial)
        ]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $data = $request->validated();
        $avatar = $request->file('avatar');
        unset($data['avatar']);

        $testimonial->update($data);

        if ($avatar) {
            $testimonial->addMedia($avatar)->toMediaCollection('avatar');
        }

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')
            ->with('success', 'Testimoni berhasil dihapus.');
    }
}
