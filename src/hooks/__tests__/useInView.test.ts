import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInView } from '@/hooks/useInView'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()
let observerCallback: IntersectionObserverCallback

beforeEach(() => {
  global.IntersectionObserver = vi.fn().mockImplementation((cb) => {
    observerCallback = cb
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    }
  }) as unknown as typeof IntersectionObserver
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('useInView', () => {
  it('starts with isInView = false', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current.isInView).toBe(false)
  })

  it('returns a ref', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current.ref).toBeDefined()
    expect(result.current.ref.current).toBeNull()
  })
})
