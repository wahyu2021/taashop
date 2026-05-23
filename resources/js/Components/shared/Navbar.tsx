import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button, buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const { site_settings } = usePage<PageProps>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Katalog', href: '/catalog' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Kontak', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}`;

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
                scrolled 
                    ? 'bg-white/80 backdrop-blur-md border-b border-stone-200 py-3' 
                    : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {site_settings?.site_logo ? (
                            <img 
                                src={site_settings.site_logo} 
                                alt={site_settings?.site_name || 'Taashop'} 
                                className="h-8 w-auto object-contain sm:h-10" 
                            />
                        ) : (
                            <span className="text-xl font-black uppercase tracking-tighter text-stone-900 sm:text-2xl">
                                TAA<span className="text-orange-600">SHOP</span>
                            </span>
                        )}
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold uppercase tracking-wider text-stone-700 hover:text-orange-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="hidden md:block">
                        <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: 'default' }),
                                "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest px-6 rounded-none shadow-lg shadow-orange-600/20 h-10"
                            )}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Order Sekarang
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-stone-900 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'fixed inset-0 top-18 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex flex-col p-6 gap-6 h-full overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-black uppercase tracking-tight text-stone-900 flex justify-between items-center border-b border-stone-100 pb-4"
                        >
                            {link.name}
                            <ChevronRight className="text-orange-600" />
                        </Link>
                    ))}
                    <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' }),
                            "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest mt-auto mb-10 py-8 rounded-none flex items-center justify-center h-auto"
                        )}
                    >
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Order via WhatsApp
                    </a>
                </div>
            </div>
        </nav>
    );
}
