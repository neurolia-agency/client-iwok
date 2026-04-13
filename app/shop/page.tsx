import { Metadata } from "next";
import ShopContent from "@/components/pages/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop \u2014 IWOK | Toiles, prints et cr\u00E9ations originales",
  description:
    "D\u00E9couvrez les toiles, prints et cr\u00E9ations originales de l\u2019artiste muraliste IWOK. Commande sur mesure disponible.",
};

export default function ShopPage() {
  return <ShopContent />;
}
