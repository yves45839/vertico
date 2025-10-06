This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Planifier une interface « électro » sur une page unique

Pour concevoir une page immersive avec un univers électro futuriste, voici un déroulé d'étapes et de conseils pratiques :

1. **Définir l'identité visuelle**
   - Construire un moodboard (Pinterest, Behance, Midjourney) qui rassemble typographies géométriques, éléments néon, motifs digitaux et animations lumineuses.
   - Déterminer une palette sombre (bleu nuit, anthracite) rehaussée d'accents cyan, magenta ou violet électrique pour les éléments interactifs.

2. **Structurer la page**
   - Limiter le contenu à une page avec une navigation interne (ancre ou scroll fluide) vers des sections claires : hero, services/cartes, témoignages, call-to-action.
   - Utiliser une grille responsive (12 colonnes) pour maîtriser alignements et marges, tout en prévoyant de larges zones négatives pour faire respirer les effets lumineux.

3. **Créer les cartes dynamiques**
   - Pour chaque carte (services, offres, projets), combiner un fond semi-transparent (`rgba(15, 15, 35, 0.75)`) avec un effet verre dépoli (`backdrop-filter: blur(12px)`).
   - Ajouter des bordures animées (gradients animés avec `@keyframes`, `border-image` ou pseudo-éléments) et une légère lueur externe (`box-shadow` colorée) afin d'évoquer un circuit imprimé vivant.

4. **Ajouter les effets électro**
   - Intégrer des transitions douces (`transition: transform 250ms ease, box-shadow 250ms ease`) et des micro-interactions (élévation au survol, lueur pulsée).
   - Utiliser des lignes ou particules en arrière-plan avec un canvas léger (Three.js, particles.js) ou des SVG animés (GSAP, `stroke-dashoffset`) pour renforcer l'immersion sans nuire aux performances.

5. **Travailler la typographie et les icônes**
   - Choisir des polices condensées et techniques (ex. « Orbitron », « Michroma ») pour les titres, associées à une police lisible (ex. « Inter », « Geist ») pour le corps de texte.
   - Employer des icônes minimalistes au trait fin, idéalement animées en vectoriel pour accompagner les cartes.

6. **Optimiser l'expérience utilisateur**
   - Veiller au contraste (WCAG AA) en vérifiant les couleurs primaires contre le fond sombre.
   - Prévoir un mode réduit des animations (respect de `prefers-reduced-motion`) et optimiser les assets (compressions, lazy loading) pour maintenir la fluidité.

7. **Prototyper puis implémenter**
   - Réaliser une maquette haute fidélité (Figma, Framer) afin de valider interactions et animations avant de passer au code.
   - Implémenter progressivement : structure HTML/JSX, styles globaux, animations, puis tests sur différents navigateurs/appareils.

8. **Peaufiner et tester**
   - Ajuster la direction artistique avec un système de tokens (couleurs, ombres, rayons) pour garder la cohérence.
   - Tester la performance (Lighthouse), l’accessibilité (axe DevTools) et la compatibilité mobile/tablette avant livraison.

Ce cadre vous permet d'avancer méthodiquement tout en laissant de la place à la créativité pour un rendu électro élégant et moderne.
