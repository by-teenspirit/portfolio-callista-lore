import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Trash2, BarChart3, MousePointer, Eye, Clock, Globe, Zap } from 'lucide-react'
import { getAnalyticsData, clearAnalytics, exportAnalytics } from '@/lib/analytics'

interface AnalyticsDashboardProps {
  onClose: () => void
}

// ── Hotspot map ──────────────────────────────────────────────────────────────
function HotspotMap({ hotspots }: { hotspots: { x: number; y: number; page: string }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [filterPage, setFilterPage] = useState<string>('all')

  const pages = ['all', ...Array.from(new Set(hotspots.map((h) => h.page)))]
  const filtered = filterPage === 'all' ? hotspots : hotspots.filter((h) => h.page === filterPage)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    ctx.clearRect(0, 0, W, H)

    // Fond représentant la page
    ctx.fillStyle = '#fafaf8'
    ctx.fillRect(0, 0, W, H)

    // Heatmap
    filtered.forEach(({ x, y }) => {
      const px = x * W
      const py = y * H
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, 18)
      gradient.addColorStop(0, 'rgba(255,107,53,0.25)')
      gradient.addColorStop(1, 'rgba(255,107,53,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)
    })

    // Points individuels
    filtered.forEach(({ x, y }) => {
      ctx.beginPath()
      ctx.arc(x * W, y * H, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,107,53,0.5)'
      ctx.fill()
    })
  }, [filtered])

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setFilterPage(p)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
              filterPage === p
                ? 'bg-brand-orange text-white'
                : 'bg-ink/5 text-ink-subtle hover:bg-ink/10'
            }`}
          >
            {p === 'all' ? 'Toutes les pages' : p}
          </button>
        ))}
        <span className="text-[10px] font-mono text-ink-subtle ml-auto">
          {filtered.length} points
        </span>
      </div>
      <div className="relative rounded-xl overflow-hidden border border-ink/8">
        <canvas ref={canvasRef} width={640} height={360} className="w-full h-auto" />
        {filtered.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/[0.02]">
            <p className="text-sm font-mono text-ink-subtle">Aucun clic enregistré</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Barre de stat ────────────────────────────────────────────────────────────
function StatBar({
  label,
  value,
  max,
  total,
}: {
  label: string
  value: number
  max: number
  total: number
}) {
  const pct = max > 0 ? (value / max) * 100 : 0
  const share = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-ink-muted truncate w-40 flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-ink/6 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-orange rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[11px] font-mono text-ink-subtle w-8 text-right">{value}</span>
      <span className="text-[10px] font-mono text-ink-subtle/50 w-8 text-right">{share}%</span>
    </div>
  )
}

// ── Dashboard principal ──────────────────────────────────────────────────────
export function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const [data, setData] = useState(() => getAnalyticsData())
  const [tab, setTab] = useState<'overview' | 'hotspot' | 'sessions'>('overview')

  const refresh = () => setData(getAnalyticsData())

  const handleClear = () => {
    if (window.confirm('Effacer toutes les données analytics ?')) {
      clearAnalytics()
      setData(getAnalyticsData())
    }
  }

  const TABS = [
    { key: 'overview', label: "Vue d'ensemble", icon: BarChart3 },
    { key: 'hotspot', label: 'Carte de clics', icon: MousePointer },
    { key: 'sessions', label: 'Sessions', icon: Zap },
  ] as const

  const maxPage = Math.max(...data.topPages.map((p) => p.count), 1)
  const maxAction = Math.max(...data.topActions.map((a) => a.count), 1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-ink/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-ink/8 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-orange/10 flex items-center justify-center">
              <BarChart3 size={16} className="text-brand-orange" />
            </div>
            <div>
              <h2 className="font-display font-bold text-ink text-base">Analytics Dashboard</h2>
              <p className="text-[10px] font-mono text-ink-subtle">
                Callista Loré — données locales
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
            >
              Rafraîchir
            </button>
            <button
              onClick={() => exportAnalytics()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono text-ink-muted hover:text-brand-orange transition-colors"
            >
              <Download size={12} />
              Export JSON
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono text-red-400 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={12} />
              Effacer
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-ink/5 text-ink-subtle hover:text-ink transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-0 border-b border-ink/6">
          {[
            { icon: Eye, label: 'Vues totales', value: data.totalViews },
            { icon: Globe, label: 'Sessions', value: data.totalSessions },
            { icon: MousePointer, label: 'Clics trackés', value: data.totalClicks },
            { icon: Clock, label: 'Durée moy.', value: `${data.avgDuration}s` },
          ].map(({ icon: Icon, label, value }, i) => (
            <div key={label} className={`px-5 py-4 ${i < 3 ? 'border-r border-ink/6' : ''}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-brand-orange" />
                <span className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">
                  {label}
                </span>
              </div>
              <p className="font-display font-bold text-2xl text-ink">{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 py-3 border-b border-ink/6">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                tab === key
                  ? 'bg-brand-orange/10 text-brand-orange'
                  : 'text-ink-muted hover:text-ink hover:bg-ink/5'
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {tab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Pages vues */}
                <div>
                  <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-4">
                    Pages les plus vues
                  </p>
                  <div className="space-y-3">
                    {data.topPages.length === 0 ? (
                      <p className="text-sm font-mono text-ink-subtle/60">Aucune donnée</p>
                    ) : (
                      data.topPages.map(({ page, count }) => (
                        <StatBar
                          key={page}
                          label={page}
                          value={count}
                          max={maxPage}
                          total={data.totalViews}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Actions les plus cliquées */}
                <div>
                  <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-4">
                    Actions les plus cliquées
                  </p>
                  <div className="space-y-3">
                    {data.topActions.length === 0 ? (
                      <p className="text-sm font-mono text-ink-subtle/60">Aucune donnée</p>
                    ) : (
                      data.topActions.map(({ action, count }) => (
                        <StatBar
                          key={action}
                          label={action}
                          value={count}
                          max={maxAction}
                          total={data.totalClicks}
                        />
                      ))
                    )}
                  </div>
                </div>

                {/* Referrers */}
                <div className="md:col-span-2">
                  <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-4">
                    Sources de trafic
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.topRefs.length === 0 ? (
                      <p className="text-sm font-mono text-ink-subtle/60">Aucune donnée</p>
                    ) : (
                      data.topRefs.map(({ ref, count }) => (
                        <div
                          key={ref}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/6 rounded-lg"
                        >
                          <span className="text-[11px] font-mono text-ink-muted truncate max-w-[160px]">
                            {ref}
                          </span>
                          <span className="text-[10px] font-mono text-brand-orange font-medium">
                            {count}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'hotspot' && (
              <motion.div
                key="hotspot"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="text-xs font-mono text-ink-subtle mb-4 leading-relaxed">
                  Carte de chaleur des clics. Chaque point représente un clic d'un visiteur. Les
                  zones chaudes indiquent les éléments les plus sollicités.
                </p>
                <HotspotMap hotspots={data.hotspots} />
              </motion.div>
            )}

            {tab === 'sessions' && (
              <motion.div
                key="sessions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-widest mb-4">
                  20 sessions récentes
                </p>
                {data.recentSessions.length === 0 ? (
                  <p className="text-sm font-mono text-ink-subtle/60">Aucune session enregistrée</p>
                ) : (
                  data.recentSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-white border border-ink/6 rounded-xl">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="text-[10px] font-mono text-ink-subtle">
                            {new Date(session.startTs).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span className="mx-2 text-ink-subtle/30">·</span>
                          <span className="text-[10px] font-mono text-ink-subtle">
                            {session.referrer}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-[10px] font-mono text-ink-subtle">
                            {session.views.length} vue{session.views.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-[10px] font-mono text-ink-subtle">
                            {session.clicks.filter((c) => c.action !== '_map').length} clics
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {session.views.map((v, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-1.5 py-0.5 bg-ink/4 text-ink-subtle rounded"
                          >
                            {v.page}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
