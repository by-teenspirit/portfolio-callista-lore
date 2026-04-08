import { useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { cn } from '@/utils'

export function CustomCursor() {
  const { x, y } = useMousePosition()
  const followerRef = useRef<HTMLDivElement>(null)
  const followerPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      followerPos.current.x += (x - followerPos.current.x) * 0.12
      followerPos.current.y += (y - followerPos.current.y) * 0.12
      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`
        followerRef.current.style.top = `${followerPos.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [x, y])

  return (
    <>
      <div
        className="cursor hidden md:block"
        style={{ left: x, top: y }}
      />
      <div
        ref={followerRef}
        className={cn('cursor-follower hidden md:block')}
      />
    </>
  )
}
