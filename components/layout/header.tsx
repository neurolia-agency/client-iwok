"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/portfolio", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionIsDark, setSectionIsDark] = useState(true);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // État initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu au changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Détecter si la section derrière la navbar est sombre via IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intersectingDarkSections = useRef<Set<Element>>(new Set());

  const setupObserver = useCallback(() => {
    // Nettoyer l'ancien observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    intersectingDarkSections.current.clear();

    // Hauteur de la navbar réduite (~60px), observer uniquement cette bande
    const navHeight = 60;

    // Observer : rootMargin coupe le viewport pour ne garder que la bande du header
    // top: 0, bottom: -(viewport - navHeight) → on observe seulement les 80px du haut
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingDarkSections.current.add(entry.target);
          } else {
            intersectingDarkSections.current.delete(entry.target);
          }
        }
        setSectionIsDark(intersectingDarkSections.current.size > 0);
      },
      {
        // On réduit la zone d'observation au bandeau du header
        rootMargin: `0px 0px -${window.innerHeight - navHeight}px 0px`,
        threshold: 0,
      }
    );

    // Collecter toutes les sections sombres du DOM
    const darkElements = new Set<Element>();

    // Par classe CSS
    document.querySelectorAll(".dark-section, .homepage-hero").forEach((el) => {
      darkElements.add(el);
    });

    // Par style inline (backgrounds sombres)
    document.querySelectorAll("section").forEach((section) => {
      const style = section.getAttribute("style") || "";
      if (
        style.includes("background-dark") ||
        style.includes("#1C1917") ||
        style.includes("1c1917") ||
        style.includes("C8962D") ||
        style.includes("c8962d")
      ) {
        darkElements.add(section);
      }
    });

    // Observer chaque section sombre
    darkElements.forEach((el) => observer.observe(el));

    // Si aucune section sombre trouvée, le fond est clair
    if (darkElements.size === 0) {
      setSectionIsDark(false);
    }

    observerRef.current = observer;
  }, []);

  useEffect(() => {
    // Petit délai pour laisser le DOM se construire après navigation
    const timer = setTimeout(setupObserver, 100);
    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname, setupObserver]);

  // Recalculer l'observer au resize (le rootMargin dépend de innerHeight)
  useEffect(() => {
    const handleResize = () => setupObserver();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [setupObserver]);

  // Quand le header est scrolled, il a son propre fond clair → logo sombre
  // Quand pas scrolled, on se fie à la section derrière
  // Quand le menu est ouvert, toujours logo blanc (fond sombre du menu)
  const isDark = menuOpen || (!scrolled && sectionIsDark);

  return (
    <>
      <header
        ref={headerRef}
        className={scrolled && !menuOpen ? "header-frosted" : undefined}
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 50,
          willChange: "background-color, backdrop-filter",
          transform: "translateZ(0)",
          transition:
            "background-color 420ms cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease, border-color 420ms ease",
          backgroundColor: menuOpen
            ? "transparent"
            : scrolled
              ? "color-mix(in oklch, var(--background) 88%, transparent)"
              : "transparent",
          backdropFilter:
            scrolled && !menuOpen ? "blur(14px)" : "none",
          WebkitBackdropFilter:
            scrolled && !menuOpen ? "blur(14px)" : "none",
          borderBottom:
            scrolled && !menuOpen
              ? "1px solid color-mix(in oklch, var(--foreground) 6%, transparent)"
              : "1px solid transparent",
          boxShadow:
            scrolled && !menuOpen
              ? "0 1px 16px -14px color-mix(in oklch, var(--foreground) 25%, transparent)"
              : "none",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0.75rem var(--container-padding)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo — crossfade entre blanc et noir pour transition fluide */}
          <Link
            href="/"
            aria-label="GUIHOME / GuiHome Décoration — Retour à l'accueil"
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexShrink: 0,
              position: "relative",
              height: "clamp(44px, 5vw, 56px)",
            }}
          >
            {/* Logo blanc (fond sombre) */}
            <Image
              src="/images/logo/logo-blanc.png"
              alt="GUIHOME — GuiHome Décoration"
              width={180}
              height={72}
              priority
              style={{
                height: "clamp(44px, 5vw, 56px)",
                width: "auto",
                objectFit: "contain",
                transition: "opacity 400ms ease, filter 400ms ease",
                opacity: isDark ? 1 : 0,
                filter: isDark
                  ? "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))"
                  : "none",
              }}
            />
            {/* Logo noir (fond clair) — positionné par-dessus */}
            <Image
              src="/images/logo/logo-noir.png"
              alt=""
              width={180}
              height={72}
              priority
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "clamp(44px, 5vw, 56px)",
                width: "auto",
                objectFit: "contain",
                transition: "opacity 400ms ease",
                opacity: isDark ? 0 : 1,
              }}
            />
          </Link>

          {/* Navigation desktop */}
          <nav
            aria-label="Navigation principale"
            style={{
              alignItems: "center",
              gap: "2.5rem",
            }}
            className="hidden lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
                isDark={isDark}
              />
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="cta-primary cta-primary--sm"
              style={{ whiteSpace: "nowrap" }}
            >
              Parler de mon projet
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex lg:hidden"
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              width: "2.5rem",
              height: "2.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              position: "relative",
              zIndex: 51, // Au-dessus du menu overlay
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  backgroundColor: menuOpen
                    ? "var(--foreground-on-dark)"
                    : isDark
                      ? "var(--foreground-on-dark)"
                      : "var(--foreground)",
                  transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease, background-color 350ms ease",
                  transformOrigin: "center",
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 1
                        ? "scaleX(0)"
                        : "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// Sous-composant NavLink avec underline animé
function NavLink({
  href,
  label,
  active,
  isDark,
}: {
  href: string;
  label: string;
  active: boolean;
  isDark: boolean;
}) {
  const baseColor = isDark ? "var(--foreground-subtle)" : "var(--foreground-subtitle)";
  const activeColor = isDark ? "var(--foreground-on-dark)" : "var(--foreground)";

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      style={{
        position: "relative",
        fontFamily: "var(--font-sans)",
        fontSize: "0.875rem",
        fontWeight: active ? 500 : 400,
        letterSpacing: "0.01em",
        color: active ? activeColor : baseColor,
        textDecoration: "none",
        padding: "0.25rem 0",
        transition: "color var(--transition-standard)",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLAnchorElement).style.color = activeColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLAnchorElement).style.color = baseColor;
        }
      }}
    >
      {label}
      {/* Underline Ocre */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: active ? "100%" : "0%",
          backgroundColor: "var(--primary)",
          transition: "width 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </Link>
  );
}
