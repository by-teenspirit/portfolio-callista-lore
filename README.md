# Callista Loré — Portfolio ✦

Portfolio professionnel de Callista Loré, UX Designer & Chef de Projet.

🔗 **Live** → [https://by-teenspirit.github.io/portfolio-callista-lore/](https://by-teenspirit.github.io/portfolio-callista-lore/)

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

## ✦ License

Ce projet est personnel. Contenu & design © Callista Loré 2026.
