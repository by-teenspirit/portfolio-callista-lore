import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CONTACT_INFO } from '@/lib/data'
import { track } from '@/lib/analytics'

// ── Config EmailJS ───────────────────────────────────────────────────────────
// Créer un compte sur emailjs.com (gratuit jusqu'à 200 emails/mois)
// Remplacer ces 3 valeurs dans .env :
//   VITE_EMAILJS_SERVICE_ID
//   VITE_EMAILJS_TEMPLATE_ID
//   VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
  honeypot: string // champ anti-spam caché
}

type Status = 'idle' | 'sending' | 'success' | 'error'

// ── Items de contact ─────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    trackId: 'contact_email_click',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: CONTACT_INFO.phone,
    href: `tel:+33${CONTACT_INFO.phone.replace(/\s/g, '').slice(1)}`,
    trackId: 'contact_phone_click',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: CONTACT_INFO.linkedin,
    href: `https://${CONTACT_INFO.linkedin}`,
    trackId: 'contact_linkedin_click',
    external: true,
  },
]

// ── Sujets prédéfinis ────────────────────────────────────────────────────────
const SUBJECTS = [
  'Alternance / Stage',
  'Mission freelance',
  'Collaboration',
  'Retour sur le portfolio',
  'Autre',
]

// ── Champ de formulaire ──────────────────────────────────────────────────────
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono text-ink-muted uppercase tracking-wider">
        {label} {required && <span className="text-brand-orange">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs font-body text-red-500 flex items-center gap-1">
          <AlertCircle size={10} />
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-3 bg-white border border-ink/10 rounded-xl text-sm font-body text-ink ' +
  'placeholder:text-ink-subtle/50 focus:outline-none focus:border-brand-orange/50 ' +
  'focus:ring-2 focus:ring-brand-orange/10 transition-all duration-200'

// ── Formulaire principal ─────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) errs.name = 'Votre prénom / nom est requis'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Email invalide'
    if (!form.subject) errs.subject = 'Choisissez un sujet'
    if (form.message.trim().length < 20) errs.message = 'Message trop court (20 caractères min.)'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) return // bot détecté

    if (!validate()) {
      track('contact_form_validation_error')
      return
    }

    setStatus('sending')
    track('contact_form_submit')

    try {
      // ── Envoi via EmailJS ───────────────────────────────────────────────────
      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY) {
        const { default: emailjs } = await import('@emailjs/browser')
        await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current!, EMAILJS_KEY)
      } else {
        // Mode dev — simulation
        await new Promise((r) => setTimeout(r, 1400))
      }

      setStatus('success')
      track('contact_form_success')
      setForm({ name: '', email: '', company: '', subject: '', message: '', honeypot: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
      track('contact_form_error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center"
        >
          <CheckCircle size={28} className="text-green-500" />
        </motion.div>
        <div>
          <h3 className="font-display font-bold text-ink text-xl mb-2">Message envoyé !</h3>
          <p className="text-sm font-body text-ink-muted max-w-xs leading-relaxed">
            Merci pour votre message. Je vous réponds généralement sous 24–48h.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs font-mono text-ink-subtle hover:text-brand-orange transition-colors underline underline-offset-4"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot anti-spam — caché visuellement */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={set('honeypot')}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
        autoComplete="off"
      />

      {/* Ligne nom / email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom & Prénom" required error={errors.name}>
          <input
            type="text"
            name="from_name"
            value={form.name}
            onChange={set('name')}
            placeholder="Votre nom complet"
            className={inputClass}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            name="reply_to"
            value={form.email}
            onChange={set('email')}
            placeholder="votre@email.com"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Ligne entreprise / sujet */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Entreprise / Structure">
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={set('company')}
            placeholder="Optionnel"
            className={inputClass}
            autoComplete="organization"
          />
        </Field>
        <Field label="Sujet" required error={errors.subject}>
          <select
            name="subject"
            value={form.subject}
            onChange={set('subject')}
            className={inputClass}
          >
            <option value="">Choisir un sujet…</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" required error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={set('message')}
          placeholder="Décrivez votre projet, votre besoin, ou dites simplement bonjour ☕"
          rows={5}
          className={inputClass + ' resize-none'}
        />
        <span className="text-[10px] font-mono text-ink-subtle/50 self-end">
          {form.message.length} / 1000
        </span>
      </Field>

      {/* Erreur envoi */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm font-body text-red-600"
          >
            <AlertCircle size={14} />
            Une erreur s'est produite. Réessayez ou écrivez-moi directement par email.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary py-4 text-base justify-center shadow-lg shadow-brand-orange/20 disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={status !== 'sending' ? { scale: 1.01 } : undefined}
        whileTap={status !== 'sending' ? { scale: 0.99 } : undefined}
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            <Send size={16} />
            Envoyer le message
          </>
        )}
      </motion.button>

      <p className="text-[10px] font-mono text-ink-subtle/50 text-center">
        Données utilisées uniquement pour vous répondre. Aucun spam. ✓
      </p>
    </form>
  )
}

// ── Section principale ───────────────────────────────────────────────────────
export function ContactSection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/4 blur-[100px] rounded-full" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            03 — Contact
          </p>
          <h2 className="heading-lg text-ink mb-4">
            Travaillons <span className="italic text-brand-orange">ensemble</span>
          </h2>
          <p className="text-base font-body text-ink-muted max-w-md leading-relaxed">
            Alternance, mission freelance, collaboration ou simple échange autour de la gamification
            — je suis ouverte à toutes les conversations. ☕
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* ── Formulaire ─────────────────────────────────────────────────── */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white border border-ink/6 rounded-3xl p-8 shadow-sm">
              <h3 className="font-display font-bold text-ink text-xl mb-6">
                Envoyez-moi un message
              </h3>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* ── Colonne droite ─────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* Cards de contact */}
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, trackId, external }, i) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                onClick={() => track(trackId)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 p-5 bg-white border border-ink/5 rounded-2xl hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
                  <Icon
                    size={18}
                    className="text-brand-orange group-hover:text-white transition-colors duration-300"
                  />
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

            {/* Bloc CV */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand-orange/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-brand-orange/10 blur-2xl" />
              <div className="relative z-10">
                <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-3">
                  Mon CV
                </p>
                <h3 className="font-display text-xl font-bold mb-3 leading-tight">
                  Télécharger mon
                  <br />
                  <span className="text-brand-orange italic">curriculum vitae</span>
                </h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Expériences, compétences et formations — tout y est.
                </p>
                <a
                  href="/callista-lore-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('contact_cv_download')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-body font-medium text-sm rounded-full hover:bg-brand-orange-light transition-all duration-200 hover:scale-[0.98]"
                >
                  Télécharger le CV
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
