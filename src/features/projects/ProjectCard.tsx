import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/types'
import { cn } from '@/utils'

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: () => void
}

const resolveUrl = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn('card-project cursor-pointer group', project.featured ? 'md:col-span-1' : '')}
      onClick={onClick}
    >
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block h-full">
        <div
          className="relative h-48 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage ? (
            <img
              src={resolveUrl(project.coverImage)}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <motion.span
                className="text-5xl relative z-10 select-none"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {project.coverEmoji}
              </motion.span>
            </>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
            {project.isNew && (
              <span className="px-2 py-0.5 bg-brand-orange text-white text-[10px] font-mono rounded-full">
                Nouveau
              </span>
            )}
            {project.prize && (
              <span className="px-2 py-0.5 bg-white/15 text-white text-[10px] font-mono rounded-full backdrop-blur-sm">
                {project.prize}
              </span>
            )}
          </div>
          <span className="absolute bottom-3 right-3 text-white/60 text-xs font-mono z-10">
            {project.year}
          </span>
          <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/20 z-10">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-ink text-lg mb-1 group-hover:text-brand-orange transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-sm font-body text-ink-muted font-medium mb-3">{project.subtitle}</p>
          <p className="text-sm font-body text-ink-subtle leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} size="sm" />
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
