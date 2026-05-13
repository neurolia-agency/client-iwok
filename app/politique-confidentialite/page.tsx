import { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Politique de confidentialité | IWOK / GuiHome Décoration",
  description:
    "Politique de confidentialité et protection des données personnelles du site www.guihome-art.com.",
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-[var(--foreground)]">
      <h1 className="text-3xl font-bold font-display tracking-tight mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-[var(--foreground-muted)] mb-12">
        En vigueur au 1er janvier 2026 — conforme au RGPD et à la loi «&nbsp;Informatique et Libertés&nbsp;».
      </p>

      <div className="space-y-10 text-sm leading-relaxed text-[var(--foreground-muted)]">

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            1. Responsable du traitement
          </h2>
          <p>
            Les données personnelles collectées sur <em>www.guihome-art.com</em> sont traitées par&nbsp;:
          </p>
          <p className="mt-2">
            <strong className="text-[var(--foreground)]">Guillaume Jeanjean</strong> (IWOK / GuiHome Décoration)<br />
            15 rue Bellevue, 12510 Olemps (France)<br />
            SIRET 812 130 086 00018<br />
            Email&nbsp;: <a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            2. Données collectées et finalités
          </h2>

          <div className="mt-3 mb-3">
            <p className="text-[var(--foreground)] font-medium">Formulaire de contact / demande de devis</p>
            <p className="mt-1">Données collectées&nbsp;: nom, prénom, email, téléphone (optionnel), message.</p>
            <p>Finalité&nbsp;: répondre à votre demande, établir un devis personnalisé.</p>
            <p>Base légale&nbsp;: intérêt légitime du destinataire à répondre à une sollicitation commerciale.</p>
          </div>

          <div className="mt-4 mb-3">
            <p className="text-[var(--foreground)] font-medium">Commande boutique en ligne</p>
            <p className="mt-1">Données collectées&nbsp;: nom, email, téléphone, adresse postale complète, contenu de la commande, montant.</p>
            <p>Données de paiement&nbsp;: traitées exclusivement par Stripe (voir sous-traitants). Aucune donnée bancaire n&apos;est stockée par IWOK.</p>
            <p>Finalité&nbsp;: traiter la commande, organiser la livraison ou le retrait, émettre la facture, communiquer sur l&apos;avancement.</p>
            <p>Base légale&nbsp;: exécution du contrat de vente.</p>
          </div>

          <div className="mt-4">
            <p className="text-[var(--foreground)] font-medium">Suivi de commande</p>
            <p className="mt-1">Pour accéder à la page de suivi, le client utilise son email + référence de commande. Aucune donnée supplémentaire n&apos;est collectée à cette occasion.</p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            3. Durée de conservation
          </h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>Demandes de devis / contact&nbsp;: jusqu&apos;à <strong className="text-[var(--foreground)]">3 ans</strong> à compter du dernier échange.</li>
            <li>Données de commande (facturation, livraison)&nbsp;: <strong className="text-[var(--foreground)]">10 ans</strong> à compter de la commande (obligation comptable et fiscale française).</li>
            <li>Données de paiement&nbsp;: durée définie par Stripe (généralement 13 mois pour la lutte contre la fraude).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            4. Sous-traitants et destinataires
          </h2>
          <p>Pour le bon fonctionnement du site et des commandes, certaines données sont transmises à des sous-traitants&nbsp;:</p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-[var(--foreground)] font-medium">Stripe (paiement)</p>
              <p>
                Stripe Payments Europe Ltd — Dublin, Irlande.<br />
                Données transmises&nbsp;: nom, email, adresse de facturation/livraison, données de carte bancaire.<br />
                Politique&nbsp;: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] underline underline-offset-2">stripe.com/privacy</a>
              </p>
            </div>

            <div>
              <p className="text-[var(--foreground)] font-medium">Brevo (emails transactionnels)</p>
              <p>
                Brevo (ex-Sendinblue) — Paris, France.<br />
                Données transmises&nbsp;: nom, email pour l&apos;envoi des accusés de réception, confirmations de commande, suivis d&apos;expédition.<br />
                Politique&nbsp;: <a href="https://www.brevo.com/fr/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] underline underline-offset-2">brevo.com/legal/privacypolicy</a>
              </p>
            </div>

            <div>
              <p className="text-[var(--foreground)] font-medium">Supabase (base de données)</p>
              <p>
                Supabase Inc. — données hébergées en Europe (région Francfort).<br />
                Données transmises&nbsp;: ensemble des données de commande et de contact.<br />
                Politique&nbsp;: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] underline underline-offset-2">supabase.com/privacy</a>
              </p>
            </div>

            <div>
              <p className="text-[var(--foreground)] font-medium">Vercel (hébergement)</p>
              <p>
                Vercel Inc. — États-Unis. Données limitées aux logs serveur (adresse IP, user-agent).<br />
                Politique&nbsp;: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] underline underline-offset-2">vercel.com/legal/privacy-policy</a>
              </p>
            </div>

            <div>
              <p className="text-[var(--foreground)] font-medium">Colissimo / La Poste (livraison)</p>
              <p>
                Pour les commandes en livraison France, l&apos;adresse postale et le nom sont transmis à La Poste / Colissimo pour la prise en charge du colis.
              </p>
            </div>
          </div>

          <p className="mt-4">
            Aucune donnée n&apos;est revendue, louée, ou transmise à des tiers à des fins de prospection commerciale.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            5. Cookies et traceurs
          </h2>
          <p>
            Le site n&apos;utilise <strong className="text-[var(--foreground)]">aucun cookie publicitaire, aucun traceur Google Analytics, Meta Pixel, TikTok, ou similaire</strong>. Aucune bannière de consentement n&apos;est donc nécessaire.
          </p>
          <p className="mt-2">
            Les seuls cookies éventuellement déposés sont&nbsp;:
          </p>
          <ul className="mt-1 space-y-1 list-disc list-inside">
            <li>Des cookies strictement nécessaires au fonctionnement de Stripe pendant la procédure de paiement (gestion de session, lutte contre la fraude).</li>
            <li>Le cas échéant, des mesures d&apos;audience anonymes via Vercel Analytics (sans cookie, sans identifiant utilisateur, conforme RGPD sans consentement).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            6. Vos droits
          </h2>
          <p>
            Conformément au RGPD et à la loi «&nbsp;Informatique et Libertés&nbsp;», vous disposez à tout moment des droits suivants&nbsp;:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li><strong className="text-[var(--foreground)]">Droit d&apos;accès</strong>&nbsp;: obtenir confirmation que vos données sont traitées et en recevoir une copie.</li>
            <li><strong className="text-[var(--foreground)]">Droit de rectification</strong>&nbsp;: faire corriger des données inexactes ou incomplètes.</li>
            <li><strong className="text-[var(--foreground)]">Droit à l&apos;effacement</strong> («&nbsp;droit à l&apos;oubli&nbsp;»)&nbsp;: faire supprimer vos données (sous réserve des obligations légales de conservation).</li>
            <li><strong className="text-[var(--foreground)]">Droit à la portabilité</strong>&nbsp;: récupérer vos données dans un format structuré.</li>
            <li><strong className="text-[var(--foreground)]">Droit d&apos;opposition</strong>&nbsp;: vous opposer au traitement de vos données pour un motif légitime.</li>
            <li><strong className="text-[var(--foreground)]">Droit à la limitation</strong>&nbsp;: demander la suspension du traitement.</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, écrivez à <a href="mailto:contact@guihome-art.com" className="text-[var(--foreground)] underline underline-offset-2">contact@guihome-art.com</a> en précisant l&apos;objet de votre demande. Une réponse vous sera apportée dans un délai maximal d&apos;un mois.
          </p>
          <p className="mt-3">
            Vous disposez également du droit d&apos;introduire une réclamation auprès de la <strong className="text-[var(--foreground)]">CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés)&nbsp;: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] underline underline-offset-2">www.cnil.fr</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            7. Sécurité
          </h2>
          <p>
            Les données sont stockées sur des serveurs sécurisés (Supabase, hébergement Européen). Les communications sont chiffrées en HTTPS. Les paiements sont entièrement délégués à Stripe, certifié <strong className="text-[var(--foreground)]">PCI-DSS niveau 1</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
            8. Modification de la politique
          </h2>
          <p>
            La présente politique peut être modifiée à tout moment pour refléter des évolutions réglementaires ou techniques. La date de mise à jour est indiquée en haut de cette page.
          </p>
        </section>

      </div>
    </main>
  );
}
