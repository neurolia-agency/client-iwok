import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

/**
 * Visibilité globale du shop sur le site.
 * Setting iwok_settings.shop_visibility = { enabled: boolean }.
 * Si absent, par défaut on considère le shop visible (compat).
 *
 * Quand `enabled` est false :
 *  - Le lien Shop disparaît du header / footer / menu mobile
 *  - La route /shop renvoie un 404 (notFound)
 *  - Le sitemap n'inclut plus /shop
 *  - robots.txt continue d'autoriser (pas critique côté SEO)
 */
export const getShopVisibility = unstable_cache(
  async (): Promise<{ enabled: boolean }> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "shop_visibility")
      .maybeSingle();
    if (error) {
      console.error("IWOK shop visibility error:", error.message);
      return { enabled: true };
    }
    const raw = data?.value as { enabled?: boolean } | null;
    if (!raw) return { enabled: true };
    return { enabled: raw.enabled !== false };
  },
  ["iwok-shop-visibility"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);

/**
 * Forme exposée à l'UI — découplée du schéma SQL pour faciliter
 * une future migration (ex: ajout d'un price_label, variants, etc.).
 */
export interface ShopProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceLabel: string;            // ex: "250 €" ou "Sur devis"
  image: string | null;
  imageAlt: string;
  category: string;
}

const PRICE_FORMATTER = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function formatPrice(cents: number, currency: string): string {
  if (cents <= 0) return "Sur devis";
  if (currency && currency !== "EUR") {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  }
  return PRICE_FORMATTER.format(cents / 100);
}

/**
 * Type riche pour la page détail produit (prix brut, stock, frais de port).
 */
export interface ShopProductDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  priceLabel: string;
  shippingCostCents: number;
  currency: string;
  image: string | null;
  imageAlt: string;
  category: string;
  stock: number | null;
  inStock: boolean;
}

export const getShopProductBySlug = unstable_cache(
  async (slug: string): Promise<ShopProductDetail | null> => {
    const { data, error } = await supabase
      .from("iwok_shop_products")
      .select(
        "id, slug, title, description, price_cents, currency, image_url, image_alt, category, stock, shipping_cost_cents"
      )
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("IWOK shop product detail error:", error.message);
      return null;
    }
    if (!data) return null;

    const priceCents = (data.price_cents as number) ?? 0;
    const currency = (data.currency as string) ?? "EUR";
    const stock = data.stock as number | null;

    return {
      id: data.id as string,
      slug: data.slug as string,
      title: data.title as string,
      description: (data.description as string | null) ?? "",
      priceCents,
      priceLabel: formatPrice(priceCents, currency),
      shippingCostCents: (data.shipping_cost_cents as number | null) ?? 0,
      currency,
      image: (data.image_url as string | null) ?? null,
      imageAlt: (data.image_alt as string | null) ?? (data.title as string),
      category: (data.category as string | null) ?? "autre",
      stock,
      inStock: stock === null || stock > 0,
    };
  },
  ["iwok-shop-product-detail"],
  { tags: ["iwok-shop"], revalidate: 3600 }
);

/**
 * Charge les produits shop publiés, triés par sort_order.
 * Cache invalidé via le tag `iwok-shop` (déclenché par les actions du
 * dashboard à chaque create/update/delete).
 */
export const getShopProducts = unstable_cache(
  async (): Promise<ShopProduct[]> => {
    const { data, error } = await supabase
      .from("iwok_shop_products")
      .select(
        "id, slug, title, description, price_cents, currency, image_url, image_alt, category"
      )
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("IWOK shop query error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      description: (row.description as string | null) ?? "",
      priceLabel: formatPrice(
        (row.price_cents as number) ?? 0,
        (row.currency as string) ?? "EUR"
      ),
      image: (row.image_url as string | null) ?? null,
      imageAlt: (row.image_alt as string | null) ?? (row.title as string),
      category: (row.category as string | null) ?? "autre",
    }));
  },
  ["iwok-shop-products"],
  { tags: ["iwok-shop"], revalidate: 3600 }
);
