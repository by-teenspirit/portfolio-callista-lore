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

// ─── Project detail blocks ───────────────────────────────────────────────────

export interface ProjectSection {
  /**
   * text           — paragraphe simple
   * highlight      — bloc coloré mis en avant
   * image-placeholder — image avec fallback 4:3 (ratio vidéo)
   * image-full     — image pleine largeur avec caption enrichie ✨ NEW
   * section-title  — séparateur visuel avec badge label   ✨ NEW
   * two-col        — deux colonnes côte à côte
   * quote          — citation avec auteur
   * metrics        — grille de chiffres clés
   */
  type:
    | 'text'
    | 'highlight'
    | 'image-placeholder'
    | 'image-full'
    | 'section-title'
    | 'two-col'
    | 'quote'
    | 'metrics'

  title?: string
  content?: string
  left?: string
  right?: string
  metrics?: { value: string; label: string }[]
  author?: string
  color?: string
  alt?: string
  /** Libellé court affiché dans la légende ou le badge label */
  label?: string
  /** Chemin vers /public/mockups/*.jpg — ou URL externe */
  src?: string
  /** Caption secondaire (plus long que label) — utilisé par image-full */
  caption?: string
  /**
   * Si true, la section sort de la grille sidebar et prend toute la largeur.
   * Utilisé pour les diagrammes, userflow, design system, maquettes.
   */
  fullWidth?: boolean
}

export interface ProjectVersion {
  label: string // 'V1' | 'V2'
  title: string
  description: string
}

export interface ProjectCompany {
  name: string
  logo?: string // chemin vers /public/logos/*.svg
  url?: string
}

export interface ProjectTool {
  label: string
  logo: string // chemin vers /public/tools/*.svg
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
  /** Projets avec plusieurs versions (ex: Blackskill V1 → V2) */
  versions?: ProjectVersion[]
  /** Entreprises clientes ou partenaires */
  companies?: ProjectCompany[]
  /** Outils utilisés sur ce projet spécifiquement */
  tools?: ProjectTool[]
  /** Avant/après pour les refontes */
  beforeAfter?: { before: string; after: string }
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: ProjectTag[]
  coverColor: string
  coverEmoji?: string
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
