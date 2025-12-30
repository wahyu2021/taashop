"use client";

import { NextPage } from "next";
import Image from "next/image";
import JerseyModel from "@/components/JerseyModel";
import { AnimatedSection } from "@/components/AnimatedSection";
import MaterialsSection from "@/components/MaterialsSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import { TSHIRT_MODEL } from "@/data/tshirtModel";
import { BannerSection } from "@/components/BannerSection";
import { CTASection } from "@/components/common";

const TShirtPage: NextPage = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <BannerSection
                title="Ukuran & Harga T-Shirt"
                subtitle="Temukan panduan lengkap ukuran dan daftar harga terbaru untuk semua jenis T-shirt custom Anda. Desain sesuai keinginan, kualitas terbaik!"
            />

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
                                <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl shadow-xl">
                                    <Image
                                        src="/model-desain/jersey-bola/size-guide-baju.jpg"
                                        alt="Panduan Ukuran Baju"
                                        width={900}
                                        height={1200}
                                        className="h-auto w-full object-contain"
                                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 420px"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold mb-4">
                                    Ukuran Celana
                                </h3>
                                <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl shadow-xl">
                                    <Image
                                        src="/model-desain/jersey-bola/size-guide-celana.jpg"
                                        alt="Panduan Ukuran Celana"
                                        width={900}
                                        height={1200}
                                        className="h-auto w-full object-contain"
                                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 420px"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
            </main>

            {/* CTA Section */}
            <CTASection
                title="Siap Membuat T-shirt Impian Anda?"
                description="Hubungi kami sekarang untuk konsultasi gratis mengenai desain, bahan, dan harga. Tim kami siap membantu mewujudkan T-shirt custom terbaik untuk tim Anda."
                buttonText="Hubungi Kami"
                buttonHref="/kontak"
                variant="gray"
            />
        </div>
    );
};

export default TShirtPage;
