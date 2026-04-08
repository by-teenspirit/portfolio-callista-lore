import { useState, useEffect } from 'react'

/**
 * Returns the current scroll progress from 0 to 1
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const value = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(Math.min(1, Math.max(0, value)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
