import { cn } from '@/utils'

interface CompanyLogoProps {
  name: string
  /** Chemin vers /public/logos/*.svg ou undefined = texte stylisé */
  logo?: string
  url?: string
  className?: string
}

export function CompanyLogo({ name, logo, url, className }: CompanyLogoProps) {
  const inner = logo ? (
    <img src={logo} alt={name} className="h-7 w-auto object-contain" />
  ) : (
    <span className="text-xs font-mono font-semibold text-ink-muted tracking-wide">{name}</span>
  )

  const wrapper = (
    <div
      className={cn(
        'inline-flex items-center px-3 py-2 bg-white border border-ink/8 rounded-xl',
        url && 'hover:border-brand-orange/20 transition-colors cursor-pointer',
        className
      )}
    >
      {inner}
    </div>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {wrapper}
      </a>
    )
  }
  return wrapper
}
