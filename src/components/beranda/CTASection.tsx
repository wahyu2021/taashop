"use client";

import { CTASection as BaseCTASection } from "@/components/common";

export function CTASection() {
  return (
    <BaseCTASection
      title="Siap Membuat Pakaian Custom Anda?"
      description="Hubungi kami sekarang untuk mendapatkan penawaran dan konsultasi gratis mengenai kebutuhan konveksi Anda."
      buttonText="Hubungi via WhatsApp"
      buttonHref="/kontak"
      variant="default"
    />
  );
}

