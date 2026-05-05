import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToSection, cn } from '@/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useDarkMode } from '@/hooks/useDarkMode'

const SECTIONS = ['hero', 'about', 'projects', 'contact']
const NAV_ITEMS = [
  { label: 'À propos', section: 'about' },
  { label: 'Projets', section: 'projects' },
  { label: 'Contact', section: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTIONS)
  const location = useLocation()
  const isProjectPage = location.pathname.startsWith('/projects/')
  const { isDark, toggle } = useDarkMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (section: string) => {
    scrollToSection(section)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-3 bg-surface/90 dark:bg-[#141412]/90 backdrop-blur-md border-b border-ink/5 dark:border-white/5 shadow-sm'
            : 'py-6 bg-transparent'
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2"
            onClick={() => {
              if (!isProjectPage) scrollToSection('hero')
            }}
          >
            <span className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-display font-bold">
              CL
            </span>
            <span className="font-display font-bold text-ink dark:text-white text-sm tracking-tight group-hover:text-brand-orange transition-colors duration-200">
              Callista Loré
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {isProjectPage
              ? NAV_ITEMS.map(({ label, section }) => (
                  <Link
                    key={section}
                    to="/"
                    hash={section}
                    className="relative px-4 py-2 text-sm font-body font-medium rounded-full transition-all duration-200 text-ink-muted dark:text-white/60 hover:text-ink dark:hover:text-white"
                  >
                    {label}
                  </Link>
                ))
              : NAV_ITEMS.map(({ label, section }) => (
                  <button
                    key={section}
                    onClick={() => handleNav(section)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-body font-medium rounded-full transition-all duration-200',
                      activeSection === section
                        ? 'text-brand-orange'
                        : 'text-ink-muted dark:text-white/60 hover:text-ink dark:hover:text-white'
                    )}
                  >
                    {activeSection === section && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-brand-orange/8 rounded-full"
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                ))}

            <ThemeToggle isDark={isDark} toggle={toggle} className="ml-2" />

            <a
              href="callista-lore-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 btn-primary text-sm"
            >
              Mon CV
            </a>
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle isDark={isDark} toggle={toggle} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-ink dark:text-white rounded-full hover:bg-ink/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-surface/95 dark:bg-[#141412]/95 backdrop-blur-md border-b border-ink/5 dark:border-white/5 md:hidden"
          >
            <div className="section-container py-6 flex flex-col gap-2">
              {NAV_ITEMS.map(({ label, section }) =>
                isProjectPage ? (
                  <Link
                    key={section}
                    to="/"
                    hash={section}
                    onClick={() => setMenuOpen(false)}
                    className="text-left px-4 py-3 text-base font-body font-medium text-ink dark:text-white rounded-xl hover:bg-ink/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    key={section}
                    onClick={() => handleNav(section)}
                    className="text-left px-4 py-3 text-base font-body font-medium text-ink dark:text-white rounded-xl hover:bg-ink/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </button>
                )
              )}
              <a
                href="callista-lore-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 btn-primary justify-center"
              >
                Mon CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
