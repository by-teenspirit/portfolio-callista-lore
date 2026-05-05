import { type ReactNode, useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { AnalyticsDashboard } from '@/components/ui/AnalyticsDashboard'
import { useAnalyticsDashboard } from '@/hooks/useAnalyticsDashboard'
import { initAnalytics, trackPageView } from '@/lib/analytics'
import { DarkModeProvider } from '@/context/DarkModeProvider'

// ─────────────────────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: ReactNode
}

let analyticsReady = false

function RootLayoutInner({ children }: RootLayoutProps) {
  const location = useLocation()
  const { open, setOpen } = useAnalyticsDashboard()

  useEffect(() => {
    if (!analyticsReady) {
      initAnalytics()
      analyticsReady = true
    }
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-[#141412] transition-colors duration-300">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Dashboard analytics */}
      <AnimatePresence>
        {open && <AnalyticsDashboard onClose={() => setOpen(false)} />}
      </AnimatePresence>

      {/* Bouton analytics — toujours visible bas gauche */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-white/10 border border-ink/10 dark:border-white/10 shadow-md hover:shadow-lg hover:border-brand-orange/40 hover:bg-brand-orange/5 dark:hover:bg-brand-orange/10 transition-all duration-200 group"
        title="Dashboard analytics (Ctrl+Shift+A)"
        aria-label="Ouvrir le dashboard analytics"
      >
        <BarChart3
          size={13}
          className="text-ink-subtle dark:text-white/40 group-hover:text-brand-orange transition-colors"
        />
        <span className="text-[10px] font-mono text-ink-subtle dark:text-white/40 group-hover:text-brand-orange transition-colors">
          Analytics
        </span>
      </button>
    </div>
  )
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <DarkModeProvider>
      <RootLayoutInner>{children}</RootLayoutInner>
    </DarkModeProvider>
  )
}
