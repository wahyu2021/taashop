import { ProductPage } from "@/components/ProductPage";

const products = [
  {
    imgSrc: "/produk/Jersey Basket Agriculture UNSRI.png",
    title: "Jersey Basket Pertanian UNSRI",
    description: "Jersey custom untuk tim basket Fakultas Pertanian Universitas Sriwijaya (UNSRI).",
  },
  {
    imgSrc: "/produk/Jersey Basket Away DBASCOM.png",
    title: "Jersey Away DBASCOM",
    description: "Jersey tandang untuk tim basket DBASCOM, dengan desain yang sporty dan modern.",
  },
  {
    imgSrc: "/produk/Jersey Basket Home Dan Away Universitas Aisyah Pringsewu.png",
    title: "Jersey Tim Universitas Aisyah",
    description: "Satu set jersey kandang dan tandang untuk tim basket Universitas Aisyah Pringsewu.",
  },
  {
    imgSrc: "/produk/Jersey Basket Home DBASCOM.png",
    title: "Jersey Home DBASCOM",
    description: "Jersey kandang untuk tim basket DBASCOM, dirancang untuk performa maksimal.",
  },
  {
    imgSrc: "/produk/Jersey Basket Home FIF Cab. Bekasi.png",
    title: "Jersey Basket FIF Bekasi",
    description: "Jersey custom untuk tim basket FIF Cabang Bekasi, menampilkan identitas perusahaan.",
  },
  {
    imgSrc: "/produk/Jersey Basket IGS Sumatera Selatan.png",
    title: "Jersey Basket IGS Sumsel",
    description: "Jersey untuk tim basket IGS (Insan Cendekia Gemilang) Sumatera Selatan.",
  },
  {
    imgSrc: "/produk/Jersey Basketball Away UNSRI.png",
    title: "Jersey Basket Tandang UNSRI",
    description: "Jersey tandang resmi untuk tim basket Universitas Sriwijaya (UNSRI).",
  },
  {
    imgSrc: "/produk/Jersey Basketball Home UNSRI Lima.png",
    title: "Jersey Basket Kandang UNSRI",
    description: "Jersey kandang untuk tim basket Universitas Sriwijaya (UNSRI) dengan desain khas.",
  },
  {
    imgSrc: "/produk/jersey-away-sempatu-basketball.png",
    title: "Jersey Basket Sempatu",
    description: "Jersey tandang untuk tim basket Sempatu, siap untuk bertanding.",
  },
];

export default function JerseyPage() {
  return (
    <ProductPage
      title="Jersey & Pakaian Olahraga"
      description="Buat tim Anda tampil beda dengan jersey custom dan pakaian olahraga berkualitas tinggi dari kami."
      products={products}
      bannerImageUrl="/banner2.jpg"
    />
  );
}