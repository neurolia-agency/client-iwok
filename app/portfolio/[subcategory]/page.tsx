import type { Metadata } from "next";
import Link from "next/link";
import {
  PORTFOLIO_PROJECTS,
  SECTIONS,
  CATEGORY_SLUGS,
  type CategoryName,
  type PortfolioSectionSlug,
} from "@/data/portfolio-projects";
import { getProjectsBySection } from "@/lib/queries/portfolio";
import SubcategoryGallery from "@/components/pages/portfolio/SubcategoryGallery";

const SLUG_TO_CATEGORY: Record<string, { name: CategoryName; slug: PortfolioSectionSlug }> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([name, slug]) => [slug, { name: name as CategoryName, slug }])
) as Record<string, { name: CategoryName; slug: PortfolioSectionSlug }>;

interface Props {
  params: Promise<{ subcategory: string }>;
}

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ subcategory: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory: slug } = await params;
  const entry = SLUG_TO_CATEGORY[slug];
  const name = entry?.name ?? slug;
  return {
    title: `${name} — Portfolio IWOK | Fresques murales`,
    description: `Découvrez les projets ${typeof name === "string" ? name.toLowerCase() : slug} réalisés par IWOK — fresques murales sur mesure.`,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { subcategory: slug } = await params;
  const entry = SLUG_TO_CATEGORY[slug];

  if (!entry) {
    return (
      <div className="container-custom" style={{ paddingBlock: "6rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", marginBottom: "1rem" }}>
          Catégorie introuvable
        </h1>
        <Link href="/portfolio" style={{ color: "var(--primary)" }}>
          ← Retour au portfolio
        </Link>
      </div>
    );
  }

  let projects = await getProjectsBySection(entry.slug);
  if (projects.length === 0) {
    // Fallback to hardcoded data
    projects = PORTFOLIO_PROJECTS.filter((p) => p.section === entry.slug);
  }

  return (
    <section className="container-custom" style={{ paddingTop: "7rem", paddingBottom: "var(--spacing-group)" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/portfolio"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-small)",
            color: "var(--muted-foreground)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "1rem",
          }}
        >
          ← Portfolio
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--foreground)",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {entry.name}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-small)",
            color: "var(--muted-foreground)",
            marginTop: "0.5rem",
          }}
        >
          {projects.length} projet{projects.length > 1 ? "s" : ""}
        </p>
      </div>

      <SubcategoryGallery projects={projects} />
    </section>
  );
}
