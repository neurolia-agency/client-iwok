"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Lightbox from "./Lightbox";
import LikeButton from "./LikeButton";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/data/portfolio-projects";

const STORAGE_KEY = "iwok-likes";

function getLikedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

/* ─── Podium Card ──────────────────────────────────────── */

function PodiumCard({
  project,
  rank,
  onOpen,
}: {
  project: PortfolioProject;
  rank: 1 | 2 | 3;
  onOpen: () => void;
}) {
  const cover = project.images[project.cover];
  const [loaded, setLoaded] = useState(false);

  const medals: Record<number, { label: string; className: string }> = {
    1: { label: "1er", className: "podium-card--gold" },
    2: { label: "2e", className: "podium-card--silver" },
    3: { label: "3e", className: "podium-card--bronze" },
  };
  const medal = medals[rank];

  return (
    <div
      className={`podium-card ${medal.className}`}
      style={{ order: rank === 1 ? 1 : rank === 2 ? 0 : 2 }}
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
        aria-label={`Voir : ${project.title}`}
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
        <p className="podium-card-title">{project.title}</p>
        <span className="podium-card-meta">
          {project.location} — {project.year}
        </span>
      </div>
      <div className="podium-card-like">
        <LikeButton projectId={project.id} initialCount={0} />
      </div>
    </div>
  );
}

/* ─── Main Content ─────────────────────────────────────── */

export default function CoupsDeCoeurContent() {
  const [likedProjects, setLikedProjects] = useState<PortfolioProject[]>([]);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ids = getLikedIds();
    const projects = ids
      .map((id) => PORTFOLIO_PROJECTS.find((p) => p.id === id))
      .filter((p): p is PortfolioProject => !!p);
    setLikedProjects(projects);
  }, []);

  // Refresh when localStorage changes (same tab)
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const ids = getLikedIds();
      const projects = ids
        .map((id) => PORTFOLIO_PROJECTS.find((p) => p.id === id))
        .filter((p): p is PortfolioProject => !!p);
      setLikedProjects(projects);
    }, 2000);
    return () => clearInterval(interval);
  }, [mounted]);

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

  const podium = likedProjects.slice(0, 3);
  const rest = likedProjects.slice(3);

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
          {likedProjects.length > 0
            ? `${likedProjects.length} projet${likedProjects.length > 1 ? "s" : ""} dans votre s\u00e9lection`
            : "Votre s\u00e9lection personnelle"}
        </p>
      </div>

      {/* Empty state */}
      {likedProjects.length === 0 && (
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
            Explorez le portfolio et cliquez sur le c&oelig;ur des r&eacute;alisations
            qui vous plaisent. Elles appara&icirc;tront ici.
          </p>
          <Link href="/portfolio" className="cta-primary">
            Explorer le portfolio
          </Link>
        </div>
      )}

      {/* Podium — top 3 */}
      {podium.length > 0 && (
        <div className="podium-container">
          {podium.map((project, i) => (
            <PodiumCard
              key={project.id}
              project={project}
              rank={(i + 1) as 1 | 2 | 3}
              onOpen={() => setActiveProject(project)}
            />
          ))}
          {/* Placeholders if less than 3 */}
          {podium.length < 3 &&
            Array.from({ length: 3 - podium.length }).map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="podium-card podium-card--empty"
                style={{ order: podium.length + i === 1 ? 0 : podium.length + i }}
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

      {/* Remaining liked projects */}
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
            Autres coups de c&oelig;ur
          </h2>
          <div className="masonry-grid">
            {rest.map((project) => {
              const cover = project.images[project.cover];
              const isPortrait = cover.height > cover.width;
              return (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  className="gallery-card"
                  onClick={() => setActiveProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveProject(project);
                    }
                  }}
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
                  <div className="gallery-card-overlay" style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.3) 50%, transparent 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.25rem",
                  }} aria-hidden="true">
                    <div className="gallery-card-text">
                      <p style={{
                        color: "var(--foreground-on-dark)",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        margin: 0,
                        lineHeight: 1.3,
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.01em",
                      }}>
                        {project.title}
                      </p>
                      <span style={{
                        display: "block",
                        color: "var(--foreground-subtle)",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-sans)",
                        marginTop: "0.25rem",
                      }}>
                        {project.location} — {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="gallery-card-like" style={{
                    position: "absolute",
                    bottom: "0.75rem",
                    right: "0.75rem",
                    zIndex: 5,
                  }}>
                    <LikeButton projectId={project.id} initialCount={0} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Lightbox */}
      {activeProject && (
        <Lightbox
          project={activeProject}
          initialIndex={activeProject.cover}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
