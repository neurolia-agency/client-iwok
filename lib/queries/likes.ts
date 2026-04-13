import { supabase } from "@/lib/supabase";

/* ─── getLikesMap ──────────────────────────────────────── */
/* Retourne un map { projectId: likeCount } pour tous les projets publiés */

export async function getLikesMap(): Promise<Record<string, number>> {
  const { data, error } = await supabase
    .from("iwok_projects")
    .select("id, likes")
    .eq("published", true);

  if (error) {
    console.error("IWOK likes query error:", error.message);
    return {};
  }

  const map: Record<string, number> = {};
  for (const row of data ?? []) {
    map[row.id as string] = (row.likes as number) ?? 0;
  }
  return map;
}

/* ─── incrementLike ───────────────────────────────────── */
/* Incrémente atomiquement le compteur de likes d'un projet */

export async function incrementLike(projectId: string): Promise<boolean> {
  const { error: rpcError } = await supabase.rpc("increment_project_likes", {
    project_id: projectId,
  });

  if (rpcError) {
    // Fallback : update direct
    const { data: project } = await supabase
      .from("iwok_projects")
      .select("likes")
      .eq("id", projectId)
      .single();

    if (!project) return false;

    const { error: updateError } = await supabase
      .from("iwok_projects")
      .update({ likes: (project.likes || 0) + 1 })
      .eq("id", projectId);

    return !updateError;
  }

  return true;
}

/* ─── getPopularProjects ──────────────────────────────── */
/* Retourne les projets classés par score de popularité */

const ARTIST_FAVORITE_COEFFICIENT = 50;

interface PopularProject {
  id: string;
  title: string;
  likes: number;
  is_artist_favorite: boolean;
  score: number;
}

export async function getPopularProjects(
  limit = 20
): Promise<PopularProject[]> {
  const { data, error } = await supabase
    .from("iwok_projects")
    .select("id, title, likes, is_artist_favorite")
    .eq("published", true)
    .order("likes", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("IWOK popular query error:", error.message);
    return [];
  }

  return (data || [])
    .map((p) => ({
      id: p.id as string,
      title: p.title as string,
      likes: (p.likes as number) || 0,
      is_artist_favorite: (p.is_artist_favorite as boolean) || false,
      score:
        ((p.likes as number) || 0) +
        (p.is_artist_favorite ? ARTIST_FAVORITE_COEFFICIENT : 0),
    }))
    .sort((a, b) => b.score - a.score);
}

/* ─── SQL Supabase (à exécuter manuellement) ──────────── */
/*
-- Ajouter les colonnes à iwok_projects
ALTER TABLE iwok_projects ADD COLUMN IF NOT EXISTS likes integer DEFAULT 0;
ALTER TABLE iwok_projects ADD COLUMN IF NOT EXISTS is_artist_favorite boolean DEFAULT false;

-- Fonction RPC pour incrémenter atomiquement
CREATE OR REPLACE FUNCTION increment_project_likes(project_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE iwok_projects SET likes = likes + 1 WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;
*/
