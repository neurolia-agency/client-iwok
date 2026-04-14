"use client";

import { useState, useEffect } from "react";

interface LikeButtonProps {
  projectId: string;
  initialCount?: number;
}

const STORAGE_KEY = "iwok-likes";

function getLikedProjects(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function LikeButton({ projectId, initialCount = 0 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);

  // Verifier localStorage au mount
  useEffect(() => {
    if (getLikedProjects().includes(projectId)) {
      setLiked(true);
    }
  }, [projectId]);

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation(); // Empecher l'ouverture de la lightbox
    e.preventDefault();

    if (liked) return;

    // Optimistic update
    setLiked(true);
    setCount((c) => c + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    // Sauvegarder en localStorage
    const likedProjects = getLikedProjects();
    likedProjects.push(projectId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedProjects));

    // Appel API (fire-and-forget — le localStorage est la source de vérité)
    fetch(`/api/projects/${projectId}/like`, { method: "POST" }).catch(() => {
      // L'API Supabase peut échouer si les colonnes n'existent pas encore.
      // Le like reste persisté en localStorage.
    });
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
          transition:
            "fill 300ms ease, stroke 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
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
