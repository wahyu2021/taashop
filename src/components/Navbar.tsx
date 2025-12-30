"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Mail,
  Phone,
  Home,
  Image as ImageIcon,
  Ruler,
  Info,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

import { ThemeToggle } from "@/components/ThemeToggle";

interface GalleryCategory {
  title: string;
  href: string;
  description: string;
}



const sizingOptions = [
  {
    title: "Jersey Bola",
    href: "/ukuran-harga/jersey-bola",
    description: "List harga dan ukuran untuk jersey bola.",
  },
  {
    title: "Shooting Shirt",
    href: "/ukuran-harga/shooting-shirt",
    description: "List harga dan ukuran untuk shooting shirt.",
  },
  {
    title: "Poloshirt",
    href: "/ukuran-harga/poloshirt",
    description: "List harga dan ukuran untuk poloshirt.",
  },
  {
    title: "T-Shirt",
    href: "/ukuran-harga/t-shirt",
    description: "List harga dan ukuran untuk T-shirt.",
  },
  {
    title: "Jersey Basketball",
    href: "/ukuran-harga/jersey-basketball",
    description: "List harga dan ukuran untuk jersey basketball.",
  },
  {
    title: "Seragam Tactical",
    href: "/ukuran-harga/seragam-tactical",
    description: "List harga dan ukuran untuk seragam tactical.",
  },
];

export const galleryCategories: GalleryCategory[] = [
  {
    title: "Galeri Kaos",
    href: "/galeri/kaos",
    description: "Kumpulan desain kaos terbaik.",
  },
  {
    title: "Galeri Seragam",
    href: "/galeri/seragam",
    description: "Contoh seragam kantor dan sekolah.",
  },
  {
    title: "Galeri Jaket",
    href: "/galeri/jaket",
    description: "Koleksi jaket dan hoodie custom.",
  },
];

export function Navbar() {
  const pathname = usePathname(); // Get current pathname

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-2xl shadow-orange-500/25 backdrop-blur-sm dark:from-slate-900 dark:to-slate-800 dark:border-slate-600/50 dark:shadow-slate-900/50">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group space-x-2">
          <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} className="w-8 h-8 transition-transform group-hover:scale-110 brightness-0 invert" priority />
          <span className="font-bold text-lg hidden sm:inline-block">TaaShop</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center [&>li>a]:flex [&>li>a]:items-center [&>li>button]:flex [&>li>button]:items-center">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                      "hover:bg-white/15 hover:text-white",
                      pathname === "/" && "bg-white/20 text-white font-semibold"
                    )}
                  >
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>



              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/galeri"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                      "hover:bg-white/15 hover:text-white",
                      pathname === "/galeri" && "bg-white/20 text-white font-semibold"
                    )}
                  >
                    Galeri
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent! text-white/90! dark:text-slate-200! px-3 transition-all",
                  "hover:bg-white/15! hover:text-white!",
                  "data-[state=open]:bg-white/20! data-[state=open]:text-white!",
                  pathname.startsWith("/ukuran-harga") && "bg-white/20 text-white font-semibold"
                )}>
                  Ukuran & Harga
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-slate-900 backdrop-blur-md border border-orange-200 dark:border-slate-700 shadow-xl rounded-lg">
                  <ul className="grid gap-3 p-6 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                    {sizingOptions.map((option) => (
                      <ListItem key={option.title} title={option.title} href={option.href}>
                        {option.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/tentang-kami"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                      "hover:bg-white/15 hover:text-white",
                      pathname === "/tentang-kami" && "bg-white/20 text-white font-semibold"
                    )}
                  >
                    Tentang Kami
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/faq"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                      "hover:bg-white/15 hover:text-white",
                      pathname === "/faq" && "bg-white/20 text-white font-semibold"
                    )}
                  >
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/kontak"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/90 dark:text-slate-200 px-3 transition-all",
                      "hover:bg-white/15 hover:text-white",
                      pathname === "/kontak" && "bg-white/20 text-white font-semibold"
                    )}
                  >
                    Hubungi Kami
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions (Right Side) */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-transparent text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-lg"
            asChild
          >
            <a href="tel:+6281234567890">
              <Phone className="h-4 w-4" />
              <span className="sr-only">Telepon</span>
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent bg-transparent text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-lg"
            asChild
          >
            <a href="mailto:info@taashop.com">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>

          <div className="hidden md:flex items-center">
            <ThemeToggle className="h-10 w-10 rounded-lg border border-transparent text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-lg\" />
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
              <SheetContent side="left" className="w-[280px] sm:w-[350px] bg-background">
                <MobileMenu pathname={pathname} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// Mobile Menu Component

// ... other imports

// Mobile Menu Component
function MobileMenu({ pathname }: { pathname: string }) {
  const navItems = [
    { href: "/", icon: <Home className="h-4 w-4" />, text: "Beranda", activePath: "/" },
    { href: "/galeri", icon: <ImageIcon className="h-4 w-4" />, text: "Galeri", activePath: "/galeri" },
    { href: "/tentang-kami", icon: <Info className="h-4 w-4" />, text: "Tentang Kami", activePath: "/tentang-kami" },
    { href: "/faq", icon: <HelpCircle className="h-4 w-4" />, text: "FAQ", activePath: "/faq" },
    { href: "/kontak", icon: <Phone className="h-4 w-4" />, text: "Hubungi Kami", activePath: "/kontak" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <Link href="/" className="flex items-center space-x-2 p-4">
          <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} className="w-8 h-8" priority />
          <span className="font-bold text-lg text-foreground">TaaShop</span>
        </Link>

        <div className="flex flex-col gap-1 p-2">
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger className={cn(
                "px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors flex items-center justify-start gap-2 [&[data-state=open]>svg]:rotate-180",
                (pathname.startsWith("/size-chart") || pathname.startsWith("/harga")) && "bg-accent font-semibold"
              )}>
                <Ruler className="h-4 w-4" />
                <span>Ukuran & Harga</span>
              </AccordionTrigger>
              <AccordionContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pl-8 pr-2 pb-1">
                  <div className="flex flex-col gap-1">
                    {sizingOptions.map((option) => (
                      <MobileLink key={option.title} href={option.href} text={option.title} isActive={pathname === option.href} />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {navItems.map((item) => (
            <MobileLink key={item.href} href={item.href} icon={item.icon} text={item.text} isActive={pathname === item.activePath} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm" asChild>
            <a href="tel:+6281234567890">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </a>
          </Button>
          <Button variant="outline" className="flex-1" size="sm" asChild>
            <a href="mailto:info@taashop.com">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Utility Components
interface MobileLinkProps {
  href: string;
  icon?: React.ReactNode;
  text: string;
  isActive?: boolean; // Add isActive prop
}

const MobileLink = ({ href, icon, text, isActive }: MobileLinkProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors",
      isActive && "bg-accent font-semibold" // Apply active style
    )}
  >
    {icon}
    {text}
  </Link>
);

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href || "#"}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none text-foreground">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
