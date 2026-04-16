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
      ctaPrimaryText: raw.cta_primary_text || DEFAULT_HERO.ctaPrimaryText,
      ctaPrimaryHref: raw.cta_primary_href || DEFAULT_HERO.ctaPrimaryHref,
      ctaSecondaryText: raw.cta_secondary_text || DEFAULT_HERO.ctaSecondaryText,
      ctaSecondaryHref: raw.cta_secondary_href || DEFAULT_HERO.ctaSecondaryHref,
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

/* ─── Page hero configs (Portfolio, Services, About) ───────── */

export interface PageHeroConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const DEFAULT_PORTFOLIO_HERO: PageHeroConfig = {
  eyebrow: "Portfolio",
  title: "Réalisations",
  subtitle:
    "15 années de savoir-faire.\nDes centaines de murs réveillés.\nPour les particuliers comme pour les communes, chaque œuvre est une pièce unique.",
  backgroundImage: "/images/selection-gui-on-scope/08122021-2.webp",
};

export const getPortfolioHeroConfig = unstable_cache(
  async (): Promise<PageHeroConfig> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "portfolio_hero")
      .single();

    if (error || !data?.value) return DEFAULT_PORTFOLIO_HERO;

    const raw = data.value as Record<string, string>;
    return {
      eyebrow: raw.eyebrow || DEFAULT_PORTFOLIO_HERO.eyebrow,
      title: raw.title || DEFAULT_PORTFOLIO_HERO.title,
      subtitle: raw.subtitle || DEFAULT_PORTFOLIO_HERO.subtitle,
      backgroundImage:
        raw.background_image || DEFAULT_PORTFOLIO_HERO.backgroundImage,
    };
  },
  ["iwok-portfolio-hero-config"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);

const DEFAULT_SERVICES_HERO: PageHeroConfig = {
  eyebrow: "Savoir-faire",
  title: "Services",
  subtitle:
    "Plus de 20 ans d\u2019expérience en fresques murales, design sur mesure et animation événementielle, sur tous les supports.",
  backgroundImage:
    "/images/selection-gui-on-scope/007_GuiHome Décoration © Franck Tourneret.webp",
};

export const getServicesHeroConfig = unstable_cache(
  async (): Promise<PageHeroConfig> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "services_hero")
      .single();

    if (error || !data?.value) return DEFAULT_SERVICES_HERO;

    const raw = data.value as Record<string, string>;
    return {
      eyebrow: raw.eyebrow || DEFAULT_SERVICES_HERO.eyebrow,
      title: raw.title || DEFAULT_SERVICES_HERO.title,
      subtitle: raw.subtitle || DEFAULT_SERVICES_HERO.subtitle,
      backgroundImage:
        raw.background_image || DEFAULT_SERVICES_HERO.backgroundImage,
    };
  },
  ["iwok-services-hero-config"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);

const DEFAULT_ABOUT_HERO: PageHeroConfig = {
  eyebrow: "A propos",
  title: "Guillaume Jeanjean",
  subtitle:
    "Du graffiti au design mural — plus de 20 ans de murs dans les mains.\nL\u2019exigence de l\u2019artisan, l\u2019\u0153il de l\u2019artiste.",
  backgroundImage: "/images/selection-gui-on-scope/portrait-gui-masque.webp",
};

export const getAboutHeroConfig = unstable_cache(
  async (): Promise<PageHeroConfig> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "about_hero")
      .single();

    if (error || !data?.value) return DEFAULT_ABOUT_HERO;

    const raw = data.value as Record<string, string>;
    return {
      eyebrow: raw.eyebrow || DEFAULT_ABOUT_HERO.eyebrow,
      title: raw.title || DEFAULT_ABOUT_HERO.title,
      subtitle: raw.subtitle || DEFAULT_ABOUT_HERO.subtitle,
      backgroundImage:
        raw.background_image || DEFAULT_ABOUT_HERO.backgroundImage,
    };
  },
  ["iwok-about-hero-config"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);
