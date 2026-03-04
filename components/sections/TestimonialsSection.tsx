"use client";

import { useEffect, useRef, useState } from "react";

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

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  project: string;
  delay: number;
}

function TestimonialCard({ quote, author, role, project, delay }: TestimonialProps) {
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
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Quote mark */}
        <div
          aria-hidden="true"
          style={{
            fontSize: "5rem",
            lineHeight: "0.8",
            fontFamily: "var(--font-heading)",
            fontWeight: "700",
            color: "var(--accent)",
            marginBottom: "-1rem",
          }}
        >
          &quot;
        </div>

        {/* Quote text */}
        <p
          style={{
            fontSize: "var(--font-size-body-lg)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--foreground-subtitle)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {quote}
        </p>

        {/* Author info */}
        <div>
          <p
            style={{
              fontSize: "var(--font-size-small)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-sans)",
              marginBottom: "0.25rem",
            }}
          >
            {author}
          </p>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-sans)",
              lineHeight: "1.5",
            }}
          >
            {role} · <span style={{ fontStyle: "italic" }}>{project}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref: sectionRef } = useRevealOnScroll();

  const testimonials = [
    {
      quote:
        "De la première discussion à la fresque finale, Guillaume a su écouter et proposer exactement ce qu'on imaginait. Un résultat bluffant, qui fait l'unanimité parmi notre équipe.",
      author: "Marc D.",
      role: "Gérant de restaurant",
      project: "Rodez (12) · Fresque intérieure restaurant",
    },
    {
      quote:
        "Le skate park avait besoin d'une identité visuelle forte. IWOK a créé quelque chose qui parle aux jeunes du quartier et dont toute la ville est fière aujourd'hui.",
      author: "Service culturel",
      role: "Mairie de Decazeville",
      project: "(12) · Skate Park Decazeville 2024",
    },
    {
      quote:
        "On cherchait quelqu'un qui comprenne notre univers sans qu'on ait besoin de tout expliquer. Guillaume a capté exactement ce qu'on voulait — le résultat dépasse ce qu'on avait imaginé.",
      author: "Famille Rousset",
      role: "Toulouse",
      project: "(31) · Chambre enfant",
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--background)",
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
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
              lineHeight: "1.1",
            }}
          >
            Ils ont transformé leurs murs
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              project={testimonial.project}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
