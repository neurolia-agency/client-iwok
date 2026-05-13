import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const Schema = z.object({
  product_id: z.string().uuid(),
  customer_name: z.string().min(1).max(200),
  customer_email: z.string().email(),
  customer_phone: z.string().max(30).optional().default(""),
  shipping_line1: z.string().min(1).max(300),
  shipping_line2: z.string().max(300).optional().default(""),
  shipping_postal_code: z.string().min(1).max(20),
  shipping_city: z.string().min(1).max(100),
  shipping_country_code: z.string().min(2).max(10),
  shipping_country_name: z.string().min(1).max(100),
});

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
  }).catch((err) => console.error("[quote] brevo error:", err));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const {
      product_id,
      customer_name,
      customer_email,
      customer_phone,
      shipping_line1,
      shipping_line2,
      shipping_postal_code,
      shipping_city,
      shipping_country_code,
      shipping_country_name,
    } = parsed.data;

    // Charger le produit
    const { data: product, error: productError } = await supabase
      .from("iwok_shop_products")
      .select("id, slug, title, price_cents, image_url, stock, published")
      .eq("id", product_id)
      .eq("published", true)
      .maybeSingle();

    if (productError || !product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    const priceCents = product.price_cents as number;
    if (priceCents <= 0) {
      return NextResponse.json(
        { error: "Ce produit n'est pas disponible à la vente directe." },
        { status: 400 }
      );
    }

    const stock = product.stock as number | null;
    if (stock !== null && stock <= 0) {
      return NextResponse.json({ error: "Produit en rupture de stock." }, { status: 409 });
    }

    const orderId = crypto.randomUUID();
    const firstName = customer_name.split(" ")[0] || customer_name;
    const orderRef = orderId.slice(0, 8).toUpperCase();
    const fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
    const productPrice = fmt.format(priceCents / 100);

    // Insérer la commande
    const { error: orderError } = await supabase.from("iwok_orders").insert({
      id: orderId,
      status: "quote_pending",
      customer_name,
      customer_email,
      customer_phone: customer_phone || null,
      shipping_line1,
      shipping_line2: shipping_line2 || null,
      shipping_postal_code,
      shipping_city,
      shipping_country: shipping_country_name,
      subtotal_cents: priceCents,
      shipping_cost_cents: 0,
      total_cents: priceCents,
      currency: "EUR",
    });

    if (orderError) {
      console.error("[quote] insert order error:", orderError.message);
      return NextResponse.json(
        { error: "Erreur lors de la création de la commande." },
        { status: 500 }
      );
    }

    // Insérer les items
    await supabase.from("iwok_order_items").insert({
      order_id: orderId,
      product_id: product.id as string,
      title: product.title as string,
      slug: product.slug as string,
      price_cents: priceCents,
      quantity: 1,
      image_url: (product.image_url as string | null) ?? null,
    });

    // Email Guillaume
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "contact@guihome-art.com";
    await sendEmail({
      to: { email: toEmail, name: "Guillaume" },
      subject: `🌍 Commande internationale #${orderRef} — ${shipping_country_name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#1c1917">
          <h2>Nouvelle commande internationale</h2>
          <p>Un client hors France métropolitaine a passé commande. Il faut calculer les frais de port et lui envoyer un lien de paiement via le portail.</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
            <tr><td style="padding:6px 0;color:#666">Référence</td><td><strong>#${orderRef}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#666">Produit</td><td><strong>${esc(product.title as string)}</strong> — ${productPrice}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Client</td><td>${esc(customer_name)} — <a href="mailto:${esc(customer_email)}">${esc(customer_email)}</a></td></tr>
            ${customer_phone ? `<tr><td style="padding:6px 0;color:#666">Téléphone</td><td>${esc(customer_phone)}</td></tr>` : ""}
            <tr><td style="padding:6px 0;color:#666;vertical-align:top">Adresse</td><td>${esc(shipping_line1)}${shipping_line2 ? "<br>" + esc(shipping_line2) : ""}<br>${esc(shipping_postal_code)} ${esc(shipping_city)}<br><strong>${esc(shipping_country_name)}</strong></td></tr>
          </table>
          <p><strong>Action requise :</strong> Va dans le portail → Commandes → #${orderRef} pour saisir les frais de port et envoyer le lien de paiement au client.</p>
          <hr style="margin:1.5rem 0;border:none;border-top:1px solid #e5e5e5">
          <p style="font-size:12px;color:#888">ID interne : ${orderId} — Code pays : ${esc(shipping_country_code)}</p>
        </div>
      `,
    });

    // Email client
    await sendEmail({
      to: { email: customer_email, name: customer_name },
      subject: `Votre commande #${orderRef} est bien reçue — ${product.title as string}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="background:#1c1917;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center">
      <p style="margin:0;font-size:11px;letter-spacing:3px;color:#a8956a;text-transform:uppercase;font-weight:600">IWOK / GuiHome Décoration</p>
      <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px">Demande reçue !</h1>
    </div>
    <div style="background:#ffffff;padding:40px;border-left:1px solid #e8e3dc;border-right:1px solid #e8e3dc">
      <p style="margin:0 0 20px;font-size:16px;color:#1c1917">Bonjour <strong>${esc(firstName)}</strong>,</p>
      <p style="margin:0 0 24px;font-size:15px;color:#44403c;line-height:1.7">
        Votre demande de commande pour <strong>${esc(product.title as string)}</strong> a bien été reçue. 🎨
      </p>
      <div style="background:#fef9f0;border-left:3px solid #a8956a;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 28px">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1c1917">Et maintenant ?</p>
        <p style="margin:0;font-size:13px;color:#78716c;line-height:1.7">
          Pour une livraison en <strong>${esc(shipping_country_name)}</strong>, Guillaume calcule les frais de port personnalisés et vous envoie un lien de paiement <strong>sous 48h</strong>.<br>
          Vous n'avez rien à faire — gardez un œil sur votre boîte mail.
        </p>
      </div>
      <div style="background:#faf8f5;border-radius:12px;padding:20px 24px;margin:0 0 28px;border:1px solid #ece8e1">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#a8956a;text-transform:uppercase;font-weight:600">Récapitulatif</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;font-size:13px;color:#78716c">Référence</td><td style="padding:6px 0;font-size:13px;font-weight:700;color:#1c1917;text-align:right">#${orderRef}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#78716c">Produit</td><td style="padding:6px 0;font-size:13px;font-weight:700;color:#1c1917;text-align:right">${esc(product.title as string)}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#78716c">Prix</td><td style="padding:6px 0;font-size:13px;font-weight:700;color:#1c1917;text-align:right">${productPrice}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#78716c">Livraison vers</td><td style="padding:6px 0;font-size:13px;font-weight:700;color:#1c1917;text-align:right">${esc(shipping_country_name)}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:#78716c">Frais de port</td><td style="padding:6px 0;font-size:13px;color:#78716c;text-align:right">À définir par Guillaume</td></tr>
        </table>
      </div>
      <p style="margin:0 0 8px;font-size:15px;color:#44403c;line-height:1.7">
        Une question ? Écrivez à <a href="mailto:contact@guihome-art.com" style="color:#a8956a;text-decoration:none">contact@guihome-art.com</a>.
      </p>
      <p style="margin:24px 0 8px;font-size:14px;color:#78716c">À très bientôt,</p>
      <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#1c1917">Guillaume Jeanjean</p>
      <p style="margin:2px 0 0;font-size:12px;color:#a8956a;letter-spacing:1px;text-transform:uppercase">IWOK / GuiHome Décoration</p>
    </div>
    <div style="background:#f0ede8;border-radius:0 0 16px 16px;padding:24px 40px;border:1px solid #e8e3dc;border-top:none;text-align:center">
      <p style="margin:0 0 4px;font-size:12px;color:#a09880">15 rue Bellevue — 12510 Olemps</p>
      <p style="margin:0;font-size:12px;color:#a09880"><a href="mailto:contact@guihome-art.com" style="color:#a8956a;text-decoration:none">contact@guihome-art.com</a></p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ order_id: orderId });
  } catch (err) {
    console.error("[quote] unexpected error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
