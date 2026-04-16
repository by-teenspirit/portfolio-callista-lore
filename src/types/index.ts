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
  type: 'text' | 'highlight' | 'image-placeholder' | 'two-col' | 'quote' | 'metrics'
  title?: string
  content?: string
  left?: string
  right?: string
  metrics?: { value: string; label: string }[]
  author?: string
  color?: string
  alt?: string
  label?: string
  src?: string
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
