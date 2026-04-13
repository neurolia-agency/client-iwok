# Brief T02 : Conversion images JPG/JPEG/PNG vers WebP

## Contexte
Le dossier `public/site communication/` contient 275 fichiers images brutes (JPG, JPEG, PNG) repartis en 4 sous-dossiers correspondant aux categories du portfolio. Ces images doivent etre converties en WebP pour etre utilisees dans le site. Le dossier `public/images/` contient deja les images WebP du site actuel — cette tache concerne uniquement `public/site communication/`.

## Fichiers a modifier
- Dossier source : `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/public/site communication/`
- Aucun fichier de code a modifier (conversion d'assets uniquement)

## Structure actuelle du dossier

```
public/site communication/
├── entreprises collectivitées/     (37 elements : fichiers + sous-dossiers)
│   ├── aquasplash 12 2022/
│   ├── boulangerie artisanle pampelonne 81 2022/
│   ├── brasserie le cantou currière 12 2025/
│   ├── Burger factory courchevel 2022/
│   ├── buron de la sistre lagile 2023/
│   ├── buron mobile laguiole 12 2023/
│   ├── cabinet ophtalmologie rodez 12 2024/
│   ├── camping Les terrasses du viaur 81 2021/
│   ├── centre de tris KEREA 12 2025/
│   ├── club tennis caussade 2021/
│   ├── Controle technique pampelonne 81 2021/
│   ├── ecole trémouilles façade 2021/
│   ├── Foot cagnac les mines 81 2021/
│   ├── garage mécanique 12 2018/
│   ├── intermarcher 12 2021/
│   ├── jolies momes castres 81 2023/
│   ├── le monastère 12 Façade 2024/
│   ├── petits chevaux sol ecole trémouilles 2025/
│   ├── pont bascule flavin 12 2023/
│   ├── restaurant bellevue salle curan 12 2023/
│   ├── restaurant Bichette rodez 12 wc 2025/
│   ├── restaurant Les Chimères Toulouse 2019/
│   ├── révélation cransac 12 2021/
│   ├── rouergue et saveurs 12 2022/
│   ├── Salon esthetique rodez 12 2023/
│   ├── skate parc decazeville 12 2024/
│   ├── soudhydro Rodez 12 2018/
│   ├── vent du sud 12 2022/
│   ├── vestiaires Lycée Laroque 12 2019/
│   ├── IMG-20210313-WA0001.jpg
│   ├── IMG-20211020-WA0011.jpg
│   ├── IMG-20211020-WA0017.jpg
│   ├── NANA.jpg
│   ├── ruthene coah'in 2018.jpg
│   └── salle des fêtes Albi 81.jpg
├── événementiel expo/              (35 elements : fichiers + sous-dossiers)
│   ├── caserne millau 12 2021/
│   ├── expo salles gosses MJC Onet 12 2018/
│   ├── urban fest albi 2021/
│   └── [30+ fichiers JPG/JPEG loose]
├── participatif/                   (35 elements : fichiers + sous-dossier)
│   ├── ateliers camsp centre d'action médico social précoce/
│   └── [33 fichiers JPG/JPEG]
└── particuliers/                   (61 fichiers JPG/JPEG)
```

## Cible
Convertir tous les fichiers image (jpg, jpeg, png, JPG, JPEG, PNG) en .webp avec une qualite de 90, en preservant l'arborescence. Supprimer les originaux apres conversion reussie.

## Instructions d'implementation

1. **Verifier que `cwebp` est installe** :
   ```bash
   which cwebp || brew install webp
   ```

2. **Compter les fichiers images avant conversion** :
   ```bash
   find "public/site communication/" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l
   ```

3. **Script de conversion** — Executer ce script bash depuis la racine du repo :
   ```bash
   cd /Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok

   find "public/site communication/" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | while IFS= read -r -d '' file; do
     # Construire le chemin de sortie (.webp)
     output="${file%.*}.webp"

     # Convertir
     cwebp -q 90 "$file" -o "$output" 2>/dev/null

     # Si la conversion reussit, supprimer l'original
     if [ -f "$output" ]; then
       rm "$file"
       echo "OK: $file -> $output"
     else
       echo "ERREUR: $file"
     fi
   done
   ```

4. **Attention aux noms de fichiers avec espaces et accents** : le script utilise `-print0` et `read -d ''` pour gerer correctement les espaces, accents et caracteres speciaux dans les noms de fichiers.

5. **Verification post-conversion** :
   ```bash
   # Compter les fichiers restants non-webp (devrait etre 0)
   find "public/site communication/" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l

   # Compter les fichiers webp
   find "public/site communication/" -type f -iname "*.webp" | wc -l

   # Verifier les .DS_Store (ignorer)
   find "public/site communication/" -type f -not -name ".DS_Store" -not -iname "*.webp" | head -20
   ```

6. **Ignorer** : les fichiers `.DS_Store` (ne pas tenter de les convertir).

## Tokens CSS disponibles
Aucun — cette tache est une conversion d'assets, pas de code UI.

## Patterns a respecter
- Preserver l'arborescence exacte des sous-dossiers
- Qualite WebP a 90 (bon compromis qualite/poids)
- Les noms de fichiers gardent le meme nom, seule l'extension change

## Criteres d'acceptation
- [ ] Toutes les images JPG/JPEG/PNG sont converties en .webp
- [ ] Les fichiers originaux (jpg/jpeg/png) sont supprimes
- [ ] L'arborescence des sous-dossiers est preservee
- [ ] Le comptage webp final correspond au comptage initial des images
- [ ] Aucune erreur de conversion (verifier la sortie du script)
- [ ] Les fichiers `.DS_Store` ne sont pas touches

## Anti-patterns a eviter
- Ne PAS renommer les sous-dossiers
- Ne PAS deplacer les fichiers vers un autre emplacement
- Ne PAS changer la qualite en dessous de 85 (perte visible)
- Ne PAS convertir les images deja en webp dans `public/images/` (ce sont des fichiers differents, deja traites)
