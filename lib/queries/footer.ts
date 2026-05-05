import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";
import { getContactInfo, type SiteContact } from "./site-contact";

export interface FooterConfig {
  tagline: string;
  copyright: string;
  servicesList: string[];
  /** Coordonnées (peuvent être null si Guillaume a vidé les champs) */
  contact: SiteContact;
}

const DEFAULT_FOOTER = {
  tagline: "Designer mural · Graffeur professionnel",
  copyright: "© {year} GuiHome Décoration — GUIHOME. Tous droits réservés.",
  servicesList: [
    "Fresques intérieures",
    "Fresques extérieures",
    "Design mural sur mesure",
    "Animation événementielle",
  ],
};

export const getFooterConfig = unstable_cache(
  async (): Promise<FooterConfig> => {
    const [settingsRes, servicesRes, contact] = await Promise.all([
      supabase
        .from("iwok_settings")
        .select("key, value")
        .eq("key", "footer"),
      supabase
        .from("iwok_services")
        .select("title")
        .eq("published", true)
        .order("sort_order", { ascending: true }),
      getContactInfo(),
    ]);

    if (settingsRes.error) {
      console.error("IWOK footer settings error:", settingsRes.error.message);
    }
    if (servicesRes.error) {
      console.error("IWOK footer services error:", servicesRes.error.message);
    }

    const footerRaw =
      (settingsRes.data?.[0]?.value as Record<string, unknown> | undefined) ??
      undefined;

    const services =
      (servicesRes.data ?? [])
        .map((s) => (s.title as string) ?? "")
        .filter(Boolean);

    return {
      tagline:
        (footerRaw?.tagline as string)?.trim() || DEFAULT_FOOTER.tagline,
      copyright:
        (footerRaw?.copyright as string)?.trim() || DEFAULT_FOOTER.copyright,
      servicesList:
        services.length > 0 ? services : DEFAULT_FOOTER.servicesList,
      contact,
    };
  },
  ["iwok-footer-config"],
  { tags: ["iwok-settings", "iwok-services"], revalidate: 3600 }
);
