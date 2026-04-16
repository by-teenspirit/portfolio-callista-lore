import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard } from './ProjectCard'
import { PROJECTS } from '@/lib/data'
import type { ProjectTag } from '@/types'
import { cn } from '@/utils'

const FILTER_TABS: { label: string; value: ProjectTag | 'Tous' }[] = [
  { label: 'Tous', value: 'Tous' },
  { label: 'UX Design', value: 'UX Design' },
  { label: 'UX Research', value: 'UX Research' },
  { label: 'Gamification', value: 'Gamification' },
  { label: 'Front-End', value: 'Front-End' },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectTag | 'Tous'>('Tous')

  const filtered =
    activeFilter === 'Tous' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeFilter))

  return (
    <section id="projects" className="py-32 bg-ink/[0.015]">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            02 — Projets
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <h2 className="heading-lg text-ink">
              Ce que j'ai <span className="italic text-brand-orange">conçu</span>
            </h2>
            <p className="text-sm text-ink-muted max-w-xs">
              Des projets UX/UI, des hackathons, de la recherche — et toujours une intention
              derrière chaque pixel.
            </p>
          </div>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={cn(
                  'relative px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200',
                  activeFilter === value
                    ? 'text-white'
                    : 'text-ink-muted hover:text-ink bg-white border border-ink/8'
                )}
              >
                {activeFilter === value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-brand-orange rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-ink-subtle font-body">
            Aucun projet dans cette catégorie.
          </div>
        )}
      </div>
    </section>
  )
}
