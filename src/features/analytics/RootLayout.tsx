import { type ReactNode, useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'
import { AnalyticsDashboard } from '@/components/ui/AnalyticsDashboard'
import { useAnalyticsDashboard } from '@/hooks/useAnalyticsDashboard'
import { initAnalytics, trackPageView } from '@/lib/analytics'

interface RootLayoutProps {
  children: ReactNode
}

let analyticsReady = false

export function RootLayout({ children }: RootLayoutProps) {
  const location = useLocation()
  const { open, setOpen } = useAnalyticsDashboard()

  // Init analytics une seule fois
  useEffect(() => {
    if (!analyticsReady) {
      initAnalytics()
      analyticsReady = true
    }
  }, [])

  // Track changement de page
  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Dashboard analytics — Ctrl+Shift+A */}
      <AnimatePresence>
        {open && <AnalyticsDashboard onClose={() => setOpen(false)} />}
      </AnimatePresence>

      {/* Bouton discret admin (coin bas gauche) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 w-7 h-7 rounded-full bg-ink/10 hover:bg-brand-orange/20 border border-ink/10 hover:border-brand-orange/30 flex items-center justify-center transition-all duration-200 group"
        title="Dashboard analytics (Ctrl+Shift+A)"
        aria-label="Ouvrir le dashboard analytics"
      >
        <span className="text-[8px] font-mono text-ink-subtle/50 group-hover:text-brand-orange transition-colors">
          ◉
        </span>
      </button>
    </div>
  )
}
