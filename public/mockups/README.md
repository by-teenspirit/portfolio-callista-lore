# 📁 Mockups — Comment ajouter tes captures

Ce dossier contient les captures de maquettes affichées dans les pages projets.

## Comment ajouter une image

1. Exporte ta capture depuis Figma (PNG recommandé, min. 1200px de large)
2. Dépose-la dans ce dossier
3. Dans `src/lib/projectDetails.ts`, trouve le bloc `image-placeholder` correspondant
4. Remplace la ligne `type: 'image-placeholder'` par `type: 'image-placeholder', src: '/mockups/ton-fichier.png'`

## Convention de nommage recommandée

```
idalgo-modules-avant.png
idalgo-modules-apres.png
scorecast-gamification.png
instant-prod-homepage.png
blackskill-v1-skeuo.png
blackskill-v2-dashboard.png
human2sport-arbre.png
pes-v1-ecrans.png
pes-v2-wireframes.png
direct-mandat-avant.png
direct-mandat-apres.png
quadient-scan.png
memoire-couverture.png
```

## Formats supportés

- `.png` (recommandé pour les maquettes)
- `.jpg` / `.jpeg` (pour les photos)
- `.webp` (pour les images optimisées)
- `.svg` (pour les illustrations vectorielles)

## Astuce Figma

Pour exporter proprement :
1. Sélectionne le frame dans Figma
2. Dans le panneau droit → "Export"
3. Choisis PNG, 2x pour la résolution
4. Clic "Export [nom du frame]"
