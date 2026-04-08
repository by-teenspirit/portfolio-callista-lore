import { cn } from '@/utils'

type MockupDevice = 'mobile' | 'desktop' | 'tablet'

interface MockupFrameProps {
  /** Path vers une vraie image (public/mockups/...) ou undefined = placeholder */
  src?: string
  alt: string
  label?: string
  device?: MockupDevice
  className?: string
  /** Nuance de gris du placeholder */
  shade?: 'light' | 'medium' | 'dark'
}

const DEVICE_ASPECT: Record<MockupDevice, string> = {
  mobile: 'aspect-[9/19]',
  tablet: 'aspect-[3/4]',
  desktop: 'aspect-video',
}

const SHADE_CLASSES: Record<string, string> = {
  light: 'bg-ink/[0.03] border-ink/8',
  medium: 'bg-ink/[0.06] border-ink/12',
  dark: 'bg-ink/10 border-ink/15',
}

/**
 * Affiche une capture de maquette ou un placeholder stylisé.
 * Pour remplacer par une vraie image : ajouter src="/mockups/mon-image.png"
 * Les images vont dans public/mockups/
 */
export function MockupFrame({
  src,
  alt,
  label,
  device = 'desktop',
  className,
  shade = 'light',
}: MockupFrameProps) {
  const aspectClass = DEVICE_ASPECT[device]
  const shadeClass = SHADE_CLASSES[shade]

  if (src) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border',
          aspectClass,
          shadeClass,
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }

  // Placeholder mode
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border flex flex-col items-center justify-center gap-3',
        aspectClass,
        shadeClass,
        className
      )}
    >
      {/* Device icon */}
      <DeviceIcon device={device} />
      <div className="text-center px-4">
        <p className="text-[10px] font-mono text-ink-subtle tracking-widest uppercase leading-relaxed">
          {label ?? alt}
        </p>
      </div>

      {/* Decorative wireframe lines */}
      <div className="absolute inset-4 rounded-lg border border-dashed border-ink/10 pointer-events-none" />
    </div>
  )
}

function DeviceIcon({ device }: { device: MockupDevice }) {
  if (device === 'mobile') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-ink-subtle/40"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    )
  }
  if (device === 'tablet') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-ink-subtle/40"
      >
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    )
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-ink-subtle/40"
    >
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 20h8M12 18v2" />
    </svg>
  )
}
