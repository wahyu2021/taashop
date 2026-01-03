"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Mail, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DesktopMenu } from "./navbar/DesktopMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { ContactModal } from "./navbar/ContactModal";

export function Navbar({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-2xl shadow-orange-500/25 backdrop-blur-sm dark:from-slate-900 dark:to-slate-800 dark:border-slate-600/50 dark:shadow-slate-900/50">
        <div className="flex h-14 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center group space-x-2">
            <Image
              src={logoUrl || "/logo.svg"}
              alt="TaaShop Logo"
              width={32}
              height={32}
              className="w-8 h-8 transition-transform group-hover:scale-110 brightness-0 invert"
              priority
            />
            <span className="font-bold text-lg hidden sm:inline-block">
              TaaShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopMenu pathname={pathname} />

          {/* Actions (Right Side) */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPhoneModalOpen(true)}
              className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-transparent text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span className="sr-only">Telepon</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEmailModalOpen(true)}
              className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-transparent text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-lg"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>

            <div className="hidden md:flex items-center">
              <ThemeToggle className="h-10 w-10 rounded-lg border border-transparent text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-lg" />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-lg border border-transparent bg-transparent text-white transition-all hover:border-white/40 hover:bg-white/15 hover:shadow-lg"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[280px] sm:w-[350px] bg-background"
                >
                  <MobileMenu 
                    pathname={pathname} 
                    logoUrl={logoUrl}
                    onPhoneClick={() => setPhoneModalOpen(true)}
                    onEmailClick={() => setEmailModalOpen(true)}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Modals */}
      <ContactModal
        type="phone"
        open={phoneModalOpen}
        onOpenChange={setPhoneModalOpen}
      />
      <ContactModal
        type="email"
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
      />
    </>
  );
}
