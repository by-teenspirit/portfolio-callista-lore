import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { scrollToSection } from '@/utils'
import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'

const SKILLS_ORBIT = [
  'UX Design',
  'UX Research',
  'Gamification',
  'Product Design',
  'Front-End',
  'UI Design',
]

const MARQUEE_ITEMS = [
  '✦ UX Design',
  '✦ Product Design',
  '✦ UX Research',
  '✦ Gamification',
  '✦ UI Design',
  '✦ Front-End',
  '✦ UX Design',
  '✦ Product Design',
  '✦ UX Research',
  '✦ Gamification',
  '✦ UI Design',
  '✦ Front-End',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// ── Textes rotatifs ───────────────────────────────────────────────────────────
const ROTATING_WORDS = ['engageantes.', 'mémorables.', 'humaines.', 'qui durent.']

function RotatingWord() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ minWidth: '14ch' }}
    >
      <motion.span
        key={index}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="block text-gradient"
      >
        {ROTATING_WORDS[index]}
      </motion.span>
    </span>
  )
}

// ── Orbe magnétique ───────────────────────────────────────────────────────────
// Placé exactement dans le slot `absolute right-12 top-1/2 -translate-y-1/2`
// de l'ancien floating avatar. Seul le contenu interne devient magnétique.
function MagneticOrb() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 45, damping: 22 })
  const springY = useSpring(y, { stiffness: 45, damping: 22 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      // Centre de l'orbe = right-12 top-1/2 → on calcule depuis le bord droit
      const orbCX = window.innerWidth - 48 - 160 // right-12 (48px) + demi-largeur (160px)
      const orbCY = window.innerHeight / 2
      const dx = e.clientX - orbCX
      const dy = e.clientY - orbCY
      x.set(Math.max(-16, Math.min(16, dx * 0.055)))
      y.set(Math.max(-16, Math.min(16, dy * 0.055)))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    // Positionnement identique à l'ancien avatar flottant
    <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
      {/* Le wrapper motion se déplace magnétiquement */}
      <motion.div style={{ x: springX, y: springY }} className="relative w-80 h-80">
        {/* ── Avatar central ───────────────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: 'backOut' }}
            className="relative"
          >
            {/* Cercle orange */}
            <div className="w-24 h-24 rounded-full bg-brand-orange flex items-center justify-center shadow-2xl shadow-brand-orange/40 relative z-10">
              <span className="font-display font-black text-3xl text-white italic">CL</span>
            </div>
            {/* Anneaux de pulse */}
            {[1, 2].map((n) => (
              <motion.div
                key={n}
                className="absolute inset-0 rounded-full border-2 border-brand-orange/30"
                animate={{ scale: [1, 1.9, 2.4], opacity: [0.5, 0.15, 0] }}
                transition={{
                  duration: 2.5,
                  delay: n * 0.9,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Anneau orbital externe (tourne lentement) ────────────────────── */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-brand-orange/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        {/* Anneau intérieur contre-rotatif */}
        <motion.div
          className="absolute inset-[32px] rounded-full border border-brand-orange/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Tags de compétences — même positionnement % que l'original ─── */}
        {SKILLS_ORBIT.map((skill, i) => {
          const angle = (i / SKILLS_ORBIT.length) * 360
          const rad = (angle * Math.PI) / 180
          const r = 140
          // Reproduit exactement le calcul de l'ancien HeroSection
          const px = -10 + r * Math.cos(rad - Math.PI / 2)
          const py = 50 + r * Math.sin(rad - Math.PI / 2)

          return (
            <motion.div
              key={skill}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${px}%`, top: `${py}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
            >
              {/* Légère lévitation propre à chaque tag */}
              <motion.span
                className="whitespace-nowrap text-[10px] font-mono font-medium px-2.5 py-1 bg-white border border-ink/8 rounded-full text-ink-muted shadow-sm block"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                {skill}
              </motion.span>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

// ── Section Hero ──────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Fonds décoratifs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-brand-orange/6 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/4 blur-3xl animate-blob [animation-delay:3s]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#1A1A18 1px, transparent 1px), linear-gradient(to right, #1A1A18 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Contenu principal */}
      <div className="section-container flex-1 flex flex-col justify-center pt-32 pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge disponibilité */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-brand-orange text-xs font-mono font-medium tracking-wide">
              <Sparkles size={12} className="animate-pulse" />
              Disponible pour de nouvelles opportunités
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1 variants={itemVariants} className="heading-xl text-ink mb-2 leading-[0.95]">
            Callista
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="heading-xl italic text-gradient mb-8 leading-[0.95]"
          >
            Loré.
          </motion.h1>

          {/* Baseline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-body font-light text-ink-muted max-w-lg mb-2 leading-relaxed"
          >
            Je conçois des expériences numériques <RotatingWord />
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm font-mono text-ink-subtle/60 mb-12 tracking-wider"
          >
            UX Designer · Gamification · Product Design · Front-End
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <motion.button
              onClick={() => {
                scrollToSection('projects')
                track('cta_hero_projects')
              }}
              className="btn-primary text-base px-8 py-4 shadow-lg shadow-brand-orange/25 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Voir mes projets →</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
            <motion.button
              onClick={() => {
                scrollToSection('contact')
                track('cta_hero_contact')
              }}
              className="btn-outline text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Orbe magnétique dans le slot de l'ancien avatar */}
        <MagneticOrb />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono text-ink-subtle tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-brand-orange" />
        </motion.div>
      </motion.div>

      {/* Marquee */}
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
