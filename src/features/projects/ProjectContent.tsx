import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { ProjectSection } from '@/types'

interface ProjectContentProps {
  sections: ProjectSection[]
}

export function ProjectContent({ sections }: ProjectContentProps) {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <SectionBlock key={i} section={section} index={i} />
      ))}
    </div>
  )
}

function SectionBlock({ section, index }: { section: ProjectSection; index: number }) {
  const delay = Math.min(index * 0.06, 0.3)
  const resolveAssetUrl = (src: string) => {
    if (src.startsWith('http://') || src.startsWith('https://')) return src
    const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
    return `${base}${src.startsWith('/') ? src : `/${src}`}`
  }

  switch (section.type) {
    case 'text':
      return (
        <AnimatedSection delay={delay}>
          {section.title && (
            <h3 className="font-display font-bold text-ink text-xl mb-4">{section.title}</h3>
          )}
          <p className="font-body text-ink-muted leading-relaxed text-base">{section.content}</p>
        </AnimatedSection>
      )

    // ── NEW: section-title — séparateur visuel avec label/badge ───────────────
    case 'section-title':
      return (
        <AnimatedSection delay={delay}>
          <div className="relative flex items-center gap-5 py-2 mt-6 mb-2">
            {/* Ligne décorative */}
            <div className="flex-1 h-px bg-gradient-to-r from-ink/8 to-transparent" />
            {/* Badge label */}
            {section.label && (
              <span className="flex-shrink-0 text-[10px] font-mono font-semibold text-brand-orange tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-brand-orange/20 bg-brand-orange/5">
                {section.label}
              </span>
            )}
            <div className="flex-1 h-px bg-gradient-to-l from-ink/8 to-transparent" />
          </div>
          {section.title && (
            <h3 className="font-display font-bold text-ink text-2xl mb-3 text-center">
              {section.title}
            </h3>
          )}
          {section.content && (
            <p className="font-body text-ink-muted leading-relaxed text-sm text-center max-w-2xl mx-auto">
              {section.content}
            </p>
          )}
        </AnimatedSection>
      )

    case 'highlight':
      return (
        <AnimatedSection delay={delay}>
          <div
            className="relative overflow-hidden rounded-2xl p-8 border border-white/5"
            style={{ backgroundColor: section.color ?? '#1A1A18' }}
          >
            {/* Decorative circle */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
            <div className="relative z-10">
              {section.title && (
                <h3 className="font-display font-bold text-white text-xl mb-3">{section.title}</h3>
              )}
              <p className="font-body text-white/70 leading-relaxed text-base">{section.content}</p>
            </div>
          </div>
        </AnimatedSection>
      )

    case 'two-col':
      return (
        <AnimatedSection delay={delay}>
          {section.title && (
            <h3 className="font-display font-bold text-ink text-xl mb-6">{section.title}</h3>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-ink/5 rounded-2xl p-6">
              <p className="font-body text-ink-muted leading-relaxed text-sm">{section.left}</p>
            </div>
            <div className="bg-white border border-ink/5 rounded-2xl p-6">
              <p className="font-body text-ink-muted leading-relaxed text-sm">{section.right}</p>
            </div>
          </div>
        </AnimatedSection>
      )

    case 'quote':
      return (
        <AnimatedSection delay={delay}>
          <blockquote className="relative border-l-4 border-brand-orange pl-8 py-2">
            <Quote size={20} className="text-brand-orange/30 mb-3" />
            <p className="font-display italic text-ink text-lg leading-relaxed mb-3">
              {section.content}
            </p>
            {section.author && (
              <footer className="text-xs font-mono text-ink-subtle">— {section.author}</footer>
            )}
          </blockquote>
        </AnimatedSection>
      )

    case 'metrics':
      return (
        <AnimatedSection delay={delay}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.metrics?.map((metric, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + j * 0.07, duration: 0.4 }}
                className="bg-white border border-ink/5 rounded-2xl p-5 text-center hover:border-brand-orange/20 transition-colors duration-300"
              >
                <div className="font-display font-black text-3xl text-brand-orange mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-ink-subtle leading-snug">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      )

    // ── NEW: image-full — image pleine largeur avec caption stylée ────────────
    case 'image-full':
      return (
        <AnimatedSection delay={delay}>
          <figure className="rounded-2xl overflow-hidden border border-ink/8 bg-ink/[0.02]">
            {section.src ? (
              <>
                <img
                  src={resolveAssetUrl(section.src)}
                  alt={section.alt ?? section.label ?? 'Visuel du projet'}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fallback gracieux si l'image n'est pas encore en place
                    const el = e.currentTarget
                    el.style.display = 'none'
                    const fallback = el.nextElementSibling as HTMLElement | null
                    if (fallback) fallback.classList.remove('hidden')
                  }}
                />
                {/* Fallback affiché uniquement si l'image échoue */}
                <div className="hidden aspect-[16/7] flex items-center justify-center bg-ink/[0.03]">
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🖼️</div>
                    <p className="text-sm font-mono text-ink-subtle px-6">
                      {section.label ?? section.alt ?? 'Visuel du projet'}
                    </p>
                    {section.src && (
                      <p className="text-[10px] font-mono text-ink-subtle/50 mt-2">
                        → placer dans public{section.src}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // Placeholder si pas de src du tout
              <div className="aspect-[16/7] flex items-center justify-center bg-ink/[0.03]">
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🖼️</div>
                  <p className="text-sm font-mono text-ink-subtle px-6">
                    {section.label ?? section.alt ?? 'Visuel du projet'}
                  </p>
                </div>
              </div>
            )}
            {/* Caption avec label principal + caption secondaire */}
            {(section.label || section.caption) && (
              <figcaption className="px-5 py-4 border-t border-ink/8 flex flex-col gap-1">
                {section.label && (
                  <span className="text-xs font-mono font-semibold text-ink-muted">
                    {section.label}
                  </span>
                )}
                {section.caption && (
                  <span className="text-xs font-body text-ink-subtle leading-relaxed">
                    {section.caption}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </AnimatedSection>
      )

    // ── EXISTING: image-placeholder (conservé tel quel) ───────────────────────
    case 'image-placeholder':
      return (
        <AnimatedSection delay={delay}>
          {section.src ? (
            <figure className="rounded-2xl overflow-hidden bg-ink/[0.02] border border-ink/8">
              <img
                src={resolveAssetUrl(section.src)}
                alt={section.alt ?? section.label ?? 'Visuel du projet'}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null
                  if (fallback) fallback.classList.remove('hidden')
                }}
              />
              <div className="hidden aspect-video items-center justify-center bg-ink/[0.03]">
                <div className="text-center">
                  <div className="text-4xl mb-3">🖼️</div>
                  <p className="text-sm font-mono text-ink-subtle">
                    {section.alt ?? 'Visuel du projet'}
                  </p>
                </div>
              </div>
              {section.label && (
                <figcaption className="px-4 py-3 text-xs font-mono text-ink-subtle border-t border-ink/8">
                  {section.label}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className="rounded-2xl overflow-hidden bg-ink/[0.03] border border-ink/8 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-sm font-mono text-ink-subtle">
                  {section.alt ?? 'Visuel du projet'}
                </p>
              </div>
            </div>
          )}
        </AnimatedSection>
      )

    default:
      return null
  }
}
