"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Admin routes have their own layout - don't show main site Navbar/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Regular website pages get full layout with Navbar and Footer
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-orange-50 via-white to-white transition-colors duration-500 dark:from-[#0C0C0F] dark:via-[#0C0C0F] dark:to-[#18181B]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-[-6rem] h-96 w-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute -left-48 bottom-[-10rem] h-[28rem] w-[28rem] rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-600/10" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-white/40 blur-3xl dark:bg-zinc-800/30" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
