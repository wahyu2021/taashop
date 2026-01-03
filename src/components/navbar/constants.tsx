import { Home, Image as ImageIcon, Info, HelpCircle, Phone } from "lucide-react";
import { type ReactNode } from "react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  activePath?: string;
}

export const sizingOptions: NavItem[] = [
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

export const galleryCategories: NavItem[] = [
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

export const mobileNavItems: NavItem[] = [
  { 
    title: "Beranda",
    href: "/", 
    icon: <Home className="h-4 w-4" />, 
    activePath: "/" 
  },
  { 
    title: "Galeri",
    href: "/galeri", 
    icon: <ImageIcon className="h-4 w-4" />, 
    activePath: "/galeri" 
  },
  { 
    title: "Tentang Kami",
    href: "/tentang-kami", 
    icon: <Info className="h-4 w-4" />, 
    activePath: "/tentang-kami" 
  },
  { 
    title: "FAQ",
    href: "/faq", 
    icon: <HelpCircle className="h-4 w-4" />, 
    activePath: "/faq" 
  },
  { 
    title: "Hubungi Kami",
    href: "/kontak", 
    icon: <Phone className="h-4 w-4" />, 
    activePath: "/kontak" 
  },
];
