import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Rate-limit en mémoire (best-effort, mono-instance) ────────────────
// Pour un site vitrine sur Vercel mono-région c'est suffisant. À remplacer
// par Upstash Redis le jour où on monte en charge ou multi-region.
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1h
const RATE_MAX = 5; // 5 demandes max par IP par heure
const ipHits = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

const ContactSchema = z.object({
  lastName: z.string().trim().min(1).max(100),
  firstName: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(254),
  projectType: z.string().trim().min(1).max(100),
  otherProjectType: z.string().trim().max(100).optional(),
  support: z.string().trim().max(2000).optional(),
  inspirations: z.string().trim().max(2000).optional(),
  // Honeypot : champ caché qui DOIT rester vide. Les bots le remplissent.
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez plus tard." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const raw = {
      lastName: formData.get("lastName")?.toString() ?? "",
      firstName: formData.get("firstName")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      projectType: formData.get("projectType")?.toString() ?? "",
      otherProjectType: formData.get("otherProjectType")?.toString() ?? "",
      support: formData.get("support")?.toString() ?? "",
      inspirations: formData.get("inspirations")?.toString() ?? "",
      website: formData.get("website")?.toString() ?? "",
    };

    // Honeypot rempli → on simule un succès sans rien faire
    if (raw.website && raw.website.length > 0) {
      console.warn("[contact] honeypot triggered, ip=", ip);
      return NextResponse.json({ success: true });
    }

    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    const files = formData.getAll("files") as File[];
    const data = parsed.data;

    // Envoi email à Guillaume via Brevo (Sendinblue) — API transactional v3
    const brevoKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!brevoKey || !toEmail || !fromEmail) {
      console.error("[contact] Brevo non configuré — BREVO_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL manquants");
      console.log("[contact] lead non envoyé:", { ...data, filesCount: files.length, ip });
      return NextResponse.json({ error: "Service email indisponible" }, { status: 503 });
    }

    // Échappement HTML — les données viennent déjà du parse zod, mais on
    // protège quand même contre toute injection dans le mail.
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const supportHtml = data.support ? `<p><strong>Support :</strong><br>${esc(data.support).replace(/\n/g, "<br>")}</p>` : "";
    const inspirationsHtml = data.inspirations ? `<p><strong>Inspirations :</strong><br>${esc(data.inspirations).replace(/\n/g, "<br>")}</p>` : "";
    const filesNote = files.length > 0 ? `<p><em>${files.length} fichier(s) joint(s) côté formulaire — non transmis dans cet email.</em></p>` : "";

    const htmlContent = `
      <h2>Nouvelle demande de devis — guihome-art.com</h2>
      <p><strong>${esc(data.firstName)} ${esc(data.lastName)}</strong></p>
      <ul>
        <li><strong>Téléphone :</strong> ${esc(data.phone)}</li>
        <li><strong>Email :</strong> <a href="mailto:${esc(data.email)}">${esc(data.email)}</a></li>
        <li><strong>Type de projet :</strong> ${esc(data.projectType)}</li>
      </ul>
      ${supportHtml}
      ${inspirationsHtml}
      ${filesNote}
      <hr>
      <p style="color:#888;font-size:12px;">IP : ${esc(ip)} — reçu le ${new Date().toLocaleString("fr-FR")}</p>
    `;

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: "Site IWOK" },
        to: [{ email: toEmail }],
        replyTo: { email: data.email, name: `${data.firstName} ${data.lastName}` },
        subject: `Demande de devis — ${data.firstName} ${data.lastName} (${data.projectType})`,
        htmlContent,
      }),
    });

    if (!brevoRes.ok) {
      const errBody = await brevoRes.text();
      console.error("[contact] brevo error:", brevoRes.status, errBody);
      return NextResponse.json({ error: "Envoi email échoué" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
