import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CheckCircle2, Award, Target, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/Components/ui/button';

export default function About() {
    const { site_settings } = usePage<PageProps>().props;
    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}?text=Halo Taaashop, saya ingin berkonsultasi mengenai pembuatan jersey.`;

    const values = [
        {
            title: "Kualitas Premium",
            description: "Kami hanya menggunakan material terbaik dan tinta sablon berkualitas tinggi yang awet dan nyaman dipakai.",
            icon: Award
        },
        {
            title: "Tepat Waktu",
            description: "Proses produksi yang sistematis memastikan pesanan Anda selesai tepat pada waktu yang telah disepakati.",
            icon: Target
        },
        {
            title: "Pelayanan Terbaik",
            description: "Tim customer service kami selalu siap membantu dan memberikan solusi terbaik untuk kebutuhan Anda.",
            icon: Users
        }
    ];

    const metaTitle = 'Tentang Kami | Taaashop';
    const metaDescription = 'Taaashop adalah partner strategis dalam menciptakan pakaian olahraga yang merepresentasikan kebanggaan dan semangat juang tim Anda.';
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
                            Kisah Kami
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                            Membangun <span className="text-orange-600">Identitas</span> Tim Anda
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Lebih dari sekadar konveksi, Taaashop adalah partner strategis dalam menciptakan pakaian olahraga yang merepresentasikan kebanggaan dan semangat juang tim Anda.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-6">
                                Dedikasi Pada <span className="text-orange-600">Kualitas</span>
                            </h2>
                            <div className="prose prose-stone prose-lg text-stone-600">
                                <p>
                                    Berawal dari kecintaan terhadap dunia olahraga dan fashion, Taaashop didirikan dengan satu tujuan utama: menyediakan pakaian olahraga dan atribut tim dengan standar kualitas yang tidak kenal kompromi.
                                </p>
                                <p>
                                    Kami memahami bahwa setiap tim memiliki karakter dan ceritanya masing-masing. Oleh karena itu, kami memberikan perhatian khusus pada setiap detail desain, pemilihan bahan, hingga proses produksi akhir.
                                </p>
                                <p>
                                    Dengan mesin cetak dan sablon berteknologi terkini, serta didukung oleh tenaga ahli yang berpengalaman, kami siap mewujudkan konsep desain paling rumit sekalipun menjadi produk nyata yang membanggakan.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] bg-stone-100 overflow-hidden shadow-2xl relative z-10 border border-stone-200">
                                <img 
                                    src="/images/banner.webp" 
                                    alt="Dedikasi Kualitas Taaashop" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-orange-600/10 rounded-full blur-2xl -z-10" />
                            <div className="absolute -top-6 -right-6 w-48 h-48 bg-stone-900/10 rounded-full blur-2xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 sm:py-24 bg-stone-50 border-t border-b border-stone-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                            Nilai Inti Kami
                        </h2>
                        <p className="text-stone-500">
                            Prinsip yang kami pegang teguh dalam setiap tahap pelayanan dan produksi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <div key={idx} className="bg-white p-8 border border-stone-100 shadow-sm hover:border-orange-200 transition-colors">
                                <div className="w-14 h-14 bg-orange-50 text-orange-600 flex items-center justify-center rounded-none mb-6">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-stone-500 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-stone-950 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                        Siap Memulai Proyek <span className="text-orange-600">Bersama Kami?</span>
                    </h2>
                    <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto">
                        Hubungi tim kami sekarang untuk konsultasi gratis mengenai desain, bahan, dan penawaran harga terbaik.
                    </p>
                    <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ size: 'lg' }),
                            "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest px-8 py-6 rounded-none text-lg border-none shadow-xl shadow-orange-600/20"
                        )}
                    >
                        Konsultasi Sekarang
                    </a>
                </div>
            </section>
        </PublicLayout>
    );
}
