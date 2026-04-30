import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client.
//
// Architecture isolation IWOK :
//   - SUPABASE_ANON_KEY  → header `apikey` (passe Kong gateway, accepte
//                          uniquement anon ou service_role à ce niveau).
//   - IWOK_DB_KEY        → header `Authorization: Bearer` (JWT signé avec
//                          le rôle Postgres `iwok_app`, limité aux tables
//                          iwok_* uniquement — c'est ce JWT qui détermine
//                          les permissions DB via RLS).
//
// Voir :
//   - supabase/migrations/20260430000000_iwok_app_role.sql
//   - scripts/generate-iwok-jwt.mjs
//   - docs/supabase-isolation-migration.md
//
// IWOK_DB_KEY ne doit JAMAIS être préfixé NEXT_PUBLIC_* ni envoyé au navigateur.
const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;
const iwokKey = process.env.IWOK_DB_KEY;

if (!url || !anonKey || !iwokKey) {
  throw new Error(
    "Supabase config manquante : SUPABASE_URL, SUPABASE_ANON_KEY ou " +
      "IWOK_DB_KEY non définie. Voir docs/supabase-isolation-migration.md."
  );
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    headers: {
      Authorization: `Bearer ${iwokKey}`,
    },
  },
});
