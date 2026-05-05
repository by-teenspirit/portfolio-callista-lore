import { useState, useEffect, type ReactNode } from 'react'
import { DARK_MODE_STORAGE_KEY } from './darkModeConstant'
import { DarkModeContext } from './DarkModeContext'

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    if (stored !== null) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(DARK_MODE_STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => setIsDark((prev) => !prev)
  return <DarkModeContext.Provider value={{ isDark, toggle }}>{children}</DarkModeContext.Provider>
}
