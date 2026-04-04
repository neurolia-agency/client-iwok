import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  project: string;
}

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const { data, error } = await supabase
      .from("iwok_testimonials")
      .select("quote, author, role, project")
      .eq("published", true)
      .order("sort_order");

    if (error) {
      console.error("IWOK query error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      quote: row.quote as string,
      author: row.author as string,
      role: row.role as string,
      project: row.project as string,
    }));
  },
  ["iwok-testimonials"],
  { tags: ["iwok-testimonials"], revalidate: 3600 }
);
