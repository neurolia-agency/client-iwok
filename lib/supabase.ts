import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client (service_role key, never exposed to browser)
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
