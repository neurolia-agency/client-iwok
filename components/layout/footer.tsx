import Link from "next/link";
import Image from "next/image";
import { getFooterConfig } from "@/lib/queries/footer";
import { getShopVisibility } from "@/lib/queries/shop";

const ALL_NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export default async function Footer() {
  const [config, shopVisibility] = await Promise.all([
    getFooterConfig(),
    getShopVisibility(),
  ]);
  const NAV_LINKS = shopVisibility.enabled
    ? ALL_NAV_LINKS
    : ALL_NAV_LINKS.filter((l) => l.href !== "/shop");
  const { contact } = config;
  const year = new Date().getFullYear();
  const copyright = config.copyright.replace("{year}", String(year));
  const hasContactBlock = Boolean(contact.address || contact.phone || contact.email);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Grille 4 colonnes */}
        <div className="footer-grid">
          {/* Colonne 1 — Identité */}
          <div className="footer-col">
            <Link href="/" aria-label="GUIHOME / GuiHome Décoration — Retour à l'accueil" style={{ display: "inline-flex" }}>
              <Image
                src="/images/logo/logo-blanc.png"
                alt="GUIHOME — GuiHome Décoration"
                width={110}
                height={44}
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            {config.tagline && (
              <p className="footer-baseline">{config.tagline}</p>
            )}
            {contact.instagramUrl && (
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram — ${contact.instagramHandle}`}
                className="footer-instagram"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {contact.instagramHandle}
              </a>
            )}
          </div>

          {/* Colonne 2 — Navigation */}
          <div className="footer-col">
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Services */}
          <div className="footer-col">
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-list">
              {config.servicesList.map((service) => (
                <li key={service}>
                  <span className="footer-text">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact (masquée si Guillaume a vidé tous les champs) */}
          {hasContactBlock && (
            <div className="footer-col">
              <h3 className="footer-col-title">Contact</h3>
              <address className="footer-address">
                {contact.address && (
                  <p className="footer-text" style={{ lineHeight: 1.6 }}>
                    {contact.address.line1}
                    {contact.address.line2 ? (
                      <>
                        <br />
                        {contact.address.line2}
                      </>
                    ) : null}
                  </p>
                )}
                {contact.phone && (
                  <p className="footer-text" style={{ lineHeight: 1.6 }}>
                    <a href={contact.phone.tel} className="footer-link">
                      {contact.phone.display}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p className="footer-text" style={{ lineHeight: 1.6 }}>
                    <a href={`mailto:${contact.email}`} className="footer-link">
                      {contact.email}
                    </a>
                  </p>
                )}
              </address>
            </div>
          )}
        </div>

        {/* Séparateur */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bas de page */}
        <div className="footer-bottom">
          <p className="footer-copyright">{copyright}</p>
          <div className="flex items-center gap-4">
            {shopVisibility.enabled && (
              <Link href="/shop/suivi" className="footer-legal-link">
                Suivre ma commande
              </Link>
            )}
            <Link href="/mentions-legales" className="footer-legal-link">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="footer-legal-link">
              Confidentialité
            </Link>
            <Link href="/cgv" className="footer-legal-link">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
