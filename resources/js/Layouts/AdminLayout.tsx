import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Layers, 
    Package, 
    Inbox, 
    Settings, 
    Menu, 
    X,
    LogOut,
    User,
    ChevronRight,
    Tag,
    Image as ImageIcon,
    FileText,
    Star,
    HelpCircle
} from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        {
            group: 'Main',
            items: [
                { 
                    name: 'Dashboard', 
                    href: route('admin.dashboard'), 
                    icon: LayoutDashboard, 
                    active: route().current('admin.dashboard') || route().current('dashboard') 
                },
                { 
                    name: 'Pesan Masuk', 
                    href: route('admin.inbox.index'), 
                    icon: Inbox, 
                    active: route().current('admin.inbox.*') 
                },
            ]
        },
        {
            group: 'Katalog Produk',
            items: [
                { 
                    name: 'Daftar Produk', 
                    href: route('admin.products.index'), 
                    icon: ShoppingBag, 
                    active: route().current('admin.products.*') 
                },
                { 
                    name: 'Kategori', 
                    href: route('admin.categories.index'), 
                    icon: Layers, 
                    active: route().current('admin.categories.*') 
                },
                { 
                    name: 'Material Bahan', 
                    href: route('admin.materials.index'), 
                    icon: Package, 
                    active: route().current('admin.materials.*') 
                },
                { 
                    name: 'Paket Harga', 
                    href: route('admin.packages.index'), 
                    icon: Tag, 
                    active: route().current('admin.packages.*') 
                },
            ]
        },
        {
            group: 'Konten Web',
            items: [
                { 
                    name: 'Portfolio', 
                    href: route('admin.portfolios.index'), 
                    icon: ImageIcon, 
                    active: route().current('admin.portfolios.*') 
                },
                { 
                    name: 'Partner & Klien', 
                    href: route('admin.partners.index'), 
                    icon: User, 
                    active: route().current('admin.partners.*') 
                },
                { 
                    name: 'Testimoni', 
                    href: route('admin.testimonials.index'), 
                    icon: Star, 
                    active: route().current('admin.testimonials.*') 
                },
                { 
                    name: 'Berita & Artikel', 
                    href: route('admin.news.index'), 
                    icon: FileText, 
                    active: route().current('admin.news.*') 
                },
                { 
                    name: 'FAQ', 
                    href: route('admin.faqs.index'), 
                    icon: HelpCircle, 
                    active: route().current('admin.faqs.*') 
                },
            ]
        },
        {
            group: 'Sistem',
            items: [
                { 
                    name: 'Pengaturan', 
                    href: route('admin.settings.index'), 
                    icon: Settings, 
                    active: route().current('admin.settings.*') 
                },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            {/* Mobile Sidebar Overlay & Menu */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-stone-900/60 lg:hidden backdrop-blur-sm" 
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        <motion.aside 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border lg:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Sidebar Header */}
                                <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
                                    <Link href={route('admin.dashboard')} className="flex items-center gap-3">
                                        <ApplicationLogo className="h-8 w-auto object-contain" />
                                        <span className="text-xl font-black text-sidebar-foreground tracking-tighter uppercase">
                                            TAAA<span className="text-primary">SHOP</span>
                                        </span>
                                    </Link>
                                    <button 
                                        className="p-1 text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Navigation */}
                                <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
                                    {navigation.map((group) => (
                                        <div key={group.group} className="space-y-2">
                                            <h3 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                                                {group.group}
                                            </h3>
                                            <div className="space-y-1">
                                                {group.items.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`
                                                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200
                                                            ${item.active 
                                                                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                                                                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                                                        `}
                                                    >
                                                        <item.icon className={`w-4 h-4 ${item.active ? 'text-primary-foreground' : 'text-stone-400'}`} />
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </nav>

                                {/* Sidebar Footer */}
                                <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/20">
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar border border-sidebar-border shadow-sm mb-4">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-sidebar-foreground truncate">{user.name}</p>
                                            <p className="text-[9px] text-stone-400 truncate uppercase tracking-widest font-bold italic">Administrator</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-black text-destructive hover:bg-destructive/10 rounded-lg transition-colors uppercase tracking-widest text-[10px]"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Keluar
                                    </Link>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar (Always Visible on LG) */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-sidebar border-r border-sidebar-border lg:flex lg:flex-col">
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-3">
                            <ApplicationLogo className="h-8 w-auto object-contain" />
                            <span className="text-xl font-black text-sidebar-foreground tracking-tighter uppercase">
                                TAAA<span className="text-primary">SHOP</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
                        {navigation.map((group) => (
                            <div key={group.group} className="space-y-2">
                                <h3 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                                    {group.group}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`
                                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200
                                                ${item.active 
                                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                                                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                                            `}
                                        >
                                            <item.icon className={`w-4 h-4 ${item.active ? 'text-primary-foreground' : 'text-stone-400'}`} />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/20">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar border border-sidebar-border shadow-sm mb-4">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-sidebar-foreground truncate">{user.name}</p>
                                <p className="text-[9px] text-stone-400 truncate uppercase tracking-widest font-bold italic">Administrator</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-black text-destructive hover:bg-destructive/10 rounded-lg transition-colors uppercase tracking-widest text-[10px]"
                        >
                            <LogOut className="w-4 h-4" />
                            Keluar
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-md border-b border-border lg:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 text-stone-500 lg:hidden hover:bg-stone-100 rounded-md transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <div className="hidden lg:flex items-center text-sm text-stone-500 font-medium">
                            <span className="hover:text-primary transition-colors cursor-default font-bold uppercase tracking-widest text-[10px]">Admin</span>
                            <ChevronRight className="w-4 h-4 mx-2 text-stone-300" />
                            <span className="text-foreground font-black uppercase tracking-widest text-[10px]">
                                {navigation.flatMap(g => g.items).find(i => i.active)?.name || 'Panel'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right mr-2">
                            <p className="text-sm font-black text-foreground leading-tight">{user.name}</p>
                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{user.email}</p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <motion.main 
                    key={usePage().url}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto"
                >
                    {children}
                </motion.main>

                {/* Footer */}
                <footer className="px-4 py-8 text-center border-t border-border lg:px-8 bg-stone-50/30 mt-auto">
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} <span className="text-primary">Taaashop Web</span> &bull; Premium Sporty Management System
                    </p>
                </footer>
            </div>
        </div>
    );
}

