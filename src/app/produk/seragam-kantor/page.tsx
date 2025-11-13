import { ProductPage } from "@/components/ProductPage";

const products = [
  {
    imgSrc: "/produk/Kemeja BPN Kab. Lahat.png",
    title: "Kemeja BPN Kab. Lahat",
    description: "Seragam kemeja formal untuk Badan Pertanahan Nasional (BPN) Kabupaten Lahat, dirancang untuk tampilan profesional.",
  },
  {
    imgSrc: "/produk/Kemeja Manajemen Agribisnis POLSRI.png",
    title: "Kemeja Jurusan Agribisnis",
    description: "Kemeja khusus untuk jurusan Manajemen Agribisnis di Politeknik Negeri Sriwijaya (POLSRI).",
  },
  {
    imgSrc: "/produk/Poloshirt PT BSL Sumatera Selatan.png",
    title: "Poloshirt PT BSL",
    description: "Poloshirt korporat untuk PT BSL Sumatera Selatan, pilihan tepat untuk seragam kasual namun tetap profesional.",
  },
];

export default function SeragamKantorPage() {
  return (
    <ProductPage
      title="Seragam Kantor"
      description="Tingkatkan citra profesional perusahaan Anda dengan seragam kantor berkualitas tinggi dari kami."
      products={products}
      bannerImageUrl="/banner.jpg"
    />
  );
}