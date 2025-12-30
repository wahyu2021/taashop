import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail } from "lucide-react";
import { client, urlFor } from "@/sanity/client";

interface SiteSettings {
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  address?: string;
  googleMapsEmbed?: string;
  logo?: any;
}

// Fallback data
const fallbackSettings: SiteSettings = {
  phone: "+62 822-8195-4629",
  email: "info@taashop.com",
  whatsapp: "6282281954629",
  instagram: "taaashop_konveksi",
  address: "Palembang, Sumatera Selatan",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.1643323594824!2d104.64398196589632!3d-2.9145696817020856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b0d228b1e20a7%3A0xe9263652f2ab49a6!2sKITA%20Coffee%20and%20Eatery%20%7C%20Taaashop%20Konveksi!5e0!3m2!1sen!2sid!4v1762762411117!5m2!1sen!2sid",
};

async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0] {
        phone, email, whatsapp, instagram, address, googleMapsEmbed, logo
      }`
    );
    return settings || fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}

export async function Footer() {
  const settings = await getSiteSettings();
  
  const phone = settings.phone || fallbackSettings.phone;
  const email = settings.email || fallbackSettings.email;
  const whatsapp = settings.whatsapp || fallbackSettings.whatsapp;
  const instagram = settings.instagram || fallbackSettings.instagram;
  const googleMapsEmbed = settings.googleMapsEmbed || fallbackSettings.googleMapsEmbed;

  return (
    <footer className="bg-gradient-to-r from-orange-600 to-orange-500 text-white w-full flex justify-center border-t border-orange-700 dark:from-slate-900 dark:to-slate-800 dark:border-slate-700">
      <div className="w-full max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* ABOUT */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {settings.logo ? (
                <Image
                  src={urlFor(settings.logo).url()}
                  alt="TaaShop Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 brightness-0 invert"
                />
              ) : (
                <Image
                  src="/logo.svg"
                  alt="TaaShop Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 brightness-0 invert"
                />
              )}
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
                href={`https://wa.me/${whatsapp}`}
                icon={<Phone className="h-4 w-4" />}
              >
                {phone}
              </FooterContact>

              <FooterContact
                href={`mailto:${email}`}
                icon={<Mail className="h-4 w-4" />}
              >
                {email}
              </FooterContact>

              <FooterContact
                href={`https://www.instagram.com/${instagram}/`}
                icon={<Instagram className="h-4 w-4" />}
              >
                @{instagram}
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
                src={googleMapsEmbed}
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
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/80">
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
      className="hover:text-white/80 hover:underline underline-offset-4 transition-colors"
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
      className="flex items-center gap-2 hover:text-white/80 transition-colors hover:underline underline-offset-4"
    >
      {icon} {children}
    </a>
  );
}
