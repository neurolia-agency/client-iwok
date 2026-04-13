# Brief T08 : Logo navbar plus gros et contraste

## Contexte
Le logo dans la navbar est trop petit sur desktop et manque de contraste quand il s'affiche en blanc sur un fond clair (hero avec image sombre, mais en scrollant le fond devient clair). Il faut augmenter la taille du logo et ajouter un drop-shadow sur la version blanche pour ameliorer la lisibilite.

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/layout/header.tsx` — lignes 65-83 (bloc logo)

## Code actuel — Logo dans header.tsx (lignes 65-83)

```tsx
{/* Logo */}
<Link
  href="/"
  aria-label="IWOK / GuiHome Décoration — Retour à l'accueil"
  style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
>
  <Image
    src={isDark ? "/images/logo/logo-blanc.png" : "/images/logo/logo-noir.png"}
    alt="IWOK — GuiHome Décoration"
    width={120}
    height={48}
    priority
    style={{
      height: "clamp(32px, 4vw, 44px)",
      width: "auto",
      objectFit: "contain",
      transition: "opacity var(--transition-standard)",
    }}
  />
</Link>
```

### Contexte du swap dark/light (ligne 33)
```tsx
const isDark = !scrolled || menuOpen;
```

Quand `isDark` est true (pas de scroll ou menu ouvert), le logo blanc s'affiche sur fond sombre/transparent. Quand `isDark` est false (scroll > 48px), le logo noir s'affiche sur fond clair avec backdrop blur.

## Cible
1. Logo plus gros : passer de `clamp(32px, 4vw, 44px)` a `clamp(40px, 5vw, 56px)`
2. Ajouter un drop-shadow sur le logo blanc pour ameliorer la lisibilite sur les zones ou le hero peut avoir des parties claires

## Instructions d'implementation

### Fix 1 : Augmenter la taille du logo

Remplacer la ligne :
```tsx
height: "clamp(32px, 4vw, 44px)",
```
par :
```tsx
height: "clamp(40px, 5vw, 56px)",
```

### Fix 2 : Ajouter un drop-shadow conditionnel

Ajouter `filter: "drop-shadow(...)"` quand le logo est blanc (isDark = true). Le drop-shadow cree une ombre qui se conforme a la forme du PNG (pas un box-shadow rectangulaire).

Remplacer le style complet de l'Image :
```tsx
style={{
  height: "clamp(40px, 5vw, 56px)",
  width: "auto",
  objectFit: "contain",
  transition: "opacity var(--transition-standard), filter var(--transition-standard)",
  filter: isDark
    ? "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))"
    : "none",
}}
```

Le double drop-shadow cree :
- Une ombre nette et proche (0 1px 3px) pour la lisibilite
- Un halo diffus (0 0 8px) pour le detachement du fond

### Resultat attendu — Code complet du bloc logo

```tsx
{/* Logo */}
<Link
  href="/"
  aria-label="IWOK / GuiHome Décoration — Retour à l'accueil"
  style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
>
  <Image
    src={isDark ? "/images/logo/logo-blanc.png" : "/images/logo/logo-noir.png"}
    alt="IWOK — GuiHome Décoration"
    width={120}
    height={48}
    priority
    style={{
      height: "clamp(40px, 5vw, 56px)",
      width: "auto",
      objectFit: "contain",
      transition: "opacity var(--transition-standard), filter var(--transition-standard)",
      filter: isDark
        ? "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))"
        : "none",
    }}
  />
</Link>
```

## Tokens CSS disponibles
- `--transition-standard: 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : transition pour le filter
- `--shadow-subtle: 0 1px 3px rgba(28, 25, 23, 0.06), 0 1px 2px rgba(28, 25, 23, 0.04)` : reference pour calibrer le drop-shadow (pas utilise directement car drop-shadow a une syntaxe differente de box-shadow)

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires)
- Le swap logo blanc/noir est gere par `isDark` (ne pas changer cette logique)
- `transition` doit inclure `filter` en plus de `opacity` pour un changement fluide
- `drop-shadow` (pas `box-shadow`) car le logo est un PNG avec transparence

## Criteres d'acceptation
- [ ] Logo visible a `clamp(40px, 5vw, 56px)` de hauteur (plus gros qu'avant)
- [ ] Drop-shadow applique sur le logo blanc (isDark = true)
- [ ] Pas de drop-shadow sur le logo noir (isDark = false)
- [ ] Transition fluide du filter quand on scroll (dark → light)
- [ ] Le logo reste cliquable et renvoie vers /
- [ ] Pas de regression sur le swap blanc/noir
- [ ] Le hamburger mobile n'est pas affecte
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser `box-shadow` (ne respecte pas la forme PNG transparente)
- Ne PAS utiliser de classes Tailwind utilitaires
- Ne PAS modifier la logique isDark / scrolled / menuOpen
- Ne PAS augmenter les dimensions width/height de l'Image (120/48) — seul le `height` en style CSS compte car `width: "auto"`
- Ne PAS ajouter un background derriere le logo (solution trop lourde visuellement)
