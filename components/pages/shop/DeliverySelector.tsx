"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type DrawerStep = "mode" | "details";
type DeliveryMode = "" | "home" | "pickup";

interface Props {
  productId: string;
  productTitle?: string;
  productSlug?: string;
  priceCents?: number;
  shippingCostCents?: number;
  disabled: boolean;
}

const PICKUP_ADDRESS = "5 Pl. de la Fontaine, 12510 Olemps";

// ─── Styles ────────────────────────────────────────────────────────────────────

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
  transition: "border-color 0.15s, box-shadow 0.15s",
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

const iconButtonStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "var(--muted-foreground)",
  transition: "background 0.15s, color 0.15s",
  flexShrink: 0,
  padding: 0,
};

// ─── Pays ──────────────────────────────────────────────────────────────────────

const COUNTRY_GROUPS = [
  {
    label: "France",
    options: [{ code: "FR", name: "France métropolitaine" }],
  },
  {
    label: "Pays francophones",
    options: [
      { code: "BE", name: "Belgique" },
      { code: "CH", name: "Suisse" },
      { code: "LU", name: "Luxembourg" },
      { code: "MC", name: "Monaco" },
      { code: "CA", name: "Canada" },
      { code: "DZ", name: "Algérie" },
      { code: "MA", name: "Maroc" },
      { code: "TN", name: "Tunisie" },
      { code: "SN", name: "Sénégal" },
      { code: "CI", name: "Côte d'Ivoire" },
      { code: "CM", name: "Cameroun" },
      { code: "MG", name: "Madagascar" },
      { code: "MU", name: "Maurice" },
      { code: "RE", name: "Réunion" },
    ],
  },
  {
    label: "Europe",
    options: [
      { code: "DE", name: "Allemagne" },
      { code: "AT", name: "Autriche" },
      { code: "DK", name: "Danemark" },
      { code: "ES", name: "Espagne" },
      { code: "FI", name: "Finlande" },
      { code: "GR", name: "Grèce" },
      { code: "IE", name: "Irlande" },
      { code: "IT", name: "Italie" },
      { code: "NL", name: "Pays-Bas" },
      { code: "NO", name: "Norvège" },
      { code: "PL", name: "Pologne" },
      { code: "PT", name: "Portugal" },
      { code: "GB", name: "Royaume-Uni" },
      { code: "SE", name: "Suède" },
    ],
  },
  {
    label: "Monde",
    options: [
      { code: "ZA", name: "Afrique du Sud" },
      { code: "AU", name: "Australie" },
      { code: "BR", name: "Brésil" },
      { code: "CN", name: "Chine" },
      { code: "US", name: "États-Unis" },
      { code: "IN", name: "Inde" },
      { code: "JP", name: "Japon" },
      { code: "MX", name: "Mexique" },
      { code: "NZ", name: "Nouvelle-Zélande" },
    ],
  },
  {
    label: "Autre",
    options: [{ code: "OTHER", name: "Autre pays…" }],
  },
];

// ─── Icônes (inline pour éviter une dépendance) ────────────────────────────────

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─── ChoiceCard (mode picker) ──────────────────────────────────────────────────

function ChoiceCard({
  icon,
  label,
  description,
  selected,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.875rem",
        padding: "1rem 1.125rem",
        border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
        borderRadius: "var(--radius)",
        background: selected ? "var(--primary-pale)" : "var(--background)",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: selected ? "var(--primary)" : "var(--background-alt)",
          color: selected ? "#fff" : "var(--muted-foreground)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.15s, color 0.15s",
        }}
      >
        {icon}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "var(--foreground-heading)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `2px solid ${selected ? "var(--primary)" : "var(--border)"}`,
          background: selected ? "var(--primary)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 4,
          transition: "all 0.15s",
        }}
      >
        {selected && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
      </span>
    </button>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function DeliverySelector({
  productId,
  disabled,
}: Props) {
  const router = useRouter();

  // Drawer state
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<DrawerStep>("mode");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Mode
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("");

  // Champs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [intlLoading, startIntlTransition] = useTransition();
  const [intlError, setIntlError] = useState<string | null>(null);

  const isOtherCountry = countryCode === "OTHER";
  const isFrance = countryCode === "FR";
  const isInternational = Boolean(countryCode) && !isFrance;

  // ─── Effects ─────────────────────────────────────────────────────────────

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock + slide-in trigger
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      const body = document.body;
      body.style.overflow = "hidden";
      body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => {
        cancelAnimationFrame(raf);
        body.style.overflow = "";
        body.style.paddingRight = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ─── Handlers ────────────────────────────────────────────────────────────

  function handleOpen() {
    if (disabled) return;
    setOpen(true);
  }

  function handleClose() {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      setStep("mode");
      setCheckoutError(null);
      setIntlError(null);
    }, 320);
  }

  function handleBack() {
    setStep("mode");
    setCheckoutError(null);
    setIntlError(null);
  }

  function handleContinue() {
    if (!deliveryMode) return;
    setStep("details");
  }

  function handleCountryChange(value: string) {
    setCountryCode(value);
    for (const group of COUNTRY_GROUPS) {
      const option = group.options.find((o) => o.code === value);
      if (option) {
        setCountryName(option.name);
        break;
      }
    }
    setCheckoutError(null);
    setIntlError(null);
  }

  async function handleStripeCheckout(deliveryModeParam: "france" | "pickup") {
    if (loading) return;
    setLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          delivery_mode: deliveryModeParam,
          customer_email: email || undefined,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Erreur lors de la création du paiement.");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  function handleInternationalSubmit() {
    if (intlLoading) return;
    setIntlError(null);
    const finalCountryName = isOtherCountry ? customCountry.trim() : countryName;
    const finalCountryCode = isOtherCountry ? "XX" : countryCode;
    if (!finalCountryName) {
      setIntlError("Veuillez préciser votre pays.");
      return;
    }
    startIntlTransition(async () => {
      try {
        const res = await fetch("/api/shop/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: productId,
            customer_name: name,
            customer_email: email,
            customer_phone: phone || undefined,
            shipping_line1: line1,
            shipping_line2: line2 || undefined,
            shipping_postal_code: postalCode,
            shipping_city: city,
            shipping_country_code: finalCountryCode,
            shipping_country_name: finalCountryName,
          }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error || "Erreur lors de l'envoi.");
        }
        const { order_id } = await res.json();
        router.push(`/shop/commande/${order_id}`);
      } catch (err) {
        setIntlError(err instanceof Error ? err.message : "Une erreur est survenue.");
      }
    });
  }

  function handlePrimaryAction() {
    if (deliveryMode === "pickup") {
      void handleStripeCheckout("pickup");
      return;
    }
    if (deliveryMode === "home") {
      if (isFrance) {
        void handleStripeCheckout("france");
        return;
      }
      if (isInternational) {
        const form = document.getElementById("intl-checkout-form") as HTMLFormElement | null;
        if (form && !form.checkValidity()) {
          form.reportValidity();
          return;
        }
        handleInternationalSubmit();
      }
    }
  }

  // ─── Validation des CTAs ─────────────────────────────────────────────────

  const continueDisabled = !deliveryMode;

  const primaryDisabled = (() => {
    if (loading || intlLoading) return true;
    if (deliveryMode === "pickup") return false;
    if (deliveryMode === "home") {
      if (!email.includes("@")) return true;
      if (!countryCode) return true;
      if (isFrance) return false;
      if (isInternational) {
        if (!name.trim() || !line1.trim() || !postalCode.trim() || !city.trim()) return true;
        if (isOtherCountry && !customCountry.trim()) return true;
        return false;
      }
    }
    return true;
  })();

  const primaryLabel = (() => {
    if (loading) return "Redirection…";
    if (intlLoading) return "Envoi en cours…";
    return "Commander";
  })();

  // ─── Drawer JSX ──────────────────────────────────────────────────────────

  const drawer = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-drawer-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,15,10,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 250ms ease-out",
        }}
      />

      {/* Panneau */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 480,
          background: "var(--background)",
          boxShadow: "-12px 0 48px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Header sticky */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.875rem 1rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--background)",
            flexShrink: 0,
          }}
        >
          {step === "details" ? (
            <button type="button" onClick={handleBack} aria-label="Retour" style={iconButtonStyle}>
              <BackIcon />
            </button>
          ) : (
            <button type="button" onClick={handleClose} aria-label="Fermer" style={iconButtonStyle}>
              <CloseIcon />
            </button>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
              }}
            >
              {step === "mode" ? "Étape 1 sur 2" : "Étape 2 sur 2"}
            </p>
            <h2
              id="checkout-drawer-title"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--foreground-heading)",
                margin: "1px 0 0",
                letterSpacing: "-0.01em",
              }}
            >
              {step === "mode" ? "Mode de livraison" : deliveryMode === "pickup" ? "Confirmation du retrait" : "Vos informations"}
            </h2>
          </div>
          {/* Indicateur de progression visuel */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} aria-hidden="true">
            <span style={{ width: 24, height: 3, borderRadius: 2, background: "var(--primary)" }} />
            <span style={{ width: 24, height: 3, borderRadius: 2, background: step === "details" ? "var(--primary)" : "var(--border)", transition: "background 0.2s" }} />
          </div>
        </header>

        {/* Contenu scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.25rem" }}>
          {step === "mode" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  color: "var(--muted-foreground)",
                  margin: "0 0 0.25rem",
                  lineHeight: 1.6,
                }}
              >
                Comment souhaitez-vous recevoir votre œuvre&nbsp;?
              </p>
              <ChoiceCard
                icon={<HomeIcon />}
                label="Livraison à domicile"
                description="Colissimo ou transporteur adapté selon votre pays."
                selected={deliveryMode === "home"}
                onSelect={() => {
                  setDeliveryMode("home");
                  setCheckoutError(null);
                  setIntlError(null);
                }}
              />
              <ChoiceCard
                icon={<PinIcon />}
                label="Retrait sur place"
                description="Gratuit. Guillaume vous contactera pour un créneau."
                selected={deliveryMode === "pickup"}
                onSelect={() => {
                  setDeliveryMode("pickup");
                  setCheckoutError(null);
                  setIntlError(null);
                }}
              />
            </div>
          ) : (
            <>
              {/* ─── Retrait ─── */}
              {deliveryMode === "pickup" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div
                    style={{
                      padding: "1.25rem",
                      borderRadius: "var(--radius)",
                      background: "var(--background-alt)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 9,
                          background: "var(--primary)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <PinIcon />
                      </span>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          Adresse de retrait
                        </p>
                        <p
                          style={{
                            margin: "0.25rem 0 0",
                            fontFamily: "var(--font-heading)",
                            fontSize: "0.9375rem",
                            fontWeight: 700,
                            color: "var(--foreground-heading)",
                            lineHeight: 1.4,
                          }}
                        >
                          {PICKUP_ADDRESS}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      color: "var(--muted-foreground)",
                      lineHeight: 1.65,
                    }}
                  >
                    Un email de confirmation vous sera envoyé dès réception de votre commande.
                  </p>
                </div>
              )}

              {/* ─── Livraison ─── */}
              {deliveryMode === "home" && (
                <form
                  id="intl-checkout-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (isInternational) handleInternationalSubmit();
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  {/* Email */}
                  <div>
                    <label style={fieldLabelStyle}>Adresse e-mail *</label>
                    <input
                      ref={firstFieldRef}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      style={inputStyle}
                    />
                  </div>

                  {/* Pays */}
                  <div>
                    <label style={fieldLabelStyle}>Pays de livraison *</label>
                    <select
                      required
                      value={countryCode}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23998877' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.875rem center", paddingRight: "2.25rem" }}
                    >
                      <option value="">Sélectionnez votre pays…</option>
                      {COUNTRY_GROUPS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.options.map((opt) => (
                            <option key={opt.code} value={opt.code}>
                              {opt.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* France : pas d'autres champs, Stripe collecte */}
                  {isFrance && (
                    <div
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "var(--radius)",
                        background: "var(--background-alt)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8125rem",
                          color: "var(--muted-foreground)",
                          lineHeight: 1.65,
                        }}
                      >
                        L&apos;adresse de livraison et le paiement sont collectés à l&apos;étape suivante en toute sécurité.
                      </p>
                    </div>
                  )}

                  {/* International */}
                  {isInternational && (
                    <>
                      <div
                        style={{
                          padding: "0.875rem 1rem",
                          borderRadius: "var(--radius)",
                          background: "var(--primary-pale)",
                          border: "1px solid var(--primary-pale)",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8125rem",
                            color: "var(--primary-dark, var(--foreground))",
                            lineHeight: 1.6,
                          }}
                        >
                          Renseignez votre adresse complète ci-dessous. Vous recevrez sous 48h un lien de paiement avec les frais de port adaptés à votre destination.
                        </p>
                      </div>

                      {/* Autre pays */}
                      {isOtherCountry && (
                        <div>
                          <label style={fieldLabelStyle}>Précisez votre pays *</label>
                          <input
                            type="text"
                            required
                            value={customCountry}
                            onChange={(e) => setCustomCountry(e.target.value)}
                            placeholder="ex&nbsp;: Thaïlande"
                            style={inputStyle}
                          />
                        </div>
                      )}

                      {/* Nom */}
                      <div>
                        <label style={fieldLabelStyle}>Nom complet *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Prénom Nom"
                          style={inputStyle}
                        />
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label style={fieldLabelStyle}>Téléphone (optionnel)</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+33 6 00 00 00 00"
                          style={inputStyle}
                        />
                      </div>

                      {/* Adresse */}
                      <div>
                        <label style={fieldLabelStyle}>Adresse *</label>
                        <input
                          type="text"
                          required
                          value={line1}
                          onChange={(e) => setLine1(e.target.value)}
                          placeholder="Numéro et nom de rue"
                          style={inputStyle}
                        />
                      </div>

                      {/* Complément */}
                      <div>
                        <label style={fieldLabelStyle}>Complément (optionnel)</label>
                        <input
                          type="text"
                          value={line2}
                          onChange={(e) => setLine2(e.target.value)}
                          placeholder="Appartement, bâtiment…"
                          style={inputStyle}
                        />
                      </div>

                      {/* CP + Ville */}
                      <div style={{ display: "grid", gridTemplateColumns: "35% 1fr", gap: "0.625rem" }}>
                        <div>
                          <label style={fieldLabelStyle}>Code postal *</label>
                          <input
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Code postal"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={fieldLabelStyle}>Ville *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Ville"
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer sticky */}
        <footer
          style={{
            padding: "1rem 1.25rem 1.25rem",
            borderTop: "1px solid var(--border)",
            background: "var(--background)",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {step === "mode" ? (
            <button
              type="button"
              onClick={handleContinue}
              disabled={continueDisabled}
              className="cta-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: continueDisabled ? 0.45 : 1,
                cursor: continueDisabled ? "not-allowed" : "pointer",
              }}
            >
              Continuer
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePrimaryAction}
              disabled={primaryDisabled}
              className="cta-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: primaryDisabled ? 0.45 : 1,
                cursor: primaryDisabled ? "not-allowed" : "pointer",
              }}
            >
              {primaryLabel}
            </button>
          )}

          {(checkoutError || intlError) && (
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
              {checkoutError || intlError}
            </p>
          )}

          {step === "details" && (
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "var(--muted-foreground)",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {deliveryMode === "pickup" || isFrance
                ? "Paiement sécurisé Stripe — carte, Apple Pay, Google Pay"
                : isInternational
                ? "Aucun paiement à cette étape"
                : null}
            </p>
          )}
        </footer>
      </div>
    </div>
  ) : null;

  // ─── Bouton trigger ──────────────────────────────────────────────────────

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button
          onClick={handleOpen}
          disabled={disabled}
          className="cta-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          Commander
        </button>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            margin: 0,
          }}
        >
          Paiement sécurisé par carte bancaire, Apple Pay ou Google Pay.
        </p>
      </div>

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
