import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Input } from '@/Components/ui/input';
import { Button, buttonVariants } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function Contact() {
    const { site_settings } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        source_page: 'Halaman Kontak'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const whatsappUrl = `https://wa.me/${site_settings?.whatsapp_number?.replace(/\D/g, '')}?text=Halo Taaashop, saya ingin berkonsultasi mengenai pembuatan jersey.`;

    const metaTitle = 'Hubungi Kami | Taaashop';
    const metaDescription = 'Punya pertanyaan seputar produk, pemesanan, atau ingin konsultasi desain? Tim kami siap membantu Anda kapan saja.';
    const metaImage = site_settings?.hero_image || `${window.location.origin}/images/hero-jersey.webp`;

    return (
        <PublicLayout>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={metaImage} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content={metaTitle} />
                <meta property="twitter:description" content={metaDescription} />
                <meta property="twitter:image" content={metaImage} />
            </Head>

            {/* Page Header */}
            <section className="bg-stone-950 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-4">
                            Layanan Pelanggan
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                            Hubungi <span className="text-orange-600">Kami</span>
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Punya pertanyaan seputar produk, pemesanan, atau ingin konsultasi desain? Tim kami siap membantu Anda kapan saja.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-24 bg-stone-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        
                        {/* Contact Information */}
                        <div className="lg:col-span-5 space-y-10">
                            <div>
                                <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-6">
                                    Informasi <span className="text-orange-600">Kontak</span>
                                </h2>
                                <p className="text-stone-500 mb-8 leading-relaxed">
                                    Anda dapat menghubungi kami melalui formulir di samping, atau melalui jalur komunikasi langsung di bawah ini. Kami akan berusaha merespons secepat mungkin pada jam kerja.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* WhatsApp Box */}
                                <div className="bg-white p-6 border border-stone-200 shadow-sm flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-none flex items-center justify-center shrink-0">
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-stone-900 uppercase tracking-tight mb-1">WhatsApp (Fast Response)</h4>
                                        <p className="text-stone-500 text-sm mb-3">Tanya langsung dengan admin kami via WA</p>
                                        <a 
                                            href={whatsappUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex font-bold text-green-600 hover:text-green-700 text-sm uppercase tracking-widest transition-colors"
                                        >
                                            {site_settings?.whatsapp_number || 'Chat Sekarang'}
                                        </a>
                                    </div>
                                </div>

                                {/* Phone Box */}
                                <div className="bg-white p-6 border border-stone-200 shadow-sm flex items-start gap-4">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-none flex items-center justify-center shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-stone-900 uppercase tracking-tight mb-1">Telepon</h4>
                                        <p className="text-stone-500 text-sm mb-1">Hubungi kami secara langsung</p>
                                        <a href={`tel:${site_settings?.whatsapp_number}`} className="font-bold text-stone-900 hover:text-orange-600 transition-colors">
                                            {site_settings?.whatsapp_number || '-'}
                                        </a>
                                    </div>
                                </div>

                                {/* Email Box */}
                                <div className="bg-white p-6 border border-stone-200 shadow-sm flex items-start gap-4">
                                    <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-none flex items-center justify-center shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-stone-900 uppercase tracking-tight mb-1">Email</h4>
                                        <p className="text-stone-500 text-sm mb-1">Kirimkan penawaran atau proposal</p>
                                        <a href={`mailto:${site_settings?.contact_email}`} className="font-bold text-stone-900 hover:text-orange-600 transition-colors">
                                            {site_settings?.contact_email || '-'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-white border border-stone-200 p-6 sm:p-10 md:p-12 shadow-xl">
                                <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tighter mb-2">
                                    Kirim Pesan
                                </h3>
                                <p className="text-stone-500 text-sm mb-8">
                                    Isi detail di bawah ini dan kami akan segera membalas ke email atau nomor WhatsApp Anda.
                                </p>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="name" value="Nama Lengkap *" className="font-bold text-stone-700" />
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full border-stone-300 focus:border-orange-600 focus:ring-orange-600 rounded-none shadow-sm"
                                                autoComplete="name"
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="phone" value="No. WhatsApp / HP" className="font-bold text-stone-700" />
                                            <Input
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={data.phone}
                                                className="mt-1 block w-full border-stone-300 focus:border-orange-600 focus:ring-orange-600 rounded-none shadow-sm"
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Alamat Email" className="font-bold text-stone-700" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full border-stone-300 focus:border-orange-600 focus:ring-orange-600 rounded-none shadow-sm"
                                            autoComplete="email"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="subject" value="Subjek Pesan" className="font-bold text-stone-700" />
                                        <Input
                                            id="subject"
                                            type="text"
                                            name="subject"
                                            value={data.subject}
                                            className="mt-1 block w-full border-stone-300 focus:border-orange-600 focus:ring-orange-600 rounded-none shadow-sm"
                                            onChange={(e) => setData('subject', e.target.value)}
                                        />
                                        <InputError message={errors.subject} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="message" value="Detail Pesan *" className="font-bold text-stone-700" />
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={data.message}
                                            className="mt-1 block w-full border-stone-300 focus:border-orange-600 focus:ring-orange-600 rounded-none shadow-sm min-h-[150px]"
                                            onChange={(e) => setData('message', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.message} className="mt-2" />
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className={cn(
                                                "w-full bg-stone-900 hover:bg-black text-white font-black uppercase tracking-widest py-6 rounded-none text-base shadow-xl",
                                                processing && "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            <Send className="w-5 h-5 mr-3" />
                                            {processing ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
