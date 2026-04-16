import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ProjectVersion } from '@/types'

interface VersionTimelineProps {
  versions: ProjectVersion[]
}

export function VersionTimeline({ versions }: VersionTimelineProps) {
  return (
    <div className="mb-12">
      <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-6">
        Versions du projet
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-3">
        {versions.map((version, i) => (
          <div key={version.label} className="flex items-start gap-3 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex-1 bg-white border border-ink/8 rounded-2xl p-5 hover:border-brand-orange/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-brand-orange text-white text-[10px] font-mono font-bold rounded-full">
                  {version.label}
                </span>
                <h4 className="text-sm font-body font-semibold text-ink">{version.title}</h4>
              </div>
              <p className="text-xs font-body text-ink-muted leading-relaxed">
                {version.description}
              </p>
            </motion.div>

            {i < versions.length - 1 && (
              <div className="flex-shrink-0 mt-6 text-ink-subtle/30">
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
