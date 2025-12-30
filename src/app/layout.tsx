import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { client, urlFor } from "@/sanity/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TaaShop Konveksi - Jasa Konveksi Custom Berkualitas",
    template: "%s | TaaShop Konveksi",
  },
  description: "TaaShop Konveksi adalah partner konveksi terpercaya untuk jersey, kaos, kemeja, dan seragam custom berkualitas tinggi dengan harga terjangkau. Melayani seluruh Indonesia.",
  keywords: ["konveksi", "jersey custom", "kaos custom", "seragam", "sablon", "printing", "palembang", "sumatera selatan"],
  authors: [{ name: "TaaShop Konveksi" }],
  creator: "TaaShop Konveksi",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://taashop.com",
    siteName: "TaaShop Konveksi",
    title: "TaaShop Konveksi - Jasa Konveksi Custom Berkualitas",
    description: "Partner konveksi terpercaya untuk jersey, kaos, kemeja, dan seragam custom berkualitas tinggi dengan harga terjangkau.",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "TaaShop Konveksi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaaShop Konveksi - Jasa Konveksi Custom Berkualitas",
    description: "Partner konveksi terpercaya untuk jersey, kaos, kemeja, dan seragam custom berkualitas tinggi.",
    images: ["/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl = undefined;
  try {
    const settings = await client.fetch('*[_type == "siteSettings"][0]{logo}');
    if (settings?.logo) {
      logoUrl = urlFor(settings.logo).url();
    }
  } catch (error) {
    console.error("Error fetching logo:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsTracker />
          <ConditionalLayout 
            navbar={<Navbar logoUrl={logoUrl} />}
            footer={<Footer />}
          >
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}


