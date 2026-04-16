import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { useProject } from '@/hooks/useProject'
import { ProjectHero } from './ProjectHero'
import { ProjectContent } from './ProjectContent'
import { ProjectSidebar } from './ProjectSidebar'
import { ProjectNavigation } from './ProjectNavigation'
import { VersionTimeline } from './VersionTimeline'
import { BeforeAfterBanner } from './BeforeAfterBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface ProjectPageProps {
  slug: string
}

export function ProjectPage({ slug }: ProjectPageProps) {
  const { project, detail, prev, next, notFound } = useProject(slug)

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            Projet introuvable
          </p>
          <h1 className="font-display text-6xl font-black text-ink mb-4">
            404<span className="text-brand-orange">.</span>
          </h1>
          <p className="text-ink-muted font-body mb-8 max-w-sm">
            Ce projet n'existe pas dans le portfolio.
          </p>
          <Link to="/" hash="projects" className="btn-primary">
            ← Voir tous les projets
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="section-container text-center">
          <div className="text-4xl mb-4">{project.coverEmoji}</div>
          <h1 className="heading-lg text-ink mb-4">{project.title}</h1>
          <p className="text-ink-muted mb-2">{project.subtitle}</p>
          <p className="text-sm text-ink-subtle max-w-md mx-auto mt-6">
            Le contenu détaillé de ce projet arrive bientôt.
          </p>
          <Link to="/" hash="projects" className="btn-outline mt-8 inline-flex">
            ← Retour aux projets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article>
      {/* Hero */}
      <ProjectHero project={project} detail={detail} />

      {/* Context strip */}
      <div className="bg-ink/[0.02] border-y border-ink/5 py-6">
        <div className="section-container">
          <AnimatedSection direction="none">
            <p className="text-xs font-mono text-ink-subtle uppercase tracking-widest mb-2">
              Contexte
            </p>
            <p className="font-body text-ink-muted text-sm leading-relaxed max-w-3xl">
              {detail.context}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Main content */}
      <div className="py-20">
        <div className="section-container">
          {/* Versions timeline (V1 → V2) */}
          {detail.versions && detail.versions.length > 0 && (
            <AnimatedSection className="mb-4">
              <VersionTimeline versions={detail.versions} />
            </AnimatedSection>
          )}

          {/* Before / After banner */}
          {detail.beforeAfter && (
            <AnimatedSection className="mb-4">
              <BeforeAfterBanner
                before={detail.beforeAfter.before}
                after={detail.beforeAfter.after}
              />
            </AnimatedSection>
          )}

          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Left — process */}
            <div>
              <AnimatedSection className="mb-10">
                <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-2">
                  Démarche
                </p>
                <h2 className="heading-md text-ink">Processus de design</h2>
              </AnimatedSection>
              <ProjectContent sections={detail.process} />
            </div>

            {/* Right — sidebar */}
            <ProjectSidebar detail={detail} />
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <ProjectNavigation prev={prev} next={next} />
    </article>
  )
}
