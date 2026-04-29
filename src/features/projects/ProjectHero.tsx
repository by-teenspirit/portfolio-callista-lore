import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Tag } from '@/components/ui/Tag'
import { ToolLogo } from '@/components/ui/ToolLogo'
import type { Project, ProjectDetail } from '@/types'

interface ProjectHeroProps {
  project: Project
  detail: ProjectDetail
}

const resolveUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function ProjectHero({ project, detail }: ProjectHeroProps) {
  const hasCompanies = detail.companies && detail.companies.length > 0
  const hasTools = detail.tools && detail.tools.length > 0

  return (
    <section className="relative overflow-hidden pt-28 pb-16">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${project.coverColor} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#1A1A18 1px, transparent 1px), linear-gradient(to right, #1A1A18 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 text-sm font-body text-ink-muted hover:text-brand-orange transition-colors duration-200 group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Retour aux projets
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Gauche */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              {project.prize && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange text-white text-xs font-mono rounded-full">
                  {project.prize}
                </span>
              )}
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} variant="orange" />
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="heading-lg text-ink mb-3"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg font-body text-ink-muted mb-8"
            >
              {project.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-sm font-body text-ink-muted">
                <Calendar size={14} className="text-brand-orange" />
                <span>{detail.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-body text-ink-muted">
                <Users size={14} className="text-brand-orange" />
                <span>{detail.role}</span>
              </div>
            </motion.div>

            {/* Tools — même style que About */}
            {hasTools && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <p className="text-xs font-mono text-ink-subtle tracking-widest uppercase mb-3">
                  Outils
                </p>
                <div className="flex flex-wrap gap-2">
                  {detail.tools!.map((tool) => (
                    <ToolLogo
                      key={tool.label}
                      tool={{ label: tool.label, logo: tool.logo }}
                      size="sm"
                      showLabel={true}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Droite — logos companies ou emoji fallback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col items-center gap-4 flex-shrink-0"
          >
            {hasCompanies ? (
              <div className="flex flex-col gap-3">
                {detail.companies!.map((company) => {
                  const inner = (
                    <div className="flex flex-col items-center gap-2 px-5 py-4 bg-white/80 backdrop-blur-sm border border-ink/8 rounded-2xl shadow-sm min-w-[120px] hover:border-brand-orange/25 hover:shadow-md transition-all duration-300">
                      {company.logo ? (
                        <img
                          src={resolveUrl(company.logo)}
                          alt={company.name}
                          className="h-8 w-auto object-contain"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const s = e.currentTarget.nextElementSibling as HTMLElement | null
                            if (s) s.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <span
                        className={`text-xs font-mono font-semibold text-ink-muted ${company.logo ? 'hidden' : ''}`}
                      >
                        {company.name}
                      </span>
                      <span className="text-[10px] font-mono text-ink-subtle">{company.name}</span>
                    </div>
                  )
                  return company.url ? (
                    <a
                      key={company.name}
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={company.name}>{inner}</div>
                  )
                })}
              </div>
            ) : (
              <div
                className="w-40 h-40 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl"
                style={{ backgroundColor: project.coverColor }}
              >
                <span className="text-6xl">{project.coverEmoji}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
