import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const ProjectIdSchema = z.string().uuid();

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
  const { id: rawId } = await params;
  const parsed = ProjectIdSchema.safeParse(rawId);
  if (!parsed.success) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }
  const id = parsed.data;

  const ip = getClientIp(req);

  // Enregistre le couple (project, ip) — unique constraint rejette les doublons.
  const { error: lockError } = await supabase
    .from("iwok_project_likes_by_ip")
    .insert({ project_id: id, ip_address: ip });

  if (lockError) {
    if (lockError.code === "23505") {
      return NextResponse.json({ success: true, alreadyLiked: true });
    }
    console.error("[like] insert error:", lockError);
    return NextResponse.json(
      { error: "Erreur lors du like" },
      { status: 500 }
    );
  }

  const { error: rpcError } = await supabase.rpc("increment_project_likes", {
    project_id: id,
  });

  if (rpcError) {
    console.error("[like] rpc error, fallback to direct update:", rpcError);
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
      console.error("[like] update error:", updateError);
      return NextResponse.json(
        { error: "Erreur lors du like" },
        { status: 500 }
      );
    }
  }

  revalidateTag("iwok-projects");

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const parsed = ProjectIdSchema.safeParse(rawId);
  if (!parsed.success) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }
  const id = parsed.data;

  const ip = getClientIp(req);

  const { error: deleteError, count } = await supabase
    .from("iwok_project_likes_by_ip")
    .delete({ count: "exact" })
    .eq("project_id", id)
    .eq("ip_address", ip);

  if (deleteError) {
    console.error("[unlike] delete error:", deleteError);
    return NextResponse.json(
      { error: "Erreur lors du unlike" },
      { status: 500 }
    );
  }

  if (!count || count === 0) {
    return NextResponse.json({ success: true, wasLiked: false });
  }

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
