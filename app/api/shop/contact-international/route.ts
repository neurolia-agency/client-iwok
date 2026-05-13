import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  country: z.string().min(1).max(100),
  product_title: z.string().min(1).max(300),
  product_slug: z.string().min(1).max(200),
  message: z.string().max(1000).optional().default(""),
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
  }).catch((err) => console.error("[contact-international] brevo error:", err));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    const { name, email, country, product_title, product_slug, message } = parsed.data;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guihome-art.com";
    const productUrl = `${siteUrl}/shop/${product_slug}`;
    const firstName = name.split(" ")[0] || name;

    // Email à Guillaume
    await sendEmail({
      to: {
        email: process.env.CONTACT_TO_EMAIL ?? "contact@guihome-art.com",
        name: "Guillaume",
      },
      subject: `🌍 Demande livraison internationale — ${product_title}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#1c1917">
          <h2 style="margin:0 0 1rem">Demande de livraison internationale</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
            <tr><td style="padding:6px 0;color:#666">Client</td><td><strong>${esc(name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${esc(email)}" style="color:#a8956a">${esc(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#666">Pays souhaité</td><td><strong>${esc(country)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#666">Produit</td><td><a href="${esc(productUrl)}" style="color:#a8956a">${esc(product_title)}</a></td></tr>
            ${message ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top">Message</td><td>${esc(message)}</td></tr>` : ""}
          </table>
          <p>Réponds directement à <a href="mailto:${esc(email)}" style="color:#a8956a">${esc(email)}</a> pour lui donner le tarif de port et la marche à suivre.</p>
        </div>
      `,
    });

    // Email de confirmation au client
    await sendEmail({
      to: { email, name },
      subject: `Votre demande de livraison internationale — ${product_title}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f2;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">

    <div style="background:#1c1917;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center">
      <p style="margin:0;font-size:11px;letter-spacing:3px;color:#a8956a;text-transform:uppercase;font-weight:600">IWOK / GuiHome Décoration</p>
      <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px">Demande bien reçue !</h1>
    </div>

    <div style="background:#ffffff;padding:40px;border-left:1px solid #e8e3dc;border-right:1px solid #e8e3dc">
      <p style="margin:0 0 20px;font-size:16px;color:#1c1917">Bonjour <strong>${esc(firstName)}</strong>,</p>

      <p style="margin:0 0 24px;font-size:15px;color:#44403c;line-height:1.7">
        Merci de votre intérêt pour <strong>${esc(product_title)}</strong>. Votre demande de livraison en <strong>${esc(country)}</strong> a bien été transmise à Guillaume.
      </p>

      <div style="background:#fef9f0;border-left:3px solid #a8956a;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 32px">
        <p style="margin:0;font-size:13px;color:#78716c;line-height:1.7">
          Guillaume vous répondra dans les meilleurs délais à cette adresse email avec les tarifs de port pour ${esc(country)} et la marche à suivre pour finaliser votre commande.
        </p>
      </div>

      <p style="margin:0 0 8px;font-size:15px;color:#44403c;line-height:1.7">
        Vous pouvez aussi le contacter directement à
        <a href="mailto:contact@guihome-art.com" style="color:#a8956a;text-decoration:none">contact@guihome-art.com</a>.
      </p>

      <p style="margin:24px 0 8px;font-size:14px;color:#78716c">À très bientôt,</p>
      <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#1c1917">Guillaume Jeanjean</p>
      <p style="margin:2px 0 0;font-size:12px;color:#a8956a;letter-spacing:1px;text-transform:uppercase">IWOK / GuiHome Décoration</p>
    </div>

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact-international] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
