import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** Coefficient multiplicateur pour les projets coups de coeur de l'artiste */
const ARTIST_FAVORITE_COEFFICIENT = 3;

export async function GET() {
  const { data, error } = await supabase
    .from("iwok_projects")
    .select("id, title, likes, is_artist_favorite")
    .eq("published", true)
    .order("likes", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const scored = (data || [])
    .map((p) => ({
      ...p,
      score: (p.likes || 0) * (p.is_artist_favorite ? ARTIST_FAVORITE_COEFFICIENT : 1),
    }))
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({ projects: scored });
}
