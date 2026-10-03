import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/ui/Navbar";
import { WhatsAppOrderTray } from "@/components/ui/WhatsAppOrderTray";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Anjanam Foods | Shuddh Vrat Ka Aata | 100% Pure Natural Flours Indore",
  description:
    "Anjanam Foods provides 100% pure, natural, stone-milled flours in Indore. Specializing in Rajgira Aata, Singhada Aata, Mix Fariyali Aata, Makka, Bajra & Jowar. Order directly on WhatsApp.",
  keywords: [
    "Vrat Aata Indore",
    "Rajgira Aata Indore",
    "Singhada Aata Indore",
    "Natural Flour Indore",
    "Fariyali Aata Indore",
    "Shuddh Vrat Ka Aata",
    "Anjanam Foods",
    "Pure Grain Flour Indore",
    "Tilak Nagar Indore Flour Mill",
    "Makka Aata Indore",
    "Bajra Aata Indore"
  ],
  authors: [{ name: "Anjanam Foods" }],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Anjanam Foods | Shuddh Vrat Ka Aata",
    description: "Pure, natural, single-origin flours for holy fasts and healthy living in Indore. Fast doorstep delivery via WhatsApp.",
    url: "https://anjanamfoods.com",
    siteName: "Anjanam Foods",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Anjanam Foods Shuddh Vrat Ka Aata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjanam Foods | Shuddh Vrat Ka Aata (Indore)",
    description: "Natural, Pure and Trusted Grain Products for Every Home. Order on WhatsApp.",
    images: ["https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Anjanam Foods",
  "image": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df",
  "@id": "https://anjanamfoods.com",
  "url": "https://anjanamfoods.com",
  "telephone": "+918827685003",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "576 Tilak Nagar Main Road",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452018",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7208,
    "longitude": 75.8822
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "08:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://instagram.com/anjanamfoods"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#FAF7F0] text-[#1F2937] selection:bg-[#C9A24A]/30 selection:text-[#1F2937]">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <WhatsAppOrderTray />
          <StickyWhatsApp />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
