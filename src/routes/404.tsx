import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/404')({
  component: NotFound,
})

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-6">
          Erreur 404
        </p>
        <h1 className="font-display text-8xl font-black text-ink mb-4 leading-none">
          Oups<span className="text-brand-orange">.</span>
        </h1>
        <p className="text-ink-muted font-body mb-10">
          Cette page n'existe pas — ou n'existe plus.
        </p>
        <Link to="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  )
}
