import { ProductPage } from "@/components/ProductPage";

const products = [
  {
    imgSrc: "/produk/Kemeja Osis SMAN 2 MUBA.png",
    title: "Kemeja OSIS SMAN 2 MUBA",
    description: "Seragam kemeja untuk Organisasi Siswa Intra Sekolah (OSIS) SMAN 2 Musi Banyuasin.",
  },
  {
    imgSrc: "/produk/Kemeja Duta SMANDAWA Sumatera Selatan.png",
    title: "Kemeja Duta SMANDAWA",
    description: "Kemeja duta untuk SMAN 2 Unggul Sekayu, Sumatera Selatan, menampilkan identitas sekolah.",
  },
  {
    imgSrc: "/produk/Kemeja Duta SMANDUPA SUMATERA SELATAN.png",
    title: "Kemeja Duta SMANDUPA",
    description: "Kemeja duta yang dirancang khusus untuk SMAN 2 Unggul Palembang, Sumatera Selatan.",
  },
];

export default function SeragamSekolahPage() {
  return (
    <ProductPage
      title="Seragam Sekolah"
      description="Kami menyediakan seragam sekolah berkualitas yang nyaman dan tahan lama untuk berbagai tingkatan pendidikan."
      products={products}
      bannerImageUrl="/banner2.jpg"
    />
  );
}