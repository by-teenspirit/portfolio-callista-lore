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
  format: 'A4-portrait' | 'A4-landscape' | 'kakemono' | 'A5-portrait' | 'square'
}

interface PrintShowcaseProps {
  items: PrintItem[]
  label?: string
  title?: string
  content?: string
  delay?: number
}

const FORMAT_RATIO: Record<PrintItem['format'], string> = {
  'A4-portrait': 'aspect-[210/297]',
  'A4-landscape': 'aspect-[297/210]',
  kakemono: 'aspect-[1/2.5]',
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2"
      // flex-1 pour que tous les items partagent l'espace équitablement
      style={{ flex: '1 1 0', minWidth: 0 }}
    >
      <button
        onClick={onClick}
        className={cn(
          'relative w-full group cursor-pointer',
          FORMAT_RATIO[item.format],
          'shadow-[0_4px_20px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]',
          'rounded-sm overflow-hidden border border-ink/8 bg-white',
          'transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.16)] hover:-translate-y-1.5'
        )}
      >
        {item.src ? (
          <img
            src={resolveUrl(item.src)}
            alt={item.alt ?? item.label ?? item.format}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-ink/[0.03] flex flex-col items-center justify-center gap-2">
            <Printer size={18} className="text-ink/20" />
            <span className="text-[9px] font-mono text-ink-subtle text-center px-2">
              {item.label ?? FORMAT_LABEL[item.format]}
            </span>
          </div>
        )}

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn
            size={16}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Badge format */}
        <div className="absolute bottom-1 left-1 px-1 py-0.5 bg-black/35 backdrop-blur-sm rounded text-[7px] font-mono text-white/80">
          {FORMAT_LABEL[item.format]}
        </div>
      </button>

      {item.label && (
        <p className="text-[10px] font-mono text-ink-subtle text-center leading-tight px-1">
          {item.label}
        </p>
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
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative max-h-[88vh]',
          item.format === 'kakemono' ? 'max-w-[220px]' : 'max-w-[600px]',
          'w-full'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn(FORMAT_RATIO[item.format], 'overflow-hidden rounded-lg shadow-2xl')}>
          {item.src ? (
            <img
              src={resolveUrl(item.src)}
              alt={item.alt ?? item.label ?? ''}
              className="w-full h-full object-contain bg-white"
            />
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center">
              <Printer size={40} className="text-ink/20" />
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-ink/5 transition-colors"
        >
          <X size={14} className="text-ink" />
        </button>

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

  return (
    <AnimatedSection delay={delay}>
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

      {/*
        Tous les items côte à côte, alignés par le BAS (items-end).
        Le kakémono est naturellement plus haut via son ratio — pas besoin de le traiter à part.
        flex-1 sur chaque card = largeur partagée équitablement.
      */}
      <div className="flex gap-4 sm:gap-6 items-end">
        {items.map((item, i) => (
          <PrintCard key={i} item={item} index={i} delay={delay} onClick={() => setActive(item)} />
        ))}
      </div>

      <AnimatePresence>
        {active && <PrintLightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </AnimatedSection>
  )
}
