import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export interface FooterAddress {
  line1: string;
  line2: string;
  mapsUrl: string;
}

export interface FooterPhone {
  display: string;
  tel: string;
}

export interface FooterConfig {
  tagline: string;
  instagramUrl: string;
  instagramHandle: string;
  copyright: string;
  servicesList: string[]; // dérivés des services publiés
  phone: FooterPhone | null;
  address: FooterAddress | null;
}

const DEFAULT: FooterConfig = {
  tagline: "Designer mural · Graffeur professionnel",
  instagramUrl: "https://www.instagram.com/guihomefresquesmurales/",
  instagramHandle: "@guihomefresquesmurales",
  copyright: "© {year} GuiHome Décoration — GUIHOME. Tous droits réservés.",
  servicesList: [
    "Fresques intérieures",
    "Fresques extérieures",
    "Design mural sur mesure",
    "Animation événementielle",
  ],
  phone: { display: "06 83 86 76 93", tel: "tel:+33683867693" },
  address: {
    line1: "15 rue Bellevue",
    line2: "12510 Olemps (Aveyron)",
    mapsUrl: "",
  },
};

export const getFooterConfig = unstable_cache(
  async (): Promise<FooterConfig> => {
    // 1. Read footer-specific + contact settings + services in parallel
    const [settingsRes, servicesRes] = await Promise.all([
      supabase
        .from("iwok_settings")
        .select("key, value")
        .in("key", ["footer", "contact_phone", "contact_address"]),
      supabase
        .from("iwok_services")
        .select("title")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
    ]);

    if (settingsRes.error) {
      console.error("IWOK footer query error:", settingsRes.error.message);
    }
    if (servicesRes.error) {
      console.error("IWOK footer services error:", servicesRes.error.message);
    }

    const map = new Map<string, unknown>();
    for (const row of settingsRes.data ?? []) {
      map.set(row.key as string, row.value);
    }

    const footerRaw = (map.get("footer") ?? {}) as Record<string, unknown>;
    const phoneRaw = map.get("contact_phone") as Record<string, unknown> | undefined;
    const addressRaw = map.get("contact_address") as
      | Record<string, unknown>
      | undefined;

    const services =
      (servicesRes.data ?? [])
        .map((s) => (s.title as string) ?? "")
        .filter(Boolean);

    return {
      tagline: (footerRaw.tagline as string) || DEFAULT.tagline,
      instagramUrl:
        (footerRaw.instagramUrl as string) || DEFAULT.instagramUrl,
      instagramHandle:
        (footerRaw.instagramHandle as string) || DEFAULT.instagramHandle,
      copyright: (footerRaw.copyright as string) || DEFAULT.copyright,
      servicesList: services.length > 0 ? services : DEFAULT.servicesList,
      phone: phoneRaw
        ? {
            display: (phoneRaw.display as string) || DEFAULT.phone!.display,
            tel: (phoneRaw.tel as string) || DEFAULT.phone!.tel,
          }
        : DEFAULT.phone,
      address: addressRaw
        ? {
            line1: (addressRaw.line1 as string) || DEFAULT.address!.line1,
            line2: (addressRaw.line2 as string) || DEFAULT.address!.line2,
            mapsUrl: (addressRaw.maps_url as string) || "",
          }
        : DEFAULT.address,
    };
  },
  ["iwok-footer-config"],
  { tags: ["iwok-settings", "iwok-services"], revalidate: 3600 }
);
