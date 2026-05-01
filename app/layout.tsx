import type { Metadata } from "next";
import { Syne, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "WONK"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guihomedecoration.com"),
  title: {
    default: "GUIHOME — Fresques murales sur mesure en Occitanie",
    template: "%s — GUIHOME",
  },
  description:
    "Designer mural professionnel, +20 ans d'expérience. Fresques intérieures, extérieures, tous supports. Devis gratuit.",
  openGraph: {
    siteName: "Guihome-art / IWOK",
    locale: "fr_FR",
    type: "website",
    // TODO: ajouter une image OG dédiée 1200×630 dans /public/og-image.jpg
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "GUIHOME — Fresques murales" }],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Guihome-art",
  alternateName: "IWOK",
  url: "https://guihomedecoration.com",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://guihomedecoration.com/#business",
  name: "Guihome-art / IWOK",
  alternateName: "GUIHOME Décoration",
  description:
    "Designer mural professionnel — fresques murales, décoration peinte, live painting. +20 ans d'expérience.",
  url: "https://guihomedecoration.com",
  telephone: "+33683867693",
  email: "contact@guihome-art.com",
  image: "https://guihomedecoration.com/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15 rue Bellevue",
    postalCode: "12510",
    addressLocality: "Olemps",
    addressRegion: "Aveyron",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Aveyron" },
    { "@type": "AdministrativeArea", name: "Finistère" },
    { "@type": "Country", name: "France" },
  ],
  founder: {
    "@type": "Person",
    "@id": "https://guihomedecoration.com/#person",
    name: "Guillaume Jeanjean",
    jobTitle: "Designer mural / Graffeur professionnel",
    worksFor: { "@id": "https://guihomedecoration.com/#business" },
    sameAs: [
      "https://www.instagram.com/guihomefresquesmurales/",
      "https://www.instagram.com/guihomedesignmural/",
    ],
  },
  sameAs: [
    "https://www.instagram.com/guihomefresquesmurales/",
    "https://www.instagram.com/guihomedesignmural/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        {/* JSON-LD : valeurs constantes en code, aucune donnée user, aucun risque XSS */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
