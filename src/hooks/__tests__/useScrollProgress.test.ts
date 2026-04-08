import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollProgress } from '@/hooks/useScrollProgress'

describe('useScrollProgress', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    Object.defineProperty(document.body, 'scrollHeight', { writable: true, configurable: true, value: 2000 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 })
  })

  it('starts at 0', () => {
    const { result } = renderHook(() => useScrollProgress())
    expect(result.current).toBe(0)
  })

  it('updates on scroll', () => {
    const { result } = renderHook(() => useScrollProgress())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 600 })
      window.dispatchEvent(new Event('scroll'))
    })

    // scrollY=600, docHeight=2000-800=1200 → 600/1200 = 0.5
    expect(result.current).toBeCloseTo(0.5, 1)
  })

  it('clamps to [0, 1]', () => {
    const { result } = renderHook(() => useScrollProgress())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 99999 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(1)
  })
})
