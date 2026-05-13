import Stripe from "stripe";

// Initialisation lazy pour éviter l'erreur au build si la clé n'est pas définie
// (Next.js évalue les modules au build, mais STRIPE_SECRET_KEY n'est disponible qu'au runtime).
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY manquante — voir .env.example");
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
    });
  }
  return _stripe;
}
