import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client.
// Utilise IWOK_DB_KEY : un JWT signé avec le rôle Postgres `iwok_app`,
// limité aux tables iwok_* uniquement. Voir :
//   - supabase/migrations/20260430000000_iwok_app_role.sql
//   - scripts/generate-iwok-jwt.mjs
//   - docs/supabase-isolation-migration.md
//
// Cette clé ne doit JAMAIS être préfixée NEXT_PUBLIC_* ni envoyée au navigateur.
const url = process.env.SUPABASE_URL;
const key = process.env.IWOK_DB_KEY;

if (!url || !key) {
  throw new Error(
    "Supabase config manquante : SUPABASE_URL ou IWOK_DB_KEY non définie. " +
      "Voir docs/supabase-isolation-migration.md."
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
