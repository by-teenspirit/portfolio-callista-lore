import type { Project, Experience, Education, Skill, ContactInfo, NavLink } from '@/types'

// ─── Contact ────────────────────────────────────────────────────────────────

export const CONTACT_INFO: ContactInfo = {
  phone: '07 71 77 62 33',
  email: 'callista.lore@gmail.com',
  linkedin: 'linkedin.com/in/callista-loré/',
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: 'À propos de moi', href: '#about' },
  { label: 'Mes projets', href: '#projects' },
  { label: 'Contactez-moi', href: '#contact' },
]

// ─── Projects ───────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'idalgo-scorecast',
    title: 'iDalgo / Scorecast',
    subtitle: 'Refonte de modules & gamification',
    description:
      "Refonte des modules iDalgo pour la presse sportive. Réflexion de gamification sur l'application Scorecast : système de pronostics entre amis. Réponse à un appel d'offre pour le CCI du Gers.",
    tags: ['UX Design', 'Gamification', 'Front-End'],
    coverImage: '/covers/scorecast-gamification.png',
    featured: true,
    year: 2025,
    isNew: true,
  },
  {
    id: '2',
    slug: 'instant-prod',
    title: 'Instant Prod',
    subtitle: 'Mise en relation cinéma',
    description:
      'Projet entrepreneurial de mise en relation de jeunes diplômés de cinéma et de directeurs de production. UX Research approfondie pour comprendre les besoins des deux côtés du marché.',
    tags: ['UX Research', 'Gestion de projet'],
    coverImage: '/covers/instant-prod-maquettes.jpg',
    featured: true,
    year: 2024,
  },
  {
    id: '3',
    slug: 'blackskill',
    title: 'Blackskill',
    subtitle: 'App interne skeumorphique',
    description:
      "Création d'une application interne pour Blackskill avec une approche skeumorphique distinctive. Design d'interfaces qui imitent des objets physiques pour une expérience familière.",
    tags: ['UX Design', 'Skeumorphisme'],
    coverImage: '/covers/blsk-maquettes-v2.png',
    featured: true,
    year: 2024,
  },
  {
    id: '4',
    slug: 'human2sport',
    title: 'Human2Sport',
    subtitle: 'Hackathon — Lauréat Coup de Cœur',
    description:
      "Application pour donner envie aux enfants en situation de handicap de faire du sport. Lauréat Coup de Cœur en Novembre 2023. Gamification et UX Research au service de l'inclusion.",
    tags: ['Gamification', 'Hackathon', 'UX Research'],
    coverImage: '/covers/ithake-maquettes.png',
    featured: true,
    year: 2023,
    prize: '🏆 Lauréat Coup de Cœur',
  },
  {
    id: '5',
    slug: 'pes-depannage',
    title: 'PES Dépannage',
    subtitle: 'Plateforme artisans / particuliers',
    description:
      "Co-fondé une plateforme de mise en relation artisans/particuliers. Création des maquettes et mise en ligne d'une première version atteignant 100 utilisateurs. Refonte complète dans le cadre du Mastère (mention major ex-aequo).",
    tags: ['Gestion de projet', 'UX Design'],
    coverImage: '/covers/pesd-v2-maquettes.png',
    featured: false,
    year: 2023,
  },
  {
    id: '6',
    slug: 'direct-mandat',
    title: 'Direct Mandat',
    subtitle: 'Refonte UX complète',
    description:
      'Refonte du site web de DirectMandat via des ateliers collaboratifs avec les équipes. Approche responsive-first, création de wireframes et maquettes fonctionnelles.',
    tags: ['UX Design', 'Gestion de projet'],
    coverColor: '#1B2A1B',
    coverEmoji: '🏠',
    featured: false,
    year: 2023,
  },
  {
    id: '7',
    slug: 'quadient',
    title: 'Quadient',
    subtitle: 'Gamification & objets connectés',
    description:
      "UX Design et réflexion de gamification dans le cadre d'un projet impliquant des objets connectés. Imaginer un parcours de gamification dans une application d'une monnaie communautaire.",
    tags: ['UX Design', 'Gamification', 'Gestion de projet'],
    coverColor: '#1A0A2E',
    coverEmoji: '📦',
    featured: false,
    year: 2024,
  },
  {
    id: '8',
    slug: 'memoire-master',
    title: 'Mémoire du Master',
    subtitle: 'Engagement & Gamification',
    description:
      "Mémoire de recherche sur l'engagement des utilisateurs et les mécaniques de gamification. Exploration des leviers psychologiques de l'engagement dans les applications numériques.",
    tags: ['Engagement', 'Gamification', 'UX Research', 'Gestion de projet'],
    coverColor: '#2A1A0A',
    coverEmoji: '📚',
    featured: false,
    year: 2025,
  },
]

// ─── Experiences ─────────────────────────────────────────────────────────────

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'iDalgo / Scorecast',
    role: 'UX Designer & Apprentie Développeuse',
    period: 'Depuis Décembre 2023',
    tags: ['UX Design', 'Gamification', 'Front-End', 'Accessibilité'],
    current: true,
    achievements: [
      "Refonte des modules iDalgo destinés à l'affichage d'informations pour la presse sportive",
      "Développement d'un projet en React",
      "Réflexion de gamification sur l'application Scorecast : pronostics entre amis",
    ],
  },
  {
    id: '2',
    company: 'One More Thing Studio',
    role: 'UX Designer & Chef de projet',
    period: 'Juil 2023 — Oct 2025',
    tags: ['UX Design', 'Gamification', 'CRM', 'Communication visuelle'],
    achievements: [
      'Refonte du site web de DirectMandat via des ateliers, responsive',
      "Création d'une application interne pour BlackSkill",
      "Gestion des projets et applications d'Atid Consulting, l'Office du Tourisme de Bordeaux, Airmont",
      'Réflexion de gamification et gestion de projet pour un programme Ambassadeur NuxeLink',
    ],
  },
  {
    id: '3',
    company: 'PES Dépannage',
    role: 'Projet entrepreneurial',
    period: 'Juin 2023 — Juillet 2025',
    tags: ['UX Design', 'Mise en relation', 'Marketing', 'Gestion de projet'],
    achievements: [
      'Co-fondé une plateforme de mise en relation artisans/particuliers',
      "Création des maquettes et mise en ligne d'une première version atteignant 100 utilisateurs",
      'Refonte complète du projet dans le cadre du Mastère (mention major ex-aequo)',
    ],
  },
  {
    id: '4',
    company: 'CalliDesign',
    role: 'Micro-entrepreneuriat',
    period: 'Depuis Juin 2023',
    tags: ['UX Design', 'Agile', 'Customer Experience', 'User Journey'],
    achievements: [
      'Réalisation de missions ponctuelles de conception UX/UI (maquettes fonctionnelles, audits UX, wireframes)',
      'Travail avec des indépendants et petites structures, approche sur mesure centrée utilisateur',
      "Refonte de l'application Blackskill : modernisation de l'interface",
    ],
  },
  {
    id: '5',
    company: 'Dovema',
    role: 'Graphiste & Codeuse Front-End',
    period: 'Sept 2021 — Jun 2023',
    tags: ['Wireframe', 'UX Design', 'CMS Magento', 'SEO/SEA'],
    achievements: [
      'Maintien du CMS et changement de design du site web selon la période marketing',
      "Communication via newsletter, mise en place d'une stratégie marketing",
      'Prises et retouches photos pour les produits',
    ],
  },
]

// ─── Education ───────────────────────────────────────────────────────────────

export const EDUCATION: Education[] = [
  {
    id: '1',
    school: 'Mastère UX Design et Stratégie Digitale',
    diploma: 'Mastère',
    period: 'Sept 2023 — Juin 2025',
    skills: [
      'Customer Journey Map',
      'Diagramme UML',
      'Business Model Canvas',
      'Design Thinking',
      'Gamification',
      'UI Design',
      'Accessibilité',
      'Front-end',
      'Customer Development',
      'Media planning',
      'SEO/SEM/SMO',
      'Lean UX',
    ],
    achievements: [
      'Réponse à un appel d’offre pour le CCI du Gers',
      'Mémoire sur l’engagement des utilisateurs',
      'Projet entreprenariat sur la mise en relation de particuliers en demande de dépannage et d’artisans',
      'Projet entreprenariat de mise en relation de jeunes diplômés de cinéma et de directeurs de production',
    ],
    mention: 'Major ex-aequo',
  },
  {
    id: '2',
    school: 'DNMade Numérique',
    diploma: 'DNMade — option Objets connectés',
    period: 'Sept 2021 — Jun 2023',
    skills: [
      'UX Design',
      'Gamification',
      'Responsive design',
      'Ateliers',
      'Charte graphique',
      'HTML/CSS',
      'Javascript',
      'Blender (3D)',
      'Persona',
      'Benchmark',
    ],
    achievements: [
      'Projet individuel d’un magazine de Street Art - site codé en HTML/CSS',
      "Refonte du site Tangram avec l'objectif d'une modernisation et amélioration de l’expérience utilisateur",
      'Création d’un site avec intégration d’un objet 3D créé sur Blender',
      'Création d’une application pour donner envie aux enfants en situation de handicap de faire du sport',
    ],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

export const SKILLS: Skill[] = [
  { label: 'Product Design', category: 'design' },
  { label: 'UX Research', category: 'research' },
  { label: 'UX/UI Design', category: 'design' },
  { label: 'Gamification', category: 'design' },
  { label: 'Design Thinking', category: 'design' },
  { label: 'Prototypage', category: 'design' },
  { label: 'Wireframing', category: 'design' },
  { label: 'React', category: 'tech' },
  { label: 'HTML/CSS', category: 'tech' },
  { label: 'JavaScript', category: 'tech' },
  { label: 'Figma', category: 'tech' },
  { label: 'Blender 3D', category: 'tech' },
  { label: 'Gestion de projet', category: 'management' },
  { label: 'Lean UX', category: 'management' },
  { label: 'Customer Journey', category: 'research' },
  { label: 'Tests utilisateurs', category: 'research' },
]

// ─── Interests ───────────────────────────────────────────────────────────────

export const INTERESTS = [
  { label: 'Gamification', emoji: '🎮' },
  { label: 'Jeux vidéos', emoji: '🕹️' },
  { label: 'Exp. immersives', emoji: '🥽' },
  { label: 'Engagement utilisateur', emoji: '💡' },
  { label: 'Expérimentation produit', emoji: '🧪' },
  { label: 'Développement', emoji: '💻' },
]

// ─── Tools ───────────────────────────────────────────────────────────────────

export const TOOLS = [
  { label: 'Figma', image: '/tools/figma.svg' },
  { label: 'Photoshop', image: '/tools/photoshop.svg' },
  { label: 'React', image: '/tools/react.svg' },
  { label: 'Notion', image: '/tools/notion.svg' },
  { label: 'Blender', image: '/tools/blender.svg' },
  { label: 'Dribbble', image: '/tools/dribbble.svg' },
  { label: 'Google Forms', image: '/tools/google-forms.svg' },
  { label: 'GitHub', image: '/tools/github.svg' },
  { label: 'Hotjar', image: '/tools/hotjar.svg' },
  { label: 'Miro', image: '/tools/miro.svg' },
  { label: 'PostgreSQL', image: '/tools/postgresql.svg' },
]
