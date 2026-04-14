import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

/* ─── Hero config ───────────────────────────────────────────── */

export interface HeroConfig {
  eyebrow: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
}

const DEFAULT_HERO: HeroConfig = {
  eyebrow: "Artiste muraliste",
  subtitle: "L\u2019exigence de l\u2019artisan, l\u2019\u0153il de l\u2019artiste.",
  ctaPrimaryText: "Parler de mon projet",
  ctaPrimaryHref: "/contact",
  ctaSecondaryText: "Explorer la galerie",
  ctaSecondaryHref: "/portfolio",
};

export const getHeroConfig = unstable_cache(
  async (): Promise<HeroConfig> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "hero")
      .single();

    if (error || !data?.value) return DEFAULT_HERO;

    const raw = data.value as Record<string, string>;
    return {
      eyebrow: raw.eyebrow || DEFAULT_HERO.eyebrow,
      subtitle: raw.baseline || DEFAULT_HERO.subtitle,
      ctaPrimaryText: DEFAULT_HERO.ctaPrimaryText,
      ctaPrimaryHref: DEFAULT_HERO.ctaPrimaryHref,
      ctaSecondaryText: DEFAULT_HERO.ctaSecondaryText,
      ctaSecondaryHref: DEFAULT_HERO.ctaSecondaryHref,
    };
  },
  ["iwok-hero-config"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);

/* ─── Services preview config ───────────────────────────────── */

export interface ServicePreviewItem {
  title: string;
  description: string;
}

const DEFAULT_SERVICES_PREVIEW: ServicePreviewItem[] = [
  { title: "Fresques Murales", description: "Intérieur, extérieur. Vos murs prennent vie." },
  { title: "Design Sur Mesure", description: "Brief, croquis, réalisation. Chaque œuvre est unique." },
  { title: "Animation Événementielle", description: "Live painting. L\u2019art se crée sous vos yeux." },
];

export const getServicesPreviewConfig = unstable_cache(
  async (): Promise<ServicePreviewItem[]> => {
    // Read from iwok_services table (managed by dashboard)
    const { data, error } = await supabase
      .from("iwok_services")
      .select("title, tagline")
      .eq("published", true)
      .order("sort_order")
      .limit(3);

    if (error || !data || data.length === 0) return DEFAULT_SERVICES_PREVIEW;

    return data.map((s) => ({
      title: (s.title as string) ?? "",
      description: (s.tagline as string) ?? "",
    }));
  },
  ["iwok-services-preview-config"],
  { tags: ["iwok-services"], revalidate: 3600 }
);

/* ─── CTA final config ──────────────────────────────────────── */

export interface CtaFinalConfig {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

const DEFAULT_CTA: CtaFinalConfig = {
  title: "Racontez-nous votre mur, on lui donne vie",
  subtitle: "Devis gratuit \u00b7 Réponse sous 48h",
  ctaText: "Parler de mon projet",
  ctaHref: "/contact",
};

export const getCtaFinalConfig = unstable_cache(
  async (): Promise<CtaFinalConfig> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "cta_final")
      .single();

    if (error || !data?.value) return DEFAULT_CTA;

    const raw = data.value as Record<string, string>;
    return { ...DEFAULT_CTA, ...raw };
  },
  ["iwok-cta-config"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);
