import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '@/types'

interface ProjectNavigationProps {
  prev: Project | null
  next: Project | null
}

// ── Barre discrète sticky sous la navbar ─────────────────────────────────────
export function ProjectTopNav({ prev, next }: ProjectNavigationProps) {
  if (!prev && !next) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="sticky top-[9%] z-40 flex items-center justify-between px-4 py-1.5 bg-surface/80 backdrop-blur-sm border-b border-ink/5"
    >
      {prev ? (
        <Link
          to="/projects/$slug"
          params={{ slug: prev.slug }}
          className="group flex items-center gap-1.5 text-ink-subtle hover:text-ink transition-colors duration-200"
        >
          <ChevronLeft
            size={13}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          <span className="text-[11px] font-mono truncate max-w-[120px] sm:max-w-[180px]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      <span className="text-[10px] font-mono text-ink-subtle/40 tracking-widest uppercase hidden sm:block">
        projets
      </span>

      {next ? (
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center gap-1.5 text-ink-subtle hover:text-ink transition-colors duration-200"
        >
          <span className="text-[11px] font-mono truncate max-w-[120px] sm:max-w-[180px] text-right">
            {next.title}
          </span>
          <ChevronRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </Link>
      ) : (
        <div />
      )}
    </motion.div>
  )
}

// ── Navigation bas de page ────────────────────────────────────────────────────
export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  return (
    <section className="border-t border-ink/5 py-16">
      <div className="section-container">
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: prev.slug }}
                className="group flex items-center gap-4 max-w-xs"
              >
                <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center flex-shrink-0 group-hover:border-brand-orange/40 group-hover:bg-brand-orange/5 transition-all duration-200">
                  <ArrowLeft
                    size={16}
                    className="text-ink-muted group-hover:text-brand-orange group-hover:-translate-x-0.5 transition-all duration-200"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-0.5">
                    Précédent
                  </p>
                  <p className="text-sm font-body font-medium text-ink group-hover:text-brand-orange transition-colors duration-200 line-clamp-1">
                    {prev.title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ) : (
            <div />
          )}

          {next ? (
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: next.slug }}
                className="group flex items-center gap-4 max-w-xs text-right"
              >
                <div>
                  <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-0.5">
                    Suivant
                  </p>
                  <p className="text-sm font-body font-medium text-ink group-hover:text-brand-orange transition-colors duration-200 line-clamp-1">
                    {next.title}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center flex-shrink-0 group-hover:border-brand-orange/40 group-hover:bg-brand-orange/5 transition-all duration-200">
                  <ArrowRight
                    size={16}
                    className="text-ink-muted group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </div>
              </Link>
            </motion.div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  )
}
