import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  isDark: boolean
  toggle: () => void
  className?: string
}

export function ThemeToggle({ isDark, toggle, className = '' }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={toggle}
      className={`
        relative flex items-center justify-center
        w-9 h-9 rounded-full
        border border-ink/10 dark:border-white/10
        bg-white/80 dark:bg-white/5
        backdrop-blur-sm
        hover:border-brand-orange/40 hover:bg-brand-orange/5
        dark:hover:border-brand-orange/40 dark:hover:bg-brand-orange/10
        transition-colors duration-200
        ${className}
      `}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Sun size={15} className="text-brand-orange" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Moon size={15} className="text-ink-muted" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
