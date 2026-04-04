import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export const getSetting = unstable_cache(
  async (key: string): Promise<unknown> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error) {
      console.error("IWOK query error:", error.message);
      return null;
    }

    return data?.value ?? null;
  },
  ["iwok-settings"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);
