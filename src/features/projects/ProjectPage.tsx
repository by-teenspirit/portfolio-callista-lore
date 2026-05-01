import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { useProject } from '@/hooks/useProject'
import { ProjectHero } from './ProjectHero'
import { ProjectContent } from './ProjectContent'
import { ProjectSidebar } from './ProjectSidebar'
import { ProjectNavigation } from './ProjectNavigation'
import { ProjectDrawer } from './ProjectDrawer'
import { VersionTimeline } from './VersionTimeline'
import { BeforeAfterBanner } from './BeforeAfterBanner'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { ProjectSection } from '@/types'

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

  const introSections: ProjectSection[] = []
  const wideSections: ProjectSection[] = []
  let wideStarted = false

  for (const section of detail.process) {
    if (!wideStarted && !section.fullWidth) {
      introSections.push(section)
    } else {
      wideStarted = true
      wideSections.push(section)
    }
  }

  const hasIntro = introSections.length > 0
  const hasWide = wideSections.length > 0

  return (
    <article>
      <ProjectDrawer currentSlug={slug} />
      <ProjectHero project={project} detail={detail} />

      {/* Bandeau contexte */}
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

      {/* ── Zone principale ──────────────────────────────────────────────────── */}
      <div className="py-20">
        <div className="section-container">
          {detail.versions && detail.versions.length > 0 && (
            <AnimatedSection className="mb-10">
              <VersionTimeline versions={detail.versions} />
            </AnimatedSection>
          )}
          {detail.beforeAfter && (
            <AnimatedSection className="mb-10">
              <BeforeAfterBanner
                before={detail.beforeAfter.before}
                after={detail.beforeAfter.after}
              />
            </AnimatedSection>
          )}

          {/*
            ── Layout à deux colonnes ──────────────────────────────────────────
            La grille s'étend sur TOUTE la hauteur du contenu (intro + wide).
            La sidebar est sticky dans sa colonne — elle reste visible tout au
            long du scroll, y compris pendant les sections pleine largeur.

            Colonne gauche :
              1. Sections intro (dans la largeur normale)
              2. Séparateur "Livrables"
              3. Sections wide — elles utilisent un wrapper qui déborde sur
                 toute la largeur disponible du conteneur (pas uniquement la
                 colonne gauche) grâce à la technique col-span + negative margin.

            Colonne droite :
              Sidebar sticky top-28 — ne bouge plus.
          */}
          <div className="lg:flex lg:gap-12 lg:items-start">
            {/* ── Colonne gauche (contenu) ──────────────────────────────── */}
            <div className="min-w-0 flex-1">
              <AnimatedSection className="mb-10">
                <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-2">
                  Démarche
                </p>
                <h2 className="heading-md text-ink">Processus de design</h2>
              </AnimatedSection>

              {hasIntro && (
                <div className={hasWide ? 'mb-0' : ''}>
                  <ProjectContent sections={introSections} />
                </div>
              )}

              {hasWide && (
                <>
                  {/* Séparateur entre intro et livrables */}
                  {hasIntro && (
                    <div className="flex items-center gap-4 my-12">
                      <div className="flex-1 h-px bg-gradient-to-r from-ink/10 to-transparent" />
                      <span className="text-[10px] font-mono text-ink-subtle/60 uppercase tracking-widest px-3 py-1 border border-ink/8 rounded-full">
                        Livrables
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-l from-ink/10 to-transparent" />
                    </div>
                  )}

                  {/*
                    Les sections wide s'affichent ici dans la colonne gauche
                    mais leur contenu prend toute la largeur disponible.
                    On utilise un wrapper avec overflow-visible et un margin
                    négatif calculé sur la sidebar (300px + gap 48px = 348px)
                    pour qu'elles s'étendent jusqu'au bord droit du container.
                  */}
                  <div className="lg:-mr-[348px] lg:pr-0">
                    <ProjectContent sections={wideSections} />
                  </div>
                </>
              )}
            </div>

            {/* ── Colonne droite — sidebar sticky ──────────────────────── */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0">
              <div className="sticky top-28">
                <ProjectSidebar detail={detail} />
              </div>
            </aside>
          </div>

          {/* Sidebar mobile inline */}
          <div className="lg:hidden mt-12">
            <ProjectSidebar detail={detail} />
          </div>
        </div>
      </div>

      <ProjectNavigation prev={prev} next={next} />
    </article>
  )
}
