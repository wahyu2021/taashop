import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { LogIn, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { site_settings } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-orange-600 selection:text-white">
            <Head title="Admin Login | Taaashop" />

            {/* Background Decor */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-20" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-800 rounded-full blur-[150px] opacity-20" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6 group">
                        {site_settings?.site_logo ? (
                            <img 
                                src={site_settings.site_logo} 
                                alt="Logo" 
                                className="h-12 w-auto brightness-0 invert transition-transform group-hover:scale-110 duration-300" 
                            />
                        ) : (
                            <span className="text-4xl font-black uppercase tracking-tighter text-white">
                                TAA<span className="text-orange-600">SHOP</span>
                            </span>
                        )}
                    </Link>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">Admin Gateway</h1>
                    <p className="text-stone-500 text-sm mt-2">Silakan login untuk mengelola katalog & konten.</p>
                </div>

                {/* Login Card */}
                <div className="bg-stone-900/50 backdrop-blur-xl border border-stone-800 p-8 sm:p-10 shadow-2xl relative">
                    {/* Status Message */}
                    {status && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold flex items-center gap-2">
                            <ShieldCheck size={18} />
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                <Mail size={14} className="text-orange-600" />
                                Email Address
                            </label>
                            <div className="relative group">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="bg-stone-950 border-stone-800 text-white rounded-none h-12 focus-visible:ring-orange-600 focus-visible:border-orange-600 transition-all pl-4"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="admin@taaashop.com"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
                                    <Lock size={14} className="text-orange-600" />
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[10px] font-bold uppercase tracking-widest text-orange-600 hover:text-white transition-colors"
                                    >
                                        Forgot?
                                    </Link>
                                )}
                            </div>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="bg-stone-950 border-stone-800 text-white rounded-none h-12 focus-visible:ring-orange-600 focus-visible:border-orange-600 transition-all pl-4"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                className="rounded-none bg-stone-950 border-stone-800 text-orange-600 focus:ring-orange-600"
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-xs font-bold text-stone-500 uppercase tracking-widest cursor-pointer select-none">
                                Ingat Sesi Saya
                            </span>
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit"
                            disabled={processing}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] h-14 rounded-none shadow-lg shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            {processing ? 'Menyambungkan...' : 'Masuk Sekarang'}
                            {!processing && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>
                </div>

                {/* Footer Decor */}
                <div className="mt-10 text-center flex flex-col items-center gap-4">
                    <Link 
                        href="/" 
                        className="text-stone-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Website Utama
                    </Link>
                </div>
            </div>

            {/* Side Branding (Desktop Only) */}
            <div className="absolute left-10 bottom-10 hidden lg:block select-none opacity-5 pointer-events-none">
                <span className="text-9xl font-black text-white uppercase tracking-tighter italic">
                    TAAASHOP
                </span>
            </div>
        </div>
    );
}

function ArrowLeft({ size, className }: { size?: number, className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
    );
}
