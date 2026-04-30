import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, Instagram, Layers } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/utils'

export interface SocialPost {
  /** 'single' = un seul visuel, 'carousel' = plusieurs slides */
  type: 'single' | 'carousel'
  /** Pour single : une image. Pour carousel : tableau d'images */
  src?: string
  slides?: string[]
  alt?: string
  caption?: string
  /** Format du post : carré (1:1), portrait (4:5), story (9:16) */
  ratio?: '1:1' | '4:5' | '9:16'
}

interface SocialGridProps {
  posts: SocialPost[]
  label?: string
  title?: string
  delay?: number
}

const RATIO_CLASS: Record<string, string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '9:16': 'aspect-[9/16]',
}

const resolveUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/** Vignette cliquable dans la grille */
function PostThumbnail({
  post,
  onClick,
  index,
  delay,
}: {
  post: SocialPost
  onClick: () => void
  index: number
  delay: number
}) {
  const src = post.src ?? post.slides?.[0] ?? ''
  const ratioClass = RATIO_CLASS[post.ratio ?? '1:1']

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay + index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl group cursor-pointer',
        'border border-ink/6 bg-ink/[0.03]',
        ratioClass
      )}
    >
      {src ? (
        <img
          src={resolveUrl(src)}
          alt={post.alt ?? `Post ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Instagram size={24} className="text-ink/20" />
        </div>
      )}

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 flex items-center justify-center">
        <Maximize2
          size={20}
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Badge carrousel */}
      {post.type === 'carousel' && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-md">
          <Layers size={10} className="text-white" />
          <span className="text-[9px] font-mono text-white">{post.slides?.length}</span>
        </div>
      )}
    </motion.button>
  )
}

/** Lightbox avec carrousel intégré */
function PostLightbox({ post, onClose }: { post: SocialPost; onClose: () => void }) {
  const [slide, setSlide] = useState(0)
  const slides = post.type === 'carousel' ? (post.slides ?? []) : [post.src ?? '']
  const total = slides.length

  const prev = () => setSlide((s) => (s - 1 + total) % total)
  const next = () => setSlide((s) => (s + 1) % total)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-4 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-2xl bg-black',
            RATIO_CLASS[post.ratio ?? '1:1']
          )}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={slide}
              src={resolveUrl(slides[slide])}
              alt={post.alt ?? `Slide ${slide + 1}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full object-contain"
            />
          </AnimatePresence>

          {/* Flèches carrousel */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={16} className="text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={16} className="text-white" />
              </button>
            </>
          )}

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors text-white text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Dots + caption */}
        <div className="flex flex-col items-center gap-3 w-full">
          {total > 1 && (
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={cn(
                    'rounded-full transition-all duration-200',
                    i === slide ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  )}
                />
              ))}
            </div>
          )}
          {post.caption && (
            <p className="text-xs font-body text-white/70 text-center max-w-sm leading-relaxed">
              {post.caption}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Composant principal — grille de posts */
export function SocialGrid({ posts, label, title, delay = 0 }: SocialGridProps) {
  const [active, setActive] = useState<SocialPost | null>(null)

  return (
    <AnimatedSection delay={delay}>
      {/* En-tête */}
      {(label || title) && (
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center">
            <Instagram size={14} className="text-white" />
          </div>
          <div>
            {label && (
              <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest">
                {label}
              </p>
            )}
            {title && <p className="text-sm font-body font-semibold text-ink">{title}</p>}
          </div>
        </div>
      )}

      {/* Grille */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {posts.map((post, i) => (
          <PostThumbnail
            key={i}
            post={post}
            index={i}
            delay={delay}
            onClick={() => setActive(post)}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && <PostLightbox post={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </AnimatedSection>
  )
}
