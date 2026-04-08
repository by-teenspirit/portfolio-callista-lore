import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { scrollToSection } from '@/utils'

const SKILLS_ORBIT = [
  'UX Design', 'UX Research', 'Gamification',
  'Product Design', 'Front-End', 'UI Design',
]

const MARQUEE_ITEMS = [
  '✦ UX Design', '✦ Product Design', '✦ UX Research',
  '✦ Gamification', '✦ UI Design', '✦ Front-End',
  '✦ UX Design', '✦ Product Design', '✦ UX Research',
  '✦ Gamification', '✦ UI Design', '✦ Front-End',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-brand-orange/6 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/4 blur-3xl animate-blob [animation-delay:3s]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#1A1A18 1px, transparent 1px), linear-gradient(to right, #1A1A18 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="section-container flex-1 flex flex-col justify-center pt-32 pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-brand-orange text-xs font-mono font-medium tracking-wide">
              <Sparkles size={12} className="animate-pulse" />
              Disponible pour de nouvelles opportunités
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="heading-xl text-ink mb-2 leading-[0.95]">
            Callista
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="heading-xl italic text-gradient mb-8 leading-[0.95]"
          >
            Loré.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-body font-light text-ink-muted max-w-xl mb-3 leading-relaxed"
          >
            UX Designer & Chef de Projet passionnée par la{' '}
            <span className="font-medium text-ink">gamification</span> et la création
            d'expériences numériques{' '}
            <span className="font-medium text-ink">engageantes</span>.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm font-mono text-ink-subtle mb-12"
          >
            Product Design · UX Research · UI Design · Front-End
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary text-base px-8 py-4 shadow-lg shadow-brand-orange/25"
            >
              Voir mes projets →
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-outline text-base"
            >
              Me contacter
            </button>
          </motion.div>
        </motion.div>

        {/* Floating skill tags */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
          <div className="relative w-80 h-80">
            {/* Center avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: 'backOut' }}
                className="w-24 h-24 rounded-full bg-brand-orange flex items-center justify-center shadow-2xl shadow-brand-orange/40"
              >
                <span className="font-display font-black text-3xl text-white italic">CL</span>
              </motion.div>
            </div>

            {/* Orbit ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-brand-orange/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Skill tags around orbit */}
            {SKILLS_ORBIT.map((skill, i) => {
              const angle = (i / SKILLS_ORBIT.length) * 360
              const rad = (angle * Math.PI) / 180
              const r = 140
              const x = -10 + r * Math.cos(rad - Math.PI / 2)
              const y = 50 + r * Math.sin(rad - Math.PI / 2)

              return (
                <motion.div
                  key={skill}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                >
                  <span className="whitespace-nowrap text-[10px] font-mono font-medium px-2.5 py-1 bg-white border border-ink/8 rounded-full text-ink-muted shadow-sm">
                    {skill}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono text-ink-subtle tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-brand-orange" />
        </motion.div>
      </motion.div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden border-t border-b border-ink/5 bg-ink/[0.02] py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              className="mx-6 text-xs font-mono font-medium text-ink-subtle tracking-widest uppercase"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
