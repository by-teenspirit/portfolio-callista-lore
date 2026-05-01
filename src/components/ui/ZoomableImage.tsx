import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Maximize2 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/utils'

interface ZoomableImageProps {
  src: string
  alt: string
  label?: string
  caption?: string
  delay?: number
  externalUrl?: string
  externalLabel?: string
  /**
   * Limite la hauteur affichée inline.
   * Ex: '500px' ou '60vh'. L'image entière est visible en lightbox.
   */
  maxHeight?: string
}

export function ZoomableImage({
  src,
  alt,
  label,
  caption,
  delay = 0,
  externalUrl,
  externalLabel = 'Voir en détail',
  maxHeight,
}: ZoomableImageProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const resolveUrl = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  }

  const imageSrc = resolveUrl(src)

  return (
    <AnimatedSection delay={delay}>
      <figure className="rounded-2xl overflow-hidden border border-ink/8 bg-ink/[0.02]">
        <div
          className="relative cursor-pointer group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={maxHeight ? { maxHeight, overflow: 'hidden' } : undefined}
        >
          {!imgError ? (
            <img
              src={imageSrc}
              alt={alt}
              className={cn(
                'w-full h-auto block transition-[filter] duration-300',
                maxHeight ? 'object-cover object-top' : 'object-contain'
              )}
              style={{ filter: hovered ? 'brightness(0.55)' : 'brightness(1)' }}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="aspect-[16/7] flex items-center justify-center bg-ink/[0.03]">
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🖼️</div>
                <p className="text-sm font-mono text-ink-subtle px-6">{label ?? alt}</p>
                <p className="text-[10px] font-mono text-ink-subtle/50 mt-2">
                  → placer dans public{src}
                </p>
              </div>
            </div>
          )}

          {/* Dégradé bas quand image tronquée */}
          {maxHeight && !imgError && (
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
          )}

          {/* Overlay hover */}
          <AnimatePresence>
            {hovered && !imgError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                    <Maximize2 size={22} className="text-white" />
                  </div>
                  <span className="text-white text-sm font-mono font-medium tracking-wide drop-shadow">
                    {maxHeight ? 'Voir en entier' : 'Ouvrir en grand'}
                  </span>
                </motion.div>
                {externalUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2, delay: 0.08 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <ExternalLink size={11} className="text-white/80" />
                    <span className="text-white/80 text-xs font-mono">{externalLabel}</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zone cliquable */}
          {!imgError &&
            (externalUrl ? (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={`Ouvrir ${alt} sur ${externalLabel}`}
                tabIndex={0}
              />
            ) : (
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 w-full h-full cursor-pointer"
                aria-label={`Voir ${alt} en grand`}
                tabIndex={0}
              />
            ))}
        </div>

        {/* Caption */}
        {(label || caption || externalUrl) && (
          <figcaption className="px-5 py-3 border-t border-ink/8 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5 min-w-0">
              {label && (
                <span className="text-xs font-mono font-semibold text-ink-muted truncate">
                  {label}
                </span>
              )}
              {caption && (
                <span className="text-xs font-body text-ink-subtle leading-relaxed">{caption}</span>
              )}
            </div>
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-ink/10 text-ink-subtle hover:border-brand-orange/40 hover:text-brand-orange transition-colors duration-200 text-[11px] font-mono whitespace-nowrap"
              >
                <ExternalLink size={10} />
                {externalLabel}
              </a>
            )}
          </figcaption>
        )}
      </figure>

      {/* Lightbox (quand pas d'externalUrl) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[92vh] w-full overflow-auto rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={imageSrc} alt={alt} className="w-full h-auto object-contain bg-white" />
              <button
                onClick={() => setLightboxOpen(false)}
                className="fixed top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors text-white text-xl leading-none z-10"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  )
}
