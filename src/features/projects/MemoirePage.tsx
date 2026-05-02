import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  BookOpen,
  Users,
  ExternalLink,
  Brain,
  Zap,
  Shield,
  Eye,
  TrendingUp,
} from 'lucide-react'
import { Tag } from '@/components/ui/Tag'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CarouselSlide {
  page: string
  title: string
  content: string
  quote?: string
  quoteAuthor?: string
  stat?: { value: string; label: string }
}

interface Chapter {
  id: string
  number: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  slides: CarouselSlide[]
}

interface Interviewee {
  name: string
  role: string
  company: string
  color: string
  initials: string
  keyQuote: string
  topics: string[]
}

interface BibliographyItem {
  title: string
  author: string
  year: string
  type: 'book' | 'article' | 'thesis'
  url?: string
  cover?: string
  description: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CHAPTERS: Chapter[] = [
  {
    id: 'engagement',
    number: '01',
    title: "Comprendre l'engagement",
    subtitle: "Définitions, métriques et facteurs d'influence",
    icon: <Brain size={20} />,
    color: '#FF6B35',
    slides: [
      {
        page: 'p.15',
        title: "Qu'est-ce que l'engagement ?",
        content:
          "L'engagement ne se limite pas au temps passé sur une interface. C'est un processus complexe qui nécessite une interaction active et un sentiment d'attachement. Plusieurs chercheurs le définissent différemment — Brodie (2011), Bowden (2009), Zichermann (2011) — sans jamais s'accorder sur une définition unique.",
        quote:
          "Il n'existe pas de métrique unique qui décompose ou mesure suffisamment l'engagement.",
        quoteAuthor: 'Gabe Zichermann, Gamification by Design',
      },
      {
        page: 'p.17',
        title: 'Les métriques RFDVÉ de Zichermann',
        content:
          "Zichermann propose de mesurer l'engagement via une série de métriques interconnectées plutôt qu'un seul indicateur. Ces métriques se combinent pour donner une vision complète de l'engagement réel d'un utilisateur.",
        stat: {
          value: '5',
          label: 'métriques : Récence · Fréquence · Durée · Viralité · Évaluations',
        },
      },
      {
        page: 'p.19',
        title: 'Le cycle de vie selon Barbaro',
        content:
          "Eduardo Barbaro (IBM) identifie quatre étapes : Initiation → Engagement actif → Désengagement → Réengagement potentiel. Il propose un indice mathématique (UEI > 0,5) pour qualifier un utilisateur comme « engagé aujourd'hui ». Innovant, mais limité à la dernière interaction.",
        stat: { value: 'UEI > 0,5', label: "Seuil d'engagement selon Barbaro" },
      },
      {
        page: 'p.23',
        title: 'Les facteurs de Celia Hodent',
        content:
          "Hodent, psychologue et conceptrice de jeux (Ubisoft, Epic Games), divise les facteurs d'influence en deux catégories : la partie psychologique (perception, mémoire, attention, motivation, émotion, meaning) et la partie Game UX (utilisabilité, engageabilité, fun).",
        quote:
          "Une partie du contenu vient de ma formation en psychologie cognitive et l'autre de mon expérience avec Ubisoft, LucasArts et Epic Games.",
        quoteAuthor: 'Celia Hodent, Dans le Cerveau du Gamer',
      },
      {
        page: 'p.24',
        title: 'Notre définition synthétisée',
        content:
          'À partir de toutes ces sources, une définition composite a été construite pour le reste du mémoire — combinant la dimension quantitative (RFDVÉ) et la dimension psychologique (Hodent) dans une seule vision cohérente.',
        quote:
          "L'engagement utilisateur est la connexion entre un consommateur et un produit, composé de métriques interconnectées — récence, fréquence, durée, viralité, évaluations — influencé par la perception, la mémoire, la motivation, l'émotion, l'utilisabilité et le fun.",
        quoteAuthor: 'Définition synthétisée dans le mémoire',
      },
    ],
  },
  {
    id: 'gamification',
    number: '02',
    title: 'Gamification & IA',
    subtitle: "Approches méthodologiques pour optimiser l'engagement",
    icon: <Zap size={20} />,
    color: '#7B61FF',
    slides: [
      {
        page: 'p.25',
        title: "Ce que la gamification N'est PAS",
        content:
          "Avant de définir la gamification, Zichermann met en garde : ce n'est pas ajouter des badges sur un site web. Si le produit est mauvais, la gamification ne le sauvera pas. C'est la métaphore du gâteau : le glaçage ne masque pas un gâteau raté.",
        quote:
          "Nous pouvons facilement étaler un « glaçage » gamifié sur votre produit, mais si le « gâteau » sous-jacent n'est pas délicieux, la plupart des utilisateurs n'y reviendront pas.",
        quoteAuthor: 'Gabe Zichermann',
      },
      {
        page: 'p.26',
        title: 'Le modèle PBL et ses mécaniques',
        content:
          'Le modèle de base : Points, Badges, Leaderboards. Mais la gamification va bien au-delà : défis, barres de progression (effet Zeigarnik), comptes à rebours (FOMO), loteries (renforcement variable), badges (reconnaissance sociale). Chaque mécanique active un levier psychologique différent.',
        stat: { value: '10+', label: 'mécaniques de gamification analysées' },
      },
      {
        page: 'p.29',
        title: 'Les 4 types de joueurs (Bartle)',
        content:
          "Richard Bartle identifie 4 profils : l'Explorateur, l'Accomplisseur, le Socialiseur et le Tueur. La plupart des utilisateurs combinent ces profils, avec une majorité de Socialiseurs (l'homme étant un animal social, selon Aristote). Adapter la gamification à ces profils maximise l'engagement.",
        stat: { value: '4', label: 'profils de joueurs selon Bartle' },
      },
      {
        page: 'p.29',
        title: "L'Octalysis de Yu-Kai Chou",
        content:
          "8 motivations fondamentales (drives) : Épique & Progression, Acquisition, Réalisation, Création, Propriété & Possession, Influence Sociale, Rareté & Impatience, Perte & Évitement. Ce modèle permet d'analyser et de concevoir des systèmes de gamification équilibrés et éthiques.",
        stat: { value: '8', label: 'core drives dans le modèle Octalysis' },
      },
      {
        page: 'p.36',
        title: "L'hyperpersonnalisation par l'IA",
        content:
          "L'IA va au-delà de la personnalisation classique. Via le filtrage collaboratif, l'analyse prédictive et l'IA émotionnelle, les interfaces s'adaptent en temps réel aux humeurs, préférences et comportements de chaque utilisateur. Mais cette approche soulève d'importantes questions éthiques.",
        quote:
          "Cette interdépendance souligne l'importance de concevoir des systèmes d'IA centrés sur l'UX, et vice versa.",
        quoteAuthor: 'Virvou (2023)',
      },
    ],
  },
  {
    id: 'marketing',
    number: '03',
    title: 'Marketing numérique',
    subtitle: "Levier d'engagement et de conversion",
    icon: <TrendingUp size={20} />,
    color: '#00B4D8',
    slides: [
      {
        page: 'p.57',
        title: "L'IA transforme le marketing",
        content:
          "L'IA permet des analyses plus fines du comportement des consommateurs et une personnalisation accrue. Elle influence les décisions d'achat, permet des publicités ultra-ciblées et des contenus générés à la demande. Bag et al. (2021) confirment un impact positif significatif sur la conversion.",
        stat: { value: '82%', label: "taux d'adoption du ML dans la personnalisation FinTech" },
      },
      {
        page: 'p.60',
        title: 'Le modèle Hooked de Nir Eyal',
        content:
          "Un cycle en 4 étapes : Déclencheur → Action → Récompense variable → Investissement. Conçu pour créer des habitudes d'utilisation. Eyal distingue persuasion (healthy habits) et coercition (dark patterns). Ce modèle s'aligne avec les stratégies d'engagement sur les médias sociaux.",
        quote:
          "La persuasion, c'est faire faire quelque chose à une personne qui avait déjà envie de le faire. La coercition, c'est lui faire faire quelque chose qu'elle ne voulait pas.",
        quoteAuthor: 'Nir Eyal, Hooked',
      },
      {
        page: 'p.63',
        title: 'Cas Jevelo Jewelry',
        content:
          "L'application de bijouterie Jevelo a démontré l'efficacité de la gamification sur les réseaux sociaux. Grâce à un programme gamifié, le nombre de photos produits dans les avis a été multiplié par 10, le trafic Facebook a augmenté de 105% et le taux de conversion a progressé de 92%.",
        stat: { value: '+92%', label: 'taux de conversion grâce à la gamification' },
      },
      {
        page: 'p.64',
        title: "L'IA dans la FinTech",
        content:
          "IntelliWealth (robo-conseiller) et SafeGuard (assurance) illustrent l'impact mesurable de l'IA. SafeGuard a réduit de 78% le temps de traitement des réclamations et augmenté de 24% le score de satisfaction. L'IA réduit la charge cognitive et offre des recommandations personnalisées.",
        stat: { value: '−42%', label: "tickets de support grâce à l'IA (IntelliWealth)" },
      },
    ],
  },
  {
    id: 'ethique',
    number: '04',
    title: 'Enjeux éthiques',
    subtitle: "Défis liés à l'IA et au marketing",
    icon: <Shield size={20} />,
    color: '#E63946',
    slides: [
      {
        page: 'p.69',
        title: 'RGPD et protection des données',
        content:
          "En 2018, 60% des Français se disaient très inquiets de l'usage de leurs données personnelles sur les réseaux sociaux (Statista). Le RGPD tente d'harmoniser les règles en Europe, mais son application dans le domaine de l'IA soulève encore de nombreuses questions non résolues.",
        stat: { value: '60%', label: 'des Français inquiets pour leurs données (2018)' },
      },
      {
        page: 'p.71',
        title: 'Les Dark Patterns',
        content:
          "Des interfaces délibérément conçues pour tromper les utilisateurs. Exemples : guilt-tripping, aversion à la perte, FOMO, punir le désengagement, payer pour retirer des frictions. Amazon Prime en est un exemple classique — un bouton de commande qui mène à un abonnement payant sans que l'utilisateur s'en rende compte.",
        quote:
          "Dès que vous donnez la priorité au business avant votre public, vous cessez d'avoir une approche UX et pouvez tomber dans le dark pattern.",
        quoteAuthor: "Celia Hodent, The Gamer's Brain",
      },
      {
        page: 'p.72',
        title: 'Équilibre engagement / dépendance',
        content:
          'Les applications utilisent neurosciences et hameçons numériques : graphisme addictif, récompense aléatoire, effet de complétude, brain hacking. La sur-sollicitation crée une concurrence permanente entre les applications. Il faut viser des habitudes bénéfiques, pas des dépendances.',
        stat: {
          value: '−75%',
          label: "chute du taux d'achat quand les clients découvrent qu'ils parlent à un bot",
        },
      },
      {
        page: 'p.73',
        title: "L'IA pour l'inclusion",
        content:
          "L'IA peut aussi être un outil d'inclusion : IA centrée sur l'humain (HCAI), IA responsable, IA explicable (XAI), IA prosociale. Virvou identifie les risques : attentes irréalistes, boîte noire, anthropomorphisme excessif. La clé : transparence et supervision humaine.",
        quote:
          "Un équilibre est nécessaire pour éviter que les systèmes d'IA trop humanisés ne suscitent des attachements émotionnels ou des attentes irréalistes.",
        quoteAuthor: 'Virvou (2023)',
      },
    ],
  },
  {
    id: 'perspectives',
    number: '05',
    title: "Perspectives d'avenir",
    subtitle: "Nouvelles frontières de l'optimisation de l'engagement",
    icon: <Eye size={20} />,
    color: '#2DC653',
    slides: [
      {
        page: 'p.77',
        title: 'Expériences immersives',
        content:
          "L'IA émotionnelle analyse les émotions via reconnaissance faciale, analyse vocale et modèles comportementaux. La réalité augmentée (AR/VR) avec l'IA ouvre des expériences financières immersives. Projection : croissance de 150% de l'AR/VR dans la FinTech sur 5 ans.",
        stat: { value: '+150%', label: 'croissance projetée AR/VR dans la FinTech (5 ans)' },
      },
      {
        page: 'p.79',
        title: 'IA + Gamification : duo prometteur',
        content:
          "Roy & Jain (2022) montrent que l'intégration de la gamification et de l'IA rend les transactions commerciales captivantes. Swiggy utilise des badges utilisateurs uniques pour fidéliser. Mais les effets à long terme manquent d'études — un champ de recherche entier reste à explorer.",
        quote:
          "L'IA et le ML peuvent contribuer à améliorer la gamification et avoir un impact significatif sur divers aspects des plateformes d'apprentissage.",
        quoteAuthor: 'Rapport Gartner sur la gamification',
      },
      {
        page: 'p.82',
        title: "Vers une gouvernance mondiale de l'IA",
        content:
          "Proposition inspirée de l'AIEA : un organisme mondial pour surveiller les IA avancées, évaluer les risques, auditer les données, implémenter un filigrane pour distinguer contenus réels et générés. Des alliances US/Chine/Europe dans le cadre de l'ONU seraient nécessaires.",
        stat: { value: '3', label: 'puissances à aligner : États-Unis, Chine, Europe' },
      },
    ],
  },
]

const INTERVIEWEES: Interviewee[] = [
  {
    name: 'Salomé Muqtadir',
    role: 'Responsable des opérations design',
    company: 'Société Générale & Devoteam',
    color: '#FF6B35',
    initials: 'SM',
    keyQuote:
      "L'hyperpersonnalisation aujourd'hui c'est un vœu pieu. D'un point de vue réglementaire, y'a du chemin à faire.",
    topics: ['Gamification B2B', 'KPI engagement', 'Hyperpersonnalisation', 'RGPD'],
  },
  {
    name: 'Wassim Mimeche',
    role: 'Enseignant-chercheur en marketing IA',
    company: 'EPITA, Sup de V, ISC Paris, EM Normandie',
    color: '#7B61FF',
    initials: 'WM',
    keyQuote:
      "L'IA ne crée rien à partir de rien. Elle croise des données pré-existantes. Ces données appartiennent à des auteurs — c'est important de protéger le droit d'auteur.",
    topics: ['6 usages IA en marketing', 'Éthique IA', 'Dépendance', 'Chatbots'],
  },
  {
    name: 'Flore Charney',
    role: 'UX/UI Designer',
    company: 'Expertise B2B & B2C',
    color: '#00B4D8',
    initials: 'FC',
    keyQuote:
      "L'hypergamification peut apporter des biais assez négatifs. L'utilisateur doit avoir toute l'expérience à sa portée, et des récompenses qui enrichissent son parcours.",
    topics: ['Hypergamification', 'Mécaniques B2B/B2C', 'IA en UX', 'Saturation utilisateur'],
  },
]

const BIBLIOGRAPHY: BibliographyItem[] = [
  {
    title: 'Gamification by Design',
    author: 'Gabe Zichermann & Christopher Cunningham',
    year: '2011',
    type: 'book',
    url: 'https://www.amazon.fr/Gamification-Design-Implementing-Mechanics-Mobile/dp/1449397670',
    description:
      "La référence fondamentale sur la gamification — définitions, mécaniques, leviers psychologiques et cas d'usage.",
  },
  {
    title: "The Gamer's Brain (Dans le Cerveau du Gamer)",
    author: 'Celia Hodent',
    year: '2020',
    type: 'book',
    url: 'https://www.amazon.fr/Gamers-Brain-Neuroscience-Impact-Design/dp/1498775500',
    description:
      'Psychologie cognitive appliquée au game UX — perception, mémoire, motivation, dark patterns.',
  },
  {
    title: 'Actionable Gamification',
    author: 'Yu-Kai Chou',
    year: '2015',
    type: 'book',
    url: 'https://ci.nii.ac.jp/ncid/BB18977357',
    description:
      'Le modèle Octalysis et ses 8 drives motivationnels — la gamification éthique en profondeur.',
  },
  {
    title: 'Hooked: How to Build Habit-Forming Products',
    author: 'Nir Eyal',
    year: '2014',
    type: 'book',
    url: 'https://www.youtube.com/watch?v=ojHVO9i3yxU',
    description:
      'Le modèle Hooked en 4 étapes — déclencheur, action, récompense variable, investissement.',
  },
  {
    title: 'Modelling and predicting User Engagement in mobile applications',
    author: 'Eduardo Barbaro et al.',
    year: '2019',
    type: 'article',
    url: 'https://doi.org/10.3233/ds-190027',
    description:
      "L'indice d'engagement utilisateur (UEI) et les modèles prédictifs ML (Random Forest, XGBoost).",
  },
  {
    title: 'Artificial Intelligence and User Experience in reciprocity',
    author: 'Maria Virvou',
    year: '2023',
    type: 'article',
    url: 'https://doi.org/10.3233/idt-230092',
    description:
      "L'interdépendance IA/UX — systèmes de recommandation, IA éthique, XAI, biais algorithmiques.",
  },
  {
    title: 'Enhancing user engagement: The role of gamification in mobile apps',
    author: 'Bitrián, Buil & Catalán',
    year: '2021',
    type: 'article',
    url: 'https://doi.org/10.1016/j.jbusres.2021.04.028',
    description:
      'Étude empirique sur la gamification dans les apps mobiles — croissance et engagement.',
  },
  {
    title: 'AI-Driven UX/UI Design: Empirical Research and Applications in FinTech',
    author: 'Yang Xu et al.',
    year: '2024',
    type: 'article',
    url: 'https://doi.org/10.55524/ijircst.2024.12.4.16',
    description:
      "Impact de l'IA sur l'UX dans la FinTech — IntelliWealth, SafeGuard, croissance projetée.",
  },
]

const KEY_CONCEPTS = [
  {
    term: 'Effet Zeigarnik',
    emoji: '🔄',
    definition:
      "La tendance humaine à vouloir terminer ce qui est commencé. C'est ce qu'exploitent les barres de progression — laisser une tâche à 90% crée une tension psychologique qui pousse à la compléter.",
    example: 'Barres de progression dans Duolingo ou LinkedIn',
  },
  {
    term: 'FOMO',
    emoji: '⏰',
    definition:
      'Fear Of Missing Out — la peur de rater quelque chose. Les comptes à rebours et les offres limitées dans le temps exploitent ce biais cognitif pour déclencher une action rapide et souvent impulsive.',
    example: 'Offres "dernières places" sur Booking.com',
  },
  {
    term: 'Renforcement variable',
    emoji: '🎰',
    definition:
      "Skinner a montré que les récompenses données de façon imprévisible (variable) sont bien plus addictives que les récompenses continues. C'est le principe des machines à sous — et des notifications sociales.",
    example: 'Likes et notifications sur Instagram',
  },
  {
    term: 'Dark Pattern',
    emoji: '🕳️',
    definition:
      "Un environnement délibérément conçu pour tromper les utilisateurs afin de maximiser les revenus à leurs dépens. Guilt-tripping, abonnements cachés, opt-out difficiles — des pratiques contraires à l'éthique UX.",
    example: 'Le bouton Amazon Prime qui ressemble à une validation de commande',
  },
  {
    term: 'Modèle Hook',
    emoji: '🪝',
    definition:
      "Le cycle en 4 étapes de Nir Eyal : Déclencheur → Action → Récompense variable → Investissement. Conçu pour créer des habitudes d'utilisation durables. La clé éthique : persuasion ≠ coercition.",
    example: 'Twitter : notification (déclencheur) → scroll (action) → like inattendu (récompense)',
  },
  {
    term: "Indice d'engagement (UEI)",
    emoji: '📊',
    definition:
      "La formule de Barbaro (IBM) pour quantifier l'engagement. Si UEI > 0,5, l'utilisateur est considéré comme engagé. Basé sur le rapport entre le temps depuis la dernière action et la durée totale d'utilisation.",
    example: "Utilisé pour prédire le désengagement avant qu'il ne se produise",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChapterCarousel({ chapter }: { chapter: Chapter }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const total = chapter.slides.length

  const prev = () => setCurrentSlide((i) => (i - 1 + total) % total)
  const next = () => setCurrentSlide((i) => (i + 1) % total)

  const slide = chapter.slides[currentSlide]

  return (
    <div className="bg-white border border-ink/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: chapter.color + '15' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: chapter.color }}
          >
            {chapter.icon}
          </span>
          <div>
            <p className="text-[10px] font-mono text-ink-subtle tracking-widest uppercase">
              Partie {chapter.number}
            </p>
            <h3 className="text-sm font-body font-semibold text-ink">{chapter.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center hover:border-ink/30 transition-colors"
          >
            <ChevronLeft size={12} className="text-ink-muted" />
          </button>
          <span className="text-xs font-mono text-ink-subtle">
            {currentSlide + 1}/{total}
          </span>
          <button
            onClick={next}
            className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center hover:border-ink/30 transition-colors"
          >
            <ChevronRight size={12} className="text-ink-muted" />
          </button>
        </div>
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="p-6"
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-display font-bold text-ink text-base leading-tight flex-1">
              {slide.title}
            </h4>
            <span
              className="ml-3 text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: chapter.color + '15', color: chapter.color }}
            >
              {slide.page}
            </span>
          </div>

          <p className="text-sm font-body text-ink-muted leading-relaxed mb-4">{slide.content}</p>

          {slide.stat && (
            <div
              className="rounded-xl p-4 mb-4 text-center"
              style={{ backgroundColor: chapter.color + '10' }}
            >
              <div
                className="font-display font-black text-3xl mb-1"
                style={{ color: chapter.color }}
              >
                {slide.stat.value}
              </div>
              <div className="text-xs font-mono text-ink-subtle">{slide.stat.label}</div>
            </div>
          )}

          {slide.quote && (
            <blockquote className="border-l-2 pl-4 py-1" style={{ borderColor: chapter.color }}>
              <p className="text-xs font-body italic text-ink-muted leading-relaxed mb-1">
                « {slide.quote} »
              </p>
              {slide.quoteAuthor && (
                <footer className="text-[10px] font-mono text-ink-subtle">
                  — {slide.quoteAuthor}
                </footer>
              )}
            </blockquote>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="px-6 pb-4 flex gap-1.5">
        {chapter.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === currentSlide ? 20 : 6,
              backgroundColor: i === currentSlide ? chapter.color : '#e5e5e0',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ConceptCard({ concept }: { concept: (typeof KEY_CONCEPTS)[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="bg-white border border-ink/5 rounded-2xl p-5 cursor-pointer hover:border-brand-orange/20 hover:shadow-md transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{concept.emoji}</span>
        <div className="flex-1">
          <h4 className="font-display font-bold text-ink text-base mb-1">{concept.term}</h4>
          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm font-body text-ink-muted leading-relaxed mb-3">
                  {concept.definition}
                </p>
                <div className="bg-brand-orange/5 border border-brand-orange/15 rounded-lg px-3 py-2">
                  <p className="text-[10px] font-mono text-brand-orange uppercase tracking-wide mb-0.5">
                    Exemple
                  </p>
                  <p className="text-xs font-body text-ink-muted">{concept.example}</p>
                </div>
              </motion.div>
            ) : (
              <motion.p
                className="text-xs font-body text-ink-subtle line-clamp-1"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {concept.definition.slice(0, 60)}…
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <span className="text-ink-subtle/40 flex-shrink-0 mt-1">{open ? '▲' : '▼'}</span>
      </div>
    </motion.div>
  )
}

function IntervieweeCard({ person, index }: { person: Interviewee; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-ink/5 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-base flex-shrink-0"
          style={{ backgroundColor: person.color }}
        >
          {person.initials}
        </div>
        <div>
          <h4 className="font-body font-semibold text-ink text-base">{person.name}</h4>
          <p className="text-xs font-body text-ink-muted">{person.role}</p>
          <p className="text-[10px] font-mono text-ink-subtle">{person.company}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="border-l-2 pl-4 mb-4" style={{ borderColor: person.color }}>
        <Quote size={12} className="mb-1" style={{ color: person.color }} />
        <p className="text-sm font-body italic text-ink-muted leading-relaxed">
          « {person.keyQuote} »
        </p>
      </blockquote>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5">
        {person.topics.map((topic) => (
          <Tag key={topic} label={topic} size="sm" />
        ))}
      </div>
    </motion.div>
  )
}

function BibliographyCard({ item, index }: { item: BibliographyItem; index: number }) {
  const typeColors = {
    book: '#FF6B35',
    article: '#7B61FF',
    thesis: '#00B4D8',
  }

  const typeLabels = {
    book: '📚 Livre',
    article: '📄 Article',
    thesis: '🎓 Mémoire',
  }

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group flex gap-4 bg-white border border-ink/5 rounded-2xl p-4 hover:border-brand-orange/25 hover:shadow-md transition-all duration-300"
    >
      {/* Cover placeholder */}
      <div
        className="w-12 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-display font-black text-xl"
        style={{ backgroundColor: typeColors[item.type] }}
      >
        {item.type === 'book' ? '📚' : '📄'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-body font-semibold text-ink text-sm leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">
            {item.title}
          </h4>
          <ExternalLink
            size={12}
            className="text-ink-subtle flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <p className="text-[10px] font-mono text-ink-subtle mb-2">
          {item.author} · {item.year}
        </p>
        <p className="text-xs font-body text-ink-muted leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <span
          className="mt-2 inline-block text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: typeColors[item.type] + '15',
            color: typeColors[item.type],
          }}
        >
          {typeLabels[item.type]}
        </span>
      </div>
    </motion.a>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MemoirePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <article className="min-h-screen bg-surface">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden"
      >
        {/* Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 bg-surface">
          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,.5) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          {/* Blobs */}
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-brand-orange/15 blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl animate-blob [animation-delay:3s]" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl animate-blob [animation-delay:6s]" />
        </motion.div>

        {/* Back link */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/"
                hash="projects"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux projets
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 section-container pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-6">
              Mémoire de Mastère · 2024–2025 · Mention Major ex-aequo
            </p>

            {/* Animated title, letter by letter */}
            <h1 className="font-display font-black text-ink leading-none mb-4">
              <span className="block text-6xl md:text-8xl lg:text-[10rem] tracking-tight">
                Du clic
              </span>
              <span className="block text-5xl md:text-7xl lg:text-[7rem] italic text-brand-orange tracking-tight">
                à l'engagement
              </span>
            </h1>

            <p className="text-white/60 font-body text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">
              Exploration des pratiques de design avancées dans les interfaces numériques —
              gamification, personnalisation et intelligence artificielle.
            </p>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { icon: <BookOpen size={12} />, label: '123 pages' },
                { icon: <Users size={12} />, label: '3 experts interviewés' },
                { icon: <Brain size={12} />, label: '5 parties' },
                { icon: <Quote size={12} />, label: '170+ sources' },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white/70 text-xs font-mono rounded-full backdrop-blur-sm border border-white/10"
                >
                  {icon} {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
            Explorer
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Problématique ── */}
      <section className="py-24 bg-ink text-white overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-8">
              Problématique centrale
            </p>
            <p className="font-display italic text-2xl md:text-4xl text-white leading-tight">
              « Comment des pratiques de design comme la{' '}
              <span className="text-brand-orange">gamification</span>, la{' '}
              <span className="text-purple-400">personnalisation</span> et l'{' '}
              <span className="text-blue-400">intelligence artificielle</span> influencent-elles
              l'engagement et la conversion des utilisateurs sur les interfaces numériques, tout en
              répondant à leurs besoins ? »
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Concepts clés ── */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-3">
              Concepts clés
            </p>
            <h2 className="heading-lg text-ink">
              Les idées à retenir
              <br />
              <span className="italic text-brand-orange">expliquées simplement</span>
            </h2>
            <p className="text-sm text-ink-muted mt-3">
              Cliquez sur chaque concept pour le développer.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_CONCEPTS.map((concept, i) => (
              <motion.div
                key={concept.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <ConceptCard concept={concept} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glaçage gamifié — featured concept ── */}
      <section className="py-16 bg-brand-orange/4 border-y border-brand-orange/10">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
                Concept développé
              </p>
              <h2 className="heading-md text-ink mb-6">
                La métaphore du{' '}
                <span className="italic text-brand-orange">gâteau et du glaçage</span>
              </h2>
              <p className="text-base font-body text-ink-muted leading-relaxed mb-4">
                C'est la mise en garde fondamentale de Zichermann contre l'abus de gamification. On
                peut facilement ajouter des badges, des points et des leaderboards sur n'importe
                quel produit — mais si le produit lui-même est médiocre, ces éléments ne feront que
                retarder l'inévitable désengagement.
              </p>
              <p className="text-base font-body text-ink-muted leading-relaxed">
                La gamification est un <strong className="text-ink">accélérateur</strong>, pas un{' '}
                <strong className="text-ink">réparateur</strong>. Elle amplifie ce qui existe déjà —
                en bien comme en mal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              {/* Visual representation */}
              <div className="relative bg-white rounded-3xl p-8 border border-brand-orange/15 shadow-xl">
                {/* Cake layers */}
                <div className="space-y-3">
                  <div className="rounded-xl p-4 text-center bg-brand-orange text-white">
                    <p className="font-mono text-xs uppercase tracking-wide opacity-80 mb-1">
                      Le glaçage
                    </p>
                    <p className="font-display font-bold text-lg">Gamification</p>
                    <p className="text-xs opacity-70">Badges · Points · Leaderboards</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl">+</span>
                  </div>
                  <div className="rounded-xl p-4 text-center bg-ink text-white">
                    <p className="font-mono text-xs uppercase tracking-wide opacity-80 mb-1">
                      Le gâteau
                    </p>
                    <p className="font-display font-bold text-lg">Produit de qualité</p>
                    <p className="text-xs opacity-70">
                      UX solide · Valeur réelle · Product-market fit
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl">=</span>
                  </div>
                  <div className="rounded-xl p-4 text-center bg-green-50 border border-green-200">
                    <p className="font-display font-bold text-green-800 text-lg">
                      Engagement durable ✓
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5 Parties — Carrousels ── */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-3">
              Les 5 parties
            </p>
            <h2 className="heading-lg text-ink">
              Lire le mémoire
              <br />
              <span className="italic text-brand-orange">section par section</span>
            </h2>
          </motion.div>

          {/* Nav tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CHAPTERS.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="px-4 py-2 rounded-full text-xs font-mono font-medium border border-ink/10 hover:border-brand-orange/30 transition-colors"
                style={{ color: chapter.color }}
              >
                {chapter.number} {chapter.title}
              </a>
            ))}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CHAPTERS.map((chapter, i) => (
              <motion.div
                id={chapter.id}
                key={chapter.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <ChapterCarousel chapter={chapter} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experts interviewés ── */}
      <section className="py-24 bg-ink/[0.02] border-y border-ink/5">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-3">
              Experts interrogés
            </p>
            <h2 className="heading-lg text-ink">
              3 interviews <span className="italic text-brand-orange">terrain</span>
            </h2>
            <p className="text-sm text-ink-muted mt-3 max-w-xl">
              Des professionnels en activité, interrogés pour confronter les théories académiques
              aux réalités du terrain.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {INTERVIEWEES.map((person, i) => (
              <IntervieweeCard key={person.name} person={person} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Citation forte ── */}
      <section className="py-24 bg-ink overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Quote size={40} className="text-brand-orange/30 mx-auto mb-6" />
            <p className="font-display italic text-white text-2xl md:text-3xl leading-tight mb-6">
              « L'engagement est influencé par la perception, la mémoire, la motivation, la raison
              d'être de l'interface, l'émotion, l'utilisabilité, l'engageabilité et le fun. On peut
              le quantifier via un indice d'engagement utilisateur. »
            </p>
            <footer className="text-brand-orange font-mono text-sm">
              — Définition synthétisée dans le mémoire (Barbaro + Zichermann + Hodent)
            </footer>
          </motion.div>
        </div>
      </section>

      {/* ── Bibliographie ── */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-3">
              Bibliographie sélectionnée
            </p>
            <h2 className="heading-lg text-ink">
              Sources clés
              <br />
              <span className="italic text-brand-orange">→ accès direct</span>
            </h2>
            <p className="text-sm text-ink-muted mt-3">
              Cliquez sur une source pour accéder à l'original.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {BIBLIOGRAPHY.map((item, i) => (
              <BibliographyCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Conclusion ── */}
      <section className="py-24 bg-brand-orange/4 border-t border-brand-orange/10">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-mono text-brand-orange tracking-widest uppercase mb-4">
                Ce que j'en retiens
              </p>
              <h2 className="heading-md text-ink mb-6">
                Des découvertes qui ont{' '}
                <span className="italic text-brand-orange">changé ma pratique</span>
              </h2>
              <div className="space-y-4">
                {[
                  "J'ai été surprise de toutes les techniques mises en place par les entreprises pour nous tromper via les dark patterns.",
                  "La gamification ne peut pas compenser un produit de mauvaise qualité — c'est la leçon la plus importante.",
                  "J'ai beaucoup apprécié l'idée d'un organisme mondial pour contrôler l'IA, à l'image de l'AIEA.",
                  "Les mécanismes du cerveau (Hodent) sont des facteurs d'influence sous-estimés dans le design.",
                ].map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-brand-orange font-bold flex-shrink-0 mt-0.5">›</span>
                    <p className="text-sm font-body text-ink-muted leading-relaxed">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '123', label: 'pages rédigées' },
                { value: 'Major', label: 'mention ex-aequo' },
                { value: '3', label: 'experts interviewés' },
                { value: '170+', label: 'sources analysées' },
                { value: '5', label: 'parties structurées' },
                { value: '6', label: 'concepts clés définis' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white border border-ink/5 rounded-2xl p-5 text-center hover:border-brand-orange/20 transition-colors"
                >
                  <div className="font-display font-black text-3xl text-brand-orange mb-1">
                    {value}
                  </div>
                  <div className="text-xs font-mono text-ink-subtle">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Navigation ── */}
      <div className="border-t border-ink/5 py-12">
        <div className="section-container flex items-center justify-between">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 text-sm font-body text-ink-muted hover:text-brand-orange transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Tous les projets
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: 'idalgo-scorecast' }}
            className="inline-flex items-center gap-2 text-sm font-body text-ink-muted hover:text-brand-orange transition-colors group"
          >
            Projet suivant
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
