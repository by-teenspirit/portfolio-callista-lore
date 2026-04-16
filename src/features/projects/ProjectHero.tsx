import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Tag } from '@/components/ui/Tag'
import type { Project, ProjectDetail } from '@/types'

interface ProjectHeroProps {
  project: Project
  detail: ProjectDetail
}

const resolveLogoUrl = (logo: string): string => {
  if (logo.startsWith('http://') || logo.startsWith('https://')) return logo
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${logo.startsWith('/') ? logo : `/${logo}`}`
}

export function ProjectHero({ project, detail }: ProjectHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16">
      {/* Ambient background */}
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
        {/* Back link */}
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
          {/* Left — text */}
          <div>
            {/* Company logos */}
            {detail.companies && detail.companies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="flex flex-wrap items-center gap-2 mb-5"
              >
                {detail.companies.map((company) =>
                  company.url ? (
                    <a
                      key={company.name}
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/8 rounded-xl hover:border-brand-orange/30 transition-colors"
                    >
                      {company.logo ? (
                        <img
                          src={resolveLogoUrl(company.logo)}
                          alt={company.name}
                          className="h-5 w-auto"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const sibling = e.currentTarget.nextElementSibling as HTMLElement | null
                            if (sibling) sibling.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <span className="text-xs font-mono font-semibold text-ink-muted hidden">
                        {company.name}
                      </span>
                    </a>
                  ) : (
                    <span
                      key={company.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/8 rounded-xl"
                    >
                      {company.logo ? (
                        <img
                          src={resolveLogoUrl(company.logo)}
                          alt={company.name}
                          className="h-5 w-auto"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const sibling = e.currentTarget.nextElementSibling as HTMLElement | null
                            if (sibling) sibling.classList.remove('hidden')
                          }}
                        />
                      ) : null}
                      <span className="text-xs font-mono font-semibold text-ink-muted hidden">
                        {company.name}
                      </span>
                    </span>
                  )
                )}
              </motion.div>
            )}

            {/* Tags */}
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

            {/* Title */}
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

            {/* Meta */}
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

            {/* Tools */}
            {detail.tools && detail.tools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex flex-wrap gap-2"
              >
                {detail.tools.map((tool) => (
                  <div
                    key={tool.label}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/8 rounded-xl"
                  >
                    <img
                      src={resolveLogoUrl(tool.logo)}
                      alt={tool.label}
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const sibling = e.currentTarget.nextElementSibling as HTMLElement | null
                        if (sibling) sibling.classList.remove('hidden')
                      }}
                    />
                    <span className="text-xs font-mono font-medium text-ink-muted hidden">
                      {tool.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right — cover visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex w-48 h-48 rounded-3xl items-center justify-center flex-shrink-0 shadow-2xl"
            style={{ backgroundColor: project.coverColor }}
          >
            <span className="text-6xl">{project.coverEmoji}</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
