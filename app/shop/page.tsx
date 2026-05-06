import { Metadata } from "next";
import ShopContent from "@/components/pages/shop/ShopContent";
import { getShopProducts } from "@/lib/queries/shop";
import {
  getShopHeroConfig,
  getShopCtaConfig,
} from "@/lib/queries/section-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop | Toiles, prints et créations originales",
  description:
    "Découvrez les toiles, prints et créations originales de l’artiste muraliste GUIHOME. Commande sur mesure disponible.",
};

export default async function ShopPage() {
  const [products, heroConfig, ctaConfig] = await Promise.all([
    getShopProducts(),
    getShopHeroConfig(),
    getShopCtaConfig(),
  ]);
  return (
    <ShopContent
      products={products}
      heroConfig={heroConfig}
      ctaConfig={ctaConfig}
    />
  );
}
