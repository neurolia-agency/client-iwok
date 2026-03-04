"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import CtaSecondary from "@/components/ui/CtaSecondary";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─────────────────────────────────────────────── */

interface PortfolioImage {
  src: string;
  alt: string;
  title: string;
  category: string;
  width: number;
  height: number;
}

/* ─── Data ───────────────────────────────────────────────── */

const COLUMN_1: PortfolioImage[] = [
   {
    src: "/images/section-grid-animate/simba.jpg",
    alt: "Illustration murale du lion Simba avec feuilles vertes et détails aquarelle",
    title: "Fresque Lion Simba",
    category: "Particuliers",
    width: 1440,
    height: 1081,
  },
  {
    src: "/images/section-grid-animate/african-wife.jpg",
    alt: "Portrait stylisé de femme aux lunettes vertes sur fond événementiel",
    title: "Fresque Portrait Événement",
    category: "Événementiel",
    width: 3000,
    height: 4000,
  },
  {
    src: "/images/section-grid-animate/beer-cow.png",
    alt: "Fresque murale extérieure pop art avec deux vaches portant des lunettes de soleil",
    title: "Fresque Vaches Pop Art",
    category: "Particuliers",
    width: 1200,
    height: 1246,
  },
  {
    src: "/images/section-grid-animate/ophtalmo-femme.png",
    alt: "Fresque d'entrée pour cabinet ophtalmologie avec portrait de femme aux lunettes colorées",
    title: "Cabinet Ophtalmologie",
    category: "Entreprises & Collectivités",
    width: 1201,
    height: 1600,
  },
];

const COLUMN_2: PortfolioImage[] = [
  {
    src: "/images/section-grid-animate/hand.png",
    alt: "Artiste peignant une large fresque murale de mains liées style réaliste",
    title: "Live Painting Mains",
    category: "Événementiel",
    width: 1536,
    height: 1536,
  },
  {
    src: "/images/section-grid-animate/colors.png",
    alt: "Vue aérienne d'un atelier participatif avec fresque géométrique multicolore",
    title: "Atelier Géométrique Coloré",
    category: "Participatif",
    width: 4032,
    height: 2488,
  },
  {
    src: "/images/section-grid-animate/portrait-cap.png",
    alt: "Graffiti portrait d'homme au béret sur fond rouge avec deux personnes posant devant",
    title: "Live Painting Portrait",
    category: "Événementiel",
    width: 3008,
    height: 2825,
  },
  {
    src: "/images/section-grid-animate/wine.webp",
    alt: "Fresque murale réaliste avec mains de femme tenant deux verres de vin",
    title: "Fresque Verres de Vin",
    category: "Entreprises & Collectivités",
    width: 4772,
    height: 6310,
  },
];

const COLUMN_3: PortfolioImage[] = [
  {
    src: "/images/section-grid-animate/marvel.png",
    alt: "Fresque murale Iron Man style Marvel avec couleurs vibrantes rouge, jaune et bleu",
    title: "Fresque Iron Man",
    category: "Entreprises & Collectivités",
    width: 2400,
    height: 1851,
  },
 {
    src: "/images/section-grid-animate/kerea.png",
    alt: "Artiste peignant un portrait coloré lors d'un événement live painting au centre KEREA",
    title: "Live Painting KEREA",
    category: "Événementiel",
    width: 1251,
    height: 971,
  },
  {
    src: "/images/section-grid-animate/bureau-sistre.webp",
    alt: "Graffiti mural coloré style Buron avec lettres stylisées et ampoules jaunes",
    title: "Buron de la Sistre",
    category: "Entreprises & Collectivités",
    width: 2000,
    height: 1464,
  },
  {
    src: "/images/section-grid-animate/fire.jpg",
    alt: "Fresque murale pompier avec équipement de lutte contre les incendies",
    title: "Fresque Pompier",
    category: "Entreprises & Collectivités",
    width: 591,
    height: 788,
  },
];

/* ─── Sub-components ─────────────────────────────────────── */

function PortfolioCard({ image }: { image: PortfolioImage }) {
  return (
    <div
      className="group"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 0,
        flexShrink: 0,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 640px) 100vw, 33vw"
        style={{
          objectFit: "cover",
          width: "100%",
          aspectRatio: `${image.width} / ${image.height}`,
          display: "block",
        }}
      />
      {/* Hover overlay — slide-up reveal */}
      <div
        className="group-hover:opacity-100"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)",
          opacity: 0,
          transition: "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "flex",
          alignItems: "flex-end",
          padding: "1.25rem",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            transform: "translateY(6px)",
            transition:
              "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="group-hover:[transform:translateY(0)]"
        >
          <p
            style={{
              color: "var(--foreground-on-dark)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.3,
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.01em",
            }}
          >
            {image.title}
          </p>
          <span
            style={{
              color: "var(--primary)",
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
            }}
          >
            {image.category}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Column component ───────────────────────────────────── */

function ScrollColumn({
  images,
  isReverse,
  className,
}: {
  images: PortfolioImage[];
  isReverse: boolean;
  className?: string;
}) {
  /* Duplicate images 2x for seamless scroll — GSAP animates exactly
     one cycle (half the total height) so the visual loop never ends */
  const loopedImages = [...images, ...images];

  return (
    <div
      className={`col-scroll__box ${className ?? ""}`}
      data-reverse={isReverse ? "true" : "false"}
      style={{
        flex: 1,
        overflow: "hidden",
        minWidth: 0,
        height: "clamp(480px, 75vh, 800px)",
      }}
    >
      <div
        className="col-scroll__list"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          willChange: "transform",
        }}
      >
        {loopedImages.map((img, i) => (
          <PortfolioCard key={`${img.src}-${i}`} image={img} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */

export default function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const pinArea = section.querySelector<HTMLElement>(".portfolio-pin-area");
        const grid = section.querySelector<HTMLElement>(".portfolio-columns");
        if (!pinArea || !grid) return;

        const boxes = Array.from(
          grid.querySelectorAll<HTMLElement>(".col-scroll__box")
        );

        const columns = boxes
          .map((box) => {
            const list = box.querySelector<HTMLElement>(".col-scroll__list");
            if (!list) return null;

            const isReverse = box.dataset.reverse === "true";
            /* Images are duplicated 2x — travel exactly one original set
               (half the total scrollHeight) for a seamless visual loop */
            const travelPx = Math.max(list.scrollHeight / 2, 0);

            return { list, isReverse, travelPx };
          })
          .filter((col): col is { list: HTMLElement; isReverse: boolean; travelPx: number } => Boolean(col));

        if (columns.length === 0) return;

        columns.forEach(({ list, isReverse, travelPx }) => {
          gsap.set(list, { y: isReverse ? -travelPx : 0 });
        });

        const maxTravelPx = Math.max(
          ...columns.map((column) => column.travelPx),
          0
        );
        const pinDistance = Math.max(window.innerHeight * 0.9, maxTravelPx * 2.2);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinArea,
            start: "top 12%",
            end: `+=${pinDistance}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        columns.forEach(({ list, isReverse, travelPx }) => {
          tl.to(
            list,
            {
              y: isReverse ? 0 : -travelPx,
              ease: "none",
            },
            0
          );
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dark-section"
      aria-labelledby="portfolio-preview-heading"
      style={{
        paddingBlock: "var(--spacing-section-inner)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle grain texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.018,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="portfolio-pin-area" style={{ position: "relative", zIndex: 1 }}>
        {/* ─── Asymmetric layout: sticky title left + scrolling grid right ─── */}
        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Desktop: asymmetric 30/70 layout */}
          <div
            className="hidden md:flex"
            style={{
              gap: "clamp(2rem, 4vw, 4rem)",
              alignItems: "flex-start",
            }}
          >
            {/* ─── Left: Title block (~30%) — no sticky, parent is GSAP-pinned ─── */}
            <div
              style={{
                width: "44%",
                flexShrink: 0,
                alignSelf: "center",
                marginLeft: "-2%",
              }}
            >
              <div style={{ display: "inline-flex", flexDirection: "column", textAlign: "left" }}>
                {/* Eyebrow */}
                <p
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                    margin: "0 0 1.5rem",
                    maxWidth: "none",
                  }}
                >
                  Portfolio
                </p>

                {/* Monumental title block — grid ensures "100" and subtitle share the same width */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    width: "fit-content",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h3)",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: "var(--foreground-on-dark)",
                      marginBottom: "-0.15em",
                    }}
                  >
                    plus de
                  </span>
                  <span
                    id="portfolio-preview-heading"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(5.2rem, 11vw, 8.5rem)",
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: "var(--primary)",
                      width: "100%",
                    }}
                  >
                    100
                  </span>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "0.1em",
                      margin: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1rem, 2.5vw + 0.5rem, 2rem)",
                        fontWeight: 700,
                        lineHeight: 1,
                        color: "var(--foreground-on-dark)",
                      }}
                    >
                      fresques,
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(1rem, 2vw + 0.3rem, 1.5rem)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "var(--primary-light)",
                        lineHeight: 1.3,
                      }}
                    >
                      chacune unique
                    </span>
                  </p>
                </div>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 1,
                    backgroundColor: "var(--primary)",
                    opacity: 0.4,
                    margin: "1.5rem 0",
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-body)",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.65,
                    margin: "0 0 2rem",
                    maxWidth: "32ch",
                  }}
                >
                  Un commerce local. Une façade publique. L&apos;intimité d&apos;une maison.
                  À chaque espace sa propre empreinte visuelle.
                </p>

                {/* CTA */}
                <CtaSecondary href="/portfolio" peekImage="/images/section-grid-animate/hand.png">
                  Voir toutes les réalisations <span aria-hidden="true">→</span>
                </CtaSecondary>
              </div>
            </div>

            {/* ─── Right: Scrolling columns grid (~70%) ─── */}
            <div style={{ flex: 1, minWidth: 0, padding: "2rem 0" }}>
              <div
                className="portfolio-columns"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <ScrollColumn images={COLUMN_1} isReverse={true} />
                <ScrollColumn images={COLUMN_2} isReverse={false} />
                <ScrollColumn images={COLUMN_3} isReverse={true} />
              </div>
            </div>
          </div>

          {/* ─── Mobile: stacked layout ─── */}
          <div className="md:hidden">
            {/* Centered title block */}
            <header style={{ textAlign: "center", marginBottom: "2.25rem" }}>
              <p
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  margin: "0 0 1.25rem",
                  maxWidth: "none",
                }}
              >
                Portfolio
              </p>

              <h2
                style={{
                  margin: "0 0 0.5rem",
                  maxWidth: "none",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h3)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: "var(--foreground-on-dark)",
                  }}
                >
                  plus de
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(3.5rem, 8vw, 5rem)",
                    fontWeight: 800,
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    color: "var(--primary)",
                  }}
                >
                  100
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h3)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: "var(--foreground-on-dark)",
                  }}
                >
                  fresques
                </span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "var(--font-size-h4)",
                  fontWeight: 400,
                  color: "var(--primary-light)",
                  margin: "0.5rem auto 0",
                  maxWidth: "none",
                  lineHeight: 1.3,
                }}
              >
                chacune unique
              </p>

              <div
                aria-hidden="true"
                style={{
                  width: 48,
                  height: 1,
                  backgroundColor: "var(--primary)",
                  opacity: 0.4,
                  margin: "1.25rem auto",
                }}
              />

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-body)",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.65,
                  margin: "0 auto 2rem",
                  maxWidth: "52ch",
                }}
              >
                Un commerce local. Une façade publique. L&apos;intimité d&apos;une maison.
                À chaque espace sa propre empreinte visuelle.
              </p>
            </header>

            {/* Mobile grid: single column */}
            <div
              aria-hidden="true"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[...COLUMN_1, ...COLUMN_2, ...COLUMN_3].slice(0, 6).map((img, i) => (
                <PortfolioCard key={`mobile-${img.src}-${i}`} image={img} />
              ))}
            </div>

            {/* Mobile CTA */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <CtaSecondary href="/portfolio" peekImage="/images/section-grid-animate/hand.png">
                Voir toutes les réalisations <span aria-hidden="true">→</span>
              </CtaSecondary>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
