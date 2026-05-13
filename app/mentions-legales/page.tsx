import { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Mentions légales | IWOK / GuiHome Décoration",
  description:
    "Mentions légales du site www.guihome-art.com — éditeur, hébergeur, propriété intellectuelle.",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-[var(--foreground)]">
      <h1 className="text-3xl font-bold font-display tracking-tight mb-2">
        Mentions légales
      </h1>
      <p className="text-sm text-[var(--foreground-muted)] mb-12">
        En vigueur au 1er janvier 2026 — applicables au site{" "}
        <span className="font-medium">www.guihome-art.com</span>
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-[var(--foreground-muted)]">

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            1. Éditeur du site
          </h2>
          <p>
            Le site <em>www.guihome-art.com</em> est édité par&nbsp;:
          </p>
          <p className="mt-2">
            <strong className="text-[var(--foreground)]">Guillaume Jeanjean</strong>, exerçant sous le nom commercial <strong className="text-[var(--foreground)]">IWOK / GuiHome Décoration</strong>.<br />
            Statut&nbsp;: entrepreneur individuel (auto-entrepreneur).<br />
            SIRET&nbsp;: 812 130 086 00018.<br />
            Code APE&nbsp;: 9003 A (création artistique relevant des arts plastiques).
          </p>
          <p className="mt-2">
            Adresse&nbsp;: 15 rue Bellevue, 12510 Olemps (France).<br />
            Email&nbsp;: <a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a>
          </p>
          <p className="mt-2">
            <strong className="text-[var(--foreground)]">Directeur de la publication</strong>&nbsp;: Guillaume Jeanjean.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            2. Hébergement
          </h2>
          <p>
            Le site est hébergé par&nbsp;:
          </p>
          <p className="mt-2">
            <strong className="text-[var(--foreground)]">Vercel Inc.</strong><br />
            440 N Barranca Avenue #4133<br />
            Covina, CA 91723 — États-Unis<br />
            Site&nbsp;: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] underline underline-offset-2">vercel.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            3. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu du site — œuvres, photographies, illustrations, textes, logos, graphismes — est la propriété exclusive de Guillaume Jeanjean (sauf mention contraire) et est protégé par le droit d&apos;auteur et le droit des marques.
          </p>
          <p className="mt-2">
            Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de ces éléments, par quelque procédé que ce soit, sans autorisation écrite préalable de l&apos;éditeur, est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            4. Données personnelles
          </h2>
          <p>
            Les données personnelles collectées sur ce site (formulaire de contact, commandes) font l&apos;objet d&apos;un traitement décrit dans la{" "}
            <a href="/politique-confidentialite" className="text-[var(--foreground)] underline underline-offset-2">politique de confidentialité</a>.
          </p>
          <p className="mt-2">
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi «&nbsp;Informatique et Libertés&nbsp;», vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données. Pour exercer ces droits, contactez&nbsp;:
            {" "}<a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            5. Cookies
          </h2>
          <p>
            Le site n&apos;utilise pas de cookies de suivi publicitaire ni d&apos;outils de tracking nécessitant un consentement préalable. Seuls les cookies strictement nécessaires au fonctionnement du site (session de paiement Stripe par exemple) peuvent être déposés. Voir la{" "}
            <a href="/politique-confidentialite" className="text-[var(--foreground)] underline underline-offset-2">politique de confidentialité</a> pour le détail.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            6. Responsabilité
          </h2>
          <p>
            L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations publiées sur le site, mais ne peut garantir l&apos;absence d&apos;erreurs ou d&apos;omissions. L&apos;utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
          </p>
          <p className="mt-2">
            L&apos;éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            7. Liens externes
          </h2>
          <p>
            Le site peut contenir des liens vers des sites tiers (notamment Instagram). L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de confidentialité ou leur fonctionnement.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            8. Droit applicable
          </h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>

      </div>
    </main>
  );
}
