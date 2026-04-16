"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LikeButtonProps {
  projectId: string;
  initialCount?: number;
  /** Afficher le compteur meme s'il est a 0 */
  showZero?: boolean;
}

const STORAGE_KEY = "iwok-likes";

/** Retourne le map { projectId: clickCount } */
export function getLikesMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Migration : ancien format string[] → nouveau format Record<string, number>
    if (Array.isArray(parsed)) {
      const migrated: Record<string, number> = {};
      for (const id of parsed) {
        migrated[id] = (migrated[id] || 0) + 1;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return parsed as Record<string, number>;
  } catch {
    return {};
  }
}

/** Retourne le nombre total de likes pour un projet */
export function getProjectLikes(projectId: string): number {
  return getLikesMap()[projectId] || 0;
}

export default function LikeButton({
  projectId,
  initialCount = 0,
  showZero = false,
}: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  // Charger le vrai compteur depuis localStorage au mount
  useEffect(() => {
    const likes = getProjectLikes(projectId);
    setCount(likes || initialCount);
  }, [projectId, initialCount]);

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      // Incrementer le compteur local
      const newCount = count + 1;
      setCount(newCount);
      setAnimating(true);

      // Particules visuelles (1 a 3 micro-coeurs)
      setParticles((prev) => [...prev, Date.now()]);
      setTimeout(() => setParticles((prev) => prev.slice(1)), 800);
      setTimeout(() => setAnimating(false), 500);

      // Sauvegarder en localStorage
      const likesMap = getLikesMap();
      likesMap[projectId] = newCount;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likesMap));

      // Emettre un event custom pour que CoupsDeCoeurContent puisse ecouter
      window.dispatchEvent(new CustomEvent("iwok-like-update"));

      // Appel API (fire-and-forget)
      fetch(`/api/projects/${projectId}/like`, { method: "POST" }).catch(
        () => {}
      );
    },
    [count, projectId]
  );

  const displayCount = count;
  const hasLikes = displayCount > 0;

  return (
    <motion.button
      type="button"
      onClick={handleLike}
      aria-label={`Aimer ce projet (${displayCount} like${displayCount !== 1 ? "s" : ""})`}
      whileTap={{ scale: 0.9 }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        background: hasLikes
          ? "rgba(188, 91, 58, 0.15)"
          : "rgba(28, 25, 23, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: hasLikes
          ? "1px solid rgba(188, 91, 58, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius-pill)",
        padding: "0.375rem 0.625rem",
        cursor: "pointer",
        overflow: "visible",
      }}
    >
      {/* Particules micro-coeurs */}
      <AnimatePresence>
        {particles.map((key) => (
          <motion.span
            key={key}
            initial={{ opacity: 1, scale: 0.5, y: 0, x: 0 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: -24,
              x: Math.random() * 16 - 8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "-2px",
              left: "50%",
              pointerEvents: "none",
              fontSize: "0.625rem",
            }}
            aria-hidden="true"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="var(--accent)"
              stroke="none"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Icone coeur SVG avec animation */}
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={hasLikes ? "var(--accent)" : "none"}
        stroke={hasLikes ? "var(--accent)" : "rgba(255,255,255,0.7)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        animate={
          animating
            ? { scale: [1, 1.4, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>

      {/* Compteur anime */}
      {(hasLikes || showZero) && (
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayCount}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: hasLikes ? "var(--accent)" : "rgba(255,255,255,0.7)",
              lineHeight: 1,
              minWidth: "0.75rem",
              textAlign: "center",
            }}
          >
            {displayCount}
          </motion.span>
        </AnimatePresence>
      )}
    </motion.button>
  );
}
