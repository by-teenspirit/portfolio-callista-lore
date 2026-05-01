import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, RotateCcw, X, ZoomIn } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export interface BusinessCardProps {
  recto: { src?: string; alt?: string }
  verso: { src?: string; alt?: string }
  label?: string
  title?: string
  content?: string
  delay?: number
}

const resolveUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

function FlipCard({
  recto,
  verso,
}: {
  recto: { src?: string; alt?: string }
  verso: { src?: string; alt?: string }
}) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [lightbox, setLightbox] = useState<'recto' | 'verso' | null>(null)

  const currentFace = flipped ? 'verso' : 'recto'

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Carte */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: '1200px', width: '360px', height: '202px' }}
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
        >
          {/* ── RECTO ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-ink/10 shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {recto.src ? (
              <img
                src={resolveUrl(recto.src)}
                alt={recto.alt ?? 'Recto'}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-ink/[0.04] flex flex-col items-center justify-center gap-2">
                <CreditCard size={28} className="text-ink/20" />
                <span className="text-[10px] font-mono text-ink-subtle">Recto</span>
              </div>
            )}
          </div>

          {/* ── VERSO ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-ink/10 shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {verso.src ? (
              <img
                src={resolveUrl(verso.src)}
                alt={verso.alt ?? 'Verso'}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-ink/[0.04] flex flex-col items-center justify-center gap-2">
                <CreditCard size={28} className="text-ink/20" />
                <span className="text-[10px] font-mono text-ink-subtle">Verso</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Hint flottant — toujours visible, pas seulement au hover ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 100%)',
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                  <RotateCcw size={16} className="text-white" />
                </div>
                <span className="text-white text-xs font-mono font-semibold tracking-wide drop-shadow-md">
                  {flipped ? '← Voir le recto' : 'Voir le verso →'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicateur de face actuelle + contrôles */}
      <div className="flex flex-col items-center gap-3">
        {/* Pastilles recto / verso */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFlipped(false)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200"
            style={
              !flipped
                ? { background: 'var(--color-brand-orange)', color: '#fff' }
                : {
                    background: 'transparent',
                    color: 'var(--color-ink-subtle)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }
            }
          >
            Recto
          </button>
          <button
            onClick={() => setFlipped(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200"
            style={
              flipped
                ? { background: 'var(--color-brand-orange)', color: '#fff' }
                : {
                    background: 'transparent',
                    color: 'var(--color-ink-subtle)',
                    border: '1px solid rgba(0,0,0,0.08)',
                  }
            }
          >
            Verso
          </button>
          <span className="w-px h-4 bg-ink/10 mx-1" />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(currentFace)
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-ink/10 text-ink-subtle hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 text-[11px] font-mono"
          >
            <ZoomIn size={10} />
            Agrandir
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[640px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[85.6/54] overflow-hidden rounded-2xl shadow-2xl">
                {(lightbox === 'recto' ? recto : verso).src ? (
                  <img
                    src={resolveUrl((lightbox === 'recto' ? recto : verso).src!)}
                    alt={lightbox}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-ink/20 flex items-center justify-center">
                    <CreditCard size={40} className="text-white/30" />
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-xs font-mono text-white/50 uppercase tracking-widest">
                {lightbox}
              </p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-ink/5 transition-colors"
              >
                <X size={14} className="text-ink" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function BusinessCard({
  recto,
  verso,
  label,
  title,
  content,
  delay = 0,
}: BusinessCardProps) {
  return (
    <AnimatedSection delay={delay}>
      {(label || title || content) && (
        <div className="mb-6">
          {label && (
            <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-1 flex items-center gap-2">
              <CreditCard size={11} />
              {label}
            </p>
          )}
          {title && <h3 className="font-display font-bold text-ink text-xl mb-2">{title}</h3>}
          {content && <p className="text-sm font-body text-ink-muted leading-relaxed">{content}</p>}
        </div>
      )}
      <div className="flex justify-center">
        <FlipCard recto={recto} verso={verso} />
      </div>
    </AnimatedSection>
  )
}
