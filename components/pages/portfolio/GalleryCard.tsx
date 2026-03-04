import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface GalleryCardProps {
  project: PortfolioProject;
  onClick?: () => void;
}

export default function GalleryCard({ project, onClick }: GalleryCardProps) {
  const coverImage = project.images[project.cover];
  const isPortrait = coverImage.height > coverImage.width;

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
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
          aspectRatio: isPortrait ? "3 / 4" : `${coverImage.width} / ${coverImage.height}`,
          display: "block",
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
