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
  ShoppingBag,
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

const productCategories = [
  {
    title: "Semua Produk",
    href: "/galeri",
    description: "Lihat semua koleksi produk konveksi kami.",
  },
  {
    title: "Kaos & T-Shirt",
    href: "/produk/kaos",
    description: "Custom kaos untuk berbagai kebutuhan.",
  },
  {
    title: "Seragam Kantor",
    href: "/produk/seragam-kantor",
    description: "Seragam profesional untuk perusahaan.",
  },
  {
    title: "Seragam Sekolah",
    href: "/produk/seragam-sekolah",
    description: "Seragam berkualitas untuk institusi pendidikan.",
  },
  {
    title: "Jersey & Olahraga",
    href: "/produk/jersey",
    description: "Jersey tim dan pakaian olahraga custom.",
  },
  {
    title: "Jaket & Hoodie",
    href: "/produk/jaket",
    description: "Jaket dan hoodie dengan desain custom.",
  },
];

const sizingOptions = [
  {
    title: "Size Chart",
    href: "/size-chart",
    description: "Panduan ukuran lengkap untuk semua produk.",
  },
  {
    title: "Harga Satuan",
    href: "/harga/satuan",
    description: "Harga untuk pembelian retail dan satuan.",
  },
  {
    title: "Harga Grosir",
    href: "/harga/grosir",
    description: "Harga spesial untuk pembelian dalam jumlah besar.",
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
    <header className="sticky top-0 z-50 w-full border-b border-orange-800 bg-orange-700 text-white dark:bg-gray-900 dark:border-gray-800 dark:text-white">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group ms-0 md:ms-96 space-x-2">
          <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} className="w-8 h-8 transition-transform group-hover:scale-110" priority />
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
                      "bg-transparent text-white dark:bg-transparent px-3",
                      pathname === "/" && "bg-orange-600 font-semibold"
                    )}
                  >
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent text-white dark:bg-transparent px-3",
                  pathname.startsWith("/produk") && "bg-orange-600 font-semibold" // Assuming /produk is the base for product categories
                )}>
                  Produk
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {productCategories.map((category) => (
                      <ListItem key={category.title} title={category.title} href={category.href}>
                        {category.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/galeri"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white dark:bg-transparent px-3",
                      pathname === "/galeri" && "bg-orange-600 font-semibold"
                    )}
                  >
                    Galeri
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent text-white dark:bg-transparent px-3",
                  (pathname.startsWith("/size-chart") || pathname.startsWith("/harga")) && "bg-orange-600 font-semibold"
                )}>
                  Ukuran & Harga
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    {sizingOptions.map((option) => (
                      <ListItem key={option.title} title={option.title} href={option.href}>
                        {option.description}
                      </ListItem>
                    ))}
                    <li className="mt-2">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex select-none flex-col justify-center rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md hover:shadow-lg transition-shadow"
                          href="/custom-order"
                        >
                          <div className="mb-1 text-sm font-bold">Pemesanan Custom</div>
                          <p className="text-xs leading-tight text-muted-foreground">
                            Butuh desain khusus atau jumlah besar? Konsultasikan kebutuhan konveksi Anda dengan tim kami.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/tentang-kami"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white dark:bg-transparent px-3",
                      pathname === "/tentang-kami" && "bg-orange-600 font-semibold"
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
                      "bg-transparent text-white dark:bg-transparent px-3",
                      pathname === "/faq" && "bg-orange-600 font-semibold"
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
                      "bg-transparent text-white dark:bg-transparent px-3",
                      pathname === "/kontak" && "bg-orange-600 font-semibold"
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
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex h-9 w-9 text-white" asChild>
            <a href="tel:+6281234567890">
              <Phone className="h-4 w-4" />
              <span className="sr-only">Telepon</span>
            </a>
          </Button>

          <Button variant="ghost" size="icon" className="hidden lg:inline-flex h-9 w-9 text-white" asChild>
            <a href="mailto:info@taashop.com">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>

          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
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

// 🔸 Mobile Menu Component
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
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className={cn(
                "px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors flex items-center justify-start gap-2 [&[data-state=open]>svg]:rotate-180",
                pathname.startsWith("/produk") && "bg-accent font-semibold"
              )}>
                <ShoppingBag className="h-4 w-4" />
                <span>Produk</span>
              </AccordionTrigger>
              <AccordionContent className="pl-8 pr-2 pb-1">
                <div className="flex flex-col gap-1">
                  {productCategories.map((category) => (
                    <MobileLink key={category.title} href={category.href} text={category.title} isActive={pathname === category.href} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-0">
              <AccordionTrigger className={cn(
                "px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors flex items-center justify-start gap-2 [&[data-state=open]>svg]:rotate-180",
                (pathname.startsWith("/size-chart") || pathname.startsWith("/harga")) && "bg-accent font-semibold"
              )}>
                <Ruler className="h-4 w-4" />
                <span>Ukuran & Harga</span>
              </AccordionTrigger>
              <AccordionContent className="pl-8 pr-2 pb-1">
                <div className="flex flex-col gap-1">
                  {sizingOptions.map((option) => (
                    <MobileLink key={option.title} href={option.href} text={option.title} isActive={pathname === option.href} />
                  ))}
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

// 🔸 Utility Components
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
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
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
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
