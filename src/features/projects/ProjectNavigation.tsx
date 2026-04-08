import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '@/types'

interface ProjectNavigationProps {
  prev: Project | null
  next: Project | null
}

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
