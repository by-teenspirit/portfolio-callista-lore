import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, RotateCcw, X, ZoomIn } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export interface BusinessCardProps {
  recto: {
    src?: string
    alt?: string
  }
  verso: {
    src?: string
    alt?: string
  }
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

/** Carte individuelle avec flip 3D */
function FlipCard({
  recto,
  verso,
}: {
  recto: { src?: string; alt?: string }
  verso: { src?: string; alt?: string }
}) {
  const [flipped, setFlipped] = useState(false)
  const [lightbox, setLightbox] = useState<'recto' | 'verso' | null>(null)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Carte avec perspective 3D */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: '1000px', width: '340px', height: '190px' }}
        onClick={() => setFlipped((f) => !f)}
        title={flipped ? 'Voir le recto' : 'Voir le verso'}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
          className="relative"
        >
          {/* RECTO */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden border border-ink/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {recto.src ? (
              <img
                src={resolveUrl(recto.src)}
                alt={recto.alt ?? 'Carte de visite — recto'}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-ink/[0.04] flex flex-col items-center justify-center gap-2">
                <CreditCard size={28} className="text-ink/20" />
                <span className="text-[10px] font-mono text-ink-subtle">Recto</span>
              </div>
            )}
            {/* Indicateur hover */}
            <div className="absolute inset-0 bg-ink/0 hover:bg-ink/10 transition-colors duration-300 flex items-end justify-end p-3">
              <span className="text-[9px] font-mono text-ink-subtle/60 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                Cliquer pour retourner →
              </span>
            </div>
          </div>

          {/* VERSO */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden border border-ink/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {verso.src ? (
              <img
                src={resolveUrl(verso.src)}
                alt={verso.alt ?? 'Carte de visite — verso'}
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full bg-ink/[0.04] flex flex-col items-center justify-center gap-2">
                <CreditCard size={28} className="text-ink/20" />
                <span className="text-[10px] font-mono text-ink-subtle">Verso</span>
              </div>
            )}
            <div className="absolute inset-0 bg-ink/0 hover:bg-ink/10 transition-colors duration-300 flex items-end justify-end p-3">
              <span className="text-[9px] font-mono text-ink-subtle/60 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                ← Retourner
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contrôles sous la carte */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink/10 text-ink-subtle hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 text-[11px] font-mono"
        >
          <RotateCcw size={11} />
          {flipped ? 'Voir recto' : 'Voir verso'}
        </button>
        <button
          onClick={() => setLightbox(flipped ? 'verso' : 'recto')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink/10 text-ink-subtle hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 text-[11px] font-mono"
        >
          <ZoomIn size={11} />
          Agrandir
        </button>
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
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[600px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[85.6/54] overflow-hidden rounded-xl shadow-2xl">
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

/** Composant wrapper avec AnimatedSection */
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

      {/* Centré sur la page */}
      <div className="flex justify-center">
        <FlipCard recto={recto} verso={verso} />
      </div>
    </AnimatedSection>
  )
}
