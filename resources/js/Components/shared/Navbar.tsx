import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronRight, ShoppingCart } from 'lucide-react';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const { site_settings } = usePage<PageProps>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/', active: route().current('home') },
        { name: 'Katalog', href: '/catalog', active: route().current('catalog.*') },
        { name: 'Portfolio', href: '/portfolio', active: route().current('portfolio.*') },
        { name: 'Tentang Kami', href: '/about', active: route().current('about') },
        { name: 'Kontak', href: '/contact', active: route().current('contact') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const closeMenu = useCallback(() => setIsOpen(false), []);

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}`;

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md',
                    scrolled 
                        ? 'bg-white/90 border-b border-stone-200 py-3 shadow-sm' 
                        : 'bg-white/70 py-4',
                    isOpen && 'bg-white shadow-sm'
                )}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 relative z-50">
                            {site_settings?.site_logo && (
                                <img 
                                    src={site_settings.site_logo} 
                                    alt="Logo" 
                                    className="h-8 w-auto object-contain sm:h-10" 
                                />
                            )}
                            <span className="text-xl font-black uppercase tracking-tighter text-stone-900 sm:text-2xl">
                                TAAA<span className="text-orange-600">SHOP</span>
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-bold uppercase tracking-wider transition-colors relative group",
                                        link.active ? "text-orange-600" : "text-stone-700 hover:text-orange-600"
                                    )}
                                >
                                    {link.name}
                                    <span className={cn(
                                        "absolute -bottom-1 left-0 h-0.5 bg-orange-600 transition-all duration-300",
                                        link.active ? "w-full" : "w-0 group-hover:w-full"
                                    )} />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Action Button */}
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
                            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-stone-900 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Tutup Menu' : 'Buka Menu'}
                        >
                            <div className="relative w-6 h-5">
                                <span className={cn(
                                    "absolute left-0 w-6 h-0.5 bg-stone-900 transition-all duration-300 ease-in-out",
                                    isOpen ? "top-2 rotate-45" : "top-0"
                                )} />
                                <span className={cn(
                                    "absolute left-0 top-2 w-6 h-0.5 bg-stone-900 transition-all duration-300 ease-in-out",
                                    isOpen ? "opacity-0 translate-x-2" : "opacity-100"
                                )} />
                                <span className={cn(
                                    "absolute left-0 w-6 h-0.5 bg-stone-900 transition-all duration-300 ease-in-out",
                                    isOpen ? "top-2 -rotate-45" : "top-4"
                                )} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    'fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 md:hidden',
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                onClick={closeMenu}
            />

            {/* Mobile Menu Panel */}
            <div
                className={cn(
                    'fixed top-0 right-0 z-40 w-full sm:w-80 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex flex-col pt-24 pb-10 px-6 h-full overflow-y-auto">
                    {/* Nav Links */}
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className={cn(
                                    "flex justify-between items-center py-4 px-4 text-lg font-black uppercase tracking-tight transition-all duration-200 border-b border-stone-100 last:border-none",
                                    link.active ? "bg-orange-50 text-orange-600" : "text-stone-900 hover:bg-stone-50 hover:text-orange-600",
                                    "transform transition-all duration-300 ease-out",
                                    isOpen 
                                        ? "translate-x-0 opacity-100" 
                                        : "translate-x-8 opacity-0",
                                )}
                                style={{ transitionDelay: isOpen ? `${index * 50 + 100}ms` : '0ms' }}
                            >
                                {link.name}
                                <ChevronRight size={18} className={cn("transition-transform", link.active ? "text-orange-600 rotate-90" : "text-stone-300")} />
                            </Link>
                        ))}
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="mt-auto pt-8">
                        <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className={cn(
                                buttonVariants({ variant: 'default', size: 'lg' }),
                                "w-full bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest py-7 rounded-none flex items-center justify-center h-auto"
                            )}
                        >
                            <ShoppingCart className="w-5 h-5 mr-3" />
                            Order via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
