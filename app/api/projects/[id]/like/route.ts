import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  // Incrementer le compteur de likes via RPC atomique
  const { error: rpcError } = await supabase.rpc("increment_project_likes", {
    project_id: id,
  });

  if (rpcError) {
    // Fallback : update direct si la fonction RPC n'existe pas encore
    const { data: project } = await supabase
      .from("iwok_projects")
      .select("likes")
      .eq("id", id)
      .single();

    if (project) {
      const { error: updateError } = await supabase
        .from("iwok_projects")
        .update({ likes: (project.likes || 0) + 1 })
        .eq("id", id);

      if (updateError) {
        return NextResponse.json(
          { error: "Erreur lors du like" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Projet introuvable" },
        { status: 404 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
