import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const projectType = formData.get("projectType") as string;
    const surface = formData.get("surface") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;

    // Validation serveur
    if (!name || !email || !phone || !projectType || !location || !description) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 },
      );
    }

    // Fichiers (optionnel)
    const files = formData.getAll("files") as File[];

    // TODO: Envoyer par email (Resend, Nodemailer, etc.) ou stocker en base
    console.log("Demande de devis:", {
      name,
      email,
      phone,
      projectType,
      surface,
      location,
      description,
      filesCount: files.length,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
