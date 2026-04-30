import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Printer, X, ZoomIn } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/utils'

export interface PrintItem {
  src?: string
  alt?: string
  label?: string
  caption?: string
  /** Format papier du document */
  format: 'A4-portrait' | 'A4-landscape' | 'kakemono' | 'A5-portrait' | 'square'
}

interface PrintShowcaseProps {
  items: PrintItem[]
  label?: string
  title?: string
  content?: string
  delay?: number
}

/** Ratio CSS selon le format */
const FORMAT_RATIO: Record<PrintItem['format'], string> = {
  'A4-portrait': 'aspect-[210/297]',
  'A4-landscape': 'aspect-[297/210]',
  kakemono: 'aspect-[1/2]',
  'A5-portrait': 'aspect-[148/210]',
  square: 'aspect-square',
}

const FORMAT_LABEL: Record<PrintItem['format'], string> = {
  'A4-portrait': 'A4',
  'A4-landscape': 'A4 paysage',
  kakemono: 'Kakémono',
  'A5-portrait': 'A5',
  square: 'Carré',
}

/** Largeur max selon format pour que ça reste lisible */
const FORMAT_MAX_W: Record<PrintItem['format'], string> = {
  'A4-portrait': 'max-w-[180px]',
  'A4-landscape': 'max-w-[300px]',
  kakemono: 'max-w-[100px]',
  'A5-portrait': 'max-w-[160px]',
  square: 'max-w-[200px]',
}

const resolveUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

function PrintCard({
  item,
  index,
  delay,
  onClick,
}: {
  item: PrintItem
  index: number
  delay: number
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3"
    >
      {/* Document */}
      <button
        onClick={onClick}
        className={cn(
          'relative w-full group cursor-pointer',
          FORMAT_RATIO[item.format],
          FORMAT_MAX_W[item.format],
          // Ombre "papier"
          'shadow-[0_4px_24px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)]',
          'rounded-sm overflow-hidden border border-ink/8',
          'transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1'
        )}
      >
        {item.src ? (
          <img
            src={resolveUrl(item.src)}
            alt={item.alt ?? item.label ?? item.format}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-ink/[0.03] flex flex-col items-center justify-center gap-2">
            <Printer size={20} className="text-ink/20" />
            <span className="text-[9px] font-mono text-ink-subtle text-center px-2">
              {item.label ?? FORMAT_LABEL[item.format]}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn
            size={18}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Badge format */}
        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded text-[8px] font-mono text-white/80">
          {FORMAT_LABEL[item.format]}
        </div>
      </button>

      {/* Label sous le document */}
      {item.label && (
        <p className="text-[10px] font-mono text-ink-subtle text-center">{item.label}</p>
      )}
    </motion.div>
  )
}

function PrintLightbox({ item, onClose }: { item: PrintItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative max-h-[90vh]',
          // Largeur max selon format en lightbox
          item.format === 'kakemono' ? 'max-w-[240px]' : 'max-w-[640px]',
          'w-full'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className={cn(FORMAT_RATIO[item.format], 'overflow-hidden rounded-lg shadow-2xl')}>
          {item.src ? (
            <img
              src={resolveUrl(item.src)}
              alt={item.alt ?? item.label ?? ''}
              className="w-full h-full object-contain bg-white"
            />
          ) : (
            <div className="w-full h-full bg-ink/10 flex items-center justify-center">
              <Printer size={40} className="text-white/30" />
            </div>
          )}
        </div>

        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-ink/5 transition-colors"
        >
          <X size={14} className="text-ink" />
        </button>

        {/* Caption */}
        {item.caption && (
          <p className="mt-3 text-xs font-body text-white/70 text-center leading-relaxed">
            {item.caption}
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

export function PrintShowcase({ items, label, title, content, delay = 0 }: PrintShowcaseProps) {
  const [active, setActive] = useState<PrintItem | null>(null)

  // Sépare kakémonos et A4/A5 pour les disposer différemment
  const tallItems = items.filter((i) => i.format === 'kakemono')
  const flatItems = items.filter((i) => i.format !== 'kakemono')
  const hasKakemono = tallItems.length > 0

  return (
    <AnimatedSection delay={delay}>
      {/* En-tête */}
      {(label || title || content) && (
        <div className="mb-6">
          {label && (
            <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-1 flex items-center gap-2">
              <Printer size={11} />
              {label}
            </p>
          )}
          {title && <h3 className="font-display font-bold text-ink text-xl mb-2">{title}</h3>}
          {content && <p className="text-sm font-body text-ink-muted leading-relaxed">{content}</p>}
        </div>
      )}

      {/* Layout : kakémono à gauche + flyers à droite (si kakémono présent) */}
      {hasKakemono ? (
        <div className="flex gap-8 items-start">
          {/* Kakémono(s) */}
          <div className="flex gap-4 items-start flex-shrink-0">
            {tallItems.map((item, i) => (
              <PrintCard
                key={i}
                item={item}
                index={i}
                delay={delay}
                onClick={() => setActive(item)}
              />
            ))}
          </div>

          {/* Flyers/A4 */}
          {flatItems.length > 0 && (
            <div className="flex-1 grid grid-cols-2 gap-4 items-start">
              {flatItems.map((item, i) => (
                <PrintCard
                  key={i}
                  item={item}
                  index={i + tallItems.length}
                  delay={delay}
                  onClick={() => setActive(item)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Pas de kakémono → grille simple */
        <div className={cn('flex gap-6 flex-wrap items-end justify-start')}>
          {flatItems.map((item, i) => (
            <PrintCard
              key={i}
              item={item}
              index={i}
              delay={delay}
              onClick={() => setActive(item)}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active && <PrintLightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </AnimatedSection>
  )
}
