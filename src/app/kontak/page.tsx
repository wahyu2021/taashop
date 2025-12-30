
"use client";

import React from 'react';

import { AnimatedSection } from "@/components/AnimatedSection";
import { BannerSection } from "@/components/BannerSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <BannerSection 
        title="Hubungi Kami"
        subtitle="Kami siap mendengarkan ide dan kebutuhan Anda."
      />

      {/* Contact Form & Info Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <AnimatedSection className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Informasi Kontak</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Pilih cara yang paling nyaman bagi Anda untuk terhubung dengan kami.
                  </p>
                </div>
                <div className="space-y-6">
                  <ContactInfoItem
                    icon={<Phone className="w-6 h-6 text-orange-600" />}
                    title="Telepon & WhatsApp"
                    content={<a href="https://wa.me/6282281954629?text=Halo%20TaaaShop,%20saya%20ingin%20bertanya%20mengenai%20produk%20dan%20konsultasi%20pemesanan." className="hover:underline">+62 822-8195-4629</a>}
                  />
                  <ContactInfoItem
                    icon={<Mail className="w-6 h-6 text-orange-600" />}
                    title="Email"
                    content={<a href="mailto:info@taashop.com" className="hover:underline">info@taashop.com</a>}
                  />
                  <ContactInfoItem
                    icon={<Instagram className="w-6 h-6 text-orange-600" />}
                    title="Instagram"
                    content={<a href="https://www.instagram.com/taaashop_konveksi/" target="_blank" rel="noopener noreferrer" className="hover:underline">@taaashop_konveksi</a>}
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={200} className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Tinggalkan Pesan</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-24 bg-white dark:bg-gray-800/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Kunjungi Workshop Kami</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kami juga senang bertemu langsung! Silakan kunjungi workshop kami di Palembang untuk melihat sampel bahan, hasil produksi, dan berdiskusi lebih lanjut tentang proyek Anda.
                </p>
                <div className="flex items-start space-x-4 pt-4">
                  <MapPin className="w-8 h-8 text-orange-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">Alamat</h3>
                    <p className="text-muted-foreground">KITA Coffee and Eatery | Taaashop Konveksi<br />Palembang, Sumatera Selatan</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow-xl">
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
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim pesan');
      }

      setStatus({ type: 'success', message: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.' });
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {status.message && (
        <div className={`p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" name="name" placeholder="Nama Anda" required suppressHydrationWarning />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Email Anda" required suppressHydrationWarning />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor WhatsApp</Label>
            <Input id="phone" name="phone" type="tel" placeholder="Contoh: 08123456789" suppressHydrationWarning />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subjek</Label>
          <Input id="subject" name="subject" placeholder="Subjek Pesan" suppressHydrationWarning />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Pesan Anda</Label>
          <Textarea id="message" name="message" placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..." rows={6} required />
        </div>
        <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={isSubmitting} suppressHydrationWarning>
          {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'} 
          {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
      </form>
    </div>
  );
}


function ContactInfoItem({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-muted-foreground">{content}</div>
      </div>
    </div>
  );
}
