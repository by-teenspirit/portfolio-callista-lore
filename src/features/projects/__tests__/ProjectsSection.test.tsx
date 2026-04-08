import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectsSection } from '@/features/projects/ProjectsSection'
import { PROJECTS } from '@/lib/data'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    article: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <article {...props}>{children}</article>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ProjectsSection', () => {
  it('renders all projects by default', () => {
    render(<ProjectsSection />)
    PROJECTS.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    })
  })

  it('renders filter tabs', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Tous')).toBeInTheDocument()
    expect(screen.getByText('UX Design')).toBeInTheDocument()
    expect(screen.getByText('Gamification')).toBeInTheDocument()
  })

  it('filters projects by tag', () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByText('Front-End'))
    const frontEndProjects = PROJECTS.filter((p) => p.tags.includes('Front-End'))
    frontEndProjects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument()
    })
  })
})
