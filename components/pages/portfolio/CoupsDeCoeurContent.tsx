"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Lightbox from "./Lightbox";
import LikeButton, { getLikesMap } from "./LikeButton";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/data/portfolio-projects";

/** Coefficient multiplicateur pour les projets "coups de coeur" du client */
const COUP_DE_COEUR_MULTIPLIER = 3;

interface ScoredProject {
  project: PortfolioProject;
  likes: number;
  score: number;
  isFavorite: boolean;
}

/** Calcule le classement de tous les projets */
function computeRanking(): ScoredProject[] {
  const likesMap = getLikesMap();

  return PORTFOLIO_PROJECTS.map((project) => {
    const likes = likesMap[project.id] || 0;
    const isFavorite = project.section === "coups-de-coeur";
    const score = isFavorite ? likes * COUP_DE_COEUR_MULTIPLIER : likes;

    return { project, likes, score, isFavorite };
  })
    .filter((entry) => entry.likes > 0 || entry.isFavorite)
    .sort((a, b) => {
      // Tri par score desc, puis par likes desc, puis favorites en premier
      if (b.score !== a.score) return b.score - a.score;
      if (b.likes !== a.likes) return b.likes - a.likes;
      return a.isFavorite ? -1 : 1;
    });
}

/* ─── Podium Card ──────────────────────────────────────── */

function PodiumCard({
  entry,
  rank,
  onOpen,
}: {
  entry: ScoredProject;
  rank: 1 | 2 | 3;
  onOpen: () => void;
}) {
  const cover = entry.project.images[entry.project.cover];
  const [loaded, setLoaded] = useState(false);

  const medals: Record<number, { label: string; className: string }> = {
    1: { label: "1er", className: "podium-card--gold" },
    2: { label: "2e", className: "podium-card--silver" },
    3: { label: "3e", className: "podium-card--bronze" },
  };
  const medal = medals[rank];

  return (
    <motion.div
      className={`podium-card ${medal.className}`}
      style={{ order: rank === 1 ? 1 : rank === 2 ? 0 : 2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
    >
      <div className="podium-card-badge">{medal.label}</div>
      <div
        role="button"
        tabIndex={0}
        className="podium-card-image"
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-label={`Voir : ${entry.project.title}`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(max-width: 640px) 90vw, 30vw"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>
      <div className="podium-card-info">
        <p className="podium-card-title">{entry.project.title}</p>
        <span className="podium-card-meta">
          {entry.project.location} &mdash; {entry.project.year}
        </span>
        {/* Score details */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.375rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.6875rem",
            color: "var(--muted-foreground)",
          }}
        >
          <span>
            {entry.likes} like{entry.likes !== 1 ? "s" : ""}
          </span>
          {entry.isFavorite && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "var(--primary-pale)",
                color: "var(--primary-dark)",
                padding: "0.125rem 0.375rem",
                borderRadius: "var(--radius-pill)",
                fontSize: "0.625rem",
                fontWeight: 600,
              }}
            >
              x{COUP_DE_COEUR_MULTIPLIER}
            </span>
          )}
          {entry.score > 0 && (
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>
              = {entry.score} pts
            </span>
          )}
        </div>
      </div>
      <div className="podium-card-like">
        <LikeButton projectId={entry.project.id} initialCount={entry.likes} />
      </div>
    </motion.div>
  );
}

/* ─── Ranked Card (outside podium) ────────────────────── */

function RankedCard({
  entry,
  rank,
  onOpen,
}: {
  entry: ScoredProject;
  rank: number;
  onOpen: () => void;
}) {
  const cover = entry.project.images[entry.project.cover];
  const isPortrait = cover.height > cover.width;

  return (
    <motion.div
      className="gallery-card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Voir le projet : ${entry.project.title}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(rank * 0.05, 0.4) }}
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
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        loading="lazy"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
          aspectRatio: isPortrait
            ? "3 / 4"
            : `${cover.width} / ${cover.height}`,
          display: "block",
        }}
      />

      {/* Rank badge */}
      <div
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          zIndex: 5,
          background: "rgba(28, 25, 23, 0.7)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          color: "var(--foreground-on-dark)",
          fontFamily: "var(--font-heading)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          padding: "0.1875rem 0.5rem",
          borderRadius: "var(--radius-pill)",
          letterSpacing: "0.02em",
        }}
      >
        #{rank}
      </div>

      {/* Overlay */}
      <div
        className="gallery-card-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)",
          display: "flex",
          alignItems: "flex-end",
          padding: "1.25rem",
        }}
        aria-hidden="true"
      >
        <div className="gallery-card-text">
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
            {entry.project.title}
          </p>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--foreground-subtle)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-sans)",
              marginTop: "0.25rem",
            }}
          >
            {entry.project.location} &mdash; {entry.project.year}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              &middot;
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="var(--accent)"
                stroke="none"
                style={{ marginLeft: "0.125rem" }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {entry.likes}
              {entry.isFavorite && (
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                  (x{COUP_DE_COEUR_MULTIPLIER})
                </span>
              )}
            </span>
          </span>
        </div>
      </div>

      {/* Like button */}
      <div
        className="gallery-card-like"
        style={{
          position: "absolute",
          bottom: "0.75rem",
          right: "0.75rem",
          zIndex: 5,
        }}
      >
        <LikeButton projectId={entry.project.id} initialCount={entry.likes} />
      </div>
    </motion.div>
  );
}

/* ─── Main Content ─────────────────────────────────────── */

export default function CoupsDeCoeurContent() {
  const [ranking, setRanking] = useState<ScoredProject[]>([]);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [mounted, setMounted] = useState(false);

  const refreshRanking = useCallback(() => {
    setRanking(computeRanking());
  }, []);

  useEffect(() => {
    setMounted(true);
    refreshRanking();
  }, [refreshRanking]);

  // Ecouter les events de like pour rafraichir le classement
  useEffect(() => {
    if (!mounted) return;

    const handler = () => refreshRanking();
    window.addEventListener("iwok-like-update", handler);

    // Fallback polling pour les changements depuis d'autres onglets
    const onStorage = (e: StorageEvent) => {
      if (e.key === "iwok-likes") refreshRanking();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("iwok-like-update", handler);
      window.removeEventListener("storage", onStorage);
    };
  }, [mounted, refreshRanking]);

  if (!mounted) {
    return (
      <section
        className="container-custom"
        style={{ paddingTop: "7rem", paddingBottom: "var(--spacing-group)" }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/portfolio"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--font-size-small)",
              color: "var(--muted-foreground)",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            &larr; Portfolio
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            Coups de c&oelig;ur
          </h1>
        </div>
      </section>
    );
  }

  const totalLikes = ranking.reduce((sum, e) => sum + e.likes, 0);
  const podium = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  return (
    <section
      className="container-custom"
      style={{ paddingTop: "7rem", paddingBottom: "var(--spacing-group)" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <Link
          href="/portfolio"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-small)",
            color: "var(--muted-foreground)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "1rem",
          }}
        >
          &larr; Portfolio
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--foreground)",
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Coups de c&oelig;ur
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-small)",
            color: "var(--muted-foreground)",
            marginTop: "0.5rem",
          }}
        >
          {ranking.length > 0
            ? `${ranking.length} projet${ranking.length > 1 ? "s" : ""} class\u00e9${ranking.length > 1 ? "s" : ""} \u2014 ${totalLikes} like${totalLikes !== 1 ? "s" : ""} au total`
            : "Cliquez sur les c\u0153urs dans le portfolio pour cr\u00e9er votre classement"}
        </p>
        {ranking.length > 0 && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "var(--foreground-subtle)",
              marginTop: "0.25rem",
              maxWidth: "none",
            }}
          >
            Les projets de la s&eacute;lection de l&rsquo;artiste b&eacute;n&eacute;ficient d&rsquo;un
            coefficient x{COUP_DE_COEUR_MULTIPLIER}
          </p>
        )}
      </div>

      {/* Empty state */}
      {ranking.length === 0 && (
        <div className="coups-empty">
          <div className="coups-empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="coups-empty-title">
            Aucun coup de c&oelig;ur pour le moment
          </h2>
          <p className="coups-empty-text">
            Explorez le portfolio et cliquez sur les c&oelig;urs des
            r&eacute;alisations qui vous plaisent. Chaque clic compte
            et fait monter le projet dans le classement.
          </p>
          <Link href="/portfolio" className="cta-primary">
            Explorer le portfolio
          </Link>
        </div>
      )}

      {/* Podium — top 3 */}
      {podium.length > 0 && (
        <div className="podium-container">
          {podium.map((entry, i) => (
            <PodiumCard
              key={entry.project.id}
              entry={entry}
              rank={(i + 1) as 1 | 2 | 3}
              onOpen={() => setActiveProject(entry.project)}
            />
          ))}
          {/* Placeholders if less than 3 */}
          {podium.length < 3 &&
            Array.from({ length: 3 - podium.length }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="podium-card podium-card--empty"
                style={{
                  order:
                    podium.length + i === 1 ? 0 : podium.length + i,
                }}
              >
                <div className="podium-card-badge">
                  {podium.length + i + 1 === 1
                    ? "1er"
                    : `${podium.length + i + 1}e`}
                </div>
                <div className="podium-card-image podium-card-image--empty">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--muted-foreground)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.4 }}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="podium-card-info">
                  <p className="podium-card-title" style={{ opacity: 0.3 }}>
                    En attente...
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Remaining ranked projects */}
      {rest.length > 0 && (
        <>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              fontWeight: 600,
              color: "var(--foreground)",
              margin: "3rem 0 1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Classement complet
          </h2>
          <div className="masonry-grid">
            {rest.map((entry, i) => (
              <RankedCard
                key={entry.project.id}
                entry={entry}
                rank={i + 4}
                onOpen={() => setActiveProject(entry.project)}
              />
            ))}
          </div>
        </>
      )}

      {/* Lightbox */}
      {activeProject && (
        <Lightbox
          project={activeProject}
          initialIndex={activeProject.cover}
          onClose={() => setActiveProject(null)}
          allProjects={ranking.map((e) => e.project)}
        />
      )}
    </section>
  );
}
