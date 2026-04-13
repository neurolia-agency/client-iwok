# Brief T05 : Refonte formulaire de devis

## Contexte
Le formulaire de contact actuel (section CallbackForm) est un simple formulaire "rappel" avec 3 champs (nom, telephone, message). Le client veut un vrai formulaire de demande de devis avec 7 champs structures + upload d'images. La section ContactHero et ContactInfo restent intactes.

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/contact/ContactContent.tsx` — remplacer CallbackForm (lignes 310-624)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/app/api/contact/route.ts` — creer (nouveau fichier, Server Action pour reception du formulaire)

## Code actuel — CallbackForm (lignes 310-624)

### Styles inline reutilisables (a conserver et etendre)
```tsx
const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--font-size-small)",
  fontWeight: 500,
  letterSpacing: "0.05em",
  color: "var(--foreground-subtitle)",
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--font-size-body)",
  color: "var(--foreground)",
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "0.875rem 1rem",
  outline: "none",
  transition: "border-color var(--transition-standard)",
};
```

### Pattern de validation actuel
```tsx
function validate(): boolean {
  const next: Record<string, string> = {};
  const name = nameRef.current?.value.trim() ?? "";
  const phone = phoneRef.current?.value.trim() ?? "";
  if (!name) next.name = "Merci d'indiquer votre nom.";
  if (!phone) next.phone = "Merci d'indiquer votre numero.";
  else if (phone.replace(/\s/g, "").length < 8)
    next.phone = "Ce numero semble trop court.";
  setErrors(next);
  return Object.keys(next).length === 0;
}
```

### Pattern d'envoi actuel
```tsx
async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!validate()) return;
  setStatus("loading");
  const payload = {
    name: nameRef.current?.value.trim(),
    phone: phoneRef.current?.value.trim(),
    message: messageRef.current?.value.trim() || null,
  };
  // TODO: remplacer par fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
  console.log("Callback request:", payload);
  await new Promise((r) => setTimeout(r, 1200));
  setStatus("success");
}
```

### Hook useRevealOnScroll (garde tel quel)
```tsx
function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}
```

### Structure globale de ContactContent (garder intacte sauf CallbackForm)
```tsx
export default function ContactContent() {
  return (
    <>
      <ContactHero />       {/* NE PAS MODIFIER — lignes 121-303 */}
      <CallbackForm />      {/* A REMPLACER — lignes 310-624 */}
      <ContactInfo />       {/* NE PAS MODIFIER — lignes 630-761 */}
    </>
  );
}
```

## Cible
Un formulaire de demande de devis complet avec 7 champs + zone d'upload d'images.

## Instructions d'implementation

### Etape 1 : Nouveaux champs du formulaire

| Champ | Type | Placeholder | Obligatoire | Validation |
|-------|------|-------------|-------------|------------|
| Nom complet | text | "Prenom Nom" | Oui | Non vide |
| Email | email | "votre@email.com" | Oui | Format email |
| Telephone | tel | "06 12 34 56 78" | Oui | Min 8 chiffres |
| Type de projet | select | (voir options) | Oui | Selection non vide |
| Surface estimee | text | "Ex: 8m2, un mur de 3m x 2.5m" | Non | - |
| Lieu d'intervention | text | "Ville, departement" | Oui | Non vide |
| Description du projet | textarea | "Decrivez votre projet, vos envies, vos inspirations..." | Oui | Min 10 caracteres |

Options du select "Type de projet" :
- "" (placeholder: "Choisissez un type de projet")
- "Fresque murale interieure"
- "Fresque murale exterieure"
- "Design mural sur mesure"
- "Decoration tous supports"
- "Animation evenementielle"
- "Atelier participatif"
- "Autre"

### Etape 2 : Zone d'upload d'images

Ajouter une zone drag & drop APRES le textarea :
- Accepter uniquement les images (image/jpeg, image/png, image/webp)
- Max 5 fichiers, max 10 Mo par fichier
- Afficher un apercu thumbnail de chaque image uploadee
- Bouton X pour supprimer un fichier
- Zone avec bordure dashed, icone upload, texte "Glissez vos photos ici ou cliquez pour parcourir"
- Label au-dessus : "Photos de reference (facultatif)"

Implementation de la zone d'upload :
```tsx
// State pour les fichiers
const [files, setFiles] = useState<File[]>([]);
const [previews, setPreviews] = useState<string[]>([]);
const fileInputRef = useRef<HTMLInputElement>(null);

// Handler drop
function handleDrop(e: React.DragEvent) {
  e.preventDefault();
  const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  addFiles(newFiles);
}

function addFiles(newFiles: File[]) {
  const combined = [...files, ...newFiles].slice(0, 5); // Max 5
  setFiles(combined);
  // Generer les previews avec URL.createObjectURL
  const newPreviews = combined.map(f => URL.createObjectURL(f));
  setPreviews(prev => {
    prev.forEach(url => URL.revokeObjectURL(url)); // Cleanup anciens
    return newPreviews;
  });
}

function removeFile(index: number) {
  const newFiles = files.filter((_, i) => i !== index);
  setFiles(newFiles);
  URL.revokeObjectURL(previews[index]);
  setPreviews(previews.filter((_, i) => i !== index));
}
```

Style de la zone d'upload :
```tsx
const dropZoneStyle: React.CSSProperties = {
  border: "2px dashed var(--border)",
  borderRadius: "var(--radius)",
  padding: "2rem 1.5rem",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color var(--transition-standard), background-color var(--transition-standard)",
  backgroundColor: "var(--background-alt)",
};
```

Style des previews :
```tsx
// Grille de thumbnails en dessous de la zone
// display: grid, gridTemplateColumns: repeat(auto-fill, minmax(80px, 1fr)), gap: 0.75rem
// Chaque thumbnail : position relative, aspectRatio 1, borderRadius var(--radius-subtle), overflow hidden
// Bouton X : position absolute, top -6px, right -6px, cercle 20px, background var(--error), color white
```

### Etape 3 : Reorganiser le layout du formulaire

Le formulaire actuel est une seule colonne (maxWidth 520). Pour le nouveau formulaire :
- Augmenter `maxWidth` a 640px
- Mettre Nom + Email sur une meme ligne (grid 2 colonnes sur desktop, 1 sur mobile)
- Telephone + Type de projet sur une meme ligne
- Surface + Lieu sur une meme ligne
- Description en pleine largeur
- Upload en pleine largeur
- Bouton submit en pleine largeur

Grid pattern :
```tsx
<div style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.5rem",
}}>
  {/* Champs en paires */}
</div>
```

Sur mobile (< 640px), les paires passent en colonne unique. Utiliser un media query via `@media` ou un style conditionnel. Pattern recommande : utiliser `className` uniquement pour le grid responsive :
```tsx
className="grid grid-cols-1 sm:grid-cols-2"
```
Exception acceptee pour le layout grid du formulaire uniquement (pas d'alternative inline simple).

### Etape 4 : Modifier le heading

Remplacer :
- H2 : "Je ne reponds pas ?" → "Demande de devis"
- Sous-titre : "Laissez vos coordonnees, je vous rappelle sous 24h." → "Decrivez votre projet. Devis gratuit, reponse sous 48h."

### Etape 5 : Style du select

```tsx
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%2378716C' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  paddingRight: "2.5rem",
};
```

### Etape 6 : API Route (nouveau fichier)

Creer `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/app/api/contact/route.ts` :

```tsx
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const projectType = formData.get("projectType") as string;
    const surface = formData.get("surface") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;

    // Validation serveur
    if (!name || !email || !phone || !projectType || !location || !description) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Fichiers (optionnel)
    const files = formData.getAll("files") as File[];

    // TODO: Envoyer par email (Resend, Nodemailer, etc.) ou stocker en base
    console.log("Demande de devis:", { name, email, phone, projectType, surface, location, description, filesCount: files.length });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
```

### Etape 7 : Modifier handleSubmit dans CallbackForm

```tsx
async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!validate()) return;
  setStatus("loading");

  const formData = new FormData();
  formData.append("name", nameRef.current?.value.trim() ?? "");
  formData.append("email", emailRef.current?.value.trim() ?? "");
  formData.append("phone", phoneRef.current?.value.trim() ?? "");
  formData.append("projectType", projectTypeRef.current?.value ?? "");
  formData.append("surface", surfaceRef.current?.value.trim() ?? "");
  formData.append("location", locationRef.current?.value.trim() ?? "");
  formData.append("description", descriptionRef.current?.value.trim() ?? "");
  files.forEach(f => formData.append("files", f));

  try {
    const res = await fetch("/api/contact", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Erreur serveur");
    setStatus("success");
  } catch {
    setStatus("error");
  }
}
```

### Etape 8 : Etat d'erreur

Ajouter un etat `error` dans le rendu du formulaire (apres le success check) :
```tsx
{status === "error" && (
  <div style={{ /* banniere rouge en haut du form */ }}>
    <p>Une erreur est survenue. Veuillez reessayer ou nous appeler directement.</p>
  </div>
)}
```

## Tokens CSS disponibles
- `--font-sans` : police des inputs et labels
- `--font-heading` : police du H2
- `--font-size-body`, `--font-size-small`, `--font-size-caption` : tailles texte
- `--foreground`, `--foreground-heading`, `--foreground-subtitle`, `--muted-foreground`, `--foreground-subtle` : couleurs texte
- `--background`, `--background-alt`, `--card` : couleurs de fond
- `--border`, `--primary`, `--error` : couleurs d'accent
- `--radius`, `--radius-subtle`, `--radius-large` : rayons de bordure
- `--transition-standard` : transition par defaut
- `--shadow-subtle` : ombre legere

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires, sauf pour le grid responsive)
- useRef pour chaque champ (pattern existant)
- useRevealOnScroll pour l'animation de reveal (pattern existant)
- labelStyle / inputStyle partages (pattern existant)
- Focus : borderColor primary + outline 2px primary offset 2px (pattern existant)
- Erreurs : texte caption rouge sous le champ (pattern existant)
- `.cta-primary` pour le bouton submit
- FormData pour l'envoi (pas JSON, car fichiers)

## Criteres d'acceptation
- [ ] 7 champs de formulaire avec les bons types et placeholders
- [ ] Zone d'upload drag & drop avec preview thumbnails
- [ ] Max 5 fichiers, max 10 Mo par fichier, images uniquement
- [ ] Validation client-side avec messages d'erreur sous chaque champ
- [ ] Envoi via fetch vers /api/contact avec FormData
- [ ] API route /api/contact creee et fonctionnelle
- [ ] Etat success avec message de confirmation
- [ ] Etat error avec message d'erreur
- [ ] Layout responsive : 2 colonnes desktop, 1 colonne mobile
- [ ] ContactHero et ContactInfo NON modifies
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser de classes Tailwind utilitaires (sauf grid responsive)
- Ne PAS modifier ContactHero ou ContactInfo
- Ne PAS envoyer en JSON (utiliser FormData pour les fichiers)
- Ne PAS utiliser de bibliotheque de formulaire (react-hook-form, formik) — garder le pattern useRef
- Ne PAS mettre les fichiers directement dans le JSON payload
