import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export interface Service {
  id: string;
  title: string;
  tagline: string;
  tag: string;
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
}

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from("iwok_services")
      .select(
        "id, title, tagline, tag, description, includes, image, image_alt"
      )
      .eq("published", true)
      .order("sort_order");

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id as string,
      title: row.title as string,
      tagline: row.tagline as string,
      tag: row.tag as string,
      description: row.description as string,
      includes: (row.includes as string[]) ?? [],
      image: row.image as string,
      imageAlt: row.image_alt as string,
    }));
  },
  ["iwok-services"],
  { tags: ["iwok-services"], revalidate: 3600 }
);
