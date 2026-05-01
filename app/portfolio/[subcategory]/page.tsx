import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
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

const SUBCATEGORY_SEO: Record<PortfolioSectionSlug, { title: string; description: string }> = {
  particuliers: {
    title: "Fresques murales pour particuliers — Aveyron, Finistère",
    description:
      "Fresques sur mesure pour chambres d'enfants, salons, façades et extérieurs. Designer mural professionnel basé en Occitanie, intervient partout en France.",
  },
  entreprises: {
    title: "Fresques entreprises et collectivités — Occitanie & France",
    description:
      "Réalisations murales pour entreprises, collectivités, mairies, campings et espaces publics. Décor sur mesure aligné à votre identité visuelle.",
  },
  participatifs: {
    title: "Fresques participatives — Ateliers collectifs",
    description:
      "Ateliers de fresque collective avec écoles, associations et entreprises. L'art mural comme outil de cohésion et d'expression locale.",
  },
  evenementiel: {
    title: "Live painting et événementiel — Festivals, expositions",
    description:
      "Animation live painting pour festivals, salons, vernissages et événements d'entreprise. Performance artistique en direct devant le public.",
  },
  "coups-de-coeur": {
    title: "Coups de cœur — Sélection projets phares",
    description:
      "Une sélection des projets murals les plus marquants — fresques signatures, créations atypiques et collaborations de référence.",
  },
};

interface Props {
  params: Promise<{ subcategory: string }>;
}

export const revalidate = 3600;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ subcategory: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory: slug } = await params;
  const entry = SLUG_TO_CATEGORY[slug];
  if (!entry) {
    return { title: "Catégorie introuvable" };
  }
  const seo = SUBCATEGORY_SEO[entry.slug];
  return {
    title: `${seo.title} | GUIHOME`,
    description: seo.description,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { subcategory: slug } = await params;
  const entry = SLUG_TO_CATEGORY[slug];

  if (!entry) {
    notFound();
  }

  const projects = await getProjectsBySection(entry.slug);

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
