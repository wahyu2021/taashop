<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use App\Http\Requests\Admin\FAQ\StoreFAQRequest;
use App\Http\Requests\Admin\FAQ\UpdateFAQRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FAQController extends Controller
{
    public function index(Request $request): Response
    {
        $faqs = FAQ::orderBy('order_priority', 'asc')->get();

        return Inertia::render('Admin/FAQ/Index', [
            'faqs' => $faqs
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/FAQ/Create');
    }

    public function store(StoreFAQRequest $request)
    {
        FAQ::create($request->validated());

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ berhasil ditambahkan.');
    }

    public function edit(FAQ $faq): Response
    {
        return Inertia::render('Admin/FAQ/Edit', [
            'faq' => $faq
        ]);
    }

    public function update(UpdateFAQRequest $request, FAQ $faq)
    {
        $faq->update($request->validated());

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ berhasil diperbarui.');
    }

    public function destroy(FAQ $faq)
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')
            ->with('success', 'FAQ berhasil dihapus.');
    }
}
