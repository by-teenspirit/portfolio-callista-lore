import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useProject } from '@/hooks/useProject'
import { PROJECTS } from '@/lib/data'

describe('useProject', () => {
  it('returns notFound=true for an unknown slug', () => {
    const { result } = renderHook(() => useProject('non-existent-slug'))
    expect(result.current.notFound).toBe(true)
    expect(result.current.project).toBeNull()
    expect(result.current.detail).toBeNull()
  })

  it('returns the correct project for a valid slug', () => {
    const firstProject = PROJECTS[0]
    const { result } = renderHook(() => useProject(firstProject.slug))
    expect(result.current.notFound).toBe(false)
    expect(result.current.project?.slug).toBe(firstProject.slug)
    expect(result.current.project?.title).toBe(firstProject.title)
  })

  it('returns null for prev when project is first', () => {
    const { result } = renderHook(() => useProject(PROJECTS[0].slug))
    expect(result.current.prev).toBeNull()
  })

  it('returns null for next when project is last', () => {
    const last = PROJECTS[PROJECTS.length - 1]
    const { result } = renderHook(() => useProject(last.slug))
    expect(result.current.next).toBeNull()
  })

  it('returns prev and next for a middle project', () => {
    const middle = PROJECTS[3]
    const { result } = renderHook(() => useProject(middle.slug))
    expect(result.current.prev?.slug).toBe(PROJECTS[2].slug)
    expect(result.current.next?.slug).toBe(PROJECTS[4].slug)
  })

  it('returns detail for projects that have one', () => {
    const { result } = renderHook(() => useProject('idalgo-scorecast'))
    expect(result.current.detail).not.toBeNull()
    expect(result.current.detail?.challenge).toBeTruthy()
  })
})
