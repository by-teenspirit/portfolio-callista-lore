import { CheckCircle2, Lightbulb, ExternalLink } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { ProjectDetail } from '@/types'

interface ProjectSidebarProps {
  detail: ProjectDetail
}

export function ProjectSidebar({ detail }: ProjectSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Challenge */}
      <AnimatedSection
        delay={0.1}
        direction="right"
        className="bg-white border border-ink/5 rounded-2xl p-6"
      >
        <h3 className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
          Le défi
        </h3>
        <p className="font-body text-ink-muted text-sm leading-relaxed">{detail.challenge}</p>
      </AnimatedSection>

      {/* Outcomes */}
      <AnimatedSection
        delay={0.15}
        direction="right"
        className="bg-white border border-ink/5 rounded-2xl p-6"
      >
        <h3 className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4 flex items-center gap-2">
          <CheckCircle2 size={12} />
          Résultats
        </h3>
        <ul className="space-y-3">
          {detail.outcomes.map((outcome, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm font-body text-ink-muted">
              <span className="text-brand-orange mt-0.5 flex-shrink-0 font-bold">›</span>
              {outcome}
            </li>
          ))}
        </ul>
      </AnimatedSection>

      {/* Learnings */}
      {detail.learnings && (
        <AnimatedSection
          delay={0.2}
          direction="right"
          className="bg-brand-orange/5 border border-brand-orange/15 rounded-2xl p-6"
        >
          <h3 className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4 flex items-center gap-2">
            <Lightbulb size={12} />
            Ce que j'ai appris
          </h3>
          <p className="font-body text-ink-muted text-sm leading-relaxed italic">
            {detail.learnings}
          </p>
        </AnimatedSection>
      )}

      {/* Links */}
      {detail.links && detail.links.length > 0 && (
        <AnimatedSection
          delay={0.25}
          direction="right"
          className="bg-white border border-ink/5 rounded-2xl p-6"
        >
          <h3 className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            Liens
          </h3>
          <div className="space-y-2">
            {detail.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-body text-ink hover:text-brand-orange transition-colors duration-200 group"
              >
                <ExternalLink
                  size={12}
                  className="text-ink-subtle group-hover:text-brand-orange transition-colors"
                />
                {link.label}
              </a>
            ))}
          </div>
        </AnimatedSection>
      )}
    </aside>
  )
}
