/**
 * analytics.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Système de tracking natif — aucune dépendance externe.
 * Stockage localStorage (pas de serveur requis).
 * Dashboard consultable via raccourci clavier ou route /admin.
 *
 * Données collectées :
 *   - Clics sur éléments trackés (via track())
 *   - Positions de clics (hotspot map)
 *   - Pages vues
 *   - Durée de session
 *   - Soumissions formulaire contact
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ClickEvent {
  id: string
  action: string // ex: 'cta_hero_projects', 'project_click_pes'
  page: string // pathname
  x: number // position relative (0-1)
  y: number
  ts: number // timestamp ms
}

export interface PageView {
  page: string
  ts: number
  duration?: number // rempli à la sortie
}

export interface SessionData {
  id: string
  startTs: number
  ua: string
  referrer: string
  views: PageView[]
  clicks: ClickEvent[]
}

export interface AnalyticsStore {
  sessions: SessionData[]
  totalClicks: number
  totalViews: number
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'cl_analytics'
const SESSION_KEY = 'cl_session'
const MAX_SESSIONS = 200 // on garde les 200 dernières sessions
const MAX_CLICKS = 1000 // cap mémoire

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

function getStore(): AnalyticsStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Intentionally left empty
  }
  return { sessions: [], totalClicks: 0, totalViews: 0 }
}

function saveStore(store: AnalyticsStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // Intentionally left empty
  }
}

function getSession(): SessionData {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // Intentionally left empty
  }
  // Nouvelle session
  const session: SessionData = {
    id: uid(),
    startTs: Date.now(),
    ua: navigator.userAgent.slice(0, 120),
    referrer: document.referrer || 'direct',
    views: [],
    clicks: [],
  }
  saveSession(session)
  return session
}

function saveSession(session: SessionData): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // Intentionally left empty
  }
}

function flushSession(session: SessionData): void {
  const store = getStore()
  // Met à jour ou ajoute la session
  const idx = store.sessions.findIndex((s) => s.id === session.id)
  if (idx >= 0) {
    store.sessions[idx] = session
  } else {
    store.sessions.push(session)
    store.totalViews += session.views.length
    store.totalClicks += session.clicks.length
  }
  // Cap sessions
  if (store.sessions.length > MAX_SESSIONS) {
    store.sessions = store.sessions.slice(-MAX_SESSIONS)
  }
  saveStore(store)
}

// ─── API publique ────────────────────────────────────────────────────────────

let _session: SessionData | null = null
let _currentView: PageView | null = null

/** Initialise le tracking — à appeler au mount du root */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return
  _session = getSession()

  // Track page view initiale
  trackPageView(window.location.pathname)

  // Flush à la fermeture de l'onglet
  window.addEventListener('beforeunload', () => {
    if (_currentView) {
      _currentView.duration = Date.now() - _currentView.ts
    }
    if (_session) flushSession(_session)
  })

  // Hotspot map — écoute TOUS les clics
  window.addEventListener(
    'click',
    (e) => {
      if (!_session) return
      const event: ClickEvent = {
        id: uid(),
        action: '_map',
        page: window.location.pathname,
        x: parseFloat((e.clientX / window.innerWidth).toFixed(3)),
        y: parseFloat((e.clientY / window.innerHeight).toFixed(3)),
        ts: Date.now(),
      }
      _session.clicks.push(event)
      // Cap mémoire session
      if (_session.clicks.length > MAX_CLICKS) {
        _session.clicks = _session.clicks.slice(-MAX_CLICKS)
      }
      saveSession(_session)
    },
    { passive: true }
  )
}

/** Track un événement nommé */
export function track(action: string): void {
  if (typeof window === 'undefined' || !_session) return
  const event: ClickEvent = {
    id: uid(),
    action,
    page: window.location.pathname,
    x: 0,
    y: 0,
    ts: Date.now(),
  }
  _session.clicks.push(event)
  saveSession(_session)
  flushSession(_session)

  // Aussi vers gtag si disponible (Google Analytics)
  if (
    typeof (
      window as { gtag?: (type: string, action: string, params?: Record<string, unknown>) => void }
    ).gtag === 'function'
  ) {
    ;(
      window as { gtag?: (type: string, action: string, params?: Record<string, unknown>) => void }
    ).gtag?.('event', 'page_view', { page_path: action })
  }
}

/** Track une page vue — appeler à chaque changement de route */
export function trackPageView(page: string): void {
  if (!_session) return
  // Ferme la vue précédente
  if (_currentView) {
    _currentView.duration = Date.now() - _currentView.ts
  }
  _currentView = { page, ts: Date.now() }
  _session.views.push(_currentView)
  saveSession(_session)
  flushSession(_session)

  // gtag
  if (
    typeof (
      window as { gtag?: (type: string, action: string, params?: Record<string, unknown>) => void }
    ).gtag === 'function'
  ) {
    ;(
      window as { gtag?: (type: string, action: string, params?: Record<string, unknown>) => void }
    ).gtag?.('event', 'page_view', { page_path: page })
  }
}

// ─── Données pour le dashboard ───────────────────────────────────────────────

export function getAnalyticsData() {
  const store = getStore()
  const sessions = store.sessions

  // Toutes les vues
  const allViews = sessions.flatMap((s) => s.views)
  // Tous les clics nommés (hors _map)
  const allClicks = sessions.flatMap((s) => s.clicks.filter((c) => c.action !== '_map'))
  // Tous les points hotspot
  const allHotspots = sessions.flatMap((s) => s.clicks.filter((c) => c.action === '_map'))

  // Pages les plus vues
  const pageCount: Record<string, number> = {}
  allViews.forEach((v) => {
    pageCount[v.page] = (pageCount[v.page] ?? 0) + 1
  })
  const topPages = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([page, count]) => ({ page, count }))

  // Actions les plus cliquées
  const actionCount: Record<string, number> = {}
  allClicks.forEach((c) => {
    actionCount[c.action] = (actionCount[c.action] ?? 0) + 1
  })
  const topActions = Object.entries(actionCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([action, count]) => ({ action, count }))

  // Durée moyenne session
  const durations = sessions
    .map((s) => s.views.reduce((sum, v) => sum + (v.duration ?? 0), 0))
    .filter((d) => d > 0)
  const avgDuration = durations.length
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 1000)
    : 0

  // Referrers
  const refCount: Record<string, number> = {}
  sessions.forEach((s) => {
    refCount[s.referrer] = (refCount[s.referrer] ?? 0) + 1
  })
  const topRefs = Object.entries(refCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([ref, count]) => ({ ref, count }))

  // Sessions récentes
  const recentSessions = sessions.slice(-20).reverse()

  return {
    totalSessions: sessions.length,
    totalViews: allViews.length,
    totalClicks: allClicks.length,
    avgDuration,
    topPages,
    topActions,
    topRefs,
    hotspots: allHotspots,
    recentSessions,
  }
}

/** Efface toutes les données */
export function clearAnalytics(): void {
  localStorage.removeItem(STORAGE_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

/** Export JSON */
export function exportAnalytics(): void {
  const data = getStore()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `analytics-callista-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}
