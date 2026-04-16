import { cn } from '@/utils'

interface TagProps {
  label: string
  variant?: 'orange' | 'dark' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Tag({ label, variant = 'dark', size = 'md', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-mono font-medium tracking-wide whitespace-nowrap',
        size === 'sm' && 'px-2 py-0.5 text-[10px]',
        size === 'md' && 'px-3 py-1 text-xs',
        variant === 'orange' &&
          'bg-brand-orange/10 text-brand-orange border border-brand-orange/20',
        variant === 'dark' && 'bg-ink/5 text-ink-muted border border-ink/10',
        variant === 'outline' && 'border border-ink/20 text-ink-muted',
        className
      )}
    >
      {label}
    </span>
  )
}
