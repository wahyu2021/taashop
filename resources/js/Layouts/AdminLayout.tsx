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
    ChevronRight
} from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminLayout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { 
            name: 'Dashboard', 
            href: route('admin.dashboard'), 
            icon: LayoutDashboard, 
            active: route().current('admin.dashboard') || route().current('dashboard') 
        },
        { name: 'Produk', href: '#', icon: ShoppingBag, active: false },
        { 
            name: 'Kategori', 
            href: route('admin.categories.index'), 
            icon: Layers, 
            active: route().current('admin.categories.*') 
        },
        { name: 'Material Bahan', href: '#', icon: Package, active: false },
        { name: 'Pesan Masuk', href: '#', icon: Inbox, active: false },
        { name: 'Pengaturan', href: '#', icon: Settings, active: false },
    ];

    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-stone-900/50 lg:hidden backdrop-blur-sm transition-opacity" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
                        <Link href={route('admin.dashboard')} className="flex items-center gap-2">
                            <ApplicationLogo className="w-8 h-8 fill-primary" />
                            <span className="text-xl font-bold text-sidebar-foreground tracking-tight">
                                TAA<span className="text-primary">SHOP</span>
                            </span>
                        </Link>
                        <button 
                            className="lg:hidden p-1 text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${item.active 
                                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                                `}
                            >
                                <item.icon className={`w-4 h-4 ${item.active ? 'text-primary-foreground' : 'text-stone-500'}`} />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar border border-sidebar-border shadow-sm mb-4">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-sidebar-foreground truncate">{user.name}</p>
                                <p className="text-[10px] text-stone-500 truncate uppercase tracking-wider font-semibold">Administrator</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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
                            <span className="hover:text-primary transition-colors cursor-default">Admin</span>
                            <ChevronRight className="w-4 h-4 mx-2 text-stone-300" />
                            <span className="text-foreground font-bold">
                                {navigation.find(n => n.active)?.name || 'Panel'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right mr-2">
                            <p className="text-sm font-bold text-foreground leading-tight">{user.name}</p>
                            <p className="text-xs text-stone-500">{user.email}</p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="px-4 py-6 text-center border-t border-border lg:px-8 bg-stone-50/50">
                    <p className="text-xs text-stone-500 font-medium">
                        &copy; {new Date().getFullYear()} <span className="text-primary font-bold">Taashop Web</span>. Premium Sporty Management System.
                    </p>
                </footer>
            </div>
        </div>
    );
}
