"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import Image from "next/image";

import { ThemeToggle } from "@/components/ThemeToggle";

const productCategories = [
  {
    title: "Semua Produk",
    href: "/produk",
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

const galleryCategories = [
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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-800 bg-orange-700 text-white">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group ms-0 md:ms-96 space-x-2">
          <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} className="tra   nsition-transform group-hover:scale-110" />
          <span className="font-bold text-lg hidden sm:inline-block">TaaShop</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center [&>li]:h-10 [&>li]:flex [&>li]:items-center [&>li>a]:h-10 [&>li>button]:h-10">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className={cn(navigationMenuTriggerStyle(), "h-full flex items-center bg-transparent text-white")}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Beranda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-full flex items-center bg-transparent text-white">
                  <ShoppingBag className="h-4 w-4 mr-2" />
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
                    href="/portofolio"
                    className={cn(navigationMenuTriggerStyle(), "h-full flex items-center bg-transparent text-white")}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Portofolio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-full flex items-center bg-transparent text-white">
                  <Ruler className="h-4 w-4 mr-2" />
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
                    className={cn(navigationMenuTriggerStyle(), "h-full flex items-center bg-transparent text-white")}
                  >
                    Tentang Kami
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/portofolio"
                    className={cn(navigationMenuTriggerStyle(), "h-full flex items-center bg-transparent text-white")}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/kontak"
                    className={cn(navigationMenuTriggerStyle(), "h-full flex items-center bg-transparent text-white")}
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
                <MobileMenu />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

// 🔸 Mobile Menu Component
function MobileMenu() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} />
        <span className="font-bold text-lg text-foreground">TaaShop</span>
      </Link>

      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase text-muted-foreground px-2">
          Menu
        </div>
        <MobileLink href="/" icon={<Home className="h-4 w-4" />} text="Beranda" />
        <MobileLink href="/galeri" icon={<ImageIcon className="h-4 w-4" />} text="Galeri" />
        <MobileLink href="/sizing" icon={<Ruler className="h-4 w-4" />} text="Ukuran & Harga" />
        <MobileLink href="/tentang-kami" text="Tentang Kami" />
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t">
        <div className="text-xs font-semibold uppercase text-muted-foreground px-2">
          Kategori Galeri
        </div>
        {galleryCategories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="flex flex-col px-2 py-2 rounded-md hover:bg-accent transition-colors text-foreground"
          >
            <span className="text-sm font-medium">{category.title}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">
              {category.description}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t">
        <Button className="w-full justify-start gap-2 text-foreground" asChild>
          <Link href="/kontak">
            <Mail className="h-4 w-4" />
            Hubungi Kami
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 text-foreground" size="sm" asChild>
            <a href="tel:+6281234567890">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </a>
          </Button>
          <Button variant="outline" className="flex-1 text-foreground" size="sm" asChild>
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
}

const MobileLink = ({ href, icon, text }: MobileLinkProps) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
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
