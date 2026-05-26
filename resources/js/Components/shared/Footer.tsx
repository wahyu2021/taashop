import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Footer() {
    const { site_settings } = usePage<PageProps>().props;
    const year = new Date().getFullYear();

    return (
        <footer className="bg-stone-950 text-white pt-20 pb-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            {site_settings?.site_logo && (
                                <img 
                                    src={site_settings.site_logo} 
                                    alt="Logo" 
                                    className="h-10 w-auto object-contain brightness-0 invert" 
                                />
                            )}
                            <span className="text-3xl font-black uppercase tracking-tighter">
                                TAAA<span className="text-orange-600">SHOP</span>
                            </span>
                        </Link>
                        <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                            {site_settings?.hero_description || 'Taaashop menyediakan layanan pembuatan jersey dan sablon kustom berkualitas premium untuk tim dan komunitas Anda.'}
                        </p>
                        <div className="flex items-center gap-4">
                            {site_settings?.social_instagram && (
                                <a 
                                    href={site_settings.social_instagram} 
                                    target="_blank" 
                                    className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-orange-600 transition-colors p-2"
                                    aria-label="Instagram"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                            )}
                            {site_settings?.social_tiktok && (
                                <a 
                                    href={site_settings.social_tiktok} 
                                    target="_blank" 
                                    className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-orange-600 transition-colors p-2"
                                    aria-label="TikTok"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wider mb-8 text-orange-600">Menu Utama</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Katalog Produk', href: '/catalog' },
                                { name: 'Portfolio Kami', href: '/portfolio' },
                                { name: 'Tentang Taaashop', href: '/about' },
                                { name: 'Bantuan & FAQ', href: '/faq' },
                                { name: 'Hubungi Kami', href: '/contact' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        href={item.href} 
                                        className="text-stone-400 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wider mb-8 text-orange-600">Informasi</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Bantuan (FAQ)', href: '/faq' },
                                { name: 'Konsultasi Pesanan', href: '/contact' },
                                { name: 'Profil Perusahaan', href: '/about' },
                                { name: 'Syarat & Ketentuan', href: '/terms' },
                                { name: 'Kebijakan Privasi', href: '/privacy' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        href={item.href} 
                                        className="text-stone-400 hover:text-white transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wider mb-8 text-orange-600">Alamat & Kontak</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="mt-1 text-orange-600">
                                    <MapPin size={20} />
                                </div>
                                <p className="text-stone-400 text-sm leading-relaxed">
                                    {site_settings?.contact_address || 'Jl. Raya Taaashop No. 123, Kota Sablon, Indonesia'}
                                </p>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="text-orange-600">
                                    <Phone size={20} />
                                </div>
                                <p className="text-stone-400 text-sm">
                                    {site_settings?.contact_whatsapp || '+62 812 3456 7890'}
                                </p>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="text-orange-600">
                                    <Mail size={20} />
                                </div>
                                <p className="text-stone-400 text-sm">
                                    {site_settings?.contact_email || 'hello@taaashop.com'}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-10 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-stone-500 text-xs">
                        © {year} {site_settings?.site_name || 'Taaashop'}. All rights reserved.
                    </p>
                    <p className="text-stone-500 text-xs flex items-center gap-1">
                        Designed with ❤️ by <span className="text-stone-300 font-bold">Taaashop Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
