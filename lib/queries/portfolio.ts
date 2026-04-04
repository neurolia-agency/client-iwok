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
