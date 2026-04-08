import { describe, it, expect } from 'vitest'
import { PROJECTS, EXPERIENCES, EDUCATION, CONTACT_INFO } from '@/lib/data'

describe('PROJECTS data', () => {
  it('has items', () => {
    expect(PROJECTS.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    PROJECTS.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.slug).toBeTruthy()
      expect(project.tags).toBeInstanceOf(Array)
      expect(project.tags.length).toBeGreaterThan(0)
      expect(project.year).toBeGreaterThan(2000)
    })
  })

  it('slugs are unique', () => {
    const slugs = PROJECTS.map((p) => p.slug)
    const unique = new Set(slugs)
    expect(unique.size).toBe(slugs.length)
  })

  it('ids are unique', () => {
    const ids = PROJECTS.map((p) => p.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })
})

describe('EXPERIENCES data', () => {
  it('has at least one current experience', () => {
    const current = EXPERIENCES.filter((e) => e.current)
    expect(current.length).toBeGreaterThan(0)
  })

  it('each experience has achievements', () => {
    EXPERIENCES.forEach((exp) => {
      expect(exp.achievements.length).toBeGreaterThan(0)
    })
  })
})

describe('EDUCATION data', () => {
  it('has at least 2 education entries', () => {
    expect(EDUCATION.length).toBeGreaterThanOrEqual(2)
  })
})

describe('CONTACT_INFO', () => {
  it('has valid email format', () => {
    expect(CONTACT_INFO.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('has linkedin url', () => {
    expect(CONTACT_INFO.linkedin).toBeTruthy()
  })
})
