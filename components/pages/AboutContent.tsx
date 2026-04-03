"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaFinal from "@/components/sections/CtaFinal";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

interface Chapter {
  number: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  bg: "dark" | "light" | "alt";
}

const CHAPTERS: Chapter[] = [
  {
    number: "01",
    title: "Le graffiti, les murs, la rue",
    text: "Tout commence dans la rue. Les premiers coups de bombe, les murs bruts, la nuit. Le graffiti n\u2019est pas un loisir, c\u2019est un langage. Celui d\u2019un adolescent qui d\u00e9couvre que la peinture ne tient pas dans un cadre \u2014 elle prend le mur entier.",
    image: "/images/about/urban-fest-albi.webp",
    imageAlt: "Guillaume Jeanjean lors d\u2019un festival urbain \u00e0 Albi",
    bg: "dark",
  },
  {
    number: "02",
    title: "Du tag au design mural",
    text: "Le geste s\u2019affine. Les clients arrivent. Ce qui \u00e9tait un terrain de jeu devient un m\u00e9tier. La transition se fait naturellement : m\u00eame \u0153il, m\u00eame main, mais au service d\u2019un projet. GuiHome D\u00e9coration na\u00eet, et avec elle, une approche de designer mural.",
    image: "/images/about/gui-fresque-pro.webp",
    imageAlt: "Guillaume Jeanjean en pleine r\u00e9alisation d\u2019une fresque",
    bg: "light",
  },
  {
    number: "03",
    title: "Tous les supports, tous les clients",
    text: "Murs int\u00e9rieurs, fa\u00e7ades publiques, sols d\u2019\u00e9cole, v\u00e9hicules, containers. Collectivit\u00e9s, restaurants, particuliers, clubs sportifs. Chaque surface est un territoire, chaque projet une histoire diff\u00e9rente. La polyvalence devient la signature.",
    image: "/images/about/escape-game-agglobus.webp",
    imageAlt: "Fresque escape game r\u00e9alis\u00e9e pour Agglobus Rodez",
    bg: "alt",
  },
  {
    number: "04",
    title: "IWOK, l\u2019artiste et la marque",
    text: "Aujourd\u2019hui, IWOK porte 15 ans de murs dans les mains. L\u2019identit\u00e9 est claire : un designer mural complet, de la premi\u00e8re esquisse au dernier coup de pinceau. L\u2019Aveyron comme base, la France enti\u00e8re comme terrain.",
    image: "/images/about/gui-atelier.webp",
    imageAlt: "Guillaume Jeanjean, artiste muraliste IWOK",
    bg: "dark",
  },
];

interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  isText?: boolean;
  textValue?: string;
}

const METRICS: Metric[] = [
  { value: 15, prefix: "+", suffix: " ans", label: "d\u2019exp\u00e9rience" },
  { value: 100, prefix: "+", suffix: "", label: "projets r\u00e9alis\u00e9s" },
  { value: 4, prefix: "", suffix: " types", label: "de client\u00e8le" },
  {
    value: 0,
    prefix: "",
    suffix: "",
    label: "murs, fa\u00e7ades, sols, v\u00e9hicules",
    isText: true,
    textValue: "Tous supports",
  },
];

/* ──────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────── */

function getBgColor(bg: Chapter["bg"]) {
  switch (bg) {
    case "dark":
      return "var(--background-dark)";
    case "alt":
      return "var(--background-alt)";
    default:
      return "var(--background)";
  }
}

function getTextColor(bg: Chapter["bg"]) {
  return bg === "dark"
    ? "var(--foreground-on-dark)"
    : "var(--foreground-heading)";
}

function getMutedColor(bg: Chapter["bg"]) {
  return bg === "dark" ? "var(--foreground-subtle)" : "var(--muted-foreground)";
}

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */

export default function AboutContent() {
  // Section 1 refs
  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null);

  // Section 2 refs
  const storyRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chapterImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chapterTextRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Section 3 refs
  const metricsRef = useRef<HTMLElement>(null);
  const metricValueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metricItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setChapterRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      chapterRefs.current[i] = el;
    },
    []
  );
  const setChapterImageRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      chapterImageRefs.current[i] = el;
    },
    []
  );
  const setChapterTextRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      chapterTextRefs.current[i] = el;
    },
    []
  );
  const setMetricValueRef = useCallback(
    (el: HTMLSpanElement | null, i: number) => {
      metricValueRefs.current[i] = el;
    },
    []
  );
  const setMetricItemRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      metricItemRefs.current[i] = el;
    },
    []
  );

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ═══ SECTION 1 : Hero ═══ */
      mm.add("(min-width: 640px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Eyebrow
        if (heroEyebrowRef.current) {
          gsap.set(heroEyebrowRef.current, { opacity: 0, y: 20 });
          tl.to(heroEyebrowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
          }, 0.3);
        }

        // H1 split-text reveal (word by word)
        if (heroTitleRef.current) {
          const words = heroTitleRef.current.querySelectorAll(".about-hero-word");
          gsap.set(words, { y: "110%", skewY: 4 });
          tl.to(words, {
            y: "0%",
            skewY: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "expo.out",
          }, 0.5);
        }

        // Portrait clip-path reveal
        if (heroImgRef.current) {
          gsap.set(heroImgRef.current, {
            clipPath: "inset(100% 0 0 0)",
            scale: 1.08,
          });
          tl.to(heroImgRef.current, {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
          }, 0.9);
        }

        // Subtitle fade
        if (heroSubRef.current) {
          gsap.set(heroSubRef.current, { opacity: 0, y: 20 });
          tl.to(heroSubRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          }, 1.3);
        }
      });

      // Mobile hero
      mm.add("(max-width: 639px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (heroEyebrowRef.current) {
          gsap.set(heroEyebrowRef.current, { opacity: 0, y: 15 });
          tl.to(heroEyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.2);
        }
        if (heroTitleRef.current) {
          const words = heroTitleRef.current.querySelectorAll(".about-hero-word");
          gsap.set(words, { y: "110%", skewY: 3 });
          tl.to(words, { y: "0%", skewY: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" }, 0.4);
        }
        if (heroImgRef.current) {
          gsap.set(heroImgRef.current, { opacity: 0, y: 30 });
          tl.to(heroImgRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
        }
        if (heroSubRef.current) {
          gsap.set(heroSubRef.current, { opacity: 0, y: 15 });
          tl.to(heroSubRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.0);
        }
      });

      /* ═══ SECTION 2 : Storytelling (desktop only — sticky scroll) ═══ */
      mm.add("(min-width: 1024px)", () => {
        CHAPTERS.forEach((_, i) => {
          const chapter = chapterRefs.current[i];
          const img = chapterImageRefs.current[i];
          const text = chapterTextRefs.current[i];
          if (!chapter) return;

          // Pin each chapter
          ScrollTrigger.create({
            trigger: chapter,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: true,
          });

          // Image clip-path reveal
          if (img) {
            gsap.set(img, { clipPath: "inset(100% 0 0 0)" });
            gsap.to(img, {
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            });
          }

          // Text fade
          if (text) {
            gsap.set(text, { opacity: 0, y: 40 });
            gsap.to(text, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 55%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });

      // Mobile storytelling
      mm.add("(max-width: 1023px)", () => {
        CHAPTERS.forEach((_, i) => {
          const img = chapterImageRefs.current[i];
          const text = chapterTextRefs.current[i];

          if (img) {
            gsap.set(img, { opacity: 0, y: 30 });
            gsap.to(img, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
          if (text) {
            gsap.set(text, { opacity: 0, y: 25 });
            gsap.to(text, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            });
          }
        });
      });

      /* ═══ SECTION 3 : Key Metrics counter ═══ */
      if (metricsRef.current) {
        // Counter animation
        METRICS.forEach((metric, i) => {
          const el = metricValueRefs.current[i];
          const item = metricItemRefs.current[i];
          if (!el || !item) return;

          if (metric.isText) {
            // Text metric — simple reveal
            gsap.set(item, { opacity: 0, y: 30 });
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: metricsRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
              },
              delay: i * 0.15,
            });
          } else {
            // Numeric counter
            gsap.set(item, { opacity: 0, y: 30 });
            const counter = { val: 0 };

            ScrollTrigger.create({
              trigger: metricsRef.current,
              start: "top 70%",
              once: true,
              onEnter: () => {
                gsap.to(item, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: i * 0.12,
                });
                gsap.to(counter, {
                  val: metric.value,
                  duration: 1.2,
                  delay: i * 0.12,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (el) {
                      el.textContent = `${metric.prefix}${Math.round(counter.val)}${metric.suffix}`;
                    }
                  },
                });
              },
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  /* ──────────────────────────────────────────────
     RENDER
     ────────────────────────────────────────────── */
  return (
    <>
      {/* ═══════════════════════════════════════════
          SECTION 1 : HERO + PORTRAIT
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="dark-section full-bleed"
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "var(--background-dark)",
        }}
      >
        <div className="grain-overlay" aria-hidden="true" />

        <div
          className="container-custom"
          style={{
            position: "relative",
            zIndex: 10,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--spacing-group)",
            paddingBlock: "clamp(6rem, 12vh, 9rem) clamp(4rem, 8vh, 7rem)",
            width: "100%",
          }}
        >
          {/* Desktop: 2 columns (text 60% / portrait 40%) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--spacing-group)",
              alignItems: "center",
            }}
            className="about-hero-grid"
          >
            {/* Text column */}
            <div style={{ order: 1 }}>
              {/* Eyebrow */}
              <p
                ref={heroEyebrowRef}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                  marginBottom: "1.5rem",
                  maxWidth: "none",
                  lineHeight: 1,
                }}
              >
                A propos
              </p>

              {/* H1 — split text */}
              <h1
                ref={heroTitleRef}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: 800,
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--foreground-on-dark)",
                  margin: 0,
                  marginBottom: "1.75rem",
                }}
              >
                {["Guillaume", "Jeanjean"].map((word) => (
                  <span
                    key={word}
                    style={{
                      overflow: "hidden",
                      display: "inline-block",
                      marginRight: "0.3em",
                      paddingBottom: "0.05em",
                    }}
                  >
                    <span
                      className="about-hero-word"
                      style={{
                        display: "inline-block",
                        willChange: "transform",
                      }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
                <br />
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                    paddingBottom: "0.05em",
                  }}
                >
                  <span
                    className="about-hero-word"
                    style={{
                      display: "inline-block",
                      willChange: "transform",
                      color: "var(--primary)",
                      fontStyle: "italic",
                    }}
                  >
                    IWOK
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p
                ref={heroSubRef}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-body-lg)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--foreground-subtle)",
                  maxWidth: "var(--text-max)",
                  margin: 0,
                }}
              >
                Du graffiti au design mural — 15 ans de murs dans les mains.
                <br />
                L&apos;exigence de l&apos;artisan, l&apos;&oelig;il de
                l&apos;artiste.
              </p>
            </div>

            {/* Portrait column */}
            <div
              ref={heroImgRef}
              style={{
                order: 2,
                position: "relative",
                aspectRatio: "4/5",
                overflow: "hidden",
                willChange: "clip-path, transform",
              }}
            >
              <Image
                src="/images/selection-gui-on-scope/portrait-gui-masque.webp"
                alt="Guillaume Jeanjean, artiste muraliste IWOK"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              {/* Subtle warm overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, var(--background-dark) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 : STORYTELLING PARCOURS
          ═══════════════════════════════════════════ */}
      <section ref={storyRef}>
        {CHAPTERS.map((chapter, i) => (
          <div
            key={chapter.number}
            ref={(el) => setChapterRef(el, i)}
            style={{
              minHeight: "100dvh",
              display: "flex",
              alignItems: "center",
              backgroundColor: getBgColor(chapter.bg),
              transition: "background-color 600ms ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {chapter.bg === "dark" && (
              <div className="grain-overlay" aria-hidden="true" />
            )}

            <div
              className="container-custom"
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                paddingBlock: "var(--spacing-section-inner)",
              }}
            >
              <div className="about-story-grid">
                {/* Text side */}
                <div
                  ref={(el) => setChapterTextRef(el, i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "var(--spacing-gap)",
                  }}
                >
                  {/* Decorative number */}
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(5rem, 10vw, 9rem)",
                      fontWeight: 800,
                      lineHeight: 0.85,
                      color: "var(--primary)",
                      opacity: 0.15,
                      userSelect: "none",
                      display: "block",
                      marginBottom: "-0.5rem",
                    }}
                    aria-hidden="true"
                  >
                    {chapter.number}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h3)",
                      fontWeight: 600,
                      lineHeight: "var(--line-height-snug)",
                      letterSpacing: "var(--letter-spacing-tight)",
                      color: getTextColor(chapter.bg),
                      margin: 0,
                    }}
                  >
                    {chapter.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--font-size-body)",
                      lineHeight: "var(--line-height-relaxed)",
                      color: getMutedColor(chapter.bg),
                      maxWidth: "var(--text-max)",
                      margin: 0,
                    }}
                  >
                    {chapter.text}
                  </p>
                </div>

                {/* Image side */}
                <div
                  ref={(el) => setChapterImageRef(el, i)}
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    willChange: "clip-path",
                  }}
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 : CHIFFRES CLES
          ═══════════════════════════════════════════ */}
      <section
        ref={metricsRef}
        className="dark-section full-bleed section-padding"
        style={{
          backgroundColor: "var(--background-dark)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="grain-overlay" aria-hidden="true" />

        <div
          className="container-custom"
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          {/* Section eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "var(--spacing-group)",
              maxWidth: "none",
            }}
          >
            En quelques chiffres
          </p>

          {/* Metrics grid */}
          <div className="about-metrics-grid">
            {METRICS.map((metric, i) => (
              <div
                key={i}
                ref={(el) => setMetricItemRef(el, i)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--spacing-gap-tight)",
                  padding: "var(--spacing-gap) 0",
                }}
              >
                <span
                  ref={(el) => setMetricValueRef(el, i)}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2.5rem, 5vw + 0.5rem, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: "var(--line-height-tight)",
                    letterSpacing: "var(--letter-spacing-tight)",
                    color: "var(--primary)",
                    display: "block",
                  }}
                >
                  {metric.isText
                    ? metric.textValue
                    : `${metric.prefix}0${metric.suffix}`}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-body)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--foreground-subtle)",
                  }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 : CTA FINAL
          ═══════════════════════════════════════════ */}
      <CtaFinal />

      {/* ═══════════════════════════════════════════
          SCOPED STYLES
          ═══════════════════════════════════════════ */}
      <style>{`
        .about-hero-grid {
          grid-template-columns: 1fr;
          gap: var(--spacing-group);
        }
        @media (min-width: 640px) {
          .about-hero-grid {
            grid-template-columns: 3fr 2fr;
            gap: clamp(2rem, 5vw, 5rem);
          }
        }

        .about-story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-group);
          align-items: center;
        }
        @media (min-width: 1024px) {
          .about-story-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(3rem, 6vw, 6rem);
          }
        }

        .about-metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-gap);
          max-width: 900px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .about-metrics-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </>
  );
}
