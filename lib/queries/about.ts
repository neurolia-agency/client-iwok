import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export interface Chapter {
  number: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  bg: "dark" | "light" | "alt";
}

export interface Metric {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  isText?: boolean;
  textValue?: string;
}

/* ─── getAboutChapters ─────────────────────────────────── */

export const getAboutChapters = unstable_cache(
  async (): Promise<Chapter[]> => {
    const { data, error } = await supabase
      .from("iwok_about_chapters")
      .select("number, title, text, image, image_alt, bg")
      .eq("published", true)
      .order("sort_order");

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      number: row.number as string,
      title: row.title as string,
      text: row.text as string,
      image: row.image as string,
      imageAlt: row.image_alt as string,
      bg: row.bg as "dark" | "light" | "alt",
    }));
  },
  ["iwok-about"],
  { tags: ["iwok-about"], revalidate: 3600 }
);

/* ─── getMetrics ───────────────────────────────────────── */

export const getMetrics = unstable_cache(
  async (): Promise<Metric[]> => {
    const { data, error } = await supabase
      .from("iwok_settings")
      .select("value")
      .eq("key", "metrics")
      .single();

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    const metrics = data?.value as Record<string, unknown>[] | null;
    if (!Array.isArray(metrics)) return [];

    return metrics.map((m) => ({
      value: (m.value as number) ?? 0,
      prefix: (m.prefix as string) ?? "",
      suffix: (m.suffix as string) ?? "",
      label: (m.label as string) ?? "",
      ...(m.isText ? { isText: true, textValue: m.textValue as string } : {}),
    }));
  },
  ["iwok-metrics"],
  { tags: ["iwok-settings"], revalidate: 3600 }
);
