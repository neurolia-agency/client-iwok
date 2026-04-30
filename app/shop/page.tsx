import { Metadata } from "next";
import ShopContent from "@/components/pages/shop/ShopContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop \u2014 GUIHOME | Toiles, prints et cr\u00E9ations originales",
  description:
    "D\u00E9couvrez les toiles, prints et cr\u00E9ations originales de l\u2019artiste muraliste GUIHOME. Commande sur mesure disponible.",
};

export default function ShopPage() {
  return <ShopContent />;
}
