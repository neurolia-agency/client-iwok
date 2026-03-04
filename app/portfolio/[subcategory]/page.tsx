import type { Metadata } from "next";
import Link from "next/link";
import {
  PORTFOLIO_PROJECTS,
  SUBCATEGORY_SLUGS,
  type FeaturedSubcategory,
} from "@/data/portfolio-projects";
import GalleryCard from "@/components/pages/portfolio/GalleryCard";

const SLUG_TO_SUBCATEGORY: Record<string, FeaturedSubcategory> = Object.fromEntries(
  Object.entries(SUBCATEGORY_SLUGS).map(([k, v]) => [v, k as FeaturedSubcategory])
) as Record<string, FeaturedSubcategory>;

interface Props {
  params: Promise<{ subcategory: string }>;
}

export function generateStaticParams() {
  return Object.values(SUBCATEGORY_SLUGS).map((slug) => ({ subcategory: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory: slug } = await params;
  const name = SLUG_TO_SUBCATEGORY[slug] ?? slug;
  return {
    title: `${name} — Portfolio IWOK | Fresques murales`,
    description: `Découvrez les projets ${name.toLowerCase()} réalisés par IWOK — fresques murales sur mesure.`,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { subcategory: slug } = await params;
  const subcategory = SLUG_TO_SUBCATEGORY[slug];

  if (!subcategory) {
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

  const projects = PORTFOLIO_PROJECTS.filter(
    (p) => p.section === "projets-a-la-une" && p.subcategory === subcategory
  );

  return (
    <section className="container-custom" style={{ paddingBlock: "var(--spacing-group)" }}>
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
          {subcategory}
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

      <div className="masonry-grid">
        {projects.map((project) => (
          <GalleryCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
