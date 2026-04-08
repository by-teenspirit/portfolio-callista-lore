import { cn } from '@/utils'

export interface ToolLogoItem {
  label: string
  /** Chemin vers /public/tools/*.svg */
  logo: string
  url?: string
}

interface ToolLogoProps {
  tool: ToolLogoItem
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function ToolLogo({ tool, size = 'md', showLabel = true, className }: ToolLogoProps) {
  const imgSize = { sm: 'w-5 h-5', md: 'w-7 h-7', lg: 'w-10 h-10' }[size]
  const base = (import.meta as any).env?.BASE_URL?.replace(/\/$/, '') || ''
  const src =
    tool.logo?.startsWith('http://') || tool.logo?.startsWith('https://')
      ? tool.logo
      : `${base}${tool.logo?.startsWith('/') ? tool.logo : `/${tool.logo}`}`

  const content = (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/8 rounded-xl',
        'hover:border-brand-orange/20 hover:shadow-sm transition-all duration-200',
        className
      )}
    >
      <img
        src={src}
        alt={tool.label}
        className={cn(imgSize, 'object-contain')}
        loading="lazy"
        decoding="async"
        crossOrigin="anonymous"
      />
      {showLabel && (
        <span className="text-xs font-mono font-medium text-ink-muted">{tool.label}</span>
      )}
    </div>
  )

  if (tool.url) {
    return (
      <a href={tool.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

/** Grille de logos d'outils */
export function ToolLogoGrid({
  tools,
  size = 'md',
  className,
}: {
  tools: ToolLogoItem[]
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tools.map((tool) => (
        <ToolLogo key={tool.label} tool={tool} size={size} />
      ))}
    </div>
  )
}
