import type { Metadata } from "next";
import CoupsDeCoeurContent from "@/components/pages/portfolio/CoupsDeCoeurContent";
import { getTopLikedProjects } from "@/lib/queries/portfolio";

export const metadata: Metadata = {
  title: "Coups de cœur — Portfolio GUIHOME | Fresques murales",
  description:
    "Les réalisations préférées des visiteurs — fresques murales les plus aimées, classées automatiquement selon les likes.",
};

export default async function CoupsDeCoeurPage() {
  const projects = await getTopLikedProjects(5);
  return <CoupsDeCoeurContent projects={projects} />;
}
