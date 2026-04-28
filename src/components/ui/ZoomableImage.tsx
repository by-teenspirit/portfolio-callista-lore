import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Maximize2 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface ZoomableImageProps {
  /** Chemin /mockups/... ou URL externe */
  src: string
  alt: string
  label?: string
  caption?: string
  delay?: number
  /**
   * URL externe optionnelle (Figma, Coggle, Google Drive…)
   * Si fournie, le bouton secondaire renvoie vers ce lien plutôt que l'image.
   */
  externalUrl?: string
  /** Label du bouton externe — ex: "Voir sur Figma", "Ouvrir dans Coggle" */
  externalLabel?: string
}

export function ZoomableImage({
  src,
  alt,
  label,
  caption,
  delay = 0,
  externalUrl,
  externalLabel = 'Voir en détail',
}: ZoomableImageProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const resolveUrl = (path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  }

  const imageSrc = resolveUrl(src)
  // Lien principal : l'image elle-même en pleine résolution
  const primaryUrl = imageSrc
  // Lien secondaire : URL externe si fournie
  const secondaryUrl = externalUrl ?? null

  return (
    <AnimatedSection delay={delay}>
      <figure className="rounded-2xl overflow-hidden border border-ink/8 bg-ink/[0.02]">
        {/* Zone image cliquable */}
        <div
          className="relative cursor-pointer group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {!imgError ? (
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-auto object-contain block transition-[filter] duration-300"
              style={{ filter: hovered ? 'brightness(0.55)' : 'brightness(1)' }}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Fallback si image absente */
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

          {/* Overlay hover — visible uniquement si l'image est chargée */}
          <AnimatePresence>
            {hovered && !imgError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
              >
                {/* Icône centrale */}
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
                    Ouvrir en grand
                  </span>
                </motion.div>

                {/* Bouton secondaire — uniquement si externalUrl fournie */}
                {secondaryUrl && (
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

          {/* Lien principal (toute la zone) — ouvre l'image en pleine résolution */}
          {!imgError && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label={`Ouvrir ${alt} en grand`}
              tabIndex={0}
            />
          )}
        </div>

        {/* Caption */}
        {(label || caption || secondaryUrl) && (
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

            {/* Bouton lien externe dans la caption */}
            {secondaryUrl && (
              <a
                href={secondaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-ink/10 text-ink-subtle hover:border-brand-orange/40 hover:text-brand-orange transition-colors duration-200 text-[11px] font-mono whitespace-nowrap"
                aria-label={externalLabel}
              >
                <ExternalLink size={10} />
                {externalLabel}
              </a>
            )}
          </figcaption>
        )}
      </figure>
    </AnimatedSection>
  )
}
