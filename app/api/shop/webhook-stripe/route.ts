import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(opts: {
  to: { email: string; name?: string };
  subject: string;
  html: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: process.env.CONTACT_FROM_EMAIL ?? "noreply@guihome-art.com",
        name: "IWOK / GuiHome Décoration",
      },
      to: [opts.to],
      subject: opts.subject,
      htmlContent: opts.html,
    }),
  }).catch((err) => console.error("[webhook] brevo error:", err));
}

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.order_id;
  if (!orderId) {
    console.error("[webhook] order_id absent du metadata");
    return;
  }

  const customer = session.customer_details;
  const shipping = session.collected_information?.shipping_details ?? null;
  const isPickup = session.metadata?.delivery_mode === "pickup";
  const isQuote = session.metadata?.delivery_mode === "quote";

  // 1. Construire l'update dynamiquement
  const updateData: Record<string, unknown> = {
    status: "paid",
    paid_at: new Date().toISOString(),
    stripe_payment_intent_id:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
  };

  // Ne pas écraser si déjà rempli (cas quote_pending → pending)
  if (customer?.email) updateData.customer_email = customer.email;
  if (customer?.name || shipping?.name)
    updateData.customer_name = customer?.name ?? shipping?.name ?? "";
  if (customer?.phone) updateData.customer_phone = customer.phone;

  // Stripe ne collecte l'adresse que pour les commandes France/Pickup (pas quote)
  const stripeShipping = shipping;
  if (stripeShipping?.address?.line1) {
    updateData.shipping_line1 = stripeShipping.address.line1;
    updateData.shipping_line2 = stripeShipping.address.line2 ?? null;
    updateData.shipping_postal_code = stripeShipping.address.postal_code ?? "";
    updateData.shipping_city = stripeShipping.address.city ?? "";
    updateData.shipping_country = stripeShipping.address.country ?? "FR";
  }

  // Passer la commande en 'paid' (idempotent : uniquement si encore 'pending')
  const { error: updateError, count } = await supabase
    .from("iwok_orders")
    .update(updateData)
    .eq("id", orderId)
    .eq("status", "pending");

  if (updateError) {
    console.error("[webhook] update order error:", updateError.message);
    return;
  }

  // Si count === 0, le webhook a déjà été traité (idempotence)
  if (count === 0) {
    console.log("[webhook] commande déjà traitée, skip:", orderId);
    return;
  }

  // 2. Stock déjà décrémenté de façon atomique au moment du checkout (voir checkout/route.ts)
  //    Pour les commandes "quote" (international), le stock est décrémenté au moment de la
  //    soumission du formulaire dans quote/route.ts. Rien à faire ici.

  // 3. Emails Brevo
  const orderRef = orderId.slice(0, 8).toUpperCase();
  const fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

  const { data: order } = await supabase
    .from("iwok_orders")
    .select("total_cents, shipping_line1, shipping_line2, shipping_postal_code, shipping_city, shipping_country")
    .eq("id", orderId)
    .maybeSingle();

  const totalFormatted = fmt.format(((order?.total_cents as number) ?? 0) / 100);

  // Pour les commandes quote, l'adresse est déjà dans la DB
  const dbShippingLine1 = (order?.shipping_line1 as string | null) ?? "";
  const dbShippingLine2 = (order?.shipping_line2 as string | null) ?? null;
  const dbPostalCode = (order?.shipping_postal_code as string | null) ?? "";
  const dbCity = (order?.shipping_city as string | null) ?? "";
  const dbCountry = (order?.shipping_country as string | null) ?? "";

  // Email client
  const clientEmail = customer?.email || "";
  if (clientEmail) {
    const firstName = (customer?.name ?? "").split(" ")[0] || "cher client";

    await sendEmail({
      to: { email: clientEmail, name: customer?.name ?? "" },
      subject: `✅ Commande confirmée #${orderRef} — merci pour votre confiance !`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">

    <!-- Header -->
    <div style="background:#1c1917;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center">
      <p style="margin:0;font-size:11px;letter-spacing:3px;color:#a8956a;text-transform:uppercase;font-weight:600">IWOK / GuiHome Décoration</p>
      <h1 style="margin:12px 0 0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px">Commande confirmée !</h1>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:40px;border-left:1px solid #e8e3dc;border-right:1px solid #e8e3dc">

      <p style="margin:0 0 20px;font-size:16px;color:#1c1917">Bonjour <strong>${esc(firstName)}</strong>,</p>

      <p style="margin:0 0 24px;font-size:15px;color:#44403c;line-height:1.7">
        Un grand merci pour votre commande ! Votre paiement a bien été reçu et Guillaume va maintenant préparer votre œuvre avec tout le soin qu'elle mérite. ✨
      </p>

      <!-- Order recap -->
      <div style="background:#faf8f5;border-radius:12px;padding:20px 24px;margin:0 0 28px;border:1px solid #ece8e1">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#a8956a;text-transform:uppercase;font-weight:600">Votre commande</p>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#78716c">Référence</td>
            <td style="padding:6px 0;font-size:13px;font-weight:700;color:#1c1917;text-align:right">#${orderRef}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#78716c">Total réglé</td>
            <td style="padding:6px 0;font-size:13px;font-weight:700;color:#1c1917;text-align:right">${totalFormatted}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:13px;color:#78716c">${isPickup ? "Retrait" : "Adresse de livraison"}</td>
            <td style="padding:6px 0;font-size:13px;color:#1c1917;text-align:right">
              ${isPickup
                ? "5 Pl. de la Fontaine, 12510 Olemps<br><span style=\"font-size:11px;color:#78716c\">Guillaume vous contactera pour convenir d'un créneau.</span>"
                : isQuote
                ? `${esc(dbShippingLine1)}${dbShippingLine2 ? ", " + esc(dbShippingLine2) : ""}<br>${esc(dbPostalCode)} ${esc(dbCity)}<br>${esc(dbCountry)}`
                : `${esc(shipping?.address?.line1 ?? "")}${shipping?.address?.line2 ? ", " + esc(shipping.address.line2) : ""}<br>${esc(shipping?.address?.postal_code ?? "")} ${esc(shipping?.address?.city ?? "")}`
              }
            </td>
          </tr>
        </table>
      </div>

      <!-- Étapes suivantes -->
      <div style="background:#fef9f0;border-left:3px solid #a8956a;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 32px">
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1c1917">Et maintenant ?</p>
        <p style="margin:0;font-size:13px;color:#78716c;line-height:1.7">
          ${isPickup
            ? `Guillaume prépare votre commande et vous contactera pour convenir d'un créneau de retrait à l'adresse :<br><strong style="color:#1c1917">5 Pl. de la Fontaine, 12510 Olemps</strong>`
            : isQuote
            ? `Guillaume prépare votre commande avec soin. Vous recevrez un email dès l'expédition.`
            : `Guillaume prépare votre commande dans un délai de <strong style="color:#1c1917">5 à 10 jours ouvrés</strong>.
          Vous recevrez un second email dès l'expédition, avec votre numéro de suivi pour savoir exactement où se trouve votre colis.`
          }
        </p>
      </div>

      <p style="margin:0 0 8px;font-size:15px;color:#44403c;line-height:1.7">
        Suivez votre commande à tout moment sur
        <a href="https://www.guihome-art.com/shop/suivi" style="color:#a8956a;text-decoration:none">www.guihome-art.com/shop/suivi</a> avec votre email et la référence <strong>#${orderRef}</strong>.
      </p>
      <p style="margin:0 0 8px;font-size:15px;color:#44403c;line-height:1.7">
        Une question&nbsp;? Écrivez à
        <a href="mailto:contact@guihome-art.com" style="color:#a8956a;text-decoration:none">contact@guihome-art.com</a>, Guillaume vous répondra personnellement.
      </p>
      <p style="margin:0 0 32px;font-size:15px;color:#44403c;line-height:1.7">
        Encore merci de faire confiance à mon travail — c'est ce qui me donne envie de continuer à créer.
      </p>

      <p style="margin:0;font-size:14px;color:#78716c">À très bientôt,</p>
      <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#1c1917">Guillaume Jeanjean</p>
      <p style="margin:2px 0 0;font-size:12px;color:#a8956a;letter-spacing:1px;text-transform:uppercase">IWOK / GuiHome Décoration</p>
    </div>

    <!-- Footer -->
    <div style="background:#f0ede8;border-radius:0 0 16px 16px;padding:24px 40px;border:1px solid #e8e3dc;border-top:none;text-align:center">
      <p style="margin:0 0 4px;font-size:12px;color:#a09880">15 rue Bellevue — 12510 Olemps</p>
      <p style="margin:0;font-size:12px;color:#a09880">
        <a href="mailto:contact@guihome-art.com" style="color:#a8956a;text-decoration:none">contact@guihome-art.com</a>
        &nbsp;·&nbsp;
        <a href="https://www.instagram.com/guihomefresquesmurales" style="color:#a8956a;text-decoration:none">@guihomefresquesmurales</a>
      </p>
    </div>

  </div>
</body>
</html>
      `,
    });
  }

  // Notification Guillaume
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "contact@guihome-art.com";
  await sendEmail({
    to: { email: toEmail, name: "Guillaume" },
    subject: `🎉 Nouvelle commande #${orderRef} — ${totalFormatted}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#1c1917">
        <h2>Nouvelle commande reçue !</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
          <tr><td style="padding:6px 0;color:#666">Référence</td><td><strong>#${orderRef}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666">Client</td><td>${esc(customer?.name ?? "")} — ${esc(customer?.email ?? "")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Téléphone</td><td>${esc(customer?.phone ?? "—")}</td></tr>
          <tr><td style="padding:6px 0;color:#666;vertical-align:top">${isPickup ? "Mode" : "Livraison"}</td>
            <td>${isPickup
              ? "<strong>Retrait sur place</strong> — 5 Pl. de la Fontaine, 12510 Olemps"
              : isQuote
              ? `${esc(dbShippingLine1)}${dbShippingLine2 ? "<br>" + esc(dbShippingLine2) : ""}<br>${esc(dbPostalCode)} ${esc(dbCity)}<br>${esc(dbCountry)}`
              : `${esc(shipping?.address?.line1 ?? "")}${shipping?.address?.line2 ? "<br>" + esc(shipping.address.line2) : ""}<br>${esc(shipping?.address?.postal_code ?? "")} ${esc(shipping?.address?.city ?? "")}`
            }</td>
          </tr>
          <tr><td style="padding:6px 0;color:#666">Total</td><td><strong>${totalFormatted}</strong></td></tr>
        </table>
        <p>Va dans ton portail pour marquer la commande comme expédiée une fois le colis envoyé.</p>
        <hr style="margin:1.5rem 0;border:none;border-top:1px solid #e5e5e5">
        <p style="font-size:12px;color:#888">ID interne : ${orderId}</p>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Config webhook manquante" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error("[webhook] signature invalide:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleSessionCompleted(event.data.object as Stripe.Checkout.Session);
    }
  } catch (err) {
    console.error("[webhook] handler error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
