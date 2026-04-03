"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const PHONE = "06 XX XX XX XX";
const PHONE_TEL = "tel:+33XXXXXXXXXX";

// ---------------------------------------------------------------------------
// Hook: scroll‑triggered reveal (mirrors CtaFinal.tsx pattern)
// ---------------------------------------------------------------------------
function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ---------------------------------------------------------------------------
// Inline SVG icons (no external icon library)
// ---------------------------------------------------------------------------
function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: "var(--primary)" }}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section 1 — Hero sombre (phone‑first)
// ---------------------------------------------------------------------------
function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-eyebrow]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
      })
        .from("[data-hero-title]", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
        .from("[data-hero-line]", { scaleX: 0, duration: 0.6 }, "-=0.4")
        .from("[data-hero-sub]", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from("[data-hero-cta]", { opacity: 0, y: 20, duration: 0.6 }, "-=0.2");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dark-section"
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "8rem",
        paddingBottom: "var(--spacing-section-inner-mobile)",
      }}
    >
      {/* Background */}
      <Image
        src="/images/selection-gui-on-scope/portrait-gui-masque.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />

      {/* Overlays */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28, 25, 23, 0.68)",
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(28,25,23,0.95) 0%, rgba(28,25,23,0.25) 55%, rgba(28,25,23,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" style={{ zIndex: 2 }} />

      {/* Accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "var(--container-padding)",
          width: 1,
          height: "clamp(60px, 12vw, 120px)",
          backgroundColor: "var(--primary)",
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <div className="container-custom" style={{ position: "relative", zIndex: 10 }}>
        {/* Eyebrow */}
        <p
          data-hero-eyebrow
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
          Contact
        </p>

        {/* H1 */}
        <h1
          data-hero-title
          style={{
            fontSize: "var(--font-size-h1)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-on-dark)",
            margin: "0 0 1.5rem",
            maxWidth: "18ch",
          }}
        >
          Parlons de votre projet
        </h1>

        {/* Separator */}
        <div
          data-hero-line
          aria-hidden="true"
          style={{
            width: 48,
            height: 1,
            backgroundColor: "var(--primary)",
            opacity: 0.4,
            marginBottom: "1.25rem",
            transformOrigin: "left",
          }}
        />

        {/* Subtitle */}
        <p
          data-hero-sub
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body-lg)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            margin: "0 0 2.5rem",
            maxWidth: "42ch",
          }}
        >
          Un mur vous inspire&nbsp;? Une idee de fresque&nbsp;?
          <br />
          Le plus simple, c&apos;est d&apos;en parler.
        </p>

        {/* Phone CTA */}
        <div data-hero-cta>
          <a
            href={PHONE_TEL}
            className="cta-primary"
            style={{
              gap: "0.75rem",
              fontSize: "0.75rem",
            }}
          >
            <PhoneIcon />
            Appeler · {PHONE}
          </a>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--font-size-caption)",
              color: "var(--foreground-subtle)",
              marginTop: "1rem",
              maxWidth: "none",
            }}
          >
            Du lundi au vendredi, 9h · 18h
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 2 — Formulaire callback (fond clair)
// ---------------------------------------------------------------------------
type FormStatus = "idle" | "loading" | "success" | "error";

function CallbackForm() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll(0.1);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function validate(): boolean {
    const next: Record<string, string> = {};
    const name = nameRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";

    if (!name) next.name = "Merci d'indiquer votre nom.";
    if (!phone) next.phone = "Merci d'indiquer votre numero.";
    else if (phone.replace(/\s/g, "").length < 8)
      next.phone = "Ce numero semble trop court.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    const payload = {
      name: nameRef.current?.value.trim(),
      phone: phoneRef.current?.value.trim(),
      message: messageRef.current?.value.trim() || null,
    };

    // TODO: remplacer par fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
    console.log("Callback request:", payload);

    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  // Shared inline style helpers
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--font-size-small)",
    fontWeight: 500,
    letterSpacing: "0.05em",
    color: "var(--foreground-subtitle)",
    marginBottom: "0.5rem",
  };

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--font-size-body)",
    color: "var(--foreground)",
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "0.875rem 1rem",
    outline: "none",
    transition: "border-color var(--transition-standard)",
  };

  const revealBase: React.CSSProperties = {
    transition:
      "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "opacity, transform",
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        style={{
          maxWidth: 520,
          marginInline: "auto",
          paddingInline: "var(--container-padding)",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-h2)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-heading)",
            textAlign: "center",
            margin: "0 0 1rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            ...revealBase,
          }}
        >
          Je ne reponds pas&nbsp;?
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body-lg)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            textAlign: "center",
            maxWidth: "38ch",
            marginInline: "auto",
            marginBottom: "3rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(25px)",
            ...revealBase,
            transitionDelay: "100ms",
          }}
        >
          Laissez vos coordonnees, je vous rappelle sous 24h.
        </p>

        {/* Success state */}
        {status === "success" ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1.5rem",
              borderRadius: "var(--radius-large)",
              backgroundColor: "var(--background-alt)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              ...revealBase,
              transitionDelay: "200ms",
            }}
          >
            <CheckIcon />
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h4)",
                fontWeight: 600,
                color: "var(--foreground-heading)",
                marginTop: "1.25rem",
                marginBottom: "0.75rem",
              }}
            >
              Merci&nbsp;!
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--font-size-body)",
                color: "var(--muted-foreground)",
                maxWidth: "30ch",
                marginInline: "auto",
              }}
            >
              Je vous rappelle tres vite.
            </p>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              ...revealBase,
              transitionDelay: "200ms",
            }}
          >
            {/* Name */}
            <div>
              <label htmlFor="cb-name" style={labelStyle}>
                Votre nom
              </label>
              <input
                ref={nameRef}
                id="cb-name"
                type="text"
                required
                autoComplete="name"
                placeholder="Prenom Nom"
                style={{
                  ...inputStyle,
                  borderColor: errors.name ? "var(--error)" : undefined,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.outline = "2px solid var(--primary)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.name
                    ? "var(--error)"
                    : "var(--border)";
                  e.currentTarget.style.outline = "none";
                }}
              />
              {errors.name && (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-caption)",
                    color: "var(--error)",
                    marginTop: "0.375rem",
                    maxWidth: "none",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="cb-phone" style={labelStyle}>
                Votre numero de telephone
              </label>
              <input
                ref={phoneRef}
                id="cb-phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="06 12 34 56 78"
                style={{
                  ...inputStyle,
                  borderColor: errors.phone ? "var(--error)" : undefined,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.outline = "2px solid var(--primary)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.phone
                    ? "var(--error)"
                    : "var(--border)";
                  e.currentTarget.style.outline = "none";
                }}
              />
              {errors.phone && (
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-caption)",
                    color: "var(--error)",
                    marginTop: "0.375rem",
                    maxWidth: "none",
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Message (optional) */}
            <div>
              <label htmlFor="cb-message" style={labelStyle}>
                Un mot sur votre projet{" "}
                <span style={{ fontWeight: 400, color: "var(--foreground-subtle)" }}>
                  (facultatif)
                </span>
              </label>
              <textarea
                ref={messageRef}
                id="cb-message"
                rows={3}
                placeholder="Fresque pour un restaurant, chambre d'enfant, facade..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "5rem",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.outline = "2px solid var(--primary)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.outline = "none";
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cta-primary"
              disabled={status === "loading"}
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? "wait" : undefined,
                marginTop: "0.5rem",
              }}
            >
              {status === "loading" ? "Envoi en cours..." : "Demander un rappel"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 3 — Coordonnees (fond sombre)
// ---------------------------------------------------------------------------
function ContactInfo() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll(0.1);

  const revealBase: React.CSSProperties = {
    transition:
      "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "opacity, transform",
  };

  const colTitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "0.6875rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "var(--foreground-subtle)",
    marginBottom: "1.25rem",
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--font-size-body)",
    lineHeight: "var(--line-height-relaxed)",
    color: "var(--muted-foreground)",
    maxWidth: "none",
  };

  const linkStyle: React.CSSProperties = {
    ...textStyle,
    color: "var(--muted-foreground)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "color var(--transition-standard)",
  };

  return (
    <section
      ref={sectionRef}
      className="dark-section"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grain-overlay" aria-hidden="true" style={{ zIndex: 1 }} />

      <div
        className="container-custom section-padding"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            maxWidth: 800,
            marginInline: "auto",
            display: "grid",
            gap: "3rem",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Column 1 — L'atelier */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(25px)",
              ...revealBase,
            }}
          >
            <p style={colTitleStyle}>L&apos;atelier</p>
            <address style={{ fontStyle: "normal", marginBottom: "1.25rem" }}>
              <p style={textStyle}>
                15 rue Bellevue
                <br />
                12510 Olemps (Aveyron)
              </p>
            </address>
            <a
              href="https://maps.google.com/?q=15+rue+Bellevue+12510+Olemps"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              <MapPinIcon />
              Voir sur Google Maps
            </a>
          </div>

          {/* Column 2 — En ligne */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(25px)",
              ...revealBase,
              transitionDelay: "150ms",
            }}
          >
            <p style={colTitleStyle}>En ligne</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a
                href="https://www.instagram.com/guihomefresquesmurales/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted-foreground)";
                }}
              >
                <InstagramIcon />
                @guihomefresquesmurales
              </a>

              <p style={{ ...textStyle, fontStyle: "italic", color: "var(--foreground-subtle)" }}>
                [Email a confirmer]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function ContactContent() {
  return (
    <>
      <ContactHero />
      <CallbackForm />
      <ContactInfo />
    </>
  );
}
