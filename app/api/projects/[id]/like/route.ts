import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabase } from "@/lib/supabase";

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "0.0.0.0";
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  const ip = getClientIp(req);

  // Enregistre le couple (project, ip) — unique constraint rejette les doublons.
  const { error: lockError } = await supabase
    .from("iwok_project_likes_by_ip")
    .insert({ project_id: id, ip_address: ip });

  if (lockError) {
    // 23505 = unique_violation : cette IP a deja like ce projet
    if (lockError.code === "23505") {
      return NextResponse.json({ success: true, alreadyLiked: true });
    }
    return NextResponse.json(
      { error: lockError.message },
      { status: 500 }
    );
  }

  // Incremente le compteur atomiquement + stamp last_liked_at
  const { error: rpcError } = await supabase.rpc("increment_project_likes", {
    project_id: id,
  });

  if (rpcError) {
    // Fallback : update direct
    const { data: project } = await supabase
      .from("iwok_projects")
      .select("likes")
      .eq("id", id)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: "Projet introuvable" },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabase
      .from("iwok_projects")
      .update({
        likes: (project.likes || 0) + 1,
        last_liked_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json(
        { error: "Erreur lors du like" },
        { status: 500 }
      );
    }
  }

  // Invalide le cache du podium pour rafraichir le classement
  revalidateTag("iwok-projects");

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  const ip = getClientIp(req);

  // Supprime l'enregistrement IP->projet. Si aucune ligne matche, pas d'erreur.
  const { error: deleteError, count } = await supabase
    .from("iwok_project_likes_by_ip")
    .delete({ count: "exact" })
    .eq("project_id", id)
    .eq("ip_address", ip);

  if (deleteError) {
    return NextResponse.json(
      { error: deleteError.message },
      { status: 500 }
    );
  }

  // Rien n'a ete supprime : cette IP n'avait pas like ce projet → no-op.
  if (!count || count === 0) {
    return NextResponse.json({ success: true, wasLiked: false });
  }

  // Decremente le compteur (sans descendre sous 0)
  const { data: project } = await supabase
    .from("iwok_projects")
    .select("likes")
    .eq("id", id)
    .single();

  if (project) {
    const newLikes = Math.max((project.likes || 0) - 1, 0);
    await supabase
      .from("iwok_projects")
      .update({ likes: newLikes })
      .eq("id", id);
  }

  revalidateTag("iwok-projects");
  return NextResponse.json({ success: true, wasLiked: true });
}
