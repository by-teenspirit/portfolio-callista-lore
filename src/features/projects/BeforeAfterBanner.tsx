import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface BeforeAfterBannerProps {
  before: string
  after: string
}

export function BeforeAfterBanner({ before, after }: BeforeAfterBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-center mb-12"
    >
      {/* Before */}
      <div className="bg-ink/[0.04] border border-ink/8 rounded-2xl p-5">
        <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-2">
          Avant
        </p>
        <p className="text-sm font-body text-ink-muted leading-relaxed">{before}</p>
      </div>

      {/* Arrow */}
      <div className="hidden sm:flex items-center justify-center flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
          <ArrowRight size={14} className="text-brand-orange" />
        </div>
      </div>

      {/* After */}
      <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-5">
        <p className="text-[10px] font-mono text-brand-orange uppercase tracking-widest mb-2">
          Après
        </p>
        <p className="text-sm font-body text-ink-muted leading-relaxed">{after}</p>
      </div>
    </motion.div>
  )
}
