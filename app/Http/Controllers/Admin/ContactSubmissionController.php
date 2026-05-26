<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Services\ContactSubmissionService;
use App\Enums\SubmissionStatus;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class ContactSubmissionController extends Controller
{
    public function __construct(
        protected ContactSubmissionService $service
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'per_page']);

        return Inertia::render('Admin/Inbox/Index', [
            'submissions' => $this->service->getFilteredSubmissions($filters),
            'filters' => $filters,
            'statuses' => collect(SubmissionStatus::cases())->map(fn($s) => [
                'name' => $s->label(),
                'value' => $s->value
            ])
        ]);
    }

    public function show(ContactSubmission $inbox): Response
    {
        // Auto mark as contacted when viewed if it's still NEW
        if ($inbox->status === SubmissionStatus::NEW) {
            $this->service->updateSubmissionStatus($inbox->id, SubmissionStatus::CONTACTED->value);
        }

        return Inertia::render('Admin/Inbox/Show', [
            'submission' => $this->service->getSubmissionById($inbox->id),
            'statuses' => collect(SubmissionStatus::cases())->map(fn($s) => [
                'name' => $s->label(),
                'value' => $s->value
            ])
        ]);
    }

    public function update(Request $request, ContactSubmission $inbox)
    {
        $validated = $request->validate([
            'status' => ['required', new Enum(SubmissionStatus::class)],
        ]);

        $this->service->updateSubmissionStatus($inbox->id, $validated['status']);

        return redirect()->route('admin.inbox.index')
            ->with('success', 'Status pesan berhasil diperbarui.');
    }

    public function destroy(ContactSubmission $inbox)
    {
        $this->service->deleteSubmission($inbox->id);

        return redirect()->route('admin.inbox.index')
            ->with('success', 'Pesan berhasil dihapus.');
    }
}
