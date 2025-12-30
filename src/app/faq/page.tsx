"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { BannerSection } from "@/components/BannerSection";
import { CTASection } from "@/components/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FaqPage() {
  const faqItems = [
    {
      question: "Bagaimana cara memulai pemesanan di TaaaShop?",
      answer:
        "Memulai sangat mudah! Cukup hubungi kami melalui DM Instagram di @taaashop_konveksi atau klik tombol 'Hubungi Kami'. Tim kami akan dengan senang hati memandu Anda, mulai dari konsultasi ide, pemilihan desain dan bahan, hingga pesanan Anda siap diproduksi.",
    },
    {
      question: "Apakah ada jumlah pesanan minimum?",
      answer:
        "Ya, untuk menjaga kualitas produksi, kami menetapkan jumlah pesanan minimum (MOQ) sebanyak 12 pcs per desain. Jika Anda memiliki kebutuhan khusus di bawah MOQ, jangan ragu untuk mendiskusikannya dengan kami. Kami selalu berusaha fleksibel dan mencari solusi terbaik.",
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk produksi?",
      answer:
        "Proses produksi kami biasanya memakan waktu 14 hingga 21 hari kerja. Waktu ini dapat bervariasi tergantung pada kerumitan desain dan jumlah pesanan. Kami akan memberikan estimasi waktu yang lebih akurat saat semua detail pesanan Anda telah kami terima.",
    },
    {
      question: "Saya belum punya desain. Apakah TaaaShop bisa membantu?",
      answer:
        "Tentu saja! Justru di situlah keahlian kami. Kami menyediakan layanan desain gratis sebagai bagian dari komitmen kami. Cukup sampaikan konsep atau ide Anda, dan tim desainer kreatif kami akan membantu Anda mewujudkannya menjadi desain yang siap cetak.",
    },
    {
      question: "Bagaimana jika saya ingin revisi desain?",
      answer:
        "Kepuasan Anda adalah prioritas kami. Proses desain kami bersifat kolaboratif, yang berarti Anda bisa meminta revisi tanpa batas hingga desain tersebut benar-benar sesuai dengan visi Anda. Kami ingin Anda 100% puas sebelum naik ke tahap produksi.",
    },
    {
      question: "Jenis bahan dan metode cetak apa yang digunakan?",
      answer:
        "Kami hanya menggunakan material dan teknologi terbaik. Untuk bahan, kami menyediakan pilihan premium seperti Cotton Combed (24s/30s), Dry-Fit untuk jersey, dan American/Japan Drill untuk seragam. Untuk cetak, kami menggunakan Sablon Plastisol, DTF (Direct to Film), dan Bordir Komputer presisi tinggi untuk hasil yang detail dan tahan lama.",
    },
    {
      question: "Bagaimana cara menentukan harga pesanan saya?",
      answer:
        "Harga ditentukan oleh beberapa faktor: jenis bahan, jumlah pesanan, kerumitan desain, dan jenis metode cetak (sablon/bordir). Semakin banyak jumlah pesanan Anda, semakin baik harga yang bisa kami tawarkan. Hubungi kami untuk mendapatkan penawaran harga yang transparan dan kompetitif.",
    },
    {
      question: "Apakah saya bisa memesan sampel terlebih dahulu?",
      answer:
        "Untuk pesanan dalam jumlah besar, pembuatan sampel (prototipe) dapat didiskusikan. Kebijakan ini biasanya melibatkan biaya produksi sampel yang nantinya bisa menjadi potongan harga jika pesanan dilanjutkan. Silakan hubungi tim kami untuk informasi lebih lanjut.",
    },
    {
      question: "Bagaimana sistem pembayarannya?",
      answer:
        "Kami menggunakan sistem pembayaran yang mudah dan aman. Diperlukan uang muka (DP) sebesar 50% untuk memulai proses produksi. Sisa 50% dilunasi setelah pesanan Anda selesai diproduksi dan siap untuk dikirim.",
    },
    {
      question: "Apakah TaaaShop bisa mengirim ke kota saya?",
      answer:
        "Tentu! Kami bangga bisa melayani pelanggan di seluruh Indonesia. Kami bekerja sama dengan mitra ekspedisi terpercaya untuk memastikan pesanan Anda tiba di tujuan dengan aman dan tepat waktu.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <BannerSection 
        title="FAQ"
        subtitle="Pertanyaan yang Sering Diajukan. Temukan jawaban cepat untuk pertanyaan umum di sini."
      />

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-3xl px-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AnimatedSection delay={(index + 1) * 100} key={index}>
                <AccordionItem
                  value={`item-${index + 1}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Tidak Menemukan Jawaban?"
        description="Tim kami selalu siap membantu. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan lain."
        buttonText="Hubungi Kami Sekarang"
        buttonHref="/kontak"
        variant="gray"
        icon={<HelpCircle className="w-12 h-12 text-orange-600" />}
        showArrow
      />
    </div>
  );
}