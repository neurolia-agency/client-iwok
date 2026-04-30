#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Génère un JWT longue durée signé avec le rôle Postgres `iwok_app`.
//
// Usage :
//   SUPABASE_JWT_SECRET="..." node scripts/generate-iwok-jwt.mjs
//
// Le JWT_SECRET se trouve dans : Supabase Dashboard → Project Settings →
// API → JWT Settings → JWT Secret.
//
// Le token généré est à coller dans la variable d'env `IWOK_DB_KEY` (Vercel
// + .env.local). Sa durée de vie est de 10 ans pour éviter les rotations
// involontaires — à régénérer manuellement si compromis.
// ---------------------------------------------------------------------------

import { createHmac } from "node:crypto";

const secret = process.env.SUPABASE_JWT_SECRET;

if (!secret) {
  console.error("❌  Variable SUPABASE_JWT_SECRET manquante.");
  console.error("");
  console.error("   Récupère-la depuis :");
  console.error("   Supabase Dashboard → Project Settings → API → JWT Secret");
  console.error("");
  console.error("   Puis lance :");
  console.error("   SUPABASE_JWT_SECRET=\"...\" node scripts/generate-iwok-jwt.mjs");
  process.exit(1);
}

const base64url = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const now = Math.floor(Date.now() / 1000);
const tenYears = 60 * 60 * 24 * 365 * 10;

const header = { alg: "HS256", typ: "JWT" };

const payload = {
  role: "iwok_app",
  iss: "supabase",
  iat: now,
  exp: now + tenYears,
};

const encodedHeader = base64url(JSON.stringify(header));
const encodedPayload = base64url(JSON.stringify(payload));
const signingInput = `${encodedHeader}.${encodedPayload}`;

const signature = createHmac("sha256", secret)
  .update(signingInput)
  .digest("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");

const token = `${signingInput}.${signature}`;

console.log("");
console.log("✅  JWT IWOK généré (rôle: iwok_app, durée: 10 ans)");
console.log("");
console.log("Token (à mettre dans IWOK_DB_KEY) :");
console.log("");
console.log(token);
console.log("");
console.log("Étapes suivantes :");
console.log("  1. Ajouter dans .env.local :");
console.log(`     IWOK_DB_KEY=${token}`);
console.log("  2. Ajouter dans Vercel → Project → Settings → Environment Variables :");
console.log(`     IWOK_DB_KEY = ${token}`);
console.log("  3. Retirer SUPABASE_SERVICE_ROLE_KEY de Vercel après vérification en prod");
console.log("");
