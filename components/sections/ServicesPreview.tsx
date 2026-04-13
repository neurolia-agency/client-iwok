"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Custom SVG Icons — Muralist Identity ─── */

function IconSprayCan() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Can body */}
      <rect x="14" y="20" width="18" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="30" x2="32" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Nozzle */}
      <path d="M20 20V16H26V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="23" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Spray particles */}
      <path d="M35 10L40 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M36 16L42 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M35 22L40 23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="43" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="45" cy="15" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Compass legs */}
      <path d="M26 6L18 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 6L34 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pivot */}
      <circle cx="26" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Crossbar */}
      <path d="M21 28H31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pencil tip */}
      <path d="M33 42L34 46L35 42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arc trace */}
      <path
        d="M34 46C40 38 42 28 38 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2.5 3.5"
        opacity="0.5"
      />
    </svg>
  );
}

function IconBrushLive() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Handle */}
      <path d="M14 46L24 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Bristles */}
      <path
        d="M24 22L20 14C19 11 21 8 24 10L30 16L28 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Motion lines */}
      <path d="M32 18L38 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M34 24L40 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M30 10L36 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Sparks */}
      <circle cx="41" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="43" cy="20" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="39" cy="4" r="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ─── Service data ─── */

const services = [
  {
    title: "Fresques Murales",
    description: "Intérieur, extérieur. Vos murs prennent vie.",
    icon: <IconSprayCan />,
  },
  {
    title: "Design Sur Mesure",
    description: "Brief, croquis, réalisation. Chaque œuvre est unique.",
    icon: <IconCompass />,
  },
  {
    title: "Animation Événementielle",
    description: "Live painting. L\u2019art se crée sous vos yeux.",
    icon: <IconBrushLive />,
  },
];

/* ─── Main component ─── */

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 40 });
      }
      itemRefs.current.filter(Boolean).forEach((item) => {
        gsap.set(item!, { opacity: 0, y: 30 });
      });
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
        },
      });

      if (headingRef.current) {
        tl.to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      const items = itemRefs.current.filter(Boolean);
      if (items.length > 0) {
        tl.to(
          items,
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" },
          0.25
        );
      }

      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.7
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="section-padding"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background Image */}
      <Image
        src="/images/selection-gui-on-scope/015_GuiHome Décoration © Franck Tourneret.webp"
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />

      {/* Dark overlays */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28, 25, 23, 0.7)",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.45) 55%, rgba(28,25,23,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="container-custom" style={{ position: "relative", zIndex: 10 }}>
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={{ gap: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          {/* Left: Heading block */}
          <div ref={headingRef} className="md:w-[35%] md:shrink-0">
            <p
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
            <h2
              id="services-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h2)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--foreground-on-dark)",
                marginBottom: "1.5rem",
              }}
            >
              Trois gestes,{" "}
              <br className="hidden md:inline" />
              une&nbsp;signature.
            </h2>
            <div
              aria-hidden="true"
              style={{
                width: 48,
                height: 1,
                backgroundColor: "var(--primary)",
                opacity: 0.4,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "var(--font-size-body)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--muted-foreground)",
                marginTop: "1.25rem",
                maxWidth: "30ch",
                margin: "1.25rem 0 0",
              }}
            >
              De la première esquisse à la touche finale, chaque projet se construit ensemble.
            </p>
          </div>

          {/* Right: Services list */}
          <div className="flex-1 min-w-0">
            {services.map((service, index) => (
              <div
                key={service.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                  paddingBlock: "1.75rem",
                  borderBottom:
                    index < services.length - 1
                      ? "1px solid rgba(200, 150, 45, 0.15)"
                      : "none",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0,
                    color: "var(--primary)",
                    marginTop: "0.15rem",
                  }}
                >
                  {service.icon}
                </div>

                {/* Text */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: 600,
                      color: "var(--foreground-on-dark)",
                      marginBottom: "0.5rem",
                      letterSpacing: "var(--letter-spacing-tight)",
                      lineHeight: 1.2,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--font-size-body)",
                      lineHeight: "var(--line-height-relaxed)",
                      color: "var(--muted-foreground)",
                      margin: 0,
                      maxWidth: "40ch",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div
              ref={ctaRef}
              className="mt-8 md:mt-10 flex justify-center md:justify-start"
            >
              <Link href="/services" className="cta-primary">
                Découvrir les services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
