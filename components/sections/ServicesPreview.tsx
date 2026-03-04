"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Custom hook pour Intersection Observer
function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// SVG Icon Brush
function IconBrush() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "var(--primary)" }}
    >
      <path
        d="M24 4C24 4 8 12 8 24C8 33.627 15.373 41 25 41C34.627 41 42 33.627 42 24C42 12 26 4 24 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 12V32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// SVG Icon Star
function IconStar() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "var(--primary)" }}
    >
      <path
        d="M24 2L30.18 18.18H47.36L33.58 27.82L39.76 44L24 34.36L8.24 44L14.42 27.82L0.64 18.18H17.82L24 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// SVG Icon People
function IconPeople() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "var(--primary)" }}
    >
      <path
        d="M17 12C19.209 12 21 10.209 21 8C21 5.791 19.209 4 17 4C14.791 4 13 5.791 13 8C13 10.209 14.791 12 17 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 12C33.209 12 35 10.209 35 8C35 5.791 33.209 4 31 4C28.791 4 27 5.791 27 8C27 10.209 28.791 12 31 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 44C9 35.716 15.074 29 22 29C28.926 29 35 35.716 35 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 44C37 38.477 40.582 34 45 34C46.105 34 47 34.895 47 36V44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  delay: number;
}

function ServiceCard({ title, tagline, description, link, icon, delay }: ServiceCardProps) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
      className="h-full"
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          borderRadius: "var(--radius)",
          padding: "2rem",
          boxShadow: "var(--shadow-subtle)",
          transition: "box-shadow 300ms ease, transform 300ms ease",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "var(--shadow-hover)";
          el.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = "var(--shadow-subtle)";
          el.style.transform = "translateY(0)";
        }}
      >
        {/* Icon */}
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "var(--font-size-h3)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--foreground-heading)",
            marginBottom: "0.5rem",
            fontFamily: "var(--font-heading)",
            letterSpacing: "var(--letter-spacing-tight)",
          }}
        >
          {title}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontSize: "var(--font-size-small)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--primary)",
            marginBottom: "1rem",
            fontFamily: "var(--font-sans)",
          }}
        >
          {tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "var(--font-size-body)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            marginBottom: "1.5rem",
            flex: 1,
            fontFamily: "var(--font-sans)",
          }}
        >
          {description}
        </p>

        {/* Link */}
        <Link
          href={link}
          style={{
            color: "var(--primary)",
            fontWeight: "var(--font-weight-semibold)",
            fontSize: "var(--font-size-body)",
            textDecoration: "none",
            transition: "opacity 300ms ease",
            fontFamily: "var(--font-sans)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          En savoir plus →
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPreview() {
  const { ref: sectionRef } = useRevealOnScroll();

  const services = [
    {
      title: "Fresques Murales",
      tagline: "L'art de transformer vos espaces",
      description:
        "Intérieur comme extérieur, chaque fresque naît d'une écoute. Nous visitons votre lieu, proposons une création sur mesure, et peignons — du mur d'une chambre d'enfant à la façade d'un bâtiment public.",
      link: "/services",
      icon: <IconBrush />,
    },
    {
      title: "Design Mural Sur Mesure",
      tagline: "Votre vision, notre trait",
      description:
        "Zéro catalogue. Votre projet est conçu de A à Z : brief, croquis, réalisation. Chaque création est unique, pensée pour votre lieu et votre envie.",
      link: "/services",
      icon: <IconStar />,
    },
    {
      title: "Animation Événementielle",
      tagline: "L'art en direct, devant vos yeux",
      description:
        "Live painting lors de vos événements. Une fresque naît en quelques heures sous les yeux du public — un moment fort, une oeuvre qui reste.",
      link: "/services",
      icon: <IconPeople />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--background-alt)",
        padding: "var(--spacing-section-inner)",
      }}
      className="section-padding"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          style={{
            marginBottom: "var(--spacing-group)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--foreground-heading)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
              lineHeight: "1.1",
            }}
          >
            Votre projet, du premier trait au dernier coup de pinceau
          </h2>

          <p
            className="text-lead"
            style={{
              color: "var(--foreground-subtitle)",
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Fresques murales intérieures et extérieures, design sur mesure, animation
            événementielle — sur tous les supports, pour tous les projets.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          style={{
            marginBottom: "var(--spacing-group)",
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              tagline={service.tagline}
              description={service.description}
              link={service.link}
              icon={service.icon}
              delay={index * 150}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="/services"
            style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "var(--primary)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9375rem",
              fontWeight: "500",
              padding: "0.875rem 2rem",
              border: "1px solid var(--primary)",
              borderRadius: "var(--radius)",
              textDecoration: "none",
              transition:
                "background-color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary)";
              e.currentTarget.style.color = "var(--primary-foreground)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--primary)";
            }}
          >
            Découvrir tous les services
          </Link>
        </div>
      </div>
    </section>
  );
}
