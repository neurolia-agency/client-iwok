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
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Guihome-art",
  alternateName: "IWOK",
  url: "https://guihomedecoration.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable} ${fraunces.variable}`}>
      <body>
        {/* JSON-LD WebSite : valeurs constantes définies en code, aucune donnée utilisateur, aucun risque XSS */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
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
