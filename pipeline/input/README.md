# Input - Données Client

Ce dossier contient toutes les données fournies par le client ou collectées lors du brief.

## Structure

```
input/
├── brief-client.md      # Questionnaire client rempli (OBLIGATOIRE)
├── assets/              # Logo, images fournies par le client
├── references/          # Sites d'inspiration
│   └── sites.md         # Liste annotée des références
├── content/             # Textes fournis par le client
└── typographies/        # Polices si fournies
```

## Fichiers

### brief-client.md (OBLIGATOIRE)

Le questionnaire client rempli. C'est le point d'entrée de l'étape A1-Init.

### assets/

Images, logos, et fichiers visuels fournis par le client.

**Formats acceptés** : PNG, JPG, SVG, PDF

**Nommage** : `[type]-[description].[ext]`
- `logo-principal.svg`
- `photo-equipe.jpg`
- `illustration-service-1.png`

### references/

Sites d'inspiration identifiés avec le client ou par l'agence.

**Format sites.md** :
```markdown
# Références Visuelles

## [Nom Site 1]
- **URL** : https://...
- **Ce qu'on aime** : [éléments à retenir]
- **À adapter** : [ce qui correspond au projet]

## [Nom Site 2]
...
```

### content/

Textes fournis par le client (si disponibles).

**Exemples** :
- `textes-services.md`
- `biographie.md`
- `temoignages.md`

### typographies/

Polices fournies par le client (si identité existante).

**Formats** : .ttf, .otf, .woff, .woff2

## Règles

1. **Ne jamais modifier** les fichiers input/ pendant le pipeline
2. **Source de vérité client** : En cas de doute, les données ici prévalent
3. **Versioning** : Si le client change d'avis, créer `brief-client-v2.md` (ne pas écraser)

## Checklist Pré-Projet

Avant de démarrer A1-Init, vérifier :

- [ ] `brief-client.md` rempli et validé par le client
- [ ] Logo fourni (si existant)
- [ ] Références visuelles identifiées
- [ ] Textes principaux disponibles (ou à rédiger)
- [ ] Contraintes techniques connues (hébergement, domaine, etc.)

---

*Template Workflow v1.0*
