<?php

namespace App\Http\Controllers;

use App\Services\FAQService;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function __construct(
        protected FAQService $faqService
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
}
