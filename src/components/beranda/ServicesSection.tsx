import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/common";
import Image from "next/image";
import { client, urlFor } from "@/sanity/client";

interface Service {
  _id: string;
  title: string;
  description: string;
  image?: { asset: { _ref: string } };
  order: number;
}

// Fallback data if Sanity fetch fails
const fallbackServices = [
  {
    _id: "1",
    title: "Kaos & Poloshirt Custom",
    description: "Ideal untuk acara, merchandise, atau pakaian sehari-hari. Pilih dari berbagai bahan premium seperti cotton combed 24s/30s dengan opsi sablon plastisol, DTF, atau bordir komputer.",
    imageSrc: "/produk/T-Shirt Kampung SI.png",
    order: 1,
  },
  {
    _id: "2",
    title: "Kemeja & Seragam Kerja",
    description: "Tampil profesional dengan kemeja PDL/PDH, seragam kantor, atau almamater. Bahan berkualitas seperti American Drill atau Japan Drill yang nyaman dan awet.",
    imageSrc: "/produk/Kemeja BPN Kab. Lahat.png",
    order: 2,
  },
  {
    _id: "3",
    title: "Jersey & Pakaian Olahraga",
    description: "Buat tim Anda menonjol dengan jersey custom full printing. Menggunakan bahan dry-fit premium yang menyerap keringat dan nyaman untuk aktivitas fisik.",
    imageSrc: "/produk/Jersey Basket Home DBASCOM.png",
    order: 3,
  },
  {
    _id: "4",
    title: "Jaket, Hoodie & Outerwear",
    description: "Dari jaket bomber korporat hingga hoodie komunitas yang trendi. Pilihan bahan beragam dengan finishing bordir presisi atau sablon berkualitas tinggi.",
    imageSrc: "/produk/jaket-bomber-bank-mandiri.png",
    order: 4,
  },
];

// Static image mappings for services without images in Sanity
const imageMap: Record<string, string> = {
  "Kaos & Poloshirt Custom": "/produk/T-Shirt Kampung SI.png",
  "Kemeja & Seragam Kerja": "/produk/Kemeja BPN Kab. Lahat.png",
  "Jersey & Pakaian Olahraga": "/produk/Jersey Basket Home DBASCOM.png",
  "Jaket, Hoodie & Outerwear": "/produk/jaket-bomber-bank-mandiri.png",
};

async function getServices(): Promise<Service[]> {
  try {
    const services = await client.fetch<Service[]>(
      `*[_type == "service"] | order(order asc) {
        _id,
        title,
        description,
        image,
        order
      }`,
      {},
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    return services.length > 0 ? services : fallbackServices as unknown as Service[];
  } catch {
    return fallbackServices as unknown as Service[];
  }
}

function ProductCard({
  imgSrc,
  title,
  description,
}: {
  imgSrc: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg h-96">
      <Image
        src={imgSrc}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        style={{ objectFit: "cover" }}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-white/80 mt-1">{description}</p>
      </div>
    </div>
  );
}

export async function ServicesSection() {
  const services = await getServices();

  return (
    <section id="layanan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          badge="Layanan Kami"
          title="Produk Konveksi Unggulan"
          subtitle="Dari kaos kasual hingga seragam profesional, kami mengubah ide Anda menjadi produk garmen berkualitas tinggi. Jelajahi pilihan produk unggulan kami."
        />
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
          {services.map((service, index) => {
            const imgSrc = service.image 
              ? urlFor(service.image).width(400).height(300).format('webp').quality(80).url()
              : imageMap[service.title] || "/produk/T-Shirt Kampung SI.png";
            
            return (
              <AnimatedSection delay={(index + 1) * 100} key={service._id}>
                <ProductCard 
                  imgSrc={imgSrc}
                  title={service.title}
                  description={service.description}
                />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
