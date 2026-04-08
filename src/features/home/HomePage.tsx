import { HeroSection } from '@/features/hero/HeroSection'
import { AboutSection } from '@/features/about/AboutSection'
import { ProjectsSection } from '@/features/projects/ProjectsSection'
import { ContactSection } from '@/features/contact/ContactSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
