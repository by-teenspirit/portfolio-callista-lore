// ─── Project ────────────────────────────────────────────────────────────────

export type ProjectTag =
  | 'UX Research'
  | 'UX Design'
  | 'UI Design'
  | 'Gamification'
  | 'Gestion de projet'
  | 'Front-End'
  | 'Skeumorphisme'
  | 'Hackathon'
  | 'Refonte'
  | 'Engagement'

// ─── Social posts (pour section-type 'social-grid') ─────────────────────────

export interface SocialPostData {
  /** 'single' = un visuel, 'carousel' = plusieurs slides */
  type: 'single' | 'carousel'
  src?: string
  slides?: string[]
  alt?: string
  caption?: string
  /** Ratio du post : carré, portrait Instagram, story */
  ratio?: '1:1' | '4:5' | '9:16'
}

// ─── Print items (pour section-type 'print-showcase') ───────────────────────

export type PrintFormat = 'A4-portrait' | 'A4-landscape' | 'kakemono' | 'A5-portrait' | 'square'

export interface PrintItemData {
  src?: string
  alt?: string
  label?: string
  caption?: string
  format: PrintFormat
}

// ─── Project detail blocks ───────────────────────────────────────────────────

export interface ProjectSection {
  /**
   * text            — paragraphe simple
   * highlight       — bloc coloré mis en avant
   * image-placeholder — image avec fallback
   * image-full      — image pleine largeur zoomable
   * image-trio      — 3 images en 3 colonnes
   * section-title   — séparateur visuel avec badge label
   * two-col         — deux colonnes côte à côte
   * quote           — citation avec auteur
   * metrics         — grille de chiffres clés
   * social-grid     — grille Instagram avec carrousel en lightbox
   * print-showcase  — documents print (flyers, kakémono…) avec ratios papier
   * card-flip       — carte de visite recto/verso avec flip 3D
   */
  type:
    | 'text'
    | 'highlight'
    | 'image-placeholder'
    | 'image-full'
    | 'image-trio'
    | 'section-title'
    | 'two-col'
    | 'quote'
    | 'metrics'
    | 'social-grid'
    | 'print-showcase'
    | 'card-flip'

  // ── Champs communs ──────────────────────────────────────────────────────────
  title?: string
  content?: string
  label?: string
  color?: string
  fullWidth?: boolean

  // ── text / highlight ────────────────────────────────────────────────────────
  left?: string
  right?: string

  // ── quote ────────────────────────────────────────────────────────────────────
  author?: string

  // ── metrics ──────────────────────────────────────────────────────────────────
  metrics?: { value: string; label: string }[]

  // ── image-full / image-placeholder ──────────────────────────────────────────
  src?: string
  alt?: string
  caption?: string
  externalUrl?: string
  externalLabel?: string
  /** Tronque l'image inline à cette hauteur. Cliquer ouvre la version entière en lightbox. */
  maxHeight?: string

  // ── image-trio ───────────────────────────────────────────────────────────────
  images?: {
    src?: string
    alt?: string
    label?: string
    caption?: string
    externalUrl?: string
    externalLabel?: string
  }[]

  // ── social-grid ──────────────────────────────────────────────────────────────
  posts?: SocialPostData[]

  // ── print-showcase ───────────────────────────────────────────────────────────
  printItems?: PrintItemData[]

  // ── card-flip ────────────────────────────────────────────────────────────────
  cardRecto?: { src?: string; alt?: string }
  cardVerso?: { src?: string; alt?: string }
}

export interface ProjectVersion {
  label: string
  title: string
  description: string
}

export interface ProjectCompany {
  name: string
  logo?: string
  url?: string
}

export interface ProjectTool {
  label: string
  logo: string
}

export interface ProjectDetail {
  context: string
  role: string
  duration: string
  team?: string
  challenge: string
  process: ProjectSection[]
  outcomes: string[]
  learnings?: string
  links?: { label: string; url: string }[]
  versions?: ProjectVersion[]
  companies?: ProjectCompany[]
  tools?: ProjectTool[]
  beforeAfter?: { before: string; after: string }
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: ProjectTag[]
  coverColor?: string
  coverEmoji?: string
  /**
   * Image de couverture dans la ProjectCard.
   * Chemin /public/covers/nom.jpg ou URL.
   */
  coverImage?: string
  featured?: boolean
  isNew?: boolean
  year: number
  prize?: string
  slug: string
  detail?: ProjectDetail
}

// ─── Experience ─────────────────────────────────────────────────────────────

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  tags: string[]
  achievements: string[]
  current?: boolean
}

// ─── Education ──────────────────────────────────────────────────────────────

export interface Education {
  id: string
  school: string
  diploma: string
  period: string
  skills: string[]
  achievements: string[]
  mention?: string
}

// ─── Skill ──────────────────────────────────────────────────────────────────

export interface Skill {
  label: string
  category: 'design' | 'research' | 'tech' | 'management'
}

// ─── Contact ────────────────────────────────────────────────────────────────

export interface ContactInfo {
  phone: string
  email: string
  linkedin: string
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}
