import { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | IWOK / GuiHome Décoration",
  description:
    "Conditions générales de vente applicables aux achats effectués sur la boutique en ligne www.guihome-art.com.",
  robots: { index: false },
};

export default function CGVPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-[var(--foreground)]">
      <h1 className="text-3xl font-bold font-display tracking-tight mb-2">
        Conditions Générales de Vente
      </h1>
      <p className="text-sm text-[var(--foreground-muted)] mb-12">
        En vigueur au 1er janvier 2026 — applicables à toute commande passée sur{" "}
        <span className="font-medium">www.guihome-art.com</span>
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-[var(--foreground-muted)]">

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            1. Identification du vendeur
          </h2>
          <p>
            Guillaume Jeanjean, exerçant sous le nom commercial <strong className="text-[var(--foreground)]">IWOK / GuiHome Décoration</strong>
            {" "}— auto-entrepreneur, SIRET 812 130 086 00018.
          </p>
          <p className="mt-2">
            Adresse : 15 rue Bellevue, 12510 Olemps (France)<br />
            Email : <a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            2. Objet
          </h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits (œuvres d&apos;art, impressions, créations originales) proposées sur la boutique en ligne accessible à l&apos;adresse <em>www.guihome-art.com/shop</em>. Toute commande implique l&apos;acceptation pleine et entière des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            3. Produits
          </h2>
          <p>
            Les produits proposés sont décrits avec la plus grande précision possible (titre, description, dimensions, visuels). Les photographies sont représentatives mais peuvent présenter de légères variations de couleur dues aux paramètres d&apos;affichage de votre écran.
          </p>
          <p className="mt-2">
            Chaque œuvre originale est unique. Les stocks sont mis à jour en temps réel ; si un produit venait à être épuisé après la validation de votre paiement, vous seriez remboursé intégralement dans les meilleurs délais.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            4. Prix
          </h2>
          <p>
            Les prix sont indiqués en euros (€), toutes taxes comprises (TVA non applicable — article 293B du CGI, régime de la franchise en base). Les frais de livraison sont indiqués séparément sur la page produit et récapitulés avant validation de la commande.
          </p>
          <p className="mt-2">
            Le vendeur se réserve le droit de modifier ses prix à tout moment. Les commandes sont facturées au tarif en vigueur au moment de la validation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            5. Commande et paiement
          </h2>
          <p>
            Les paiements sont traités de manière sécurisée par <strong className="text-[var(--foreground)]">Stripe</strong> (carte bancaire Visa, Mastercard, American Express). Aucune donnée bancaire n&apos;est stockée sur ce site.
          </p>
          <p className="mt-2">
            La commande est confirmée à réception du paiement. Un email de confirmation vous est envoyé automatiquement à l&apos;adresse fournie lors du paiement.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            6. Livraison
          </h2>
          <p>
            Les commandes sont expédiées vers la France métropolitaine, la Belgique, la Suisse, le Luxembourg et Monaco. Les frais de port sont calculés par produit et affichés sur la page de commande.
          </p>
          <p className="mt-2">
            Le délai de préparation est de <strong className="text-[var(--foreground)]">5 à 10 jours ouvrés</strong> à compter de la confirmation du paiement. La livraison est assurée par Colissimo ou un transporteur équivalent ; un numéro de suivi vous est transmis par email dès l&apos;expédition.
          </p>
          <p className="mt-2">
            En cas de retard de livraison imputable au transporteur, le vendeur ne pourra être tenu responsable mais s&apos;engage à tout mettre en œuvre pour faciliter le traitement de votre réclamation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            7. Droit de rétractation
          </h2>
          <p>
            Conformément à l&apos;article L221-18 du Code de la consommation, vous disposez d&apos;un droit de rétractation de <strong className="text-[var(--foreground)]">14 jours calendaires</strong> à compter de la réception de votre commande, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
          <p className="mt-2">
            Pour exercer ce droit, contactez-nous à{" "}
            <a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a>{" "}
            en indiquant votre numéro de commande et votre intention de vous rétracter.
          </p>
          <p className="mt-2">
            Le produit doit être retourné en parfait état, dans son emballage d&apos;origine, dans les 14 jours suivant votre notification. Les frais de retour sont à votre charge. Le remboursement sera effectué dans les 14 jours suivant la réception du retour, par le même moyen de paiement que celui utilisé lors de l&apos;achat.
          </p>
          <p className="mt-2">
            <strong className="text-[var(--foreground)]">Exception :</strong> le droit de rétractation ne s&apos;applique pas aux œuvres réalisées sur mesure ou personnalisées (article L221-28 du Code de la consommation).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            8. Garanties légales
          </h2>
          <p>
            Tous les produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil). En cas de produit défectueux ou non conforme, contactez-nous dans les 2 ans suivant la livraison.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            9. Propriété intellectuelle
          </h2>
          <p>
            L&apos;achat d&apos;une œuvre physique ne transfère pas les droits d&apos;auteur. Guillaume Jeanjean conserve l&apos;intégralité des droits sur ses créations. Toute reproduction, adaptation ou exploitation commerciale des œuvres sans accord préalable écrit est strictement interdite.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            10. Données personnelles
          </h2>
          <p>
            Les données collectées (nom, adresse, email, téléphone) sont utilisées exclusivement pour le traitement de votre commande et la communication relative à celle-ci. Elles ne sont jamais revendues à des tiers. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression en contactant{" "}
            <a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            11. Litiges
          </h2>
          <p>
            En cas de litige, une solution amiable sera recherchée en priorité. À défaut, vous pouvez recourir gratuitement à un médiateur de la consommation. Les présentes CGV sont soumises au droit français. Tout litige non résolu à l&apos;amiable relève de la compétence des tribunaux français.
          </p>
          <p className="mt-2">
            Plateforme européenne de règlement en ligne des litiges :{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] underline underline-offset-2"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

      </div>
    </main>
  );
}
