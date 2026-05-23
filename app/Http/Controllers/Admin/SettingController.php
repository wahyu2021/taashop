<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(
        protected SettingService $service
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Setting/Index', [
            'groupedSettings' => $this->service->getGroupedSettings()
        ]);
    }

    public function update(Request $request)
    {
        // We handle both text 'settings' and 'files' (for images)
        $this->service->updateSettings($request->all());

        return redirect()->back()
            ->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
