import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

const Schema = z.object({
  product_id: z.string().uuid(),
  delivery_mode: z.enum(["france", "pickup"]).optional().default("france"),
  customer_name: z.string().max(200).optional().default(""),
  customer_email: z.string().email().optional().or(z.literal("")).default(""),
});

function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    const { product_id, delivery_mode, customer_email } = parsed.data;

    // 1. Charger le produit
    const { data: product, error: productError } = await supabase
      .from("iwok_shop_products")
      .select("id, slug, title, price_cents, currency, image_url, stock, published, shipping_cost_cents")
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

    // 2. Décrémenter le stock de façon atomique pour éviter les conditions de course
    //    (deux clients achetant simultanément la dernière pièce unique)
    const initialStock = product.stock as number | null;
    if (initialStock !== null) {
      if (initialStock <= 0) {
        return NextResponse.json({ error: "Produit en rupture de stock." }, { status: 409 });
      }
      // UPDATE conditionnel : ne décrémente que si stock > 0. Si une autre commande
      // a déjà pris le stock, ce UPDATE n'affecte aucune ligne (count === 0).
      const { data: updatedRows, error: decrementError } = await supabase
        .from("iwok_shop_products")
        .update({ stock: initialStock - 1 })
        .eq("id", product.id as string)
        .gt("stock", 0)
        .select("id");

      if (decrementError) {
        console.error("[checkout] stock decrement error:", decrementError.message);
        return NextResponse.json({ error: "Erreur lors de la réservation du stock." }, { status: 500 });
      }
      if (!updatedRows || updatedRows.length === 0) {
        return NextResponse.json({ error: "Produit en rupture de stock." }, { status: 409 });
      }
    }

    const isPickup = delivery_mode === "pickup";
    const shippingCostCents = isPickup ? 0 : ((product.shipping_cost_cents as number) ?? 0);
    const currency = ((product.currency as string) ?? "EUR").toLowerCase();
    const totalCents = priceCents + shippingCostCents;

    // 3. Générer l'ID commande (avant la session Stripe pour l'insérer dans la success_url)
    const orderId = crypto.randomUUID();
    const base = siteUrl();

    // 4. Créer la session Stripe Checkout
    const lineItems = [
      {
        price_data: {
          currency,
          product_data: {
            name: product.title as string,
            ...(product.image_url ? { images: [product.image_url as string] } : {}),
          },
          unit_amount: priceCents,
        },
        quantity: 1,
      },
    ];

    if (shippingCostCents > 0) {
      lineItems.push({
        price_data: {
          currency,
          product_data: { name: "Frais de port — Colissimo" },
          unit_amount: shippingCostCents,
        },
        quantity: 1,
      });
    }

    // Helper: restaurer le stock en cas d'échec ultérieur (rollback)
    async function rollbackStock() {
      if (initialStock === null) return;
      try {
        await supabase
          .from("iwok_shop_products")
          .update({ stock: initialStock })
          .eq("id", product!.id as string);
      } catch {
        /* best-effort */
      }
    }

    let session;
    try {
      session = await getStripe().checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        ...(isPickup ? {} : { shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] } }),
        phone_number_collection: { enabled: true },
        ...(customer_email ? { customer_email } : {}),
        success_url: `${base}/shop/commande/${orderId}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${base}/shop/${product.slug as string}`,
        metadata: { order_id: orderId, product_id: product.id as string, delivery_mode },
      });
    } catch (stripeErr) {
      console.error("[checkout] stripe error:", stripeErr);
      await rollbackStock();
      return NextResponse.json({ error: "Erreur lors de la création du paiement." }, { status: 500 });
    }

    // 5. Insérer la commande en base (status=pending — sera passée à 'paid' par le webhook)
    const { error: orderError } = await supabase.from("iwok_orders").insert({
      id: orderId,
      stripe_session_id: session.id,
      status: "pending",
      // Champs client/livraison remplis par le webhook (Stripe les collecte pendant le checkout)
      customer_email: "",
      customer_name: "",
      shipping_line1: "",
      shipping_postal_code: "",
      shipping_city: "",
      subtotal_cents: priceCents,
      shipping_cost_cents: shippingCostCents,
      total_cents: totalCents,
      currency: currency.toUpperCase(),
    });

    if (orderError) {
      console.error("[checkout] supabase insert error:", orderError.message);
      // La session Stripe est créée mais l'ordre DB a échoué — on annule la session ET on restaure le stock
      await getStripe().checkout.sessions.expire(session.id).catch(() => {});
      await rollbackStock();
      return NextResponse.json({ error: "Erreur lors de la création de la commande." }, { status: 500 });
    }

    // 6. Insérer la ligne de commande (snapshot produit)
    await supabase.from("iwok_order_items").insert({
      order_id: orderId,
      product_id: product.id as string,
      title: product.title as string,
      slug: product.slug as string,
      price_cents: priceCents,
      quantity: 1,
      image_url: (product.image_url as string | null) ?? null,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] unexpected error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
