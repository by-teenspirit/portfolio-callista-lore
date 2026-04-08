import { useMemo } from 'react'
import { PROJECTS } from '@/lib/data'
import { PROJECT_DETAILS } from '@/lib/projectDetails'
import type { Project, ProjectDetail } from '@/types'

interface UseProjectResult {
  project: Project | null
  detail: ProjectDetail | null
  prev: Project | null
  next: Project | null
  notFound: boolean
}

/**
 * Returns a project by slug along with its detail content and prev/next siblings
 */
export function useProject(slug: string): UseProjectResult {
  return useMemo(() => {
    const index = PROJECTS.findIndex((p) => p.slug === slug)

    if (index === -1) {
      return { project: null, detail: null, prev: null, next: null, notFound: true }
    }

    const project = PROJECTS[index]
    const detail = PROJECT_DETAILS[slug] ?? null
    const prev = index > 0 ? PROJECTS[index - 1] : null
    const next = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null

    return { project, detail, prev, next, notFound: false }
  }, [slug])
}
