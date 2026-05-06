"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PageHeroConfig } from "@/lib/queries/section-config";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

interface Service {
  id: string;
  title: string;
  tagline: string;
  tag: string;
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "fresques-murales",
    title: "Fresques Murales",
    tagline: "Intérieur, extérieur — vos murs prennent vie",
    tag: "Intérieur & Extérieur",
    description:
      "Création de fresques peintes pour tous vos espaces, intérieurs comme extérieurs. Chambres d\u2019enfants, salons, halls d\u2019accueil, façades, bâtiments publics. Fort de plus de 20 ans d\u2019expérience, chaque projet commence par une rencontre pour comprendre vos envies et votre univers. Vient ensuite l\u2019étude du lieu, la proposition créative avec croquis et maquette, puis la réalisation sur site. Du premier échange au dernier coup de pinceau, chaque étape est pensée en collaboration avec vous. Peintures techniques adaptées au support et aux conditions.",
    includes: [
      "Rencontre et échange sur votre projet",
      "Visite sur site et prise de mesures",
      "Proposition créative (croquis/maquette)",
      "Réalisation complète de la fresque",
      "Finitions soignées et nettoyage du chantier",
    ],
    image: "/images/section-grid-animate/wine.webp",
    imageAlt:
      "Fresque murale — mains tenant des verres de vin, style réaliste",
  },
  {
    id: "sur-mesure",
    title: "Sur Mesure",
    tagline: "Votre vision, notre trait",
    tag: "Sur mesure",
    description:
      "Conception et réalisation de design mural entièrement personnalisé pour tout type d\u2019espace. Avec plus de 20 ans de pratique, chaque projet suit un processus éprouvé : une première rencontre pour recueillir vos envies, une phase de recherches graphiques et de propositions visuelles, puis la mise en peinture sur site. Le résultat est une œuvre unique, pensée pour votre lieu et réalisée dans les règles de l\u2019art.",
    includes: [
      "Brief créatif et recueil de vos envies",
      "Recherches graphiques et propositions visuelles",
      "Validation avant mise en peinture",
      "Réalisation sur site et finitions",
    ],
    image: "/images/section-grid-animate/african-wife.webp",
    imageAlt:
      "Portrait mural sur mesure — femme africaine, couleurs vives et détails réalistes",
  },
  {
    id: "tout-support",
    title: "Tout Support",
    tagline: "Pas seulement les murs",
    tag: "Tout support",
    description:
      "Peinture artistique sur supports atypiques : véhicules, containers, sols, mobilier, structures métalliques. Plus de 20 ans d\u2019expérience permettent d\u2019adapter la technique à chaque surface, même la plus inattendue. Le processus reste le même : échange sur le projet, étude du support, proposition créative, puis réalisation avec des peintures spécifiquement choisies pour garantir la tenue dans le temps.",
    includes: [
      "Étude du support et de ses contraintes",
      "Proposition créative adaptée",
      "Réalisation avec peintures techniques appropriées",
      "Finitions et conseils d\u2019entretien",
    ],
    image: "/images/section-grid-animate/beer-cow.webp",
    imageAlt:
      "Fresque pop art sur support atypique — deux vaches colorées aux lunettes de soleil",
  },
  {
    id: "animation-evenementielle",
    title: "Animation Événementielle",
    tagline: "L\u2019art en direct, devant vos yeux",
    tag: "Événementiel",
    description:
      "Live painting lors d\u2019événements, festivals et soirées privées. Avec plus de 20 ans de scène, chaque performance est préparée en amont : choix du thème, du support et du format en fonction de votre événement. Le jour J, l\u2019œuvre prend vie sous les yeux du public, de la toile blanche au résultat final. Un moment fort qui marque les esprits.",
    includes: [
      "Échange préalable sur le thème et le format",
      "Préparation du support et du matériel",
      "Réalisation live devant le public",
      "L\u2019œuvre finale (offerte ou sur arrangement)",
    ],
    image: "/images/section-grid-animate/kerea.webp",
    imageAlt:
      "Live painting au centre KEREA — artiste peignant un portrait coloré en direct",
  },
  {
    id: "ateliers-participatifs",
    title: "Ateliers Participatifs",
    tagline: "Créer ensemble, peindre ensemble",
    tag: "Participatif",
    description:
      "Ateliers de création murale encadrés par un artiste professionnel fort de plus de 20 ans d\u2019expérience. Idéal pour fédérer un groupe : écoles, centres sociaux, entreprises, festivals. Le projet est conçu en amont avec les organisateurs, puis chaque participant contribue à la fresque collective sous la direction artistique de l\u2019artiste. Un moment de partage qui laisse une trace durable.",
    includes: [
      "Conception du projet avec les organisateurs",
      "Encadrement artistique et technique",
      "Matériel de peinture fourni",
      "Fresque collective finalisée par l\u2019artiste",
    ],
    image: "/images/section-grid-animate/colors.webp",
    imageAlt:
      "Atelier participatif — fresque géométrique multicolore, vue aérienne",
  },
];

/* ═══════════════════════════════════════════════════════════
   SERVICE BLOCK — Zig-zag layout
   ═══════════════════════════════════════════════════════════ */

function ServiceBlock({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const blockRef = useRef<HTMLElement>(null);
  const isImageRight = index % 2 === 1;

  useEffect(() => {
    if (!blockRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const img = blockRef.current!.querySelector(".svc-img");
      const txt = blockRef.current!.querySelector(".svc-txt");

      if (img) gsap.set(img, { opacity: 0, y: 50, scale: 1.03 });
      if (txt) gsap.set(txt, { opacity: 0, y: 35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockRef.current!,
          start: "top 72%",
          once: true,
        },
      });

      if (img)
        tl.to(
          img,
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
          0
        );
      if (txt)
        tl.to(
          txt,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2
        );
    }, blockRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={blockRef}
      style={{
        backgroundColor:
          index % 2 === 0 ? "var(--background)" : "var(--background-alt)",
        paddingBlock: "clamp(4.5rem, 8vh, 7rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background watermark number */}
      <span
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "50%",
          ...(isImageRight
            ? { left: "var(--container-padding)" }
            : { right: "var(--container-padding)" }),
          transform: "translateY(-50%)",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(12rem, 22vw, 18rem)",
          fontWeight: 800,
          lineHeight: 1,
          color: "var(--foreground-heading)",
          opacity: 0.025,
          zIndex: 0,
          pointerEvents: "none",
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className="container-custom"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          className={`grid grid-cols-1 gap-8 md:gap-14 items-center ${
            isImageRight
              ? "md:grid-cols-[1fr_55%]"
              : "md:grid-cols-[55%_1fr]"
          }`}
        >
          {/* Image */}
          <div
            className={`svc-img ${
              isImageRight ? "order-1 md:order-2" : "order-1"
            }`}
          >
            <div
              className="group"
              style={{
                position: "relative",
                aspectRatio: "16 / 10",
                overflow: "hidden",
              }}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{
                  objectFit: "cover",
                  transition:
                    "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                className="group-hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className={`svc-txt ${
              isImageRight ? "order-2 md:order-1" : "order-2"
            }`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {/* Tag pill */}
            <span
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "0.35rem 0.875rem",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {service.tag}
            </span>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h3)",
                fontWeight: 700,
                lineHeight: "var(--line-height-snug)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--foreground-heading)",
                margin: 0,
              }}
            >
              {service.title}
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-body-lg)",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "var(--primary-dark)",
                margin: 0,
                maxWidth: "none",
              }}
            >
              {service.tagline}
            </p>

            {/* Separator */}
            <div
              aria-hidden="true"
              style={{
                width: 40,
                height: 1,
                backgroundColor: "var(--primary)",
                opacity: 0.35,
              }}
            />

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--font-size-body)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--muted-foreground)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              {service.description}
            </p>

            {/* Contenu "Inclus" — affichage direct */}
            <div style={{ paddingTop: "0.75rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--foreground-subtitle)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                  maxWidth: "none",
                }}
              >
                Inclus dans la prestation
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {service.includes.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.75rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--font-size-body)",
                      lineHeight: 1.6,
                      color: "var(--foreground-subtitle)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-block",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "var(--primary)",
                        flexShrink: 0,
                        transform: "translateY(-2px)",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-small)",
                  fontStyle: "italic",
                  color: "var(--muted-foreground)",
                  marginTop: "1rem",
                  maxWidth: "none",
                }}
              >
                Tarif sur devis — selon surface, complexité et lieu
                d&apos;intervention
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT CTA
   ═══════════════════════════════════════════════════════════ */

function ContactCta({ config }: { config: import("@/lib/queries/section-config").CtaFinalConfig }) {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const els = ctaRef.current!.querySelectorAll(".cta-el");
      gsap.set(els, { opacity: 0, y: 25 });

      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current!,
          start: "top 72%",
          once: true,
        },
      });
    }, ctaRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      style={{
        backgroundColor: "var(--background-alt)",
        paddingBlock: "var(--spacing-section-inner)",
        textAlign: "center",
      }}
    >
      <div className="container-custom">
        <h2
          className="cta-el"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-h2)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-heading)",
            marginBottom: "1rem",
          }}
        >
          {config.title}
        </h2>
        {config.subtitle && (
          <p
            className="cta-el"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--font-size-body-lg)",
              lineHeight: "var(--line-height-relaxed)",
              color: "var(--muted-foreground)",
              marginBottom: "2.5rem",
              maxWidth: "40ch",
              marginInline: "auto",
            }}
          >
            {config.subtitle}
          </p>
        )}
        <div className="cta-el">
          <Link href={config.ctaHref} className="cta-primary">
            {config.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN — ServicesContent
   ═══════════════════════════════════════════════════════════ */

interface ServicesContentProps {
  services?: Service[];
  heroConfig?: PageHeroConfig;
  ctaConfig: import("@/lib/queries/section-config").CtaFinalConfig;
}

export default function ServicesContent({ services: servicesProp, heroConfig, ctaConfig }: ServicesContentProps) {
  const heroRef = useRef<HTMLElement>(null);

  const services = servicesProp && servicesProp.length > 0 ? servicesProp : DEFAULT_SERVICES;

  /* Hero GSAP reveal */
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const els = heroRef.current!.querySelectorAll(".hero-el");
      gsap.set(els, { opacity: 0, y: 25 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
      });
    }, heroRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO — Dark, cinematic, left-aligned
          ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="dark-section"
        style={{
          position: "relative",
          minHeight: "clamp(45vh, 50vh, 55vh)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingTop: "clamp(8rem, 14vh, 12rem)",
          paddingBottom: "clamp(4rem, 7vh, 6rem)",
        }}
      >
        {/* Background image */}
        <Image
          src={heroConfig?.backgroundImage ?? "/images/selection-gui-on-scope/007_GuiHome Décoration © Franck Tourneret.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />

        {/* Dark gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(28,25,23,0.82) 0%, rgba(28,25,23,0.68) 40%, rgba(28,25,23,0.9) 100%)",
            zIndex: 1,
          }}
        />

        {/* Grain */}
        <div
          className="grain-overlay"
          aria-hidden="true"
          style={{ zIndex: 2 }}
        />

        {/* Content */}
        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 10, width: "100%" }}
        >
          {/* Eyebrow */}
          <p
            className="hero-el"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "1.5rem",
              maxWidth: "none",
            }}
          >
            {heroConfig?.eyebrow ?? "Savoir-faire"}
          </p>

          {/* H1 */}
          <h1
            className="hero-el"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw + 1rem, 6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--foreground-on-dark)",
              marginBottom: "1.5rem",
            }}
          >
            {heroConfig?.title ?? "Services"}
          </h1>

          {/* Accent line */}
          <div
            className="hero-el"
            aria-hidden="true"
            style={{
              width: 48,
              height: 2,
              backgroundColor: "var(--primary)",
              marginBottom: "1.25rem",
            }}
          />

          {/* Subtitle */}
          <p
            className="hero-el"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.1875rem)",
              lineHeight: 1.65,
              color: "var(--muted-foreground)",
              maxWidth: "46ch",
              margin: 0,
            }}
          >
            {heroConfig?.subtitle ?? "Plus de 20 ans d\u2019expérience en fresques murales, design sur mesure et animation événementielle, sur tous les supports."}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES — Alternating zig-zag blocks
          ═══════════════════════════════════════════════ */}
      {services.map((service, index) => (
        <ServiceBlock
          key={service.id}
          service={service}
          index={index}
        />
      ))}

      {/* ═══════════════════════════════════════════════
          CTA — Conversion
          ═══════════════════════════════════════════════ */}
      <ContactCta config={ctaConfig} />
    </>
  );
}
