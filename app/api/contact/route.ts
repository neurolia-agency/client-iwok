import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const projectType = formData.get("projectType") as string;
    const support = formData.get("support") as string;
    const inspirations = formData.get("inspirations") as string;

    // Validation serveur
    if (!lastName || !firstName || !phone || !email || !projectType) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 },
      );
    }

    // Fichiers (optionnel)
    const files = formData.getAll("files") as File[];

    // TODO: Envoyer par email (Resend, Nodemailer, etc.) ou stocker en base
    console.log("Demande de devis:", {
      lastName,
      firstName,
      phone,
      email,
      projectType,
      support,
      inspirations,
      filesCount: files.length,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
