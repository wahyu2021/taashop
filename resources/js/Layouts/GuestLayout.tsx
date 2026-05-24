import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-stone-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex flex-col items-center gap-4">
                    <ApplicationLogo className="h-20 w-auto object-contain" />
                    <span className="text-3xl font-black uppercase tracking-tighter text-stone-900">
                        TAA<span className="text-orange-600">SHOP</span>
                    </span>
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-white px-8 py-10 shadow-xl shadow-stone-200/50 sm:max-w-md border border-stone-100">
                {children}
            </div>
        </div>
    );
}
