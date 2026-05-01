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

    // TODO(contact-storage): persister la demande (Supabase iwok_contact_requests
    // à créer) ou envoyer par email transactionnel (Resend). Aujourd'hui les
    // demandes sont seulement loguées côté serveur — à finaliser avant launch.
    console.log("[contact] new lead:", {
      ...parsed.data,
      filesCount: files.length,
      ip,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
