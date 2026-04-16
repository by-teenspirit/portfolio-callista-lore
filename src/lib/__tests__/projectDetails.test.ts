import { describe, it, expect } from 'vitest'
import { PROJECT_DETAILS } from '@/lib/projectDetails'
import { PROJECTS } from '@/lib/data'

describe('PROJECT_DETAILS', () => {
  it('has detail entries for all featured projects', () => {
    const featuredSlugs = PROJECTS.filter((p) => p.featured).map((p) => p.slug)
    featuredSlugs.forEach((slug) => {
      expect(PROJECT_DETAILS[slug], `Missing detail for featured project: ${slug}`).toBeDefined()
    })
  })

  it('each detail has required fields', () => {
    Object.entries(PROJECT_DETAILS).forEach(([slug, detail]) => {
      expect(detail.context, `${slug}: missing context`).toBeTruthy()
      expect(detail.role, `${slug}: missing role`).toBeTruthy()
      expect(detail.duration, `${slug}: missing duration`).toBeTruthy()
      expect(detail.challenge, `${slug}: missing challenge`).toBeTruthy()
      expect(detail.process, `${slug}: missing process`).toBeInstanceOf(Array)
      expect(detail.process.length, `${slug}: empty process`).toBeGreaterThan(0)
      expect(detail.outcomes, `${slug}: missing outcomes`).toBeInstanceOf(Array)
      expect(detail.outcomes.length, `${slug}: empty outcomes`).toBeGreaterThan(0)
    })
  })

  it('all process sections have a valid type', () => {
    const VALID_TYPES = ['text', 'highlight', 'image-placeholder', 'two-col', 'quote', 'metrics']
    Object.entries(PROJECT_DETAILS).forEach(([slug, detail]) => {
      detail.process.forEach((section, i) => {
        expect(VALID_TYPES, `${slug} process[${i}]: invalid type "${section.type}"`).toContain(
          section.type
        )
      })
    })
  })

  it('metrics sections have metric items', () => {
    Object.entries(PROJECT_DETAILS).forEach(([slug, detail]) => {
      detail.process
        .filter((s) => s.type === 'metrics')
        .forEach((section, i) => {
          expect(section.metrics, `${slug}: metrics section ${i} has no metrics`).toBeDefined()
          expect(section.metrics!.length).toBeGreaterThan(0)
        })
    })
  })

  it('detail slugs correspond to existing projects', () => {
    const projectSlugs = new Set(PROJECTS.map((p) => p.slug))
    Object.keys(PROJECT_DETAILS).forEach((slug) => {
      expect(projectSlugs.has(slug), `Detail for unknown project slug: ${slug}`).toBe(true)
    })
  })
})
