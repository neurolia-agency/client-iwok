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
  title: {
    default: "IWOK — Fresques murales sur mesure en Occitanie",
    template: "%s — IWOK",
  },
  description:
    "Designer mural professionnel, +15 ans d'expérience. Fresques intérieures, extérieures, tous supports. Devis gratuit.",
  openGraph: {
    siteName: "IWOK — GuiHome Décoration",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${inter.variable} ${fraunces.variable}`}>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
