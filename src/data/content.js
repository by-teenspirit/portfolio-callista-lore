// ============================================
// DATA — content.js
// Toutes les données du portfolio
// ============================================

export const PERSON = {
  name: 'Callista',
  title: ['UX designer', '& chef de projet'],
  tagline: '👋 moi, c\'est Callista, et je suis',
  email: 'callista.long@gmail.com',
  phone: '07 77 62 23',
  linkedin: 'linkedin.com/in/callista-letti/',
  bio: [
    "J'aime comprendre les besoins, les frustrations, et imaginer comment rendre les choses plus simples, plus fluides, plus agréables à utiliser.",
    "J'ai toujours aimé toucher à plusieurs domaines — communication, marketing, design, gestion de projet — et c'est ce qui me plaît dans l'UX : on me fait prendre la même chose deux jours de suite.",
    "Conçu une nouvelle app, amélioré une interface existante, repensé un parcours, ajouté des fonctionnalités clés — mais aussi accompagné des clients, organisé les projets... c'est tout ce que j'aime faire au quotidien.",
    "Curieuse, rigoureuse, avec le goût du travail bien fait : j'aime la progression dans ma carrière, ma passion.",
    "Et en ce moment, je m'intéresse tout particulièrement aux mécaniques de gamification et à l'engagement utilisateur.",
  ],
  skills: [
    { label: 'Product Design', type: 'ux' },
    { label: 'UX Research', type: 'research' },
    { label: 'UI/UI Design', type: 'ui' },
    { label: 'Front-End', type: 'front' },
  ],
};

export const EXPERIENCES = [
  {
    company: 'iDalgo / Scorecast',
    role: 'UX Designer & apprent-développeuse',
    period: 'Depuis Nov. 2023',
    tags: ['Startup', 'App Mobile', 'Accessibilité', 'Bénévolat', 'Front-End'],
    bullets: [
      "Refonte des interfaces d'algo discrètes et affichage du scoring et du ranking d'athlètes pour les rendre plus lisibles et intuitives",
      "Participation active à un projet React",
      "Refonte de gamification/gestion de design pour un programme app",
    ],
  },
  {
    company: 'One More Thing Studio',
    role: 'UX Designer & Chef de projet',
    period: 'Janv. 2021',
    tags: ['UX Design', 'Gamification', 'CRM', 'Contenu accessible'],
    bullets: [
      "Refonte du site avec un outil Wix avec accessibilité, responsive et améliorations pour améliorer nos délais de livraison avec le programme",
      "Refonte de gamification/gestion de design pour un programme app",
    ],
  },
  {
    company: 'Projet entrepreneur.rial',
    role: '—',
    period: 'Fév. 2021 — Juillet 2021',
    tags: ['UX Design', 'Figma', 'Prototypage', 'Gamification', 'Applications mobile'],
    bullets: [
      "Création des maquettes et de leur équipe (ajouté à un nouveau service",
      "Tout départ d'un projet en participation de la vente Affichage d'itération",
    ],
  },
  {
    company: 'CallDesign',
    role: '— Micro-entrepreneuse.rial',
    period: 'Mars. 2022 — Jan. 2023',
    tags: ['UI Design', 'UX Design', 'App mobile', 'Content Management', 'Site Overlay'],
    bullets: [
      "Prestation de services UI/UX, avec les outils UX, UI, communication, etc.",
      "Créations d'un programme de produit de launching, VMémoire du",
      "Participation à la conception et production de structures, pour l'ajout portail de renouveau et de notre Site Affiliates.",
    ],
  },
  {
    company: 'Dowvena',
    role: 'Graphiste & Codeuse Front-End',
    period: 'Sept. 2021 — Jan. 2022',
    tags: ['Frontend', 'Illustration', 'UI Design', 'Figma', 'CSS', 'Site Web', 'Shooting Photo'],
    bullets: [
      "Prestation de services UI/UX, conception de design et de structure de la marque en fonction de la qualité marketing",
      "Création des maquettes et de leur équipe : ajouté une stratégie marketing",
      "Prévue et de formations aux salons des prix plus utiles sur le site",
    ],
  },
];

export const FORMATIONS = [
  {
    title: 'Mastère UX Design et Stratégie Digitale',
    school: 'Campus Numérique',
    period: 'Fév. 2022 — Juin 2023',
    tags: ['Contenu Numérique', 'Marketing Tech', 'SEO/SEM/SXO', 'LeanUX'],
    bullets: [
      "Refonte de deux maquettes et créations d'innovations",
      "Méthodes sur l'engagement utilisateurs",
      "Atelier de deux maquettes et créations de créations",
      "Participation d'un programme d'une objet 3D sur Blender",
      "Création d'une application selon diverses sans que vous prenons",
      "Création d'une application selon diverses sans que vous prenons",
    ],
  },
  {
    title: 'DNMade Numérique',
    subtitle: 'en option Objets Connectés',
    school: 'Campus Numérique',
    period: 'Sept. 2021 — Fév. 2022',
    tags: ['FIGMA', 'InDesign', 'Illustrator', 'Blender', 'CSS', 'Formes Variées'],
    bullets: [
      "Point individuel d'un maquette de 3D (+Pr : elle code Html+CSS)",
      "Refonte du un UX engagements 3 objets",
      "Création d'un wireframe intégration d'un objet 3D selon Blender",
      "Création d'une application selon diverses sans que vous prenons Blender",
      "Création d'une application et dans un cadre réduit",
    ],
  },
];

export const PRIX = [
  {
    title: 'Human2Sport',
    subtitle: '— Lauréat Coup de Cœur',
    period: 'Mar. 2022',
    tags: ['Gamification', 'Certification', 'UX Research', 'Team unique'],
    bullets: [
      "Design et parcours de la gamification dans une application selon un moteur création",
    ],
  },
];

export const CENTRES_INTERET = [
  { label: 'Gamification', icon: '🎮' },
  { label: 'Jeux vidéos', icon: '🕹️' },
  { label: 'Expérimentation produit', icon: '🧪' },
  { label: 'Engagement utilisateur', icon: '💡' },
  { label: 'Esp. immersives', icon: '🌐' },
  { label: 'Développement', icon: '💻' },
];

export const PROJECTS = [
  {
    id: 'instant-prod',
    title: 'Instant Prod',
    slug: 'instant-prod',
    tags: [
      { label: 'UX Research', type: 'research' },
      { label: 'Service Design', type: 'ux' },
      { label: 'Landing Page', type: 'design' },
    ],
    description: 'Application mobile de mise en relation entre producteurs locaux et consommateurs. Refonte UX complète et design system.',
    cover: null, // à remplacer par une image
    color: '#4A6FA5',
    year: '2023',
    status: 'Étude de cas complète',
  },
  {
    id: 'blackskill',
    title: 'Blackskill',
    slug: 'blackskill',
    tags: [
      { label: 'UX Design', type: 'ux' },
      { label: 'Design', type: 'design' },
    ],
    description: 'Plateforme de compétences et de mise en relation professionnelle. Design de l\'expérience utilisateur complète.',
    cover: null,
    color: '#1C1C1C',
    year: '2022',
    status: 'Design system + Prototypage',
  },
  {
    id: 'human2sport',
    title: 'Human2Sport',
    slug: 'human2sport',
    tags: [
      { label: 'Gamification', type: 'soft' },
      { label: 'Transition', type: 'ux' },
    ],
    description: 'App mobile de reconversion sportive gamifiée. Lauréat du prix Coup de Cœur au campus numérique.',
    cover: null,
    color: '#2E7D6B',
    year: '2022',
    status: '🏆 Prix Coup de Cœur',
  },
  {
    id: 'pes-depannage',
    title: 'PES Dépannage',
    slug: 'pes-depannage',
    tags: [
      { label: 'Gestion de projet', type: 'gestion' },
      { label: 'UI Design', type: 'ui' },
    ],
    description: 'Refonte complète du site web et de l\'application d\'un service de dépannage automobile.',
    cover: null,
    color: '#F26522',
    year: '2022',
    status: 'Refonte complète',
  },
  {
    id: 'direct-mandat',
    title: 'Direct Mandat',
    slug: 'direct-mandat',
    tags: [
      { label: 'Fintech', type: 'ux' },
      { label: 'UI Design', type: 'ui' },
    ],
    description: 'Outil de gestion de mandats immobiliers. Conception de l\'interface et des parcours utilisateurs.',
    cover: null,
    color: '#0891B2',
    year: '2023',
    status: 'UX + UI',
  },
  {
    id: 'quadient',
    title: 'Quadient',
    slug: 'quadient',
    tags: [
      { label: 'UX Research', type: 'research' },
      { label: 'Collaboration', type: 'soft' },
    ],
    description: 'Audit UX et refonte de l\'expérience d\'une solution logicielle B2B de communication client.',
    cover: null,
    color: '#8B5CF6',
    year: '2023',
    status: 'Audit + Recommandations',
  },
  {
    id: 'memoire-master',
    title: 'Mémoire du Master',
    slug: 'memoire-master',
    tags: [
      { label: 'Gamification', type: 'soft' },
      { label: 'Recherche', type: 'research' },
    ],
    description: 'Mémoire de recherche sur l\'engagement utilisateur par la gamification dans les applications de bien-être.',
    cover: null,
    color: '#D97706',
    year: '2023',
    status: 'Recherche académique',
  },
];
