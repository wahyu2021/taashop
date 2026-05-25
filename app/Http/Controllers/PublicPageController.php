<?php

namespace App\Http\Controllers;

use App\Services\FAQService;
use App\Services\ContactSubmissionService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function __construct(
        protected FAQService $faqService,
        protected ContactSubmissionService $contactService
    ) {}

    public function about(): Response
    {
        return Inertia::render('Information/About');
    }

    public function faq(): Response
    {
        return Inertia::render('Information/FAQ', [
            'faqs' => $this->faqService->getPublishedFAQs()
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Information/Contact');
    }

    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'source_page' => 'nullable|string|max:255',
        ]);

        $this->contactService->createSubmission($validated);

        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.');
    }
}
