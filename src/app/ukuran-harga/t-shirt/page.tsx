"use client";

import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import JerseyModel from "@/components/JerseyModel";
import { AnimatedSection } from "@/components/AnimatedSection";
import MaterialsSection from "@/components/MaterialsSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import { ArrowRight } from "lucide-react";
import { TSHIRT_MODEL } from "@/data/tshirtModel";

const TShirtPage: NextPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Banner */}
            <div
                className="relative min-h-[50vh] md:min-h-[60vh] lg:h-[50vh] bg-cover bg-center"
                style={{ backgroundImage: "url('/banner.jpg')" }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-black/80"></div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-24 md:py-16 text-center text-white space-y-4 md:space-y-6 sm:py-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
                        Ukuran & Harga T-Shirt
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-3xl drop-shadow-lg">
                        Temukan panduan lengkap ukuran dan daftar harga terbaru
                        untuk semua jenis T-shirt custom Anda. Desain sesuai
                        keinginan, kualitas terbaik!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/kontak"
                            className="group flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition"
                        >
                            Pesan Sekarang
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#panduan-ukuran"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-6 sm:px-7 py-3 rounded-full border border-white/30 text-base sm:text-lg font-semibold transition"
                        >
                            Lihat Panduan Ukuran
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="py-12 sm:py-20 lg:py-24 overflow-x-hidden">
                {/* How to Order Section */}
                <AnimatedSection>
                    <HowToOrderSection
                        description="Hanya dengan 4 langkah mudah, Anda bisa mendapatkan T-shirt impian untuk tim Anda."
                        steps={[
                            {
                                title: "Pilih Paket",
                                description:
                                    "Pilih paket T-shirt yang paling sesuai dengan kebutuhan Anda dari pilihan di atas.",
                            },
                            {
                                title: "Kirim Desain",
                                description:
                                    "Hubungi kami dan kirimkan desain atau konsep yang Anda inginkan.",
                            },
                            {
                                title: "Produksi",
                                description:
                                    "Kami akan memproses pesanan Anda dengan cepat dan teliti.",
                            },
                            {
                                title: "Pengiriman",
                                description:
                                    "T-shirt siap dikirim ke alamat Anda dengan aman dan tepat waktu.",
                            },
                        ]}
                    />
                </AnimatedSection>

                {/* Model Section */}
                <AnimatedSection delay={200}>
                    <section className="container mx-auto px-4 mt-16 lg:mt-24">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Pilihan Model & Paket T-Shirt
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                                Kami menyediakan berbagai pilihan paket T-shirt
                                yang dapat disesuaikan dengan kebutuhan dan
                                budget Anda. Mulai dari paket ekonomis
                                hingga paket premium dengan kualitas terbaik.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-12">
                            {TSHIRT_MODEL.map((model) => (
                                <JerseyModel
                                    key={model.title}
                                    title={model.title}
                                    imageUrl={model.imageUrl}
                                    printType={
                                        model.printType as "Sablon" | "Printing"
                                    }
                                    minPrice={model.minPrice}
                                    maxPrice={model.maxPrice}
                                />
                            ))}
                        </div>
                    </section>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <MaterialsSection
                        className="mt-16 lg:mt-24"
                        heading="Detail Bahan T-Shirt"
                        intro="Bahan-Bahan berkualitas yang kami gunakan untuk T-shirt custom Anda"
                        cardClassName="hover:-translate-y-3 hover:shadow-2xl hover:border-orange-300/70 dark:hover:border-orange-500/40 hover:bg-linear-to-br hover:from-white hover:via-orange-50/60 hover:to-orange-100/40 dark:hover:from-gray-900/90 dark:hover:via-orange-900/20 dark:hover:to-gray-900/80 hover:ring-2 hover:ring-orange-200/60 dark:hover:ring-orange-500/30"
                    />
                </AnimatedSection>

                {/* Size Guide Section */}
                <AnimatedSection delay={400}>
                    <section
                        id="panduan-ukuran"
                        className="container mx-auto px-4 mt-16 lg:mt-24"
                    >
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Panduan Ukuran
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                                Pastikan Anda memilih ukuran yang tepat. Gunakan
                                panduan di bawah ini untuk mengukur baju dan
                                celana Anda.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold mb-4">
                                    Ukuran Baju
                                </h3>
                                <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src="/model-desain/jersey-bola/size-guide-baju.jpg"
                                        alt="Panduan Ukuran Baju"
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 400px"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold mb-4">
                                    Ukuran Celana
                                </h3>
                                <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src="/model-desain/jersey-bola/size-guide-celana.jpg"
                                        alt="Panduan Ukuran Celana"
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 400px"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            {/* CTA Section */}
            <section className="bg-gray-100 dark:bg-gray-800">
                <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Siap Membuat T-shirt Impian Anda?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Hubungi kami sekarang untuk konsultasi gratis mengenai
                        desain, bahan, dan harga. Tim kami siap membantu
                        mewujudkan T-shirt custom terbaik untuk tim Anda.
                    </p>
                    <Link
                        href="/kontak"
                        className="bg-orange-600 text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-orange-700 transition"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TShirtPage;
