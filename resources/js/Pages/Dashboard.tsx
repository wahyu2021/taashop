import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-foreground">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard | Taaashop" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-card shadow-sm sm:rounded-xl border border-border">
                        <div className="p-8 text-foreground">
                            <h3 className="text-lg font-bold">Selamat Datang!</h3>
                            <p className="text-stone-500 mt-2 font-medium">Anda telah berhasil masuk ke sistem Taaashop.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}