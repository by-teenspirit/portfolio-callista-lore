import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
