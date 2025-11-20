import type { MaterialItem } from "@/components/ProductMaterialShowcase";

export const COMMON_MATERIALS: MaterialItem[] = [
    {
        name: "Drifit Brazil",
        summary: "Pilihan utama untuk jersey dengan aplikasi sablon.",
        description: "Bahan ini dirancang khusus agar kompatibel dengan pembuatan jersey yang menggunakan media sablon. Karakteristik kainnya memungkinkan tinta sablon menyerap lebih maksimal dan awet.",
        features: [
            "Sangat cocok untuk media sablon.",
            "Daya serap bahan terhadap sablon lebih tinggi.",
        ],
        imageUrl: "/model-desain/material-jersey/drifit-brazil.jpg",
    },
    {
        name: "Benzema",
        summary: "Alternatif bahan Milano dengan variasi pola serat unik.",
        description: "Secara kualitas dan karakteristik dasar, bahan ini hampir identik dengan bahan Milano. Perbedaan utamanya hanya terletak pada motif atau pola serat bahannya yang berbeda.",
        features: [
            "Kualitas setara dengan bahan Milano.",
            "Memiliki pola tekstur bahan yang khas.",
        ],
        imageUrl: "/model-desain/material-jersey/benzema.jpg",
    },
    {
        name: "Milano",
        summary: "Bahan rekomendasi terbaik (best seller) untuk jersey printing.",
        description: "Bahan ini sangat direkomendasikan untuk jersey yang diproduksi menggunakan media printing (sublim). Serat kainnya mampu mengikat tinta printing sehingga warna dan desain lebih menyatu sempurna dengan kain.",
        features: [
            "Sangat direkomendasikan (Recommended).",
            "Didesain khusus untuk media printing.",
            "Hasil printing lebih menyatu dengan bahan.",
        ],
        imageUrl: "/model-desain/material-jersey/milano.jpg",
    },
    {
        name: "Milano Cool Max",
        summary: "Varian Milano premium dengan proteksi UV dan tekstur lebih ringan.",
        description: "Merupakan pengembangan dari bahan Milano standar. Meskipun mirip, bahan ini memiliki keunggulan teknologi Anti-Radiasi dan Anti-UV. Secara fisik, bahan ini memiliki ketebalan yang lebih tipis dibandingkan Milano biasa.",
        features: [
            "Memiliki fitur Anti-Radiasi.",
            "Memiliki fitur Anti-UV.",
            "Tekstur bahan lebih tipis dibanding Milano biasa.",
        ],
        imageUrl: "/model-desain/material-jersey/milano-cool-max.jpg",
    },
];

export type { MaterialItem } from "@/components/ProductMaterialShowcase";
