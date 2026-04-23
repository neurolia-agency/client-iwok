"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Lightbox from "./Lightbox";
import LikeButton from "./LikeButton";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface Props {
  projects: PortfolioProject[];
}

/* ─── Podium Card (rank 1, 2, 3) ───────────────────────── */

function PodiumCard({
  project,
  rank,
  onOpen,
}: {
  project: PortfolioProject;
  rank: 1 | 2 | 3;
  onOpen: () => void;
}) {
  const cover =
    project.images[project.cover] ?? project.images[0];
  const [loaded, setLoaded] = useState(false);

  if (!cover) return null;

  return (
    <motion.div
      className={`podium-card podium-card--rank-${rank}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: rank * 0.08 }}
    >
      <span
        className={`podium-card-medal podium-card-medal--rank-${rank}`}
        aria-label={`Rang ${rank}`}
      >
        {rank}
      </span>
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
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          onLoad={() => setLoaded(true)}
          style={{
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>
      <div className="podium-card-info">
        <p className="podium-card-title">{project.title}</p>
        <span className="podium-card-meta">
          {project.location} &mdash; {project.year}
        </span>
      </div>
      <div className="podium-card-like">
        <LikeButton projectId={project.id} initialCount={project.likes ?? 0} showZero />
      </div>
    </motion.div>
  );
}

/* ─── Honorable Mention Card (rank 4, 5) ───────────────── */

function MentionCard({
  project,
  rank,
  onOpen,
}: {
  project: PortfolioProject;
  rank: number;
  onOpen: () => void;
}) {
  const cover =
    project.images[project.cover] ?? project.images[0];
  if (!cover) return null;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Voir : ${project.title}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 + rank * 0.05 }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "stretch",
        gap: "1rem",
        padding: "0.75rem",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-standard)",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          flexShrink: 0,
          width: 110,
          height: 90,
          borderRadius: "var(--radius-small, 6px)",
          overflow: "hidden",
          background: "var(--background-alt)",
        }}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="110px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            color: "var(--muted-foreground)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Mention #{rank}
        </span>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(0.95rem, 1.4vw, 1.125rem)",
            fontWeight: 600,
            color: "var(--foreground)",
            margin: "0.25rem 0 0",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.title}
        </p>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
            marginTop: "0.1rem",
          }}
        >
          {project.location} &mdash; {project.year}
        </span>
      </div>
      <div
        style={{
          alignSelf: "center",
          marginLeft: "auto",
        }}
      >
        <LikeButton projectId={project.id} initialCount={project.likes ?? 0} showZero />
      </div>
    </motion.div>
  );
}

/* ─── Main Content ─────────────────────────────────────── */

export default function CoupsDeCoeurContent({ projects }: Props) {
  const router = useRouter();
  const [activeProject, setActiveProject] =
    useState<PortfolioProject | null>(null);

  // Rafraichit la page cote serveur apres un like -> classement mis a jour
  useEffect(() => {
    const handler = () => router.refresh();
    window.addEventListener("iwok-like-update", handler);
    return () => window.removeEventListener("iwok-like-update", handler);
  }, [router]);

  const podium = projects.slice(0, 3);
  const mentions = projects.slice(3, 5);

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
            maxWidth: "42rem",
          }}
        >
          Vos r&eacute;alisations pr&eacute;f&eacute;r&eacute;es.
        </p>
      </div>

      {/* Podium */}
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
        </div>
      )}

      {/* Mentions honorables (rangs 4 et 5) */}
      {mentions.length > 0 && (
        <>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
              fontWeight: 600,
              color: "var(--foreground)",
              margin: "0.5rem 0 1rem",
              letterSpacing: "-0.01em",
            }}
          >
            Mentions honorables
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0.875rem",
              marginBottom: "3rem",
            }}
          >
            {mentions.map((project, i) => (
              <MentionCard
                key={project.id}
                project={project}
                rank={i + 4}
                onOpen={() => setActiveProject(project)}
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
          allProjects={projects}
        />
      )}
    </section>
  );
}
