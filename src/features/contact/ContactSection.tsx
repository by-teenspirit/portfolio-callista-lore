import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CONTACT_INFO } from '@/lib/data'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: CONTACT_INFO.phone,
    href: `tel:+33${CONTACT_INFO.phone.replace(/\s/g, '').slice(1)}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: CONTACT_INFO.linkedin,
    href: `https://${CONTACT_INFO.linkedin}`,
    external: true,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-32">
      <div className="section-container">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            03 — Contact
          </p>
          <h2 className="heading-lg text-ink mb-4">
            Travaillons{' '}
            <span className="italic text-brand-orange">ensemble</span>
          </h2>
          <p className="text-base font-body text-ink-muted max-w-md">
            Je suis ouverte aux opportunités, aux collaborations, et toujours partante pour
            parler de gamification autour d'un café ☕
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact cards */}
          <div className="space-y-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, external }, i) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 p-5 bg-white border border-ink/5 rounded-2xl hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors duration-200">
                  <Icon size={18} className="text-brand-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-ink-subtle uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-body font-medium text-ink truncate">{value}</p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-ink-subtle opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </motion.a>
            ))}
          </div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-ink p-10 text-white"
          >
            {/* Decorative */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-orange/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-brand-orange/10 blur-2xl" />

            <div className="relative z-10">
              <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
                Mon CV
              </p>
              <h3 className="font-display text-2xl font-bold mb-4 leading-tight">
                Télécharger mon
                <br />
                <span className="text-brand-orange italic">curriculum vitae</span>
              </h3>
              <p className="text-sm text-white/60 mb-8 leading-relaxed">
                Retrouvez l'ensemble de mes expériences, compétences et formations dans mon
                CV détaillé.
              </p>
              <a
                href="/callista-lore-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-body font-medium text-sm rounded-full hover:bg-brand-orange-light transition-all duration-200 hover:scale-[0.98]"
              >
                Télécharger le CV
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
