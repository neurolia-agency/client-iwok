"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { href: "/portfolio", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // État initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu au changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isDark = !scrolled && !menuOpen;

  return (
    <>
      <header
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 50,
          transition: "background-color 500ms ease, box-shadow 500ms ease",
          backgroundColor: scrolled
            ? "color-mix(in oklch, var(--background) 92%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "var(--shadow-subtle)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "1.25rem var(--container-padding)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="IWOK / GuiHome Décoration — Retour à l'accueil"
            style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
          >
            <Image
              src={isDark ? "/images/logo/logo-blanc.png" : "/images/logo/logo-noir.png"}
              alt="IWOK — GuiHome Décoration"
              width={120}
              height={48}
              priority
              style={{
                height: "clamp(32px, 4vw, 44px)",
                width: "auto",
                objectFit: "contain",
                transition: "opacity var(--transition-standard)",
              }}
            />
          </Link>

          {/* Navigation desktop */}
          <nav
            aria-label="Navigation principale"
            style={{
              display: "flex",
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
          <Link
            href="/contact"
            className="cta-primary cta-primary--sm hidden lg:inline-block"
            style={{ whiteSpace: "nowrap" }}
          >
            Parler de mon projet
          </Link>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="lg:hidden"
            style={{
              display: "flex",
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
