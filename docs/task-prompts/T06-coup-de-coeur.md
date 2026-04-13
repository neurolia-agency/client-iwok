# Brief T06 : Systeme de likes gamifie (Coups de coeur)

## Contexte
Le client veut un systeme de "coups de coeur" gamifie sur les projets du portfolio. Chaque GalleryCard affiche un bouton coeur. Les visiteurs peuvent liker un projet (1 like par visiteur via localStorage). L'artiste peut marquer ses favoris en base (is_artist_favorite). Un score combine determine le classement des "Coups de coeur".

## Fichiers a creer
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/portfolio/LikeButton.tsx` (nouveau)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/app/api/projects/[id]/like/route.ts` (nouveau)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/app/api/projects/popular/route.ts` (nouveau)

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/portfolio/GalleryCard.tsx`

## Code actuel — GalleryCard.tsx (complet)
```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface GalleryCardProps {
  project: PortfolioProject;
  onClick?: () => void;
}

export default function GalleryCard({ project, onClick }: GalleryCardProps) {
  const coverImage = project.images[project.cover];
  const isPortrait = coverImage.height > coverImage.width;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button
      type="button"
      className="group"
      onClick={onClick}
      aria-label={`Voir le projet : ${project.title}`}
      style={{
        display: "block",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: 0,
        border: "none",
        padding: 0,
        cursor: "pointer",
        background: "none",
        breakInside: "avoid",
        marginBottom: "1rem",
        textAlign: "left",
      }}
    >
      <Image
        src={coverImage.src}
        alt={coverImage.alt}
        width={coverImage.width}
        height={coverImage.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
          aspectRatio: isPortrait ? "3 / 4" : `${coverImage.width} / ${coverImage.height}`,
          display: "block",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Hover overlay */}
      <div
        className="group-hover:opacity-100"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)",
          opacity: 0,
          transition: "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "flex",
          alignItems: "flex-end",
          padding: "1.25rem",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            transform: "translateY(6px)",
            transition:
              "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="group-hover:[transform:translateY(0)]"
        >
          <p
            style={{
              color: "var(--foreground-on-dark)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.3,
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </p>
          <span
            style={{
              display: "block",
              color: "var(--foreground-subtle)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-sans)",
              marginTop: "0.25rem",
            }}
          >
            {project.location} — {project.year}
            {project.images.length > 1 && (
              <> &middot; {project.images.length} photos</>
            )}
          </span>
        </div>
      </div>
    </button>
  );
}
```

## Cible
Ajouter un bouton coeur anime en bas a droite de chaque GalleryCard. Le coeur se remplit avec une animation scale bounce quand on clique. Un compteur de likes s'affiche a cote. L'anti-doublon est gere via localStorage.

## Instructions d'implementation

### Etape 1 : Creer LikeButton.tsx

```tsx
"use client";

import { useState, useEffect } from "react";

interface LikeButtonProps {
  projectId: string;
  initialCount?: number;
}

export default function LikeButton({ projectId, initialCount = 0 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);

  // Verifier localStorage au mount
  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem("iwok-likes") || "[]");
    if (likedProjects.includes(projectId)) {
      setLiked(true);
    }
  }, [projectId]);

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation(); // Empecher l'ouverture de la lightbox

    if (liked) return; // Deja like

    // Optimistic update
    setLiked(true);
    setCount(c => c + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    // Sauvegarder en localStorage
    const likedProjects = JSON.parse(localStorage.getItem("iwok-likes") || "[]");
    likedProjects.push(projectId);
    localStorage.setItem("iwok-likes", JSON.stringify(likedProjects));

    // Appel API
    try {
      await fetch(`/api/projects/${projectId}/like`, { method: "POST" });
    } catch {
      // Rollback en cas d'erreur
      setLiked(false);
      setCount(c => c - 1);
      const rollback = JSON.parse(localStorage.getItem("iwok-likes") || "[]");
      localStorage.setItem("iwok-likes", JSON.stringify(rollback.filter((id: string) => id !== projectId)));
    }
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      aria-label={liked ? "Vous aimez ce projet" : "Aimer ce projet"}
      aria-pressed={liked}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        background: "rgba(28, 25, 23, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius-pill)",
        padding: "0.375rem 0.625rem",
        cursor: liked ? "default" : "pointer",
        transition: "transform 150ms ease, background 200ms ease",
        transform: animating ? "scale(1.15)" : "scale(1)",
      }}
    >
      {/* Icone coeur SVG */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={liked ? "var(--accent)" : "none"}
        stroke={liked ? "var(--accent)" : "rgba(255,255,255,0.7)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{
          transition: "fill 300ms ease, stroke 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          transform: animating ? "scale(1.3)" : "scale(1)",
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Compteur */}
      {count > 0 && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: liked ? "var(--accent)" : "rgba(255,255,255,0.7)",
            lineHeight: 1,
            transition: "color 300ms ease",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
```

### Etape 2 : Integrer LikeButton dans GalleryCard

Ajouter le LikeButton dans le hover overlay, en bas a droite. Modifier le hover overlay pour avoir `justifyContent: "space-between"` au lieu de juste `alignItems: "flex-end"` :

```tsx
{/* Hover overlay — modifier pour ajouter le like */}
<div
  className="group-hover:opacity-100"
  style={{
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)",
    opacity: 0,
    transition: "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "1.25rem",
  }}
  aria-hidden="true"
>
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  }}>
    {/* Texte existant (titre, location, year) */}
    <div
      style={{
        transform: "translateY(6px)",
        transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="group-hover:[transform:translateY(0)]"
    >
      <p style={{ /* existant */ }}>
        {project.title}
      </p>
      <span style={{ /* existant */ }}>
        {project.location} — {project.year}
      </span>
    </div>

    {/* NOUVEAU : Like button */}
    <LikeButton projectId={project.id} />
  </div>
</div>
```

**Important** : le `aria-hidden="true"` sur le overlay va masquer le LikeButton aux lecteurs d'ecran. Il faut retirer `aria-hidden` du overlay ou deplacer le LikeButton en dehors du overlay (position absolute en bas a droite de la carte).

Solution recommandee : placer le LikeButton EN DEHORS du overlay, directement dans le `<button>` parent :
```tsx
{/* Like button — toujours visible, au-dessus de l'overlay */}
<div style={{
  position: "absolute",
  bottom: "0.75rem",
  right: "0.75rem",
  zIndex: 5,
  opacity: 0,
  transition: "opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
}} className="group-hover:opacity-100">
  <LikeButton projectId={project.id} />
</div>
```

### Etape 3 : API Route — POST /api/projects/[id]/like

```tsx
// app/api/projects/[id]/like/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Incrementer le compteur de likes dans la table iwok_projects
  // Suppose une colonne "likes" (integer, default 0) dans iwok_projects
  const { error } = await supabase.rpc("increment_project_likes", { project_id: id });

  if (error) {
    // Fallback : update direct
    const { data: project } = await supabase
      .from("iwok_projects")
      .select("likes")
      .eq("id", id)
      .single();

    if (project) {
      await supabase
        .from("iwok_projects")
        .update({ likes: (project.likes || 0) + 1 })
        .eq("id", id);
    }
  }

  return NextResponse.json({ success: true });
}
```

Note : Il faudra ajouter une colonne `likes` (integer default 0) et `is_artist_favorite` (boolean default false) a la table `iwok_projects` dans Supabase.

### Etape 4 : API Route — GET /api/projects/popular

```tsx
// app/api/projects/popular/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  // Score = likes * 1 + is_artist_favorite * 50 (coefficient)
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
    .map(p => ({
      ...p,
      score: (p.likes || 0) + (p.is_artist_favorite ? 50 : 0),
    }))
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({ projects: scored });
}
```

### Etape 5 : Schema Supabase (instructions SQL)

```sql
-- Ajouter les colonnes a iwok_projects
ALTER TABLE iwok_projects ADD COLUMN IF NOT EXISTS likes integer DEFAULT 0;
ALTER TABLE iwok_projects ADD COLUMN IF NOT EXISTS is_artist_favorite boolean DEFAULT false;

-- Fonction RPC pour incrementer atomiquement
CREATE OR REPLACE FUNCTION increment_project_likes(project_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE iwok_projects SET likes = likes + 1 WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;
```

Inclure ces instructions dans le brief pour que l'agent sache quoi executer dans Supabase.

## Tokens CSS disponibles
- `--accent: oklch(0.55 0.14 42)` (#BC5B3A) : couleur du coeur rempli
- `--accent-foreground: oklch(0.98 0.01 90)` : texte sur accent
- `--radius-pill: 9999px` : badge arrondi du like button
- `--font-sans` : police du compteur
- `--transition-standard: 300ms` : transitions generales

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires, sauf group-hover)
- `e.stopPropagation()` sur le clic du like (ne pas ouvrir la lightbox)
- localStorage pour l'anti-doublon cote client
- Optimistic update (UI reagit avant la reponse API)
- Cleanup des URL.createObjectURL non applicable ici (pas d'upload)

## Criteres d'acceptation
- [ ] Bouton coeur visible au hover de chaque GalleryCard
- [ ] Animation scale bounce quand on clique
- [ ] Coeur se remplit en couleur accent (#BC5B3A)
- [ ] Compteur de likes affiche a cote du coeur
- [ ] 1 seul like par visiteur (localStorage)
- [ ] Cliquer sur le coeur ne declenche PAS l'ouverture de la lightbox
- [ ] API POST /api/projects/[id]/like fonctionnelle
- [ ] API GET /api/projects/popular fonctionnelle
- [ ] Instructions SQL Supabase documentees
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser de classes Tailwind utilitaires (sauf group-hover)
- Ne PAS mettre le LikeButton dans un div avec aria-hidden="true"
- Ne PAS oublier e.stopPropagation()
- Ne PAS permettre les likes multiples (verifier localStorage AVANT l'appel API)
- Ne PAS bloquer l'UI en attendant la reponse API (optimistic update)
