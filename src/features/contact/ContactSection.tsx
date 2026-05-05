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
import emailjs from '@emailjs/browser'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { CONTACT_INFO } from '@/lib/data'
import { track } from '@/lib/analytics'

// ── Config ────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const EMAILJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

// Init EmailJS — obligatoire avant tout sendForm()
if (EMAILJS_KEY) {
  emailjs.init({ publicKey: EMAILJS_KEY })
}

// ── Helpers ───────────────────────────────────────────────────────────────────
/**
 * EmailJS retourne un objet {status, text} en cas d'erreur, pas une Error.
 * Cette fonction sérialise n'importe quel type d'erreur en string lisible.
 */
function serializeError(err: unknown): string {
  if (typeof err === 'string') return err
  if (err instanceof Error) return err.message
  if (err && typeof err === 'object') {
    const e = err as Record<string, unknown>
    if (e.text) return `EmailJS: ${e.text} (status ${e.status ?? '?'})`
    if (e.message) return String(e.message)
    try {
      return JSON.stringify(err)
    } catch {
      return 'Erreur inconnue'
    }
  }
  return 'Erreur inconnue'
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  from_name: string
  reply_to: string
  company: string
  subject: string
  message: string
  _honeypot: string
}
type Status = 'idle' | 'sending' | 'success' | 'error'

const SUBJECTS = [
  'Alternance / Stage',
  'Mission freelance',
  'Collaboration',
  'Retour sur le portfolio',
  'Autre',
]

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    trackId: 'contact_email_click',
    external: false,
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: CONTACT_INFO.phone,
    href: `tel:+33${CONTACT_INFO.phone.replace(/\s/g, '').slice(1)}`,
    trackId: 'contact_phone_click',
    external: false,
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

// ── Champ ─────────────────────────────────────────────────────────────────────
const inputClass =
  'w-full px-4 py-3 bg-white dark:bg-white/6 ' +
  'border border-ink/10 dark:border-white/12 ' +
  'rounded-xl text-sm font-body text-ink dark:text-white ' +
  'placeholder:text-ink-subtle/50 dark:placeholder:text-white/25 ' +
  'focus:outline-none focus:border-brand-orange/50 focus:ring-2 focus:ring-brand-orange/10 ' +
  'transition-all duration-200'

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
      <label className="text-xs font-mono text-ink-muted dark:text-white/50 uppercase tracking-wider">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={10} />
          {error}
        </p>
      )}
    </div>
  )
}

// ── Formulaire ────────────────────────────────────────────────────────────────
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormData>({
    from_name: '',
    reply_to: '',
    company: '',
    subject: '',
    message: '',
    _honeypot: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorDetail, setErrorDetail] = useState('')

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!form.from_name.trim()) errs.from_name = 'Votre nom est requis'
    if (!form.reply_to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.reply_to = 'Email invalide'
    if (!form.subject) errs.subject = 'Choisissez un sujet'
    if (form.message.trim().length < 20) errs.message = 'Message trop court (20 car. min)'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form._honeypot) return // bot

    if (!validate()) {
      track('contact_form_validation_error')
      return
    }

    setStatus('sending')
    setErrorDetail('')
    track('contact_form_submit')

    // Vérification config
    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_KEY) {
      setErrorDetail('Variables VITE_EMAILJS_* manquantes dans .env.local')
      setStatus('error')
      return
    }

    try {
      const result = await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current!)
      if (result.status === 200) {
        setStatus('success')
        track('contact_form_success')
        setForm({
          from_name: '',
          reply_to: '',
          company: '',
          subject: '',
          message: '',
          _honeypot: '',
        })
      } else {
        throw { status: result.status, text: result.text }
      }
    } catch (err) {
      console.error('EmailJS error:', err)
      setErrorDetail(serializeError(err))
      setStatus('error')
      track('contact_form_error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-16 text-center"
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
          <h3 className="font-display font-bold text-ink dark:text-white text-xl mb-2">
            Message envoyé !
          </h3>
          <p className="text-sm text-ink-muted dark:text-white/60 max-w-xs leading-relaxed">
            Merci ! Je réponds généralement sous 24–48h.
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
      {/* Honeypot */}
      <input
        type="text"
        name="_honeypot"
        value={form._honeypot}
        onChange={set('_honeypot')}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom & Prénom" required error={errors.from_name}>
          <input
            type="text"
            name="from_name"
            value={form.from_name}
            onChange={set('from_name')}
            placeholder="Votre nom complet"
            className={inputClass}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" required error={errors.reply_to}>
          <input
            type="email"
            name="reply_to"
            value={form.reply_to}
            onChange={set('reply_to')}
            placeholder="votre@email.com"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Entreprise">
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

      <Field label="Message" required error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={set('message')}
          placeholder="Décrivez votre projet ou dites simplement bonjour ☕"
          rows={5}
          className={inputClass + ' resize-none'}
        />
        <span className="text-[10px] font-mono text-ink-subtle/50 self-end">
          {form.message.length}/1000
        </span>
      </Field>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-1.5 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/30 rounded-xl"
          >
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle size={14} />
              Une erreur s'est produite. Réessayez ou écrivez-moi directement.
            </div>
            {errorDetail && (
              <code className="text-[10px] font-mono text-red-500/70 mt-0.5">{errorDetail}</code>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        className="w-full btn-primary py-4 text-base justify-center shadow-lg shadow-brand-orange/20 disabled:opacity-60 disabled:cursor-not-allowed gap-2"
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
        Données utilisées uniquement pour vous répondre. ✓
      </p>
    </form>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function ContactSection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/4 blur-[100px] rounded-full" />
      </div>

      <div className="section-container relative z-10">
        <AnimatedSection className="mb-16">
          <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
            03 — Contact
          </p>
          <h2 className="heading-lg text-ink dark:text-white mb-4">
            Travaillons <span className="italic text-brand-orange">ensemble</span>
          </h2>
          <p className="text-base text-ink-muted dark:text-white/60 max-w-md leading-relaxed">
            Alternance, mission freelance, collaboration ou simple échange — je suis ouverte à
            toutes les conversations. ☕
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Formulaire */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white dark:bg-white/4 border border-ink/6 dark:border-white/8 rounded-3xl p-8 shadow-sm">
              <h3 className="font-display font-bold text-ink dark:text-white text-xl mb-6">
                Envoyez-moi un message
              </h3>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Colonne droite */}
          <div className="space-y-4">
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
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-5 bg-white dark:bg-white/4 border border-ink/5 dark:border-white/8 rounded-2xl hover:border-brand-orange/30 hover:shadow-lg hover:shadow-brand-orange/5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300">
                  <Icon
                    size={18}
                    className="text-brand-orange group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-ink-subtle dark:text-white/40 uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-ink dark:text-white truncate">{value}</p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-ink-subtle opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
            ))}

            {/* CV */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-ink dark:bg-white/6 p-8 text-white"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand-orange/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-brand-orange/10 blur-2xl" />
              <div className="relative z-10">
                <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-3">
                  Mon CV
                </p>
                <h3 className="font-display text-xl font-bold mb-3 leading-tight text-white">
                  Télécharger mon
                  <br />
                  <span className="text-brand-orange italic">curriculum vitae</span>
                </h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Expériences, compétences et formations.
                </p>
                <a
                  href="/callista-lore-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('contact_cv_download')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white font-medium text-sm rounded-full hover:opacity-90 transition-all"
                >
                  Télécharger le CV <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
