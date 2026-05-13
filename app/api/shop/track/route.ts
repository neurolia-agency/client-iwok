import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const Schema = z.object({
  email: z.string().email(),
  ref: z.string().min(6).max(12),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const ref = parsed.data.ref.trim().toLowerCase();

    // Le ref est les 8 premiers caractères de l'UUID (id)
    // On filtre case-insensitive sur le préfixe + l'email
    const { data: order } = await supabase
      .from("iwok_orders")
      .select("id, customer_email")
      .ilike("id", `${ref}%`)
      .maybeSingle();

    if (!order) {
      return NextResponse.json(
        { error: "Aucune commande ne correspond à ces informations." },
        { status: 404 }
      );
    }

    const orderEmail = ((order.customer_email as string | null) ?? "").trim().toLowerCase();
    if (!orderEmail || orderEmail !== email) {
      return NextResponse.json(
        { error: "Aucune commande ne correspond à ces informations." },
        { status: 404 }
      );
    }

    return NextResponse.json({ order_id: order.id });
  } catch (err) {
    console.error("[track] error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
