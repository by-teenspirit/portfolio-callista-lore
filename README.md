# Callista Loré — Portfolio ✦

Portfolio professionnel de Callista Loré, UX Designer & Chef de Projet.

🔗 **Live** → [callista-lore.github.io/portfolio](https://callista-lore.github.io/portfolio)

---

## ✦ Stack technique

| Outil | Rôle |
|---|---|
| [React 18](https://react.dev) | Framework UI |
| [TypeScript](https://www.typescriptlang.org) | Typage statique |
| [Vite 5](https://vitejs.dev) | Bundler & dev server |
| [TanStack Router](https://tanstack.com/router) | Routing type-safe |
| [Tailwind CSS 3](https://tailwindcss.com) | Styles utilitaires |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Vitest](https://vitest.dev) | Tests unitaires |
| [Testing Library](https://testing-library.com) | Tests composants |
| [GitHub Pages](https://pages.github.com) | Déploiement |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |

---

## ✦ Architecture (Clean Architecture)

```
src/
├── assets/              # Images, SVG statiques
├── components/
│   ├── layout/          # Navbar, Footer, RootLayout
│   └── ui/              # Tag, AnimatedSection, CustomCursor, ScrollProgressBar
├── features/            # Modules par domaine métier
│   ├── hero/            # HeroSection
│   ├── about/           # AboutSection
│   ├── projects/        # ProjectsSection, ProjectCard
│   ├── contact/         # ContactSection
│   └── home/            # HomePage (assemblage)
├── hooks/               # useInView, useScrollProgress, useMousePosition, useActiveSection
├── lib/                 # data.ts (contenu du portfolio)
├── routes/              # TanStack Router — __root.tsx, index.tsx, 404.tsx
├── styles/              # globals.css
├── test/                # setup.ts
├── types/               # index.ts — types TypeScript partagés
└── utils/               # cn(), formatPhone(), truncate()...
```

---

## ✦ Démarrage

### Prérequis

- Node.js 20+
- npm 9+

### Installation

```bash
git clone https://github.com/callista-lore/portfolio.git
cd portfolio
npm install
```

### Développement

```bash
npm run dev
```

### Tests

```bash
# Une fois
npm run test -- --run

# Watch mode
npm run test

# Avec coverage
npm run test:coverage

# UI Vitest
npm run test:ui
```

### Build

```bash
npm run build
npm run preview
```

---

## ✦ Déploiement GitHub Pages

Le déploiement est **automatique** à chaque push sur `main` via GitHub Actions.

### Configuration initiale

1. Aller dans **Settings → Pages** de ton repo GitHub
2. Source : **GitHub Actions**
3. Adapter `base` dans `vite.config.ts` selon le nom de ton repo :

```ts
base: '/nom-de-ton-repo/'
```

4. Push sur `main` → le workflow `deploy.yml` se déclenche automatiquement ✓

---

## ✦ Personnalisation du contenu

Tout le contenu est centralisé dans **`src/lib/data.ts`** :
- `PROJECTS` — tes projets (titre, description, tags, couleur de cover…)
- `EXPERIENCES` — tes expériences professionnelles
- `EDUCATION` — tes formations
- `CONTACT_INFO` — email, téléphone, LinkedIn
- `SKILLS`, `INTERESTS`, `TOOLS`

---

## ✦ Linting & Formatting

```bash
# ESLint
npm run lint

# Prettier
npm run format
```

---

## ✦ Variables de design (Tailwind)

| Token | Valeur | Usage |
|---|---|---|
| `brand-orange` | `#FF6B35` | Couleur principale |
| `surface` | `#FAFAF8` | Background |
| `ink` | `#1A1A18` | Texte principal |
| `ink-muted` | `#6B6B60` | Texte secondaire |
| `font-display` | Playfair Display | Titres |
| `font-body` | DM Sans | Corps de texte |
| `font-mono` | JetBrains Mono | Tags, labels |

---

## ✦ License

Ce projet est personnel. Contenu & design © Callista Loré 2025.
