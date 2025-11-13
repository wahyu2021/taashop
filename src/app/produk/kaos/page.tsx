import { ProductPage } from "@/components/ProductPage";

const products = [
  {
    imgSrc: "/produk/T-Shirt Kampung SI.png",
    title: "T-Shirt Custom",
    description: "Kaos berkualitas tinggi untuk komunitas atau acara, dengan bahan nyaman dan desain yang tahan lama.",
  },
  {
    imgSrc: "/produk/T-Shirt Petani RI Sumatera Selatan.png",
    title: "Kaos Petani RI",
    description: "Tunjukkan dukungan Anda dengan kaos eksklusif Petani RI, simbol kebanggaan dan kerja keras.",
  },
  {
    imgSrc: "/produk/Polo-Shirt Away Unsri Basketball.png",
    title: "Poloshirt Tim Basket",
    description: "Poloshirt elegan untuk tim basket, sempurna untuk acara formal atau kasual.",
  },
  {
    imgSrc: "/produk/Polo-Shirt Home The Tamvans Basketball.png",
    title: "Poloshirt 'The Tamvans'",
    description: "Poloshirt custom untuk tim 'The Tamvans', menggabungkan gaya dan kenyamanan.",
  },
  {
    imgSrc: "/produk/Polo-Shirt Home Unsri Basketball.png",
    title: "Poloshirt Tim Unsri",
    description: "Dukung tim basket Unsri dengan poloshirt resmi, dibuat dengan bahan premium.",
  },
  {
    imgSrc: "/produk/Poloshirt PT BSL Sumatera Selatan.png",
    title: "Poloshirt Perusahaan",
    description: "Poloshirt korporat untuk PT BSL, menampilkan logo perusahaan dengan bordir presisi.",
  },
];

export default function KaosPage() {
  return (
    <ProductPage
      title="Kaos & T-Shirt"
      description="Jelajahi berbagai pilihan kaos dan poloshirt custom kami, ideal untuk berbagai acara dan kebutuhan."
      products={products}
      bannerImageUrl="/banner2.jpg"
    />
  );
}