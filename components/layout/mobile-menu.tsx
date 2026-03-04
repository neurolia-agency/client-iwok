"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Verrouille le scroll body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      aria-hidden={!isOpen}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        backgroundColor: "var(--background-dark)",
        display: "flex",
        flexDirection: "column",
        padding: "6rem 2rem 3rem",
        pointerEvents: isOpen ? "auto" : "none",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(-12px)",
        transition:
          "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Liens navigation */}
      <nav aria-label="Menu principal mobile">
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${80 + i * 60}ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${80 + i * 60}ms`,
              }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={pathname === link.href ? "page" : undefined}
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color:
                    pathname === link.href
                      ? "var(--primary)"
                      : "var(--foreground-on-dark)",
                  textDecoration: "none",
                  transition: "color 250ms ease",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLAnchorElement).style.color =
                      "var(--primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLAnchorElement).style.color =
                      "var(--foreground-on-dark)";
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA devis */}
      <div
        style={{
          marginTop: "auto",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(12px)",
          transition:
            "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) 320ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 320ms",
        }}
      >
        <Link
          href="/contact"
          onClick={onClose}
          style={{
            display: "block",
            width: "100%",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-sans)",
            fontSize: "1.125rem",
            fontWeight: 500,
            textAlign: "center",
            padding: "1.125rem 2rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            transition: "background-color var(--transition-button)",
          }}
        >
          Demander un devis
        </Link>

        {/* Instagram */}
        <p
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            color: "var(--foreground-subtle)",
            textAlign: "center",
          }}
        >
          @guihomefresquesmurales
        </p>
      </div>
    </div>
  );
}
