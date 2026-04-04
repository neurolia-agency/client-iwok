"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    id: "fresques-interieures",
    title: "Fresques Murales Intérieures",
    tagline: "L\u2019intérieur qui raconte votre histoire",
    tag: "Intérieur",
    description:
      "Création de fresques peintes pour vos espaces intérieurs \u2014 chambres d\u2019enfants, salons, halls d\u2019accueil, restaurants, commerces. Chaque fresque est conçue sur mesure après une phase d\u2019écoute et de proposition créative.",
    includes: [
      "Visite sur site et prise de mesures",
      "Proposition créative (croquis/maquette)",
      "Réalisation complète de la fresque",
      "Finitions et protection adaptées au support",
    ],
    image: "/images/section-grid-animate/wine.webp",
    imageAlt:
      "Fresque murale intérieure \u2014 mains tenant des verres de vin, style réaliste",
  },
  {
    id: "fresques-exterieures",
    title: "Fresques Murales Extérieures",
    tagline: "Donner une âme à vos façades",
    tag: "Extérieur",
    description:
      "Fresques et peintures murales pour façades, murs extérieurs, bâtiments publics, structures urbaines. Peintures techniques résistantes aux intempéries et aux UV.",
    includes: [
      "Étude du support et des contraintes techniques",
      "Maquette créative adaptée à l\u2019environnement",
      "Réalisation avec peintures techniques extérieures",
      "Finition anti-UV et protection longue durée",
    ],
    image: "/images/section-grid-animate/fire.webp",
    imageAlt:
      "Fresque murale extérieure \u2014 pompier en action, couleurs vibrantes",
  },
  {
    id: "design-mural",
    title: "Design Mural Sur Mesure",
    tagline: "Votre vision, notre trait",
    tag: "Sur mesure",
    description:
      "Conception et réalisation de design mural personnalisé pour tout type d\u2019espace. Du brief créatif au dernier coup de pinceau, chaque étape est pensée en collaboration avec le client.",
    includes: [
      "Brief créatif et recueil de vos envies",
      "Recherches graphiques et propositions",
      "Réalisation et mise en peinture",
    ],
    image: "/images/section-grid-animate/african-wife.webp",
    imageAlt:
      "Portrait mural sur mesure \u2014 femme africaine, couleurs vives et détails réalistes",
  },
  {
    id: "tous-supports",
    title: "Décoration Tous Supports",
    tagline: "Pas seulement les murs",
    tag: "Tous supports",
    description:
      "Peinture artistique sur supports atypiques \u2014 véhicules, containers, sols, mobilier, structures métalliques. La même exigence créative, adaptée à des surfaces non-conventionnelles.",
    includes: [
      "Étude du support et traitement de surface",
      "Proposition créative",
      "Réalisation avec peintures adaptées",
    ],
    image: "/images/section-grid-animate/beer-cow.webp",
    imageAlt:
      "Fresque pop art sur support atypique \u2014 deux vaches colorées aux lunettes de soleil",
  },
  {
    id: "animation-evenementielle",
    title: "Animation Événementielle",
    tagline: "L\u2019art en direct, devant vos yeux",
    tag: "Événementiel",
    description:
      "Live painting lors d\u2019événements et démonstrations artistiques. Créez un moment fort avec la réalisation d\u2019une fresque en direct \u2014 de la toile blanche à l\u2019\u0153uvre finie sous les yeux du public.",
    includes: [
      "Préparation de la performance (thème, support, durée)",
      "Matériel de peinture",
      "Réalisation live devant le public",
      "L\u2019\u0153uvre finale (offerte ou sur arrangement)",
    ],
    image: "/images/section-grid-animate/kerea.webp",
    imageAlt:
      "Live painting au centre KEREA \u2014 artiste peignant un portrait coloré en direct",
  },
  {
    id: "ateliers-participatifs",
    title: "Ateliers Participatifs",
    tagline: "Créer ensemble, peindre ensemble",
    tag: "Participatif",
    description:
      "Ateliers de création murale participatifs encadrés par un artiste professionnel. Idéal pour fédérer un groupe \u2014 écoles, centres sociaux, entreprises, festivals.",
    includes: [
      "Conception du projet participatif",
      "Encadrement artistique et technique",
      "Matériel de peinture",
      "Fresque collective finalisée",
    ],
    image: "/images/section-grid-animate/colors.webp",
    imageAlt:
      "Atelier participatif \u2014 fresque géométrique multicolore, vue aérienne",
  },
];

const DEFAULT_PROCESS_STEPS = [
  {
    number: "01",
    title: "Prise de contact",
    description: "Échange sur votre projet, vos envies, vos contraintes.",
  },
  {
    number: "02",
    title: "Proposition créative",
    description: "Visite sur site, croquis et maquette sur mesure.",
  },
  {
    number: "03",
    title: "Réalisation",
    description: "La fresque prend vie sur votre mur, sous vos yeux.",
  },
  {
    number: "04",
    title: "Livraison",
    description: "Finitions, protection, remise du support.",
  },
];

/* ═══════════════════════════════════════════════════════════
   CHEVRON ICON
   ═══════════════════════════════════════════════════════════ */

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        flexShrink: 0,
      }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACCORDION PANEL
   ═══════════════════════════════════════════════════════════ */

function AccordionPanel({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) {
      setMeasuredHeight(innerRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        maxHeight: isOpen ? `${measuredHeight}px` : "0px",
        overflow: "hidden",
        transition:
          "max-height 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICE BLOCK — Zig-zag layout
   ═══════════════════════════════════════════════════════════ */

function ServiceBlock({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: Service;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const blockRef = useRef<HTMLElement>(null);
  const isImageRight = index % 2 === 1;

  useEffect(() => {
    if (!blockRef.current) return;

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

            {/* Accordion toggle */}
            <button
              onClick={onToggle}
              aria-expanded={isExpanded}
              style={{
                display: "inline-flex",
                alignItems: "center",
                alignSelf: "flex-start",
                gap: "0.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--font-size-small)",
                fontWeight: 500,
                color: "var(--primary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.375rem 0",
                transition: "color var(--transition-standard)",
              }}
            >
              {isExpanded ? "Réduire" : "En savoir plus"}
              <ChevronDown isOpen={isExpanded} />
            </button>

            {/* Accordion content — "Inclus" */}
            <AccordionPanel isOpen={isExpanded}>
              <div style={{ paddingBlock: "0.75rem 0.5rem" }}>
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
            </AccordionPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROCESS SECTION — "De l'idée à la fresque"
   ═══════════════════════════════════════════════════════════ */

function ProcessSection({ steps }: { steps: { number: string; title: string; description: string }[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelector(".proc-head");
      const steps = sectionRef.current!.querySelectorAll(".proc-step");

      if (heading) gsap.set(heading, { opacity: 0, y: 30 });
      steps.forEach((s) => gsap.set(s, { opacity: 0, y: 35 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 65%",
          once: true,
        },
      });

      if (heading)
        tl.to(
          heading,
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0
        );
      if (steps.length)
        tl.to(
          steps,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.3
        );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dark-section"
      style={{
        paddingBlock: "var(--spacing-section-inner)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="grain-overlay"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />

      <div
        className="container-custom"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Heading */}
        <div
          className="proc-head"
          style={{
            textAlign: "center",
            marginBottom: "clamp(3.5rem, 7vw, 5.5rem)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "1.25rem",
              maxWidth: "none",
            }}
          >
            Processus
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-h2)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--foreground-on-dark)",
              margin: 0,
            }}
          >
            De l&apos;idée à la fresque
          </h2>
        </div>

        {/* ─── Desktop: 4-column horizontal timeline ─── */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="proc-step"
              style={{ textAlign: "center" }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "var(--primary)",
                  letterSpacing: "-0.02em",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {step.number}
              </span>

              {/* Small Ocre dash */}
              <div
                aria-hidden="true"
                style={{
                  width: 24,
                  height: 1,
                  backgroundColor: "var(--primary)",
                  opacity: 0.4,
                  margin: "0 auto 1.25rem",
                }}
              />

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h5)",
                  fontWeight: 600,
                  color: "var(--foreground-on-dark)",
                  marginBottom: "0.5rem",
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-body)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--muted-foreground)",
                  margin: "0 auto",
                  maxWidth: "24ch",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* ─── Mobile: vertical timeline ─── */}
        <div
          className="md:hidden"
          style={{ position: "relative", paddingLeft: "2.5rem" }}
        >
          {/* Vertical line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 5,
              top: 8,
              bottom: 8,
              width: 1,
              backgroundColor: "var(--primary)",
              opacity: 0.25,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="proc-step"
              style={{
                position: "relative",
                paddingBottom:
                  i < steps.length - 1 ? "2.5rem" : 0,
              }}
            >
              {/* Dot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-2.2rem",
                  top: 5,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginBottom: "0.375rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--primary)",
                  }}
                >
                  {step.number}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h5)",
                    fontWeight: 600,
                    color: "var(--foreground-on-dark)",
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-body)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--muted-foreground)",
                  margin: 0,
                  maxWidth: "36ch",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT CTA
   ═══════════════════════════════════════════════════════════ */

function ContactCta() {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

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
          Discutons de votre projet
        </h2>
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
          Devis gratuit · Réponse sous 48h
        </p>
        <div className="cta-el">
          <Link href="/contact" className="cta-primary">
            Parler de mon projet
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
  processSteps?: { number: string; title: string; description: string }[];
}

export default function ServicesContent({ services: servicesProp, processSteps: processStepsProp }: ServicesContentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const services = servicesProp && servicesProp.length > 0 ? servicesProp : DEFAULT_SERVICES;
  const processSteps = processStepsProp && processStepsProp.length > 0 ? processStepsProp : DEFAULT_PROCESS_STEPS;

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
          src="/images/selection-gui-on-scope/007_GuiHome-enhanced-cinematic.png"
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
            Savoir-faire
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
            Services
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
            Fresques murales, design sur mesure, animation événementielle
            — sur tous les supports, pour tous les projets.
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
          isExpanded={expandedId === service.id}
          onToggle={() =>
            setExpandedId((prev) =>
              prev === service.id ? null : service.id
            )
          }
        />
      ))}

      {/* ═══════════════════════════════════════════════
          PROCESS — "De l'idée à la fresque"
          ═══════════════════════════════════════════════ */}
      <ProcessSection steps={processSteps} />

      {/* ═══════════════════════════════════════════════
          CTA — Conversion
          ═══════════════════════════════════════════════ */}
      <ContactCta />
    </>
  );
}
