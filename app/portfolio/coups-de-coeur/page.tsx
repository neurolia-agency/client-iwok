import type { Metadata } from "next";
import CoupsDeCoeurContent from "@/components/pages/portfolio/CoupsDeCoeurContent";

export const metadata: Metadata = {
  title: "Coups de c\u0153ur \u2014 Portfolio GUIHOME | Fresques murales",
  description:
    "Les r\u00e9alisations pr\u00e9f\u00e9r\u00e9es des visiteurs \u2014 fresques murales les plus appr\u00e9ci\u00e9es, s\u00e9lectionn\u00e9es par la communaut\u00e9.",
};

export default function CoupsDeCoeurPage() {
  return <CoupsDeCoeurContent />;
}
