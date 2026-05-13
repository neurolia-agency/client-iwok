import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getShopProductBySlug,
  getShopVisibility,
} from "@/lib/queries/shop";
import DeliverySelector from "@/components/pages/shop/DeliverySelector";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getShopProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.title} | Shop IWOK`,
    description: product.description || `Découvrez ${product.title} — œuvre originale de l'artiste muraliste GUIHOME.`,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  toile: "Toile originale",
  print: "Print",
  sticker: "Sticker",
  original: "Œuvre originale",
  custom: "Sur mesure",
  autre: "Création",
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [visibility, product] = await Promise.all([
    getShopVisibility(),
    getShopProductBySlug(slug),
  ]);

  if (!visibility.enabled || !product) notFound();


  return (
    <main>
      {/* ═══════════════════════════════════════════════
          Fil d'Ariane
          ═══════════════════════════════════════════════ */}
      <div
        className="container-custom"
        style={{
          paddingTop: "clamp(6rem, 10vh, 8rem)",
          paddingBottom: "1.5rem",
        }}
      >
        <nav
          aria-label="Fil d'Ariane"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Link
            href="/shop"
            style={{ color: "var(--muted-foreground)", textDecoration: "none" }}
          >
            ← Retour à la boutique
          </Link>
        </nav>
      </div>

      {/* ═══════════════════════════════════════════════
          Produit — Image + Détails
          ═══════════════════════════════════════════════ */}
      <section className="container-custom" style={{ paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              backgroundColor: "var(--background-alt)",
            }}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Image à venir
              </div>
            )}
          </div>

          {/* Détails */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingTop: "0.5rem",
            }}
          >
            {/* Catégorie */}
            <span
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "0.3rem 0.875rem",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--primary-pale)",
                color: "var(--primary-dark)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {CATEGORY_LABELS[product.category] || product.category}
            </span>

            {/* Titre */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4vw + 0.5rem, 3rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--foreground-heading)",
                margin: 0,
              }}
            >
              {product.title}
            </h1>

            {/* Description */}
            {product.description && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-body)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--muted-foreground)",
                  margin: 0,
                  maxWidth: "52ch",
                }}
              >
                {product.description}
              </p>
            )}

            {/* Séparateur */}
            <div
              aria-hidden="true"
              style={{
                height: 1,
                backgroundColor: "var(--border)",
              }}
            />

            {/* Prix */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    fontWeight: 800,
                    color: "var(--primary)",
                    lineHeight: 1,
                  }}
                >
                  {product.priceLabel}
                </span>
                {product.priceCents > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    hors frais de port
                  </span>
                )}
              </div>

              {/* Disponibilité */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8125rem",
                  color: product.inStock ? "var(--success, #16a34a)" : "var(--error, #dc2626)",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {product.inStock
                  ? product.stock !== null
                    ? `${product.stock} exemplaire${product.stock > 1 ? "s" : ""} disponible${product.stock > 1 ? "s" : ""}`
                    : "Disponible"
                  : "Rupture de stock"}
              </p>
            </div>

            {/* Sélecteur livraison / achat */}
            {product.priceCents > 0 ? (
              <DeliverySelector
                productId={product.id}
                productTitle={product.title}
                productSlug={product.slug}
                priceCents={product.priceCents}
                shippingCostCents={product.shippingCostCents}
                disabled={!product.inStock}
              />
            ) : (
              <Link href={`/contact?from=shop&product=${product.slug}`} className="cta-primary" style={{ justifyContent: "center" }}>
                Demander un devis
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
