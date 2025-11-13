import { ProductPage } from "@/components/ProductPage";

const products = [
  {
    imgSrc: "/produk/jaket-bomber-bank-mandiri.png",
    title: "Jaket Bomber Bank Mandiri",
    description: "Jaket bomber eksklusif untuk Bank Mandiri, menggabungkan gaya korporat dengan desain modern.",
  },
  // Add more products as needed
];

export default function JaketPage() {
  return (
    <ProductPage
      title="Jaket & Hoodie"
      description="Dari jaket bomber korporat hingga hoodie komunitas, kami siap membuat outerwear custom sesuai kebutuhan Anda."
      products={products}
      bannerImageUrl="/banner.jpg"
    />
  );
}