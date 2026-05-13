"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6875rem 0.875rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9375rem",
  color: "var(--foreground)",
  background: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const fieldLabelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "var(--muted-foreground)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  marginBottom: "0.375rem",
};

export function TrackOrderForm() {
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/shop/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          ref: ref.trim(),
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Commande introuvable.");
      }
      const { order_id } = await res.json();
      window.location.href = `/shop/commande/${order_id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        background: "var(--background-alt)",
      }}
    >
      <div>
        <label htmlFor="track-email" style={fieldLabelStyle}>
          Adresse e-mail *
        </label>
        <input
          id="track-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          autoComplete="email"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="track-ref" style={fieldLabelStyle}>
          Référence de commande *
        </label>
        <input
          id="track-ref"
          type="text"
          required
          value={ref}
          onChange={(e) => setRef(e.target.value.toUpperCase())}
          placeholder="ex&nbsp;: B15110B5"
          maxLength={10}
          style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.04em", textTransform: "uppercase" }}
        />
        <p
          style={{
            margin: "0.375rem 0 0",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.5,
          }}
        >
          8 caractères, indiqués dans l&apos;email de confirmation de votre commande (ex&nbsp;: #B15110B5).
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="cta-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Recherche en cours…" : "Voir ma commande"}
      </button>

      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--error, #dc2626)",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}
