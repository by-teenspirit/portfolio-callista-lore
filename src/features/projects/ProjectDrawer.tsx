import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react'
import { PROJECTS } from '@/lib/data'
import { cn } from '@/utils'

interface ProjectDrawerProps {
  currentSlug: string
}

const resolveUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function ProjectDrawer({ currentSlug }: ProjectDrawerProps) {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('right')

  // Fermer le drawer au changement de projet
  useEffect(() => {
    setOpen(false)
  }, [currentSlug])

  // Fermer avec Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug)
  const prev = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null
  const next = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null

  const drawerX = side === 'right' ? '100%' : '-100%'

  return (
    <>
      {/* ── Bouton toggle flottant ─────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0, x: side === 'right' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed top-1/2 -translate-y-1/2 z-50',
          'flex flex-col items-center gap-2',
          'transition-all duration-300',
          side === 'right' ? 'right-0' : 'left-0'
        )}
        aria-label="Parcourir les projets"
      >
        <div
          className={cn(
            'flex items-center gap-2 bg-white border border-ink/10 shadow-lg shadow-ink/5',
            'text-ink-muted hover:text-brand-orange hover:border-brand-orange/30',
            'transition-all duration-200 py-3 px-2',
            side === 'right'
              ? 'rounded-l-xl border-r-0 flex-row'
              : 'rounded-r-xl border-l-0 flex-row-reverse'
          )}
        >
          {/* Icône flèche */}
          {side === 'right' ? (
            <ChevronLeft
              size={14}
              className={cn('transition-transform duration-300', open && 'rotate-180')}
            />
          ) : (
            <ChevronRight
              size={14}
              className={cn('transition-transform duration-300', open && 'rotate-180')}
            />
          )}
          {/* Texte vertical */}
          <span
            className="text-[10px] font-mono tracking-widest uppercase"
            style={{
              writingMode: 'vertical-rl',
              transform: side === 'right' ? 'rotate(180deg)' : 'none',
            }}
          >
            Projets
          </span>
          {/* Pastille count */}
          <span className="w-4 h-4 rounded-full bg-brand-orange/10 text-brand-orange text-[9px] font-mono flex items-center justify-center">
            {PROJECTS.length}
          </span>
        </div>

        {/* Flèches prev/next rapides */}
        <div className={cn('flex flex-col gap-1', side === 'right' ? 'items-end' : 'items-start')}>
          {prev && (
            <Link
              to="/projects/$slug"
              params={{ slug: prev.slug }}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-lg bg-white/80 border border-ink/8 shadow-sm',
                'text-[9px] font-mono text-ink-subtle hover:text-brand-orange hover:border-brand-orange/30',
                'transition-all duration-200 backdrop-blur-sm max-w-[80px]'
              )}
              title={prev.title}
            >
              <ChevronLeft size={9} />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-lg bg-white/80 border border-ink/8 shadow-sm',
                'text-[9px] font-mono text-ink-subtle hover:text-brand-orange hover:border-brand-orange/30',
                'transition-all duration-200 backdrop-blur-sm max-w-[80px]'
              )}
              title={next.title}
            >
              <span className="truncate">{next.title}</span>
              <ChevronRight size={9} />
            </Link>
          )}
        </div>
      </motion.button>

      {/* ── Overlay backdrop ───────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Drawer panel ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: drawerX, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: drawerX, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-72 bg-surface border-ink/8 shadow-2xl shadow-ink/10',
              'flex flex-col overflow-hidden',
              side === 'right' ? 'right-0 border-l rounded-l-2xl' : 'left-0 border-r rounded-r-2xl'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink/5">
              <div className="flex items-center gap-2">
                <LayoutGrid size={14} className="text-brand-orange" />
                <span className="text-xs font-mono font-semibold text-ink-muted uppercase tracking-widest">
                  Tous les projets
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Switch côté */}
                <button
                  onClick={() => setSide((s) => (s === 'right' ? 'left' : 'right'))}
                  className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-subtle hover:text-ink transition-colors duration-200"
                  title={side === 'right' ? 'Déplacer à gauche' : 'Déplacer à droite'}
                >
                  {side === 'right' ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
                </button>
                {/* Fermer */}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-ink/5 text-ink-subtle hover:text-ink transition-colors duration-200"
                  aria-label="Fermer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Liste des projets */}
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
              {PROJECTS.map((project, i) => {
                const isActive = project.slug === currentSlug
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, x: side === 'right' ? 16 : -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                        isActive
                          ? 'bg-brand-orange/8 border border-brand-orange/20'
                          : 'hover:bg-ink/[0.04] border border-transparent'
                      )}
                    >
                      {/* Miniature couleur ou image */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden text-lg"
                        style={{ backgroundColor: project.coverColor }}
                      >
                        {project.coverImage ? (
                          <img
                            src={resolveUrl(project.coverImage)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-base leading-none">{project.coverEmoji}</span>
                        )}
                      </div>

                      {/* Texte */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-xs font-body font-semibold truncate transition-colors duration-200',
                            isActive
                              ? 'text-brand-orange'
                              : 'text-ink group-hover:text-brand-orange'
                          )}
                        >
                          {project.title}
                        </p>
                        <p className="text-[10px] font-mono text-ink-subtle truncate">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Indicateur actif */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                      )}

                      {/* Année */}
                      {!isActive && (
                        <span className="text-[9px] font-mono text-ink-subtle/60 flex-shrink-0">
                          {project.year}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Footer — nav prev/next */}
            {(prev || next) && (
              <div className="border-t border-ink/5 px-4 py-3 flex items-center justify-between gap-2">
                {prev ? (
                  <Link
                    to="/projects/$slug"
                    params={{ slug: prev.slug }}
                    className="flex items-center gap-1.5 text-ink-subtle hover:text-brand-orange transition-colors duration-200 group"
                  >
                    <ChevronLeft
                      size={13}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    <span className="text-[10px] font-mono truncate max-w-[90px]">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                <span className="text-[9px] font-mono text-ink-subtle/40">
                  {currentIndex + 1}/{PROJECTS.length}
                </span>

                {next ? (
                  <Link
                    to="/projects/$slug"
                    params={{ slug: next.slug }}
                    className="flex items-center gap-1.5 text-ink-subtle hover:text-brand-orange transition-colors duration-200 group"
                  >
                    <span className="text-[10px] font-mono truncate max-w-[90px] text-right">
                      {next.title}
                    </span>
                    <ChevronRight
                      size={13}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
