import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Gamepad2, Wrench } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ToolLogo } from '@/components/ui/ToolLogo'
import { Tag } from '@/components/ui/Tag'
import { EXPERIENCES, EDUCATION, INTERESTS, TOOLS } from '@/lib/data'

export function AboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="section-container">
        {/* Section header */}
        <AnimatedSection className="mb-20">
          <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            01 — À propos
          </p>
          <h2 className="heading-lg text-ink max-w-2xl">
            Designer qui code,
            <br />
            <span className="italic text-brand-orange">codeuse qui design.</span>
          </h2>
        </AnimatedSection>

        {/* Bio */}
        <AnimatedSection delay={0.1} className="grid md:grid-cols-2 gap-16 mb-24">
          <div className="space-y-4">
            <p className="text-base font-body text-ink-muted leading-relaxed">
              Diplômée d'un{' '}
              <span className="text-ink font-medium">Mastère UX Design & Stratégie Digitale</span>{' '}
              (Major ex-aequo), je me passionne pour la création de produits numériques centrés sur
              l'humain — en particulier tout ce qui touche à la{' '}
              <span className="text-brand-orange font-medium">gamification</span> et à l'engagement
              utilisateur.
            </p>
            <p className="text-base font-body text-ink-muted leading-relaxed">
              J'ai la chance de combiner mes compétences en design et en développement front-end
              pour mener des projets de bout en bout — de la recherche utilisateur à la livraison.
            </p>
            <p className="text-base font-body text-ink-muted leading-relaxed">
              Actuellement en alternance chez{' '}
              <span className="text-ink font-medium">iDalgo / Scorecast</span>, je travaille sur des
              modules de gamification pour la presse sportive.
            </p>
          </div>

          {/* Interests */}
          <div>
            <p className="text-xs font-mono text-ink-subtle tracking-widest uppercase mb-6 flex items-center gap-2">
              <Gamepad2 size={12} /> Centres d'intérêt
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {INTERESTS.map(({ label, emoji }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-ink/8 rounded-xl text-sm font-body text-ink shadow-sm hover:border-brand-orange/30 hover:shadow-brand-orange/10 transition-all duration-200 cursor-default"
                >
                  <span>{emoji}</span>
                  {label}
                </span>
              ))}
            </div>

            <p className="text-xs font-mono text-ink-subtle tracking-widest uppercase mb-4 flex items-center gap-2">
              <Wrench size={12} /> Outils
            </p>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map(({ label }) => {
                const fileMap: Record<string, string> = {
                  Figma: '/tools/figma.svg',
                  Photoshop: '/tools/photoshop.svg',
                  'After Effects': '/tools/after-effects.svg',
                  React: '/tools/react.svg',
                  Notion: '/tools/notion.svg',
                  Blender: '/tools/blender.svg',
                  Dribbble: '/tools/dribbble.svg',
                  'Google Forms': '/tools/google-forms.svg',
                  GitHub: '/tools/github.svg',
                  Hotjar: '/tools/hotjar.svg',
                  Miro: '/tools/miro.svg',
                  PostgreSQL: '/tools/postgresql.svg',
                }
                const logo =
                  fileMap[label] ?? `/tools/${label.toLowerCase().replace(/\s+/g, '-')}.svg`
                return <ToolLogo key={label} tool={{ label, logo }} size="sm" />
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Experiences */}
        <AnimatedSection delay={0.1} className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Briefcase size={16} className="text-brand-orange" />
            <h3 className="heading-md text-ink">Expériences</h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-ink/8 hidden md:block" />

            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:pl-8 group"
                >
                  {/* Timeline dot */}
                  <div
                    className={`hidden md:block absolute left-0 top-2.5 w-3.5 h-3.5 rounded-full border-2 transition-colors duration-200 ${
                      exp.current
                        ? 'bg-brand-orange border-brand-orange'
                        : 'bg-white border-ink/20 group-hover:border-brand-orange/50'
                    }`}
                  />

                  <div className="bg-white border border-ink/5 rounded-2xl p-6 hover:border-brand-orange/20 hover:shadow-lg hover:shadow-brand-orange/5 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-body font-semibold text-ink text-base">
                          {exp.company}
                        </h4>
                        <p className="text-sm font-body text-ink-muted italic">{exp.role}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange text-[10px] font-mono rounded-full border border-brand-orange/20">
                            En cours
                          </span>
                        )}
                        <span className="text-xs font-mono text-ink-subtle whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.tags.map((tag) => (
                        <Tag key={tag} label={tag} variant="dark" size="sm" />
                      ))}
                    </div>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm font-body text-ink-muted"
                        >
                          <span className="text-brand-orange mt-1 flex-shrink-0">›</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap size={16} className="text-brand-orange" />
            <h3 className="heading-md text-ink">Formation</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-ink/5 rounded-2xl p-6 hover:border-brand-orange/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display font-bold text-ink text-base leading-tight">
                    {edu.diploma}
                  </h4>
                  {edu.mention && (
                    <span className="px-2 py-0.5 bg-brand-orange text-white text-[10px] font-mono rounded-full flex-shrink-0 ml-2">
                      {edu.mention}
                    </span>
                  )}
                </div>
                <p className="text-sm font-body text-ink-muted mb-1">{edu.school}</p>
                <p className="text-xs font-mono text-ink-subtle mb-4">{edu.period}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {edu.skills.map((skill) => (
                    <Tag key={skill} label={skill} size="sm" />
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {edu.achievements.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-body text-ink-muted">
                      <span className="text-brand-orange mt-1 flex-shrink-0">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
