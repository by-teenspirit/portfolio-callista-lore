import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Détecte automatiquement si on déploie sur GitHub Pages ou sur un domaine custom.
// - GitHub Pages : VITE_BASE=/portfolio-callista-lore/ (défini dans le workflow CI)
// - Domaine custom (callista-lore.fr) : VITE_BASE=/ (valeur par défaut)
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})