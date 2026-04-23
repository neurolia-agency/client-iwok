"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface LikeButtonProps {
  projectId: string;
  /** Nombre de likes cote serveur */
  initialCount?: number;
  /** Afficher le compteur meme s'il est a 0 */
  showZero?: boolean;
}

const STORAGE_KEY = "iwok-liked-projects";

function readLikedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed);
    return new Set();
  } catch {
    return new Set();
  }
}

function persistLikedSet(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore quota errors */
  }
}

export default function LikeButton({
  projectId,
  initialCount = 0,
  showZero = false,
}: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Sync avec la valeur serveur au mount et chaque fois qu'elle change
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  // Etat "j'ai deja like" depuis localStorage
  useEffect(() => {
    setLiked(readLikedSet().has(projectId));
  }, [projectId]);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (busy) return;

      const wasLiked = liked;
      const nextLiked = !wasLiked;
      const delta = nextLiked ? 1 : -1;

      // UI optimiste
      setLiked(nextLiked);
      setCount((c) => Math.max(c + delta, 0));
      setPulse(true);
      setTimeout(() => setPulse(false), 450);

      const set = readLikedSet();
      if (nextLiked) set.add(projectId);
      else set.delete(projectId);
      persistLikedSet(set);

      setBusy(true);
      try {
        const res = await fetch(`/api/projects/${projectId}/like`, {
          method: nextLiked ? "POST" : "DELETE",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        window.dispatchEvent(new CustomEvent("iwok-like-update"));
      } catch {
        // Rollback en cas d'erreur reseau
        setLiked(wasLiked);
        setCount((c) => Math.max(c - delta, 0));
        const rollback = readLikedSet();
        if (wasLiked) rollback.add(projectId);
        else rollback.delete(projectId);
        persistLikedSet(rollback);
      } finally {
        setBusy(false);
      }
    },
    [busy, liked, projectId]
  );

  const displayCount = count;
  const hasLikes = displayCount > 0;

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      aria-pressed={liked}
      aria-label={`${liked ? "Retirer mon like" : "Aimer ce projet"} (${displayCount} like${displayCount !== 1 ? "s" : ""})`}
      whileTap={{ scale: 0.9 }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        background: liked
          ? "rgba(188, 91, 58, 0.18)"
          : "rgba(28, 25, 23, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: liked
          ? "1px solid rgba(188, 91, 58, 0.45)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius-pill)",
        padding: "0.375rem 0.625rem",
        cursor: "pointer",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={liked ? "var(--accent)" : "none"}
        stroke={liked ? "var(--accent)" : "rgba(255,255,255,0.7)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        animate={pulse ? { scale: [1, 1.35, 0.95, 1] } : { scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>

      {(hasLikes || showZero) && (
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: liked ? "var(--accent)" : "rgba(255,255,255,0.7)",
            lineHeight: 1,
            minWidth: "0.75rem",
            textAlign: "center",
          }}
        >
          {displayCount}
        </span>
      )}
    </motion.button>
  );
}
