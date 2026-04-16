import { Heart } from 'lucide-react'
import { scrollToSection } from '@/utils'

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-surface py-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white text-[10px] font-display font-bold">
            CL
          </span>
          <span className="font-display text-sm font-bold text-ink">Callista Loré</span>
        </div>

        <p className="text-ink-subtle text-xs font-body flex items-center gap-1">
          Designé & codé avec <Heart size={10} className="text-brand-orange fill-brand-orange" /> —
          2025
        </p>

        <button
          onClick={() => scrollToSection('hero')}
          className="text-xs text-ink-muted hover:text-brand-orange transition-colors font-mono"
        >
          ↑ Retour en haut
        </button>
      </div>
    </footer>
  )
}
