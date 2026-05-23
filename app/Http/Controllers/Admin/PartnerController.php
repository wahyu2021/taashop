<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Services\PartnerService;
use App\Http\Requests\Admin\Partner\StorePartnerRequest;
use App\Http\Requests\Admin\Partner\UpdatePartnerRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function __construct(
        protected PartnerService $partnerService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'is_active', 'per_page']);

        return Inertia::render('Admin/Partner/Index', [
            'partners' => $this->partnerService->getFilteredPartnersForAdmin($filters),
            'filters' => $filters
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Partner/Create');
    }

    public function store(StorePartnerRequest $request)
    {
        $this->partnerService->createPartner($request->validated());

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner berhasil ditambahkan.');
    }

    public function edit(Partner $partner): Response
    {
        return Inertia::render('Admin/Partner/Edit', [
            'partner' => $this->partnerService->getPartnerById($partner->id)
        ]);
    }

    public function update(UpdatePartnerRequest $request, Partner $partner)
    {
        $this->partnerService->updatePartner($partner->id, $request->validated());

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner berhasil diperbarui.');
    }

    public function destroy(Partner $partner)
    {
        $this->partnerService->deletePartner($partner->id);

        return redirect()->route('admin.partners.index')
            ->with('success', 'Partner berhasil dihapus.');
    }
}
