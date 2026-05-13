"use client";

import { useState } from "react";

interface BuyButtonProps {
  productId: string;
  label: string;
  disabled?: boolean;
}

export default function BuyButton({ productId, label, disabled }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (disabled || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Erreur lors de la création du paiement.");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <button
        onClick={handleBuy}
        disabled={disabled || loading}
        className="cta-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Redirection en cours…" : label}
      </button>

      {error && (
        <p
          role="alert"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--error, #dc2626)",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
