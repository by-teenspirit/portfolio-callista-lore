import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cn, formatPhone, truncate, getInitials, staggerDelay } from '@/utils'

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('resolves Tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })
})

describe('formatPhone()', () => {
  it('formats a phone number with spaces', () => {
    expect(formatPhone('0771776233')).toBe('07 71 77 62 33')
  })
})

describe('truncate()', () => {
  it('does not truncate short text', () => {
    expect(truncate('Hello', 10)).toBe('Hello')
  })

  it('truncates long text with ellipsis', () => {
    const result = truncate('Hello world this is long', 10)
    expect(result).toMatch(/…$/)
    expect(result.length).toBeLessThanOrEqual(11) // 10 chars + ellipsis
  })
})

describe('getInitials()', () => {
  it('returns initials from full name', () => {
    expect(getInitials('Callista Loré')).toBe('CL')
  })

  it('handles single name', () => {
    expect(getInitials('Callista')).toBe('C')
  })
})

describe('staggerDelay()', () => {
  it('returns ms string', () => {
    expect(staggerDelay(0)).toBe('0ms')
    expect(staggerDelay(2)).toBe('200ms')
    expect(staggerDelay(3, 50)).toBe('150ms')
  })
})
