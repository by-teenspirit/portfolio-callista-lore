import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
}

/**
 * Scroll to a section by id
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Stagger delay helper for animations
 */
export function staggerDelay(index: number, base = 100): string {
  return `${index * base}ms`
}

/**
 * Truncate text to a given length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Get initials from a full name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
