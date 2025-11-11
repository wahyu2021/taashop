import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-orange-700 text-white w-full flex justify-center border-t border-orange-800 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
      <div className="w-full max-w-7xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} className="w-8 h-8" />
              <span className="font-bold text-lg">TaaShop Konveksi</span>
            </Link>
            <p className="text-sm">
              Solusi konveksi terpercaya untuk segala kebutuhan pakaian custom Anda. Kualitas premium, harga kompetitif, dan desain tanpa batas.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.instagram.com/taaashop_konveksi/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 dark:hover:text-gray-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:info@taashop.com" className="hover:text-orange-300 dark:hover:text-gray-400 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
              <a href="tel:+6281234567890" className="hover:text-orange-300 dark:hover:text-gray-400 transition-colors">
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Layanan */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Layanan</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <FooterLink href="/produk/kaos">Kaos & T-Shirt</FooterLink>
              <FooterLink href="/produk/seragam-kantor">Seragam Kantor</FooterLink>
              <FooterLink href="/produk/seragam-sekolah">Seragam Sekolah</FooterLink>
              <FooterLink href="/produk/jersey">Jersey & Olahraga</FooterLink>
              <FooterLink href="/produk/jaket">Jaket & Hoodie</FooterLink>
            </nav>
          </div>

          {/* Column 3: Informasi */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Informasi</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <FooterLink href="/tentang-kami">Tentang Kami</FooterLink>
              <FooterLink href="/portofolio">Portofolio</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/kontak">Kontak</FooterLink>
            </nav>
          </div>

          {/* Column 4: Map */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Lokasi Kami</h4>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.1643323594824!2d104.64398196589632!3d-2.9145696817020856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b0d228b1e20a7%3A0xe9263652f2ab49a6!2sKITA%20Coffee%20and%20Eatery%20%7C%20Taaashop%20Konveksi!5e0!3m2!1sen!2sid!4v1762762411117!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi TaaShop Konveksi"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="border-t border-orange-800 dark:border-gray-800 mt-8 pt-6 text-center text-sm text-orange-200 dark:text-gray-400">
          &copy; {new Date().getFullYear()} TaaShop Konveksi. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-orange-300 dark:hover:text-gray-400 hover:underline underline-offset-4 transition-colors">
      {children}
    </Link>
  );
}
