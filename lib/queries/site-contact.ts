import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

/**
 * Source UNIQUE pour les coordonnées du site (footer, page /contact, JSON-LD).
 *
 * Règle clé : un setting absent ⇒ on tombe sur les valeurs par défaut.
 * Un setting présent avec champs vides ⇒ on respecte le vide (Guillaume
 * a explicitement masqué l'info via le dashboard).
 *
 * Conséquence : pour cacher l'adresse, Guillaume vide les champs dans
 * /dashboard/iwok/contact ; le footer / la page contact / le JSON-LD
 * omettent automatiquement la section.
 */

export interface SiteAddress {
  line1: string;
  line2: string;
  mapsUrl: string;
}

export interface SitePhone {
  display: string;
  tel: string; // ex: "tel:+33683867693"
}

export interface SiteContact {
  /** null si Guillaume a explicitement vidé les champs */
  address: SiteAddress | null;
  /** null si Guillaume a vidé le téléphone */
  phone: SitePhone | null;
  /** null si vide ou placeholder */
  email: string | null;
  /** Instagram (configuré via le setting "footer") */
  instagramUrl: string;
  instagramHandle: string;
}

const DEFAULT_ADDRESS: SiteAddress = {
  line1: "15 rue Bellevue",
  line2: "12510 Olemps (Aveyron)",
  mapsUrl: "https://maps.google.com/?q=15+rue+Bellevue+12510+Olemps",
};

const DEFAULT_PHONE: SitePhone = {
  display: "06 83 86 76 93",
  tel: "tel:+33683867693",
};

const DEFAULT_INSTAGRAM = {
  url: "https://www.instagram.com/guihomefresquesmurales/",
  handle: "@guihomefresquesmurales",
};

/**
 * Considère un email comme "non rempli" si vide, placeholder ou pas de @.
 * Évite d'afficher "[Email à confirmer]" en prod.
 */
function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (!trimmed.includes("@")) return null;
  if (/^\[.*\]$/.test(trimmed)) return null; // "[Email à confirmer]"
  return trimmed;
}

/**
 * Address visible si line1 OU line2 contient quelque chose.
 * Si les 2 sont vides → null (on ne sait rien d'utile).
 */
function addressFromSetting(
  raw: Record<string, unknown> | undefined
): SiteAddress | null {
  if (!raw) return DEFAULT_ADDRESS;
  const line1 = ((raw.line1 as string) ?? "").trim();
  const line2 = ((raw.line2 as string) ?? "").trim();
  const mapsUrl = ((raw.maps_url as string) ?? "").trim();
  if (!line1 && !line2) return null;
  return { line1, line2, mapsUrl };
}

function phoneFromSetting(
  raw: Record<string, unknown> | undefined
): SitePhone | null {
  if (!raw) return DEFAULT_PHONE;
  const display = ((raw.display as string) ?? "").trim();
  const tel = ((raw.tel as string) ?? "").trim();
  // Si display vide OU placeholder X — masquer
  if (!display) return null;
  if (/X{3,}/i.test(tel)) return null; // "tel:+33XXXXXXXXXX"
  return { display, tel };
}

/**
 * Convertit l'adresse plate (line1/line2) en PostalAddress schema.org
 * pour le JSON-LD. Tente de parser line2 = "12510 Olemps (Aveyron)".
 */
export function addressToJsonLd(addr: SiteAddress) {
  const base: Record<string, string> = {
    "@type": "PostalAddress",
    streetAddress: addr.line1,
    addressCountry: "FR",
  };
  // Parse "<5digits> <city> (<region>)" → postalCode + addressLocality + addressRegion
  const match = addr.line2.match(/^(\d{5})\s+([^()]+?)(?:\s*\(([^)]+)\))?\s*$/);
  if (match) {
    const [, postalCode, locality, region] = match;
    base.postalCode = postalCode;
    base.addressLocality = locality.trim();
    if (region) base.addressRegion = region.trim();
  } else if (addr.line2) {
    base.addressLocality = addr.line2;
  }
  return base;
}

export const getContactInfo = unstable_cache(
  async (): Promise<SiteContact> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("key, value")
      .in("key", ["contact_phone", "contact_email", "contact_address", "footer"]);

    if (error) {
      console.error("IWOK contact info error:", error.message);
    }

    const map = new Map<string, unknown>();
    for (const row of data ?? []) {
      map.set(row.key as string, row.value);
    }

    const phoneRaw = map.get("contact_phone") as Record<string, unknown> | undefined;
    const addressRaw = map.get("contact_address") as Record<string, unknown> | undefined;
    const emailRaw = map.get("contact_email") as Record<string, unknown> | undefined;
    const footerRaw = (map.get("footer") ?? {}) as Record<string, unknown>;

    return {
      phone: phoneFromSetting(phoneRaw),
      address: addressFromSetting(addressRaw),
      email: emailRaw ? normalizeEmail(emailRaw.value) : null,
      instagramUrl:
        (footerRaw.instagramUrl as string)?.trim() || DEFAULT_INSTAGRAM.url,
      instagramHandle:
        (footerRaw.instagramHandle as string)?.trim() ||
        DEFAULT_INSTAGRAM.handle,
    };
  },
  ["iwok-site-contact"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);
