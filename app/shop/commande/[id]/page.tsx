import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Commande confirmée | IWOK",
  robots: { index: false, follow: false },
};

// Pas de cache — page transactionnelle
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

const PRICE_FORMATTER = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;

  // Valider le format UUID
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(id)) {
    return <ErrorPage message="Référence de commande invalide." />;
  }

  const { data: order } = await supabase
    .from("iwok_orders")
    .select("id, status, customer_name, customer_email, total_cents, subtotal_cents, shipping_cost_cents, shipping_country, shipping_line1, created_at, iwok_order_items(title, price_cents, quantity, image_url, slug)")
    .eq("id", id)
    .maybeSingle();

  if (!order) {
    return <ErrorPage message="Commande introuvable. Vérifiez le lien reçu par email." />;
  }

  const orderRef = (order.id as string).slice(0, 8).toUpperCase();
  const isPaid = order.status === "paid";
  const isQuotePending = order.status === "quote_pending";
  // Détection du mode : pas d'adresse renseignée = retrait
  const isPickup = isPaid && !((order.shipping_line1 as string | null) ?? "").trim();
  const shippingCountry = ((order.shipping_country as string | null) ?? "").trim();
  const isFrancePaid = isPaid && !isPickup && (shippingCountry === "FR" || shippingCountry.toLowerCase() === "france métropolitaine");
  const isIntlPaid = isPaid && !isPickup && !isFrancePaid;
  const items = (order.iwok_order_items as Array<{
    title: string;
    price_cents: number;
    quantity: number;
    image_url: string | null;
    slug: string;
  }>) ?? [];

  return (
    <main>
      <div
        className="container-custom"
        style={{
          paddingTop: "clamp(7rem, 12vh, 10rem)",
          paddingBottom: "clamp(4rem, 8vh, 6rem)",
          maxWidth: "640px",
        }}
      >
        {/* Icône */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "var(--primary-pale)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            fontSize: "1.75rem",
          }}
          aria-hidden="true"
        >
          {isQuotePending ? "⏳" : "✓"}
        </div>

        {/* Titre */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-heading)",
            marginBottom: "0.75rem",
            lineHeight: 1.1,
          }}
        >
          {isQuotePending
            ? "Demande bien reçue !"
            : isPaid
            ? "Commande confirmée !"
            : "Paiement en cours de validation…"}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body)",
            color: "var(--muted-foreground)",
            lineHeight: "var(--line-height-relaxed)",
            marginBottom: "2.5rem",
            maxWidth: "48ch",
          }}
        >
          {isQuotePending
            ? `Guillaume calcule les frais de port pour votre livraison en ${(order.shipping_country as string) || "votre pays"} et vous enverra un lien de paiement sous 48h.`
            : isPaid
            ? `Merci ${order.customer_name ? (order.customer_name as string).split(" ")[0] : ""} ! Un email de confirmation a été envoyé à ${order.customer_email as string}.`
            : "Votre paiement est en cours de traitement. Vous recevrez un email de confirmation dans quelques instants."}
        </p>

        {/* Récap commande */}
        <div
          style={{
            backgroundColor: "var(--background-alt)",
            borderRadius: "var(--radius)",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "1.25rem",
            }}
          >
            Référence commande : <strong style={{ color: "var(--foreground-heading)" }}>#{orderRef}</strong>
          </p>

          {/* Lignes produits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {item.image_url && (
                  <div
                    style={{
                      position: "relative",
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius-sm, 6px)",
                      overflow: "hidden",
                      flexShrink: 0,
                      backgroundColor: "var(--background)",
                    }}
                  >
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="56px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-body)",
                      color: "var(--foreground-heading)",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--muted-foreground)",
                      margin: 0,
                    }}
                  >
                    Qté : {item.quantity} × {PRICE_FORMATTER.format(item.price_cents / 100)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "0.375rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                Sous-total
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--foreground-heading)" }}>
                {PRICE_FORMATTER.format((order.subtotal_cents as number) / 100)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                Frais de port
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--foreground-heading)" }}>
                {isQuotePending
                  ? "À définir"
                  : (order.shipping_cost_cents as number) > 0
                  ? PRICE_FORMATTER.format((order.shipping_cost_cents as number) / 100)
                  : "—"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.375rem" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--foreground-heading)" }}>
                Total
              </span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--primary)" }}>
                {PRICE_FORMATTER.format((order.total_cents as number) / 100)}
              </span>
            </div>
          </div>
        </div>

        {/* Message livraison / retrait selon le mode */}
        {isPickup && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Retrait à&nbsp;: <strong>5 Pl. de la Fontaine, 12510 Olemps</strong>.<br />
            Guillaume vous contactera prochainement pour convenir d&apos;un créneau.
          </p>
        )}
        {isFrancePaid && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Délai de livraison estimé&nbsp;: <strong>5 à 10 jours ouvrés</strong> par Colissimo.<br />
            Vous recevrez un email dès l&apos;expédition avec votre numéro de suivi.
          </p>
        )}
        {isIntlPaid && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Guillaume prépare votre commande avec soin. Vous recevrez un email dès l&apos;expédition avec votre numéro de suivi.
          </p>
        )}
        {!isPaid && !isQuotePending && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Votre paiement est en cours de validation. Cette page se mettra à jour automatiquement dès la confirmation.
          </p>
        )}

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/shop" className="cta-primary">
            Retour à la boutique
          </Link>
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
            }}
          >
            Une question ? Contactez-nous
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorPage({ message }: { message: string }) {
  return (
    <main>
      <div
        className="container-custom"
        style={{
          paddingTop: "clamp(7rem, 12vh, 10rem)",
          paddingBottom: "clamp(4rem, 8vh, 6rem)",
          maxWidth: "480px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            color: "var(--foreground-heading)",
            marginBottom: "1rem",
          }}
        >
          Oups…
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            marginBottom: "2rem",
          }}
        >
          {message}
        </p>
        <Link href="/shop" className="cta-primary">
          Retour à la boutique
        </Link>
      </div>
    </main>
  );
}
