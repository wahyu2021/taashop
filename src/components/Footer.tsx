import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-orange-700 text-white w-full flex justify-center border-t border-orange-800 dark:bg-gray-900 dark:border-gray-800 dark:text-white">
      <div className="w-full max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* ABOUT */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="TaaShop Logo"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="font-bold text-lg">TaaShop Konveksi</span>
            </Link>
            <p className="text-sm leading-relaxed dark:text-gray-300">
              Solusi konveksi terpercaya untuk segala kebutuhan pakaian custom Anda. 
              Kualitas premium, harga kompetitif, dan desain tanpa batas.
            </p>
          </div>

          {/* KONTAK */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Kontak Kami</h4>
            <div className="flex flex-col gap-3 text-sm">
              <FooterContact
                href="https://wa.me/6282281954629"
                icon={<Phone className="h-4 w-4" />}
              >
                +62 822-8195-4629
              </FooterContact>

              <FooterContact
                href="mailto:info@taashop.com"
                icon={<Mail className="h-4 w-4" />}
              >
                info@taashop.com
              </FooterContact>

              <FooterContact
                href="https://www.instagram.com/taaashop_konveksi/"
                icon={<Instagram className="h-4 w-4" />}
              >
                @taaashop_konveksi
              </FooterContact>
            </div>
          </div>

          {/* INFORMASI */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Informasi</h4>
            <nav className="flex flex-col gap-3 text-sm">
              <FooterLink href="/tentang-kami">Tentang Kami</FooterLink>
              <FooterLink href="/galeri">Galeri</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/kontak">Kontak</FooterLink>
            </nav>
          </div>

          {/* MAP */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Lokasi Kami</h4>
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.1643323594824!2d104.64398196589632!3d-2.9145696817020856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b0d228b1e20a7%3A0xe9263652f2ab49a6!2sKITA%20Coffee%20and%20Eatery%20%7C%20Taaashop%20Konveksi!5e0!3m2!1sen!2sid!4v1762762411117!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi TaaShop Konveksi"
              />
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-orange-800 dark:border-gray-800 mt-12 pt-6 text-center text-sm dark:text-gray-400">
          &copy; {new Date().getFullYear()} TaaShop Konveksi. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-orange-300 dark:hover:text-gray-300 hover:underline underline-offset-4 transition-colors"
    >
      {children}
    </Link>
  );
}

function FooterContact({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 hover:text-orange-300 dark:hover:text-gray-300 transition-colors hover:underline underline-offset-4"
    >
      {icon} {children}
    </a>
  );
}
