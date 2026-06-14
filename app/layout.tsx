import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingPhone from "@/components/layout/FloatingPhone";
import { Toaster } from "@/components/ui/sonner";
import { COMPANY } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: "Therklima — Électricité, Plomberie, Chauffage, Climatisation, PAC & Ventilation",
    template: "%s | Therklima",
  },
  description:
    "Therklima : vos experts en électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation. Installation, rénovation, dépannage 7j/7 sur Paris et Île-de-France. Devis gratuit.",
  keywords: [
    "électricien Paris",
    "plombier Paris",
    "chauffagiste Paris",
    "climatisation Paris",
    "pompe à chaleur Île-de-France",
    "VMC ventilation",
    "dépannage électrique",
    "installation PAC",
    "Therklima",
  ],
  authors: [{ name: "Therklima" }],
  creator: "Therklima",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: COMPANY.url,
    siteName: "Therklima",
    title: "Therklima — Experts en Électricité, Plomberie, Chauffage, Climatisation, PAC & Ventilation",
    description: "Installation, rénovation et dépannage 7j/7. Certifié Qualifelec & RGE. Devis gratuit sous 24h.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Therklima — Experts en bâtiment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Therklima — Experts en bâtiment",
    description: "Électricité, Plomberie, Chauffage, Climatisation, PAC & Ventilation. Devis gratuit.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Therklima",
  description: "Experts en électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation",
  url: COMPANY.url,
  telephone: "+33663757563",
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 Rue d'Armaillé",
    addressLocality: "Paris",
    postalCode: "75017",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services Therklima",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Électricité" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plomberie" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chauffage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Climatisation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pompe à chaleur" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ventilation" } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "156",
    bestRating: "5",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0da2e1] focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingPhone />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
