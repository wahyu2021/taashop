import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Home, AlertTriangle, ShieldAlert, FileSearch, WifiOff, Ghost } from 'lucide-react';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
    status: number;
}

export default function ErrorPage({ status }: Props) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
        419: '419: Page Expired',
    }[status] || 'Error';

    const description = {
        503: 'Maaf, kami sedang melakukan pemeliharaan rutin. Silakan kembali lagi nanti.',
        500: 'Wah, sepertinya terjadi kesalahan di server kami. Tim kami sedang berusaha memperbaikinya.',
        404: 'Waduh! Halaman yang Anda cari tidak ditemukan atau mungkin sudah dipindahkan.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
        419: 'Sesi Anda telah berakhir karena terlalu lama tidak aktif. Silakan segarkan halaman.',
    }[status] || 'Terjadi kesalahan yang tidak terduga.';

    const Icon = {
        503: WifiOff,
        500: AlertTriangle,
        404: Ghost,
        403: ShieldAlert,
        419: FileSearch,
    }[status] || AlertTriangle;

    return (
        <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased text-white">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Background Glows */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]" />
            </div>

            <Head title={title} />

            <div className="relative z-10 max-w-lg w-full text-center">
                {/* Status Code Large Background Text */}
                <div className="absolute inset-0 -top-20 flex items-center justify-center select-none opacity-[0.05] pointer-events-none">
                    <span className="text-[20rem] font-black italic">{status}</span>
                </div>

                <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-600">
                    <Icon size={48} strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                    {title.split(': ')[1]}
                </h1>
                
                <p className="text-stone-400 text-lg mb-10 leading-relaxed px-4">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: 'default' }),
                            "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest px-8 py-6 rounded-none text-lg h-auto flex items-center shadow-xl shadow-orange-600/20 border-none"
                        )}
                    >
                        <Home className="mr-2 w-5 h-5" />
                        Kembali ke Home
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            "border-stone-700 text-white hover:bg-stone-900 font-black uppercase tracking-widest px-8 py-6 rounded-none text-lg h-auto flex items-center"
                        )}
                    >
                        <ChevronLeft className="mr-2 w-5 h-5" />
                        Sebelumnya
                    </button>
                </div>

                {/* Vertical Text Decor */}
                <div className="mt-20 opacity-20">
                    <span className="text-xs font-black uppercase tracking-[0.5em] text-stone-500 italic">
                        TAAAASHOP PREMIUM SPORTY
                    </span>
                </div>
            </div>
        </div>
    );
}
