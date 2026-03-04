"use client";

import Link from "next/link";
import Image from "next/image";

interface CtaSecondaryProps {
  href: string;
  children: React.ReactNode;
  /** Portfolio image revealed through the slit on hover */
  peekImage?: string;
  className?: string;
}

/**
 * CTA Secondaire — "L'entrebâillement"
 *
 * Austere text at rest. On hover, a horizontal slit opens behind
 * the text, revealing a blurred fragment of a portfolio fresco.
 * The eye catches color and movement without identifying the image.
 * Curiosity pulls the click.
 */
export default function CtaSecondary({
  href,
  children,
  peekImage = "/images/section-grid-animate/fire.jpg",
  className,
}: CtaSecondaryProps) {
  return (
    <Link
      href={href}
      className={`cta-secondary group/slit ${className ?? ""}`}
    >
      {/* Slit image — the "entrebâillement" */}
      <span className="cta-secondary__slit" aria-hidden="true">
        <Image
          src={peekImage}
          alt=""
          fill
          sizes="320px"
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "blur(8px) saturate(0.9) brightness(0.5) sepia(0.3)",
          }}
        />
      </span>

      {/* Text content — sits above the slit */}
      <span className="cta-secondary__text">
        {children}
      </span>
    </Link>
  );
}
