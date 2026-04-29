import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ZoomableImage } from '@/components/ui/ZoomableImage'
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

    case 'section-title':
      return (
        <AnimatedSection delay={delay}>
          <div className="relative flex items-center gap-5 py-2 mt-6 mb-2">
            <div className="flex-1 h-px bg-gradient-to-r from-ink/8 to-transparent" />
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

    case 'image-full':
      if (!section.src) {
        return (
          <AnimatedSection delay={delay}>
            <figure className="rounded-2xl overflow-hidden border border-ink/8 bg-ink/[0.03]">
              <div className="aspect-[16/7] flex items-center justify-center">
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🖼️</div>
                  <p className="text-sm font-mono text-ink-subtle px-6">
                    {section.label ?? section.alt ?? 'Visuel du projet'}
                  </p>
                </div>
              </div>
            </figure>
          </AnimatedSection>
        )
      }
      return (
        <ZoomableImage
          src={section.src}
          alt={section.alt ?? section.label ?? 'Visuel du projet'}
          label={section.label}
          caption={section.caption}
          delay={delay}
          externalUrl={section.externalUrl}
          externalLabel={section.externalLabel}
        />
      )

    case 'image-placeholder':
      if (!section.src) {
        return (
          <AnimatedSection delay={delay}>
            <div className="rounded-2xl overflow-hidden bg-ink/[0.03] border border-ink/8 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-sm font-mono text-ink-subtle">
                  {section.alt ?? 'Visuel du projet'}
                </p>
              </div>
            </div>
          </AnimatedSection>
        )
      }
      return (
        <ZoomableImage
          src={section.src}
          alt={section.alt ?? section.label ?? 'Visuel du projet'}
          label={section.label}
          caption={section.caption}
          delay={delay}
          externalUrl={section.externalUrl}
          externalLabel={section.externalLabel}
        />
      )

    // ── image-trio : 3 images en 3 colonnes ──────────────────────────────────
    case 'image-trio': {
      const imgs = section.images ?? []
      return (
        <AnimatedSection delay={delay}>
          {section.title && (
            <h3 className="font-display font-bold text-ink text-xl mb-4">{section.title}</h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {imgs.map((img, j) =>
              img.src ? (
                <ZoomableImage
                  key={j}
                  src={img.src}
                  alt={img.alt ?? img.label ?? `Image ${j + 1}`}
                  label={img.label}
                  caption={img.caption}
                  delay={delay + j * 0.06}
                  externalUrl={img.externalUrl}
                  externalLabel={img.externalLabel}
                />
              ) : (
                <div
                  key={j}
                  className="rounded-2xl overflow-hidden bg-ink/[0.03] border border-ink/8 aspect-[3/4] flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <div className="text-3xl mb-2">🖼️</div>
                    <p className="text-xs font-mono text-ink-subtle">
                      {img.label ?? `Image ${j + 1}`}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </AnimatedSection>
      )
    }

    default:
      return null
  }
}
