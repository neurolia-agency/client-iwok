import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";
import type {
  PortfolioProject,
  ProjectImage,
  FeaturedSlide,
  PortfolioSectionSlug,
  CategoryName,
} from "@/data/portfolio-projects";

/* ─── getProjects ──────────────────────────────────────── */

export const getProjects = unstable_cache(
  async (): Promise<PortfolioProject[]> => {
    const { data, error } = await supabase
      .from("iwok_projects")
      .select(
        `
        id,
        title,
        section,
        year,
        location,
        cover,
        likes,
        iwok_project_images (
          src,
          alt,
          width,
          height
        )
      `
      )
      .eq("published", true)
      .order("sort_order");

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id as string,
      title: row.title as string,
      section: row.section as PortfolioSectionSlug,
      year: row.year as number,
      location: row.location as string,
      cover: (row.cover as number) ?? 0,
      likes: (row.likes as number) ?? 0,
      images: ((row.iwok_project_images as Record<string, unknown>[]) ?? []).map(
        (img) => ({
          src: img.src as string,
          alt: img.alt as string,
          width: img.width as number,
          height: img.height as number,
        })
      ) as ProjectImage[],
    }));
  },
  ["iwok-projects"],
  { tags: ["iwok-projects"], revalidate: 3600 }
);

/* ─── getProjectsBySection ─────────────────────────────── */

export const getProjectsBySection = unstable_cache(
  async (section: string): Promise<PortfolioProject[]> => {
    const { data, error } = await supabase
      .from("iwok_projects")
      .select(
        `
        id,
        title,
        section,
        year,
        location,
        cover,
        likes,
        iwok_project_images (
          src,
          alt,
          width,
          height
        )
      `
      )
      .eq("published", true)
      .eq("section", section)
      .order("sort_order");

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id as string,
      title: row.title as string,
      section: row.section as PortfolioSectionSlug,
      year: row.year as number,
      location: row.location as string,
      cover: (row.cover as number) ?? 0,
      likes: (row.likes as number) ?? 0,
      images: ((row.iwok_project_images as Record<string, unknown>[]) ?? []).map(
        (img) => ({
          src: img.src as string,
          alt: img.alt as string,
          width: img.width as number,
          height: img.height as number,
        })
      ) as ProjectImage[],
    }));
  },
  ["iwok-projects-section"],
  { tags: ["iwok-projects"], revalidate: 3600 }
);

/* ─── getTopLikedProjects ──────────────────────────────── */
/* Classement auto des "coups de coeur" : top N projets publies par likes.
   Tie-break : dernier like en premier (last_liked_at desc).
   Fallback : si personne n'a like, renvoie N projets aleatoires. */

export const getTopLikedProjects = unstable_cache(
  async (limit = 5): Promise<PortfolioProject[]> => {
    const { data, error } = await supabase
      .from("iwok_projects")
      .select(
        `
        id,
        title,
        section,
        year,
        location,
        cover,
        likes,
        last_liked_at,
        iwok_project_images (
          src,
          alt,
          width,
          height
        )
      `
      )
      .eq("published", true);

    if (error) {
      console.error("IWOK top-liked query error:", error.message);
      return [];
    }

    type Row = {
      id: string;
      title: string;
      section: string;
      year: number;
      location: string;
      cover: number | null;
      likes: number | null;
      last_liked_at: string | null;
      iwok_project_images: Record<string, unknown>[] | null;
    };
    const allRows = (data as unknown as Row[]) ?? [];
    // Ignore les projets sans aucune image (le podium serait vide)
    const rows = allRows.filter(
      (r) => (r.iwok_project_images?.length ?? 0) > 0
    );

    // 1) Projets avec likes : trie par likes desc, tie-break par last_liked_at desc
    const liked = rows
      .filter((r) => (r.likes ?? 0) > 0)
      .sort((a, b) => {
        const la = a.likes ?? 0;
        const lb = b.likes ?? 0;
        if (lb !== la) return lb - la;
        const ta = a.last_liked_at ? Date.parse(a.last_liked_at) : 0;
        const tb = b.last_liked_at ? Date.parse(b.last_liked_at) : 0;
        return tb - ta;
      });

    // 2) Projets sans like : melange aleatoire, remplit les places libres
    const unliked = rows
      .filter((r) => (r.likes ?? 0) === 0)
      .sort(() => Math.random() - 0.5);

    const ranked = [...liked, ...unliked];

    return ranked.slice(0, limit).map((row) => ({
      id: row.id,
      title: row.title,
      section: row.section as PortfolioSectionSlug,
      year: row.year,
      location: row.location,
      cover: row.cover ?? 0,
      likes: row.likes ?? 0,
      images: ((row.iwok_project_images as Record<string, unknown>[]) ?? []).map(
        (img) => ({
          src: img.src as string,
          alt: img.alt as string,
          width: img.width as number,
          height: img.height as number,
        })
      ) as ProjectImage[],
    }));
  },
  ["iwok-top-liked"],
  { tags: ["iwok-projects"], revalidate: 3600 }
);

/* ─── getFeaturedSlides ────────────────────────────────── */

export const getFeaturedSlides = unstable_cache(
  async (): Promise<FeaturedSlide[]> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "featured_slides")
      .single();

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    const slides = data?.value as Record<string, unknown>[] | null;
    if (!Array.isArray(slides)) return [];

    return slides.map((s) => ({
      category: s.category as CategoryName,
      slug: s.slug as PortfolioSectionSlug,
      background: s.background as string,
      preview1: s.preview1 as string,
      preview2: s.preview2 as string,
    }));
  },
  ["iwok-featured-slides"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);
