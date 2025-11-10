import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-muted/40 w-full flex justify-center border-t">
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-6 py-12">
        {/* Column 1: About */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="TaaShop Logo" width={32} height={32} />
            <span className="font-bold text-lg">TaaShop Konveksi</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Solusi konveksi terpercaya untuk segala kebutuhan pakaian custom Anda. Kualitas premium, harga kompetitif, dan desain tanpa batas.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Navigasi</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <FooterLink href="/">Beranda</FooterLink>
            <FooterLink href="/produk">Produk</FooterLink>
            <FooterLink href="/portofolio">Portofolio</FooterLink>
            <FooterLink href="/kontak">Kontak</FooterLink>
          </nav>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Hubungi Kami</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="mailto:info@taashop.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@taashop.com</span>
            </a>
            <a href="tel:+6281234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>+62 812-3456-7890</span>
            </a>
            <a href="https://www.instagram.com/taaashop_konveksi/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
              <span>@taaashop_konveksi</span>
            </a>
          </div>
        </div>

        {/* Column 4: Map */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Lokasi Kami</h4>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.529659928237!2d106.8271527747458!3d-6.19355499379493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42367afbf89%3A0x267354c85035f369!2sPlaza%20Indonesia!5e0!3m2!1sen!2sid!4v1628887890123!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi TaaShop Konveksi"
            ></iframe>
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Catatan:</strong> Peta di atas adalah contoh. Silakan ganti dengan kode embed dari Google Maps Anda.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-primary hover:underline underline-offset-4 transition-colors">
      {children}
    </Link>
  );
}
