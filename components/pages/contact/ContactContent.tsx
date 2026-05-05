"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import type { SiteContact } from "@/lib/queries/site-contact";

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
function ContactHero({ phone }: { phone: SiteContact["phone"] }) {
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

        {/* Phone CTA — masqué si Guillaume a vidé le téléphone */}
        {phone && (
          <div data-hero-cta>
            <a
              href={phone.tel}
              className="cta-primary"
              style={{
                gap: "0.75rem",
                fontSize: "0.75rem",
              }}
            >
              <PhoneIcon />
              Appeler · {phone.display}
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
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section 2 — Formulaire de devis (fond clair)
// ---------------------------------------------------------------------------
type FormStatus = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "Entreprise",
  "Particulier",
  "Autre",
];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function UploadIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: "var(--foreground-subtle)" }}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function CallbackForm() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll(0.1);

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const [projectType, setProjectType] = useState("");
  const [otherProjectType, setOtherProjectType] = useState("");

  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const supportRef = useRef<HTMLTextAreaElement>(null);
  const inspirationsRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validate(): boolean {
    const next: Record<string, string> = {};
    const lastName = lastNameRef.current?.value.trim() ?? "";
    const firstName = firstNameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";

    if (!lastName) next.lastName = "Merci d\u2019indiquer votre nom.";
    if (!firstName) next.firstName = "Merci d\u2019indiquer votre pr\u00e9nom.";
    if (!phone) next.phone = "Merci d\u2019indiquer votre num\u00e9ro.";
    else if (phone.replace(/\s/g, "").length < 8)
      next.phone = "Ce num\u00e9ro semble trop court.";
    if (!email) next.email = "Merci d\u2019indiquer votre email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Ce format d\u2019email ne semble pas valide.";
    if (!projectType) next.projectType = "Merci de choisir un type de projet.";
    if (projectType === "Autre" && !otherProjectType.trim())
      next.otherProjectType = "Merci de pr\u00e9ciser votre type de projet.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function addFiles(newFiles: File[]) {
    const valid = newFiles.filter((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) return false;
      if (f.size > MAX_FILE_SIZE) return false;
      return true;
    });
    const combined = [...files, ...valid].slice(0, MAX_FILES);
    setFiles(combined);
    const newPreviews = combined.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return newPreviews;
    });
  }

  function removeFile(index: number) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    URL.revokeObjectURL(previews[index]);
    setPreviews(previews.filter((_, i) => i !== index));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    addFiles(droppedFiles);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Récupère le honeypot via DOM (input hidden anti-bot)
    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    const formData = new FormData();
    formData.append("lastName", lastNameRef.current?.value.trim() ?? "");
    formData.append("firstName", firstNameRef.current?.value.trim() ?? "");
    formData.append("phone", phoneRef.current?.value.trim() ?? "");
    formData.append("email", emailRef.current?.value.trim() ?? "");
    formData.append("projectType", projectType === "Autre" ? `Autre : ${otherProjectType.trim()}` : projectType);
    formData.append("support", supportRef.current?.value.trim() ?? "");
    formData.append("inspirations", inspirationsRef.current?.value.trim() ?? "");
    formData.append("website", honeypot);
    files.forEach((f) => formData.append("files", f));

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setStatus("error");
    }
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

  const dropZoneStyle: React.CSSProperties = {
    border: `2px dashed ${isDragOver ? "var(--primary)" : "var(--border)"}`,
    borderRadius: "var(--radius)",
    padding: "2rem 1.5rem",
    textAlign: "center" as const,
    cursor: "pointer",
    transition:
      "border-color var(--transition-standard), background-color var(--transition-standard)",
    backgroundColor: isDragOver ? "var(--primary-pale)" : "var(--background-alt)",
  };

  const errorTextStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--font-size-caption)",
    color: "var(--error)",
    marginTop: "0.375rem",
    maxWidth: "none",
  };

  const revealBase: React.CSSProperties = {
    transition:
      "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "opacity, transform",
  };

  function focusHandler(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "var(--primary)";
    e.currentTarget.style.outline = "2px solid var(--primary)";
    e.currentTarget.style.outlineOffset = "2px";
  }

  function blurHandler(field?: string) {
    return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor =
        field && errors[field] ? "var(--error)" : "var(--border)";
      e.currentTarget.style.outline = "none";
    };
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        style={{
          maxWidth: 640,
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
          Demande de devis
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
          Decrivez votre projet. Devis gratuit, reponse sous 48h.
        </p>

        {/* Success state */}
        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
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
              Demande envoyee&nbsp;!
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--font-size-body)",
                color: "var(--muted-foreground)",
                maxWidth: "36ch",
                marginInline: "auto",
              }}
            >
              Merci pour votre demande. Je vous recontacte sous 48h pour en discuter.
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
            {/* Honeypot anti-bot — caché aux humains, rempli par les bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            {/* Error banner */}
            {status === "error" && (
              <div
                role="alert"
                aria-live="assertive"
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius)",
                  backgroundColor: "oklch(0.95 0.04 30)",
                  border: "1px solid var(--error)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-small)",
                    color: "var(--error)",
                    margin: 0,
                    maxWidth: "none",
                  }}
                >
                  Une erreur est survenue. Veuillez reessayer ou nous appeler directement.
                </p>
              </div>
            )}

            {/* Row 1: Nom + Prenom */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.5rem" }}>
              <div>
                <label htmlFor="cb-lastName" style={labelStyle}>
                  Nom
                </label>
                <input
                  ref={lastNameRef}
                  id="cb-lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Votre nom"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "cb-lastName-error" : undefined}
                  style={{
                    ...inputStyle,
                    borderColor: errors.lastName ? "var(--error)" : undefined,
                  }}
                  onFocus={focusHandler}
                  onBlur={blurHandler("lastName")}
                />
                {errors.lastName && <p id="cb-lastName-error" style={errorTextStyle}>{errors.lastName}</p>}
              </div>

              <div>
                <label htmlFor="cb-firstName" style={labelStyle}>
                  Pr&eacute;nom
                </label>
                <input
                  ref={firstNameRef}
                  id="cb-firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Votre pr&eacute;nom"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "cb-firstName-error" : undefined}
                  style={{
                    ...inputStyle,
                    borderColor: errors.firstName ? "var(--error)" : undefined,
                  }}
                  onFocus={focusHandler}
                  onBlur={blurHandler("firstName")}
                />
                {errors.firstName && <p id="cb-firstName-error" style={errorTextStyle}>{errors.firstName}</p>}
              </div>
            </div>

            {/* Row 2: Telephone */}
            <div>
              <label htmlFor="cb-phone" style={labelStyle}>
                T&eacute;l&eacute;phone
              </label>
              <input
                ref={phoneRef}
                id="cb-phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="06 00 00 00 00"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "cb-phone-error" : undefined}
                style={{
                  ...inputStyle,
                  borderColor: errors.phone ? "var(--error)" : undefined,
                }}
                onFocus={focusHandler}
                onBlur={blurHandler("phone")}
              />
              {errors.phone && <p id="cb-phone-error" style={errorTextStyle}>{errors.phone}</p>}
            </div>

            {/* Row 3: Email */}
            <div>
              <label htmlFor="cb-email" style={labelStyle}>
                Email
              </label>
              <input
                ref={emailRef}
                id="cb-email"
                type="email"
                required
                autoComplete="email"
                placeholder="votre@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "cb-email-error" : undefined}
                style={{
                  ...inputStyle,
                  borderColor: errors.email ? "var(--error)" : undefined,
                }}
                onFocus={focusHandler}
                onBlur={blurHandler("email")}
              />
              {errors.email && <p id="cb-email-error" style={errorTextStyle}>{errors.email}</p>}
            </div>

            {/* Row 4: Type de projet */}
            <fieldset
              style={{
                border: "none",
                padding: 0,
                margin: 0,
                minInlineSize: 0,
              }}
              aria-describedby={errors.projectType ? "cb-projectType-error" : undefined}
            >
              <legend style={{ ...labelStyle, padding: 0 }}>Type de projet</legend>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {PROJECT_TYPES.map((type) => (
                  <label
                    key={type}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--font-size-body)",
                      color: projectType === type ? "var(--foreground)" : "var(--muted-foreground)",
                      cursor: "pointer",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "var(--radius)",
                      border: `1.5px solid ${projectType === type ? "var(--primary)" : "var(--border)"}`,
                      backgroundColor: projectType === type ? "var(--primary-pale)" : "var(--card)",
                      transition: "all var(--transition-standard)",
                      userSelect: "none",
                    }}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type}
                      checked={projectType === type}
                      onChange={(e) => {
                        setProjectType(e.target.value);
                        if (e.target.value !== "Autre") setOtherProjectType("");
                      }}
                      style={{
                        accentColor: "var(--primary)",
                        width: 16,
                        height: 16,
                        margin: 0,
                        cursor: "pointer",
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
              {errors.projectType && <p id="cb-projectType-error" style={errorTextStyle}>{errors.projectType}</p>}

              {/* Champ conditionnel "Autre" */}
              {projectType === "Autre" && (
                <div style={{ marginTop: "0.75rem" }}>
                  <input
                    id="cb-otherProjectType"
                    type="text"
                    value={otherProjectType}
                    onChange={(e) => setOtherProjectType(e.target.value)}
                    placeholder="Pr&eacute;cisez votre type de projet"
                    aria-invalid={!!errors.otherProjectType}
                    aria-describedby={errors.otherProjectType ? "cb-otherProjectType-error" : undefined}
                    style={{
                      ...inputStyle,
                      borderColor: errors.otherProjectType ? "var(--error)" : undefined,
                    }}
                    onFocus={focusHandler}
                    onBlur={blurHandler("otherProjectType")}
                  />
                  {errors.otherProjectType && (
                    <p id="cb-otherProjectType-error" style={errorTextStyle}>{errors.otherProjectType}</p>
                  )}
                </div>
              )}
            </fieldset>

            {/* Row 5: Nature, taille et etat du support */}
            <div>
              <label htmlFor="cb-support" style={labelStyle}>
                Nature, taille et &eacute;tat du support
              </label>
              <textarea
                ref={supportRef}
                id="cb-support"
                rows={3}
                placeholder="D&eacute;crivez le support : mur int&eacute;rieur/ext&eacute;rieur, surface approximative, &eacute;tat actuel..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "5rem",
                }}
                onFocus={focusHandler}
                onBlur={blurHandler()}
              />
            </div>

            {/* Row 6: Idees concretes, inspirations */}
            <div>
              <label htmlFor="cb-inspirations" style={labelStyle}>
                Id&eacute;es concr&egrave;tes, inspirations
              </label>
              <textarea
                ref={inspirationsRef}
                id="cb-inspirations"
                rows={3}
                placeholder="D&eacute;crivez vos envies, partagez des r&eacute;f&eacute;rences ou des inspirations..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "5rem",
                }}
                onFocus={focusHandler}
                onBlur={blurHandler()}
              />
            </div>

            {/* File upload zone */}
            <div>
              <label style={labelStyle}>
                Pi&egrave;ces jointes{" "}
                <span style={{ fontWeight: 400, color: "var(--foreground-subtle)" }}>
                  (facultatif &mdash; photos du support, inspirations visuelles...)
                </span>
              </label>
              <div
                style={dropZoneStyle}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  aria-label="Ajouter des photos"
                />
                <UploadIcon />
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-small)",
                    color: "var(--foreground-subtitle)",
                    margin: "0.75rem 0 0.25rem",
                    maxWidth: "none",
                  }}
                >
                  Glissez vos photos ici ou cliquez pour parcourir
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--font-size-caption)",
                    color: "var(--foreground-subtle)",
                    margin: 0,
                    maxWidth: "none",
                  }}
                >
                  JPG, PNG, WebP — max {MAX_FILES} fichiers, 10 Mo chacun
                </p>
              </div>

              {/* Thumbnails */}
              {previews.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                    gap: "0.75rem",
                    marginTop: "1rem",
                  }}
                >
                  {previews.map((src, i) => (
                    <div
                      key={src}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "var(--radius-subtle)",
                        overflow: "hidden",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={files[i]?.name ?? "Apercu"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        aria-label={`Supprimer ${files[i]?.name}`}
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          backgroundColor: "var(--error)",
                          color: "#fff",
                          border: "2px solid var(--background)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: 700,
                          lineHeight: 1,
                          padding: 0,
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande de devis"}
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
function ContactInfo({ contact }: { contact: SiteContact }) {
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
          {/* Column 1 — L'atelier (masquée si pas d'adresse) */}
          {contact.address && (
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
                  {contact.address.line1}
                  {contact.address.line2 ? (
                    <>
                      <br />
                      {contact.address.line2}
                    </>
                  ) : null}
                </p>
              </address>
              {contact.address.mapsUrl && (
                <a
                  href={contact.address.mapsUrl}
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
              )}
            </div>
          )}

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
              {contact.instagramUrl && (
                <a
                  href={contact.instagramUrl}
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
                  {contact.instagramHandle}
                </a>
              )}

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted-foreground)";
                  }}
                >
                  {contact.email}
                </a>
              )}
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
export default function ContactContent({ contact }: { contact: SiteContact }) {
  return (
    <>
      <ContactHero phone={contact.phone} />
      <CallbackForm />
      <ContactInfo contact={contact} />
    </>
  );
}
