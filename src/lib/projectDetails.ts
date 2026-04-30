import type { ProjectDetail } from '@/types'

// ─── Detailed content per project slug ──────────────────────────────────────
// 📁 Images maquettes : déposer dans public/mockups/ puis référencer avec src="/mockups/nom.png"
// 🏢 Vrais logos : déposer dans public/logos/ puis référencer dans companies[].logo
//
// ─── INSTANT PROD — images à placer dans public/mockups/ ─────────────────────
// public/mockups/instant-prod-design-system.jpg  ← A4_-_2.jpg  (palette couleurs + illustrations 3D)
// public/mockups/instant-prod-logos.jpg          ← A4_-_3.jpg  (variations du logo)
// public/mockups/instant-prod-components.jpg     ← A4_-_4.jpg  (boutons, marges, composants)
// public/mockups/instant-prod-maquettes.jpg      ← depuis le PDF maquettes (export manuel Figma)
// public/mockups/instant-prod-diagramme-micro.jpg ← export PDF diagramme d'alignement p.1
// public/mockups/instant-prod-diagramme-porteur.jpg ← export PDF diagramme d'alignement p.2
// public/mockups/instant-prod-userflow.jpg       ← export PDF userflow

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'idalgo-scorecast': {
    context:
      "iDalgo est spécialisée dans la diffusion de données sportives en temps réel pour les grands médias : DHnet, France.tv, France Info, Le Parisien, Le Monde… Leurs modules d'affichage ont plus de quinze ans — fonctionnels, mais visuellement datés. Scorecast est leur application grand public de pronostics sportifs entre amis, en pleine refonte de positionnement et de cible.",
    role: 'UX Designer & Développeuse Front-End (alternance)',
    duration: 'Décembre 2024 — présent',
    team: 'Équipe produit iDalgo — PM, développeurs, designer',
    challenge:
      "Deux missions en parallèle aux enjeux opposés : moderniser des modules B2B vieillissants utilisés par les plus grands médias français, et concevoir un système de gamification complet pour Scorecast — en passant d'une cible 35-45 ans à 25-35 ans, en bousculant les habitudes existantes, avec une grande équipe aux avis divergents.",
    process: [
      {
        type: 'highlight',
        title: 'Mission 1 — Refonte des modules iDalgo',
        content:
          "Les modules d'affichage (scores, classements, statistiques) utilisés par DHnet, France.tv, Le Parisien, Le Monde ont plus de 15 ans. Objectif : les moderniser pour correspondre aux standards actuels, puis les recoder dans une nouvelle plateforme pour de meilleures performances.",
        color: '#1A1A2E',
      },
      {
        type: 'two-col',
        title: 'Audit & démarche',
        left: "Audit de l'existant : inventaire des modules, identification des problèmes visuels et techniques. Les modules ne sont pas responsives, le design est hétérogène selon les clients, et la dette technique impacte les performances.",
        right:
          'Benchmark des standards actuels sur les grands médias européens. Définition des patterns UI modernes pour les widgets sportifs. Conception sous Figma, puis développement React sur la nouvelle plateforme.',
      },
      {
        type: 'image-placeholder',
        alt: 'Comparaison avant/après — modules iDalgo',
        label: 'Avant / Après — Modules iDalgo',
        src: '/mockups/idalgo/idalgo-modules-before-after.jpg',
      },
      {
        type: 'highlight',
        title: 'Mission 2 — Gamification Scorecast',
        content:
          "Scorecast = pronostics sportifs entre amis. La refonte gamification vise un environnement complet et addictif, inspiré de Duolingo et OMADA, s'éloignant volontairement de Mon Petit Prono. Pas une couche superficielle — un système cohérent.",
        color: '#0D1B2A',
      },
      {
        type: 'two-col',
        title: 'Le système de gamification',
        left: 'Éléments conçus : Scorecoins (monnaie virtuelle), badges de progression, système de divisions, roue de la fortune, avatars personnalisables, missions quotidiennes, pronostics plurisports quotidiens.',
        right:
          'Défis : grande équipe avec des appétences design variées → avis divergents. Changement brutal pour les utilisateurs 35-45 ans. Changement de cible vers 25-35. Mécanique addictive mais éthique.',
      },
      {
        type: 'image-placeholder',
        alt: 'Scorecast — système de gamification, badges et divisions',
        label: 'Gamification Scorecast — badges & divisions',
        src: '/mockups/idalgo/scorecast-gamification.jpg',
      },
      {
        type: 'metrics',
        metrics: [
          { value: '15+', label: 'ans de dette technique' },
          { value: '6+', label: 'clients médias concernés' },
          { value: '6', label: 'mécaniques de gamification' },
          { value: '−10', label: 'ans sur la cible (35→25)' },
        ],
      },
    ],
    outcomes: [
      'Modules iDalgo redesignés et en cours de migration vers la nouvelle plateforme',
      "Système de gamification Scorecast spécifié, validé et en cours d'implémentation",
      'Contribution front-end React directe sur la nouvelle plateforme',
      'Alignement équipe sur une vision gamification cohérente et éthique',
    ],
    learnings:
      "Gérer deux missions très différentes en simultané m'a appris à switcher de contexte efficacement. Sur Scorecast, j'ai compris que la gamification ne s'impose pas — elle se négocie, s'explique, se justifie par des exemples concrets. Naviguer dans une grande équipe aux avis divergents est une vraie compétence de designer.",
    links: [
      { label: 'Site iDalgo', url: 'https://www.idalgo.fr' },
      { label: 'Application Scorecast', url: 'https://www.scorecast.fr' },
    ],
    companies: [
      { name: 'iDalgo', logo: '/logos/idalgo.svg', url: 'https://www.idalgo.fr' },
      { name: 'Scorecast', logo: '/logos/scorecast.svg', url: 'https://www.scorecast.fr' },
    ],
    tools: [
      { label: 'Figma', logo: '/tools/figma.svg' },
      { label: 'React', logo: '/tools/react.svg' },
      { label: 'Notion', logo: '/tools/notion.svg' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // INSTANT PROD
  // ─────────────────────────────────────────────────────────────────────────────
  'instant-prod': {
    context:
      "Projet entrepreneurial universitaire en groupe de 5 (avec le Campus Fonderie de l'Image), de mars à juin 2024. L'un des membres, passionné de cinéma, a mis en lumière une problématique forte : les jeunes cinéastes peinent à entrer en contact avec des producteurs. Instant Prod est né de là — une plateforme de mise en relation entre jeunes talents de l'audiovisuel et directeurs de production, inspirée de Malt.",
    role: 'UX Researcher, UX/UI Designer, co-conception produit',
    duration: 'Mars — Juin 2023',
    team: "5 étudiants — Campus Fonderie de l'Image",
    challenge:
      "Concevoir une plateforme de confiance dans un secteur très relationnel où le bouche-à-oreille domine, tout en convaincant deux types d'utilisateurs très différents — jeunes talents précaires et directeurs de production expérimentés.",
    process: [
      // ── 1. RECHERCHE ──────────────────────────────────────────────────────────
      {
        type: 'highlight',
        title: '🎯 Recherche terrain multi-acteurs',
        content:
          'Appels auprès de producteurs, échanges avec des étudiants en cinéma (ESRA, CLCF…), consultation de juristes pour cadrer le modèle légal. Une recherche en double face de marché pour comprendre les deux côtés. Des insights riches ont émergé : les jeunes talents cherchent de la visibilité et des opportunités, tandis que les directeurs de production veulent un sourcing fiable et une gestion simplifiée.',
        color: '#0F2027',
      },
      {
        type: 'two-col',
        title: 'Livrables stratégiques',
        left: 'Business Model Canvas, Blue Ocean Strategy, analyse concurrentielle, plan de financement initial, seuil de rentabilité, BFR, MVP, cahier des charges Lean UX, persona détaillés, user stories, parcours utilisateur co-construits. ',
        right:
          "Cartes d'empathie, diagrammes d'alignement, personas (réalisateur junior / directeur de production), parcours utilisateur co-construit, fonctionnalités clés, priorisation des features pour le MVP, plan de financement et seuil de rentabilité.",
      },
      {
        type: 'highlight',
        title: 'Insights clés',
        content:
          'Les jeunes talents cherchent de la visibilité et des opportunités, tandis que les directeurs de production veulent un sourcing fiable et une gestion simplifiée.',
        color: '#1B1B2F',
      },

      {
        type: 'quote',
        content:
          'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away',
        author: 'Antoine de Saint-Exupéry',
      },

      // ── 2. DIAGRAMMES D'ALIGNEMENT ────────────────────────────────────────────
      {
        type: 'section-title',
        label: "Diagrammes d'alignement",
        title: 'Comprendre les deux faces du marché',
        content:
          'Pour chaque persona, nous avons cartographié les besoins, les attentes et les fonctionnalités associées — afin de construire une plateforme qui sert réellement les deux côtés.',
        fullWidth: true,
      },
      {
        type: 'image-full',
        alt: "Diagramme d'alignement — Micro-entrepreneur spécialisé dans la vidéo",
        label: "Diagramme d'alignement · Persona 1 — Micro-entrepreneur vidéo",
        src: '/mockups/instant-prod/instant-prod-diagramme-micro.jpg',
        caption:
          'Besoins, attentes et fonctionnalités pour les intermittents du spectacle et jeunes cinéastes.',
        fullWidth: true,
      },
      {
        type: 'image-full',
        alt: "Diagramme d'alignement — Porteurs de projets",
        label: "Diagramme d'alignement · Persona 2 — Porteur de projet",
        src: '/mockups/instant-prod/instant-prod-diagramme-porteur.jpg',
        caption:
          'Besoins, attentes et fonctionnalités pour les directeurs de production et porteurs de projets.',
        fullWidth: true,
      },

      // ── 3. MINDMAP ────────────────────────────────────────────────────────────
      {
        type: 'image-full',
        alt: 'Recherche utilisateur et mindmap Instant Prod',
        label: 'Mindmap — Recherche utilisateur',
        src: '/mockups/instant-prod/instant-prod-mindmap.png',
        caption:
          'Cartographie des parcours utilisateurs pour les 4 profils identifiés : novice / régulier × intermittent / porteur de projet.',
        externalUrl: 'https://coggle.it/', // ← remplacer par l'URL Coggle du projet
        externalLabel: 'Ouvrir dans Coggle',
        fullWidth: true,
      },

      // ── 4. USERFLOW ───────────────────────────────────────────────────────────
      {
        type: 'section-title',
        label: 'Userflow',
        title: 'Parcours utilisateur principal',
        content:
          "Le userflow principal couvre la découverte de la plateforme jusqu'à la livraison d'un projet — en passant par la création de compte, la recherche de talents et la planification d'un rendez-vous.",
        fullWidth: true,
      },
      {
        type: 'image-full',
        alt: 'Userflow — parcours principal Instant Prod',
        label: 'Userflow — de la découverte à la livraison',
        src: '/mockups/instant-prod/instant-prod-userflow.jpg',
        caption:
          "De l'arrivée sur le site à la livraison du projet, en passant par le matching et la discussion.",
        externalUrl: 'https://www.figma.com/', // ← remplacer par le lien Figma du userflow
        externalLabel: 'Voir sur Figma',
        fullWidth: true,
      },

      // ── 5. DESIGN SYSTEM ──────────────────────────────────────────────────────
      {
        type: 'section-title',
        label: 'Design system',
        title: 'Identité visuelle & composants',
        content:
          'Un design system cohérent construit autour de la palette InstantProd — bleu primaire, lavande, coral et pêche — avec une typographie Kollektif / Roboto et des composants réutilisables.',
        fullWidth: true,
      },
      {
        type: 'two-col',
        title: 'Palette & Typographie',
        left: 'Palette : bleu #3C55DA (primaire, confiance & professionnalisme), lavande #D9E1FF (surface secondaire), coral #F09375 (accent chaleureux), pêche #FFD2BB (fond doux). Typographie : Kollektif H3 pour les titres percutants, Roboto pour la lisibilité du corps.',
        right:
          "Iconographie cohérente issue d'une même librairie. Marges et grilles définies pour le mobile (l'app est mobile-first). Illustrations 3D sur fond de blob coloré pour donner vie aux espaces vides et renforcer l'identité visuelle.",
        fullWidth: true,
      },
      {
        type: 'image-trio',
        fullWidth: true,
        images: [
          {
            src: '/mockups/instant-prod/instant-prod-design-system.jpg',
            alt: 'Design system — palette couleurs & illustrations 3D',
            label: 'Couleurs & illustrations',
            caption: 'Palette #3C55DA · #D9E1FF · #F09375 · #FFD2BB',
          },
          {
            src: '/mockups/instant-prod/instant-prod-logos.jpg',
            alt: 'Design system — variations du logo InstantProd',
            label: 'Variations du logo',
            caption: 'Déclinaisons fond blanc, noir, bleu et pêche',
          },
          {
            src: '/mockups/instant-prod/instant-prod-components.jpg',
            alt: 'Design system — boutons, marges et composants UI',
            label: 'Boutons & composants',
            caption: 'États défaut, survol, désactivé, filtres, bottom nav',
          },
        ],
      },

      // ── 6. MAQUETTES ──────────────────────────────────────────────────────────
      {
        type: 'section-title',
        label: 'Maquettes finales',
        title: 'Prototype haute fidélité',
        content:
          'Les maquettes finales couvrent les 5 écrans clés du parcours utilisateur principal : onboarding, homepage, recherche de talents, dépôt de projet et dashboard.',
        fullWidth: true,
      },
      {
        type: 'image-full',
        alt: 'Maquettes finales Instant Prod — 5 écrans clés du parcours',
        label: 'Maquettes finales — Onboarding · Homepage · Recherche · Projet · Dashboard',
        src: '/mockups/instant-prod/instant-prod-maquettes.jpg',
        caption:
          "De gauche à droite : téléchargement de l'app, homepage entreprise, recherche de talents, dépôt de projet et dashboard.",
        externalUrl: 'https://www.figma.com/', // ← remplacer par le lien Figma des maquettes
        externalLabel: 'Voir sur Figma',
        fullWidth: true,
      },

      // ── 7. QUOTE ──────────────────────────────────────────────────────────────
      {
        type: 'quote',
        content:
          "« Le travail en équipe demande de la diplomatie, de l'écoute et la capacité à faire des compromis éclairés pour servir l'intérêt collectif. »",
        author: 'Retour personnel — Callista Loré',
        fullWidth: true,
      },

      // ── 8. METRICS ────────────────────────────────────────────────────────────
      {
        type: 'metrics',
        metrics: [
          { value: '5', label: "membres dans l'équipe" },
          { value: '3', label: 'mois de projet intensif' },
          { value: '2', label: 'faces du marché adressées' },
          { value: '★', label: 'Valorisé par les professeurs' },
        ],
        fullWidth: true,
      },
    ],
    outcomes: [
      'Plateforme conçue de bout en bout : de la recherche au prototype',
      'Business model validé avec plan de financement et seuil de rentabilité',
      'Projet particulièrement valorisé par les professeurs pour sa cohérence et sa qualité',
      'Présentation finale devant un jury professionnel',
    ],
    learnings:
      "Ce projet m'a appris que la gestion des délais serrés et du travail en équipe est aussi complexe que la conception du produit. Un bon projet centré utilisateur demande de l'itération, de l'adaptation et de remettre en question ses propres idées — même quand c'est inconfortable. J'ai aussi découvert la richesse de la recherche terrain et l'importance de comprendre les deux faces d'un marché pour concevoir une solution qui fonctionne vraiment.",
    companies: [
      {
        name: "Campus Fonderie de l'Image",
        logo: '/logos/campus-fonderie-de-limage.png',
        url: 'https://www.campusfonderiedelimage.org/',
      },
    ],
    tools: [
      { label: 'Figma', logo: '/tools/figma.svg' },
      { label: 'Notion', logo: '/tools/notion.svg' },
    ],
  },

  blackskill: {
    context:
      "BlackSkill est une application mobile interne destinée à faciliter la gestion, le suivi et la communication entre managers de football et joueurs. L'idée centrale : centraliser ce qui est éparpillé entre WhatsApp, Google Drive, Excel et notes perso dans un seul outil structuré, sécurisé et pensé pour le quotidien d'un staff.",
    role: 'UX/UI Designer — mission via One More Thing Studio',
    duration: 'Juin — Octobre 2024 (V1) & Novembre 2025 — Janvier 2026 (V2)',
    team: 'One More Thing Studio + équipe BlackSkill',
    challenge:
      'La V1 skeumorphique avait une navigation confuse, des écrans en doublon, une logique incohérente entre modules et un design vieillissant. La V2 devait tout reconstruire sur des bases saines, sans tout refaire, dans les contraintes du devis.',
    versions: [
      {
        label: 'V1',
        title: 'App skeumorphique',
        description:
          'Première version avec une direction artistique skeumorphique distincte — interfaces imitant des matières physiques. Fonctionnelle mais navigation confuse, écrans en doublon, design non scalable.',
      },
      {
        label: 'V2',
        title: 'Refonte complète',
        description:
          'Refonte en 4 phases : fondations (design system, navigation, droits), pages principales, modules métier complexes (scouting, rapports, bilans), administration.',
      },
    ],
    process: [
      {
        type: 'highlight',
        title: 'V1 — Direction skeumorphique',
        content:
          'La première version adoptait une esthétique skeumorphique forte : boutons avec relief, ombres portées réalistes, surfaces texturées. Une direction artistique distinctive, mais qui montrait ses limites en évolutivité et lisibilité mobile.',
        color: '#1C1C1C',
      },
      {
        type: 'image-placeholder',
        alt: 'BlackSkill V1 — organisation du travail',
        label: 'V1 — Organisation du travail',
        src: '/mockups/blackskill/blsk-trello.png',
      },
      {
        type: 'text',
        title: 'Propositions graphiques',
        content:
          'De nombreux tests ont été effectués, notamment sur la partie dashboard, une fois les wireframes terminés, afin de correspondre au maximum aux attentes du client. De nombreux allers-retours ont été effectués avant de trouver une esthétique satisfaisante pour le client, mais qui restait très éloignée de mes recommandations graphiques et ergonomiques — ce qui a été un apprentissage important pour la suite du projet.',
      },
      {
        type: 'image-placeholder',
        alt: 'BlackSkill V1 — propositions graphiques du dashboard',
        label: 'V1 — propositions graphiques du dashboard',
        src: '/mockups/blackskill/blsk-prop-graphiques.png',
      },
      {
        type: 'text',
        title: 'Version finale V1',
        content:
          'De nombreux tests ont été effectués, notamment sur la partie dashboard, une fois les wireframes terminés, afin de correspondre au maximum aux attentes du client. De nombreux allers-retours ont été effectués avant de trouver une esthétique satisfaisante pour le client, mais qui restait très éloignée de mes recommandations graphiques et ergonomiques — ce qui a été un apprentissage important pour la suite du projet.',
      },
      {
        type: 'image-placeholder',
        alt: 'BlackSkill V1 — version finale en skeumorphisme',
        label: 'V1 — version finale en skeumorphisme',
        src: '/mockups/blackskill/blsk-V1-maquettes.png',
      },
      {
        type: 'highlight',
        title: 'V2 — Audit & reconstruction',
        content:
          "Avant de redesigner, il fallait remettre de l'ordre. L'audit a mis en évidence : navigation confuse, écrans en doublon, logique différente selon les modules. La V2 a été découpée en 4 phases logiques avec un cahier des charges complet.",
        color: '#180800',
      },
      {
        type: 'two-col',
        title: 'Phase 1 — Fondations',
        left: 'Refonte UI globale. Refonte navigation (menus selon usages réels). Suppression doublons. Design System : brand #FF7A30, typographie Plus Jakarta Sans, H1-H5 hiérarchisés, boutons 3 états.',
        right:
          'Accessibilité : contrastes, tailles de texte mobile. Clarification 3 rôles : Joueur (accès simplifié), Manager (pilotage complet), Admin (gestion globale et sensible).',
      },
      {
        type: 'image-placeholder',
        alt: 'BlackSkill V2 — design system et composants',
        label: 'V2 — Design System',
        src: '/mockups/blackskill/blsk-design-system.png',
      },
      {
        type: 'two-col',
        title: 'Phase 2 & 3 — Pages métier',
        left: "Pages principales : Accueil Joueur, Accueil Manager, Agenda, Messagerie, Documents. Chaque écran : aller droit à l'essentiel, limiter les actions inutiles, éviter la surcharge.",
        right:
          'Modules complexes : Scouting (joueurs, prospects, clubs, matchs), Projets, Tâches, Comptes-rendus, Rapports & bilans (multi-étapes avec brouillon), Notes de frais, Compositions (drag & drop).',
      },
      {
        type: 'image-placeholder',
        alt: 'BlackSkill V2 — Maquettes des pages principales et modules métier',
        label: 'V2 — Maquettes des pages principales & modules métier',
        src: '/mockups/blackskill/blsk-maquettes-v2.png',
      },
      {
        type: 'quote',
        content:
          "« Réalisation de l'interface en suivant les demandes du client, même lorsqu'elles allaient à l'encontre de mes recommandations graphiques ou ergonomiques. »",
        author: "Retour d'expérience — Callista Loré",
      },
      {
        type: 'metrics',
        metrics: [
          { value: '3', label: 'rôles utilisateurs définis' },
          { value: '2', label: 'phases de refonte' },
          { value: '50+', label: 'écrans conçus' },
          { value: '2', label: 'versions livrées' },
        ],
      },
    ],
    outcomes: [
      'Application V2 complète et fonctionnelle livrée dans les délais',
      'Design system documenté et partagé avec les développeurs',
      'Navigation refondée en 3 espaces distincts Joueur / Manager / Admin',
      'Client satisfait malgré des exigences mouvantes et des décisionnaires multiples',
    ],
    learnings:
      "Un projet peut réussir même si les décisions ne vont pas toujours dans le sens prévu. J'ai appris à séparer mes convictions de designer des contraintes client — documenter ses recommandations même quand elles ne sont pas retenues. Le travail en amont sur les user stories est déterminant.",
    companies: [
      { name: 'BlackSkill', logo: '/logos/blackskill.svg' },
      { name: 'One More Thing Studio', logo: '/logos/omts.svg' },
    ],
    tools: [
      { label: 'Figma', logo: '/tools/figma.svg' },
      { label: 'Notion', logo: '/tools/notion.svg' },
    ],
  },

  human2sport: {
    context:
      "Le Hackathon Human2Sport est organisé chaque année par Plaine Commune depuis 2018. L'édition 2023 portait sur « Sport, culture, patrimoine et territoire ». Notre défi, soumis par ITHAKE (spécialiste IA) : comment renforcer l'engagement des utilisateurs autour d'une monnaie locale — la Carte Éco — pour encourager le commerce de proximité à Plaine Commune ?",
    role: 'UX Designer & Gamification Designer',
    duration: '7 au 10 novembre 2023 — 3,5 jours',
    team: "Campus Fonderie de l'Image + Epitech + Université Paris 8",
    challenge:
      "En 3,5 jours, concevoir une gamification intelligente et personnalisée pour l'application Carte Éco, en collaboration avec l'IA d'ITHAKE — pour stimuler l'engagement à long terme autour du commerce de proximité local.",
    process: [
      {
        type: 'highlight',
        title: 'La Carte Éco & ITHAKE',
        content:
          "La Carte Éco est une monnaie d'échange locale pour encourager le commerce de proximité à Plaine Commune. ITHAKE apportait son IA pour adapter l'expérience à chaque utilisateur selon ses habitudes, son comportement et ses centres d'intérêt.",
        color: '#003049',
      },
      {
        type: 'two-col',
        title: 'Notre proposition',
        left: 'Système de badges et de rangs progressifs. Arbre de compétences inspiré des jeux vidéo en 5 branches : 🥦 Alimentation · 🏡 Logement · 🚲 Mobilité · 💚 Vie saine · 🌱 Biodiversité.',
        right:
          "Défis progressifs donnant des points pour devenir Ambassadeur d'une branche. L'IA ITHAKE adaptait l'expérience à chaque profil. Notifications personnalisées selon les habitudes.",
      },
      {
        type: 'image-placeholder',
        alt: 'Human2Sport — arbre de compétences Carte Éco',
        label: 'Arbre de compétences — 5 branches',
        src: '/mockups/human2sport/ithake-arbre-de-competences.png',
      },
      {
        type: 'text',
        title: 'Le parcours gamifié',
        content:
          "L'utilisateur progresse dans 5 branches selon ses achats réels via la Carte Éco. À 100% d'une branche : titre d'Ambassadeur. Le niveau global s'affiche (ex: \"Nv. 3 : Gardienne de l'Équilibre — 660/1000 pts\"). L'IA personnalise les défis selon le profil.",
      },
      {
        type: 'image-placeholder',
        alt: 'Human2Sport — badges, niveaux et ambassadeurs',
        label: 'Badges & Système de niveaux',
        src: '/mockups/human2sport/ithake-maquettes.png',
      },
      {
        type: 'quote',
        content:
          "« Cette expérience a renforcé mon intérêt pour la gamification et l'engagement utilisateur — sujet que j'ai choisi de creuser dans le cadre de mon mémoire. »",
        author: 'Callista Loré',
      },
      {
        type: 'metrics',
        metrics: [
          { value: '3,5j', label: 'pour tout concevoir' },
          { value: '🏆', label: 'Projet Coup de Cœur' },
          { value: '5', label: 'branches de compétences' },
          { value: '3', label: 'écoles représentées' },
        ],
      },
    ],
    outcomes: [
      '🏆 Projet "Coup de Cœur" parmi des dizaines de propositions',
      "Système de gamification avec arbre de compétences et système d'ambassadeurs",
      "Intégration IA (ITHAKE) pour personnalisation de l'expérience",
      'Prototype présenté devant un public de professionnels',
    ],
    learnings:
      "Un hackathon enseigne à prioriser l'essentiel, faire confiance à son instinct de designer, et collaborer à une vitesse inhabituelle avec des profils très variés. Ce projet a directement inspiré la thématique de mon mémoire de master.",
    companies: [
      { name: 'Human2Sport', logo: '/logos/human2sport.png' },
      { name: 'Ithake', logo: '/logos/ithake.png' },
      { name: 'La Carte Eco', logo: '/logos/carte-eco.png' },
    ],
    tools: [{ label: 'Figma', logo: '/tools/figma.svg' }],
  },

  'pes-depannage': {
    context:
      "PES Dépannage (Plomberie, Électricité, Serrurerie) est né d'une initiative familiale. Ma tante, plombière indépendante, subissait des commissions très élevées sur les plateformes existantes. Côté clients : manque de transparence et coûts non maîtrisés. De ces constats est née l'idée d'une plateforme plus humaine, plus juste et plus directe.",
    role: 'Co-fondatrice, UX Designer & Product Owner',
    duration: "De 2022 à aujourd'hui",
    team: '2 co-fondateurs',
    challenge:
      'Créer de la confiance entre artisans indépendants et particuliers dans un marché peu transparent, avec zéro budget marketing. Puis remettre entièrement en question ce premier travail pour le reconstruire avec une vraie méthodologie UX.',
    versions: [
      {
        label: 'V1',
        title: 'MVP 2022-2023',
        description:
          "Premières maquettes en autonomie, parcours utilisateur basique, modèle économique initial basé sur l'abonnement (vs commission). Mise en ligne — 100 utilisateurs atteints.",
      },
      {
        label: 'V2',
        title: 'Refonte UX 2024',
        description:
          'Remise à zéro complète avec recherche utilisateur rigoureuse, personas, wireframes, tests, nouveau design system. Mention Major ex-aequo au Mastère.',
      },
    ],
    process: [
      // ── 1. V1 ─────────────────────────────────────────────────────────────
      {
        type: 'highlight',
        title: 'V1 — Le projet familial (2022-2023)',
        content:
          "En autonomie : premières maquettes, parcours autour de la demande d'intervention urgente, modèle économique abonnement. Discussions régulières avec les artisans du réseau de ma tante. Mise en ligne → 100 utilisateurs.",
        color: '#2D1B00',
      },
      {
        type: 'image-placeholder',
        alt: 'PES Dépannage V1 — premiers écrans',
        label: 'V1 — Premiers écrans (2022)',
        src: '/mockups/pes-depannage/pesd-v1-premiers-ecrans.png',
      },
      // ── 2. LA REMISE À ZÉRO ───────────────────────────────────────────────
      {
        type: 'highlight',
        title: 'La remise à zéro (2024)',
        content:
          "En rejoignant le Mastère UX Design, j'ai pris conscience des zones d'ombre du projet. Choix difficile mais fondamental : tout recommencer à zéro pour le rendre viable, crédible et centré utilisateur.",
        color: '#1B3A4B',
      },
      {
        type: 'two-col',
        title: 'Recherche utilisateur V2',
        left: 'Questionnaires Google Forms auprès de particuliers ayant utilisé des services de dépannage. Entretiens qualitatifs avec des artisans (plombiers, serruriers, électriciens). Benchmark approfondi des plateformes existantes.',
        right:
          'Création de personas réalistes. Analyse des frictions dans les premières maquettes. Diagrammes UML. Organisation des livrables sur Notion.',
      },
      {
        type: 'image-placeholder',
        alt: 'PES Dépannage — diagrammes UML',
        label: 'Diagrammes UML',
        src: '/mockups/pes-depannage/pesd-uml.png',
      },
      {
        type: 'image-placeholder',
        alt: 'PES Dépannage — organisation Notion',
        label: 'Livrables Notion',
        src: '/mockups/pes-depannage/pesd-a-faire.png',
      },
      // ── 3. PARCOURS V2 ────────────────────────────────────────────────────
      {
        type: 'two-col',
        title: 'Nouveaux parcours V2',
        left: 'Côté client : signaler une urgence → localiser un artisan → choisir → payer en confiance. Interface pensée pour le stress de la situation, besoin de réassurance, simplicité maximale.',
        right:
          'Côté artisan : recevoir des demandes ciblées → filtrer selon disponibilité → facturer simplement. Nouveau design system : #33658A (primaire), #F26419 (accent), #F6AE2D (highlight).',
      },
      {
        type: 'image-placeholder',
        alt: 'PES Dépannage V2 — maquettes haute fidélité',
        label: 'V2 — Maquettes haute fidélité',
        src: '/mockups/pes-depannage/pesd-v2-maquettes.png',
      },
      // ── 4. LANDING PAGE ───────────────────────────────────────────────────
      {
        type: 'section-title',
        label: 'Landing page',
        title: 'Site vitrine',
        content:
          'Conception de la landing page destinée à convertir les visiteurs — artisans comme particuliers — avec une proposition de valeur claire, rassurante et directe.',
        fullWidth: true,
      },
      {
        type: 'image-full',
        src: '/mockups/pes-depannage/pes-landing-page.jpg',
        alt: 'PES Dépannage — landing page Figma',
        label: 'Landing page — vue complète',
        caption:
          'Conçue sur Figma. Proposition de valeur, double entrée artisan/particulier, section confiance et CTA.',
        fullWidth: true,
      },
      // ── 5. COMMUNICATION PRINT ────────────────────────────────────────────
      {
        type: 'section-title',
        label: 'Communication print',
        title: 'Supports imprimés',
        content:
          'Kakémono pour les salons professionnels, flyers A5 pour les artisans partenaires et les boîtes aux lettres, format A4 de présentation partenaires.',
        fullWidth: true,
      },
      {
        type: 'print-showcase',
        label: 'Print',
        printItems: [
          {
            format: 'kakemono',
            src: '/mockups/pes-depannage/pes-kakemono.jpg',
            alt: 'Kakémono PES Dépannage',
            label: 'Kakémono',
            caption: 'Pour salons et événements pro',
          },
          {
            format: 'A4-portrait',
            src: '/mockups/pes-depannage/pes-flyer-artisan.jpg',
            alt: 'Flyer artisan PES Dépannage',
            label: 'Flyer artisan',
            caption: 'Distribué aux artisans partenaires',
          },
          {
            format: 'A4-portrait',
            src: '/mockups/pes-depannage/pes-flyer-particulier.jpg',
            alt: 'Flyer particulier',
            label: 'Flyer particulier',
            caption: 'Distribution boîtes aux lettres',
          },
        ],
        fullWidth: true,
      },
      {
        type: 'section-title',
        label: 'Carte de visite',
        title: 'Recto · Verso',
        content: 'Carte de visite double face au format standard 85×54mm. Cliquer pour retourner.',
        fullWidth: true,
      },
      {
        type: 'card-flip',
        label: 'Carte de visite',
        cardRecto: {
          src: '/mockups/pes-depannage/pes-carte-de-visite-recto.jpg',
          alt: 'Carte de visite PES Dépannage — recto',
        },
        cardVerso: {
          src: '/mockups/pes-depannage/pes-carte-de-visite-verso.jpg',
          alt: 'Carte de visite PES Dépannage — verso',
        },
        fullWidth: true,
      },
      // ── 6. COMMUNICATION RÉSEAUX SOCIAUX ───────────────────────────────
      {
        type: 'section-title',
        label: 'Réseaux sociaux',
        title: 'Posts & carrousels',
        content:
          'Création de contenus visuels pour Instagram et LinkedIn : posts uniques (conseils, témoignages, offres) et carrousels multi-slides pour expliquer le concept ou présenter les étapes du service.',
        fullWidth: true,
      },
      {
        type: 'social-grid',
        label: 'Instagram / LinkedIn',
        title: 'Contenus réseaux sociaux',
        fullWidth: true,
        posts: [
          // Posts uniques
          {
            type: 'single',
            src: '/mockups/pes-depannage/pes-post-social-proof.jpg',
            alt: 'Post réseaux — Social Proof',
            caption: 'Post réseaux — Social Proof',
            ratio: '1:1',
          },
          {
            type: 'single',
            src: '/mockups/pes-depannage/pes-post-promo.jpg',
            alt: 'Post réseaux — Promotionnel',
            caption: 'Post réseaux — Promotionnel',
            ratio: '1:1',
          },
          {
            type: 'single',
            src: '/mockups/pes-depannage/pes-post-inspirant.jpg',
            alt: 'Post réseaux — Inspirant',
            caption: 'Post réseaux — Inspirant',
            ratio: '1:1',
          },
          {
            type: 'single',
            src: '/mockups/pes-depannage/pes-post-commu.jpg',
            alt: 'Post réseaux — Communautaire',
            caption: 'Post réseaux — Communautaire',
            ratio: '1:1',
          },
          // Carrousel — artisans
          {
            type: 'carousel',
            slides: [
              '/mockups/pes-depannage/pes-post-edu-1.jpg',
              '/mockups/pes-depannage/pes-post-edu-2.jpg',
              '/mockups/pes-depannage/pes-post-edu-3.jpg',
              '/mockups/pes-depannage/pes-post-edu-4.jpg',
              '/mockups/pes-depannage/pes-post-edu-5.jpg',
              '/mockups/pes-depannage/pes-post-edu-6.jpg',
            ],
            alt: "Carrousel — Rejoindre en tant qu'artisan",
            caption: "Comment rejoindre le réseau en tant qu'artisan",
            ratio: '1:1',
          },
        ],
      },
      // ── 7. QUOTE & METRICS ───────────────────────────────────────────────
      {
        type: 'metrics',
        metrics: [
          { value: '100', label: 'utilisateurs V1 sans budget' },
          { value: '2', label: 'versions complètes' },
          { value: 'Major', label: 'mention Mastère (ex-aequo)' },
          { value: '2022', label: 'année de lancement' },
        ],
      },
    ],
    outcomes: [
      '100 utilisateurs atteints sur la V1 sans budget marketing',
      'Remise à zéro courageuse pour une V2 rigoureuse et centrée utilisateur',
      'Mention Major ex-aequo au Mastère pour la refonte complète',
      "Leçon durable sur l'importance de la méthodologie UX même sur ses propres projets",
    ],
    learnings:
      "Ce projet m'a confrontée à la résilience nécessaire pour entreprendre. Savoir tout remettre en question après des mois de travail est un acte de maturité UX. Le bon parcours n'est pas celui qu'on imagine, mais celui qui fonctionne sur le terrain.",
    companies: [{ name: 'PES Dépannage', logo: '/logos/pes-depannage.svg' }],
    tools: [
      { label: 'Figma', logo: '/tools/figma.svg' },
      { label: 'Notion', logo: '/tools/notion.svg' },
    ],
  },

  /*'direct-mandat': {
    context:
      "DirectMandat est une plateforme utilisée par des agents immobiliers pour prospecter : ils consultent des annonces sur Le Bon Coin et démarchent les particuliers pour obtenir des mandats. Le site existant datait de 2005, n'était pas responsive, et souffrait d'une UX profondément datée. Mission via One More Thing Studio : refonte totale mobile-first.",
    role: 'UX Designer — One More Thing Studio',
    duration: '2023 — 2 mois',
    team: 'One More Thing Studio (front) + DirectMandat (back)',
    challenge:
      "Partir d'un site de 2005 non responsive pour en faire une expérience moderne, mobile-first — en écoutant les contraintes client, en gérant les allers-retours et en restant agile.",
    beforeAfter: {
      before: 'Site 2005, non responsive, navigation confuse, aucun parcours structuré.',
      after: 'Mobile-first, parcours estimation multi-étapes, UI aux standards actuels.',
    },
    process: [
      {
        type: 'highlight',
        title: 'Point de départ : un site de 2005',
        content:
          "Site original : 2005, zéro responsivité, navigation confuse, fonctionnalités obsolètes à supprimer et manques critiques à combler. Premier travail : lister ce qu'on garde, ce qu'on retire, ce qu'on ajoute.",
        color: '#1B2A1B',
      },
      {
        type: 'image-placeholder',
        alt: 'DirectMandat — AVANT la refonte (site 2005)',
        label: 'AVANT — Site original 2005',
      },
      {
        type: 'two-col',
        title: 'Méthode & démarche',
        left: 'Interviews avec des agents immobiliers pour comprendre leurs usages réels. Identification des fonctionnalités à conserver / supprimer / ajouter. Mobile-first dès les wireframes.',
        right:
          "Retravail du parcours UX complet. Amélioration UI avec les codes actuels. Beaucoup d'écoute client et d'allers-retours. Codé en front par l'agence, en back par DirectMandat.",
      },
      {
        type: 'image-placeholder',
        alt: 'DirectMandat — APRÈS la refonte, interface mobile',
        label: 'APRÈS — Nouvelle interface mobile-first',
      },
      {
        type: 'text',
        title: "Parcours d'estimation multi-étapes",
        content:
          "Chantier clé : concevoir un parcours fluide pour estimer un bien immobilier. Décomposition du formulaire long en étapes claires et progressives avec indicateur de progression — pour fluidifier la navigation et réduire l'abandon.",
      },
      {
        type: 'image-placeholder',
        alt: 'DirectMandat — parcours estimation en étapes',
        label: 'Parcours estimation — multi-étapes',
      },
      {
        type: 'metrics',
        metrics: [
          { value: '2005', label: 'année du site original' },
          { value: '100%', label: 'mobile-first' },
          { value: '0', label: 'responsive avant refonte' },
          { value: '2', label: 'équipes en collaboration' },
        ],
      },
    ],
    outcomes: [
      'Nouveau site responsive livré et mis en production',
      'Parcours vendeur simplifié et modernisé',
      'Interface conforme aux standards UX actuels',
      'Collaboration agile réussie entre agence et équipe client',
    ],
    learnings:
      "L'agilité n'est pas un mot — c'est une posture quotidienne. Adapter son design aux contraintes réelles (légales, techniques, humaines) sans perdre la qualité UX : c'est le cœur du métier.",
    companies: [
      { name: 'DirectMandat', logo: '/logos/direct-mandat.svg' },
      { name: 'One More Thing Studio', logo: '/logos/one-more-thing.svg' },
    ],
    tools: [
      { label: 'Figma', logo: '/tools/figma.svg' },
      { label: 'Notion', logo: '/tools/notion.svg' },
    ],
  },*/

  /* quadient: {
    context:
      "Quadient est un leader des solutions de communication client et de gestion du courrier. La mission : concevoir une application mobile permettant de scanner les marques d'affranchissement sur des enveloppes via photo, pour identifier la machine, son modèle, la date d'envoi, la société émettrice, l'adresse, le SIRET et le collaborateur — avec une dimension gamification pour engager les équipes.",
    role: 'UX/UI Designer — One More Thing Studio',
    duration: '2024',
    team: 'One More Thing Studio + équipe Quadient',
    challenge:
      "Concevoir une application utilitaire (scan d'enveloppes) qui soit aussi engageante via la gamification — pour inciter les collaborateurs à scanner un maximum d'enveloppes chaque mois. Réalisation complète de l'application et communication store.",
    process: [
      {
        type: 'highlight',
        title: "Le principe : scan d'enveloppes intelligents",
        content:
          "Via une photo de la marque d'affranchissement, l'app identifie : la marque de la machine, son modèle, la date d'envoi, la société émettrice, son adresse, son SIRET, et le collaborateur en charge. Une solution de terrain connectée à la data.",
        color: '#1A0A2E',
      },
      {
        type: 'two-col',
        title: 'Fonctionnalités',
        left: "Scan rapide par photo. Accès à l'historique des scans du mois et en général. Classement mensuel visible : les collaborateurs cherchent à maximiser leurs scans pour la récompense mensuelle.",
        right:
          "Challenges à paliers prévus en V2. Fiche store conçue (screenshots, visuels marketing, description). Gamification intégrée au flux naturel de l'application.",
      },
      {
        type: 'image-placeholder',
        alt: 'Quadient — interface de scan et résultat',
        label: 'Interface scan — Quadient',
      },
      {
        type: 'image-placeholder',
        alt: 'Quadient — classement mensuel et récompenses',
        label: 'Classement mensuel & Récompenses',
      },
      {
        type: 'text',
        title: 'Gamification sur une tâche utilitaire',
        content:
          "L'enjeu était de transformer une tâche répétitive (scanner des enveloppes) en défi engageant. Le classement mensuel visible crée une compétition saine entre collègues. Les récompenses du mois donnent un horizon concret. Les challenges à paliers (V2) renforceront la progression à long terme.",
      },
      {
        type: 'metrics',
        metrics: [
          { value: '7', label: 'données extraites par scan' },
          { value: '1', label: 'classement mensuel' },
          { value: '1', label: 'fiche store conçue' },
          { value: 'V2', label: 'challenges à paliers prévus' },
        ],
      },
    ],
    outcomes: [
      'Application complète livrée — scan + classement + historique',
      'Fiche store conçue (App Store / Play Store)',
      'Système de gamification intégré au parcours utilitaire',
      'V2 prévue avec challenges à paliers',
    ],
    learnings:
      "La gamification peut s'appliquer à des contextes très utilitaires. La difficulté est de ne pas forcer : la mécanique doit sembler naturelle, pas ajoutée. Ce projet a renforcé ma conviction que l'engagement se construit sur des habitudes existantes.",
    companies: [
      { name: 'Quadient', logo: '/logos/quadient.svg' },
      { name: 'One More Thing Studio', logo: '/logos/one-more-thing.svg' },
    ],
    tools: [{ label: 'Figma', logo: '/tools/figma.svg' }],
  },*/

  'memoire-master': {
    context:
      "Mémoire de recherche rédigé dans le cadre du Mastère UX Design & Stratégie Digitale — mention Major ex-aequo. Problématique : « Comment les pratiques de design — gamification, personnalisation, IA — influencent-elles l'engagement et la conversion des utilisateurs sur les interfaces numériques, tout en répondant à leurs besoins ? »",
    role: 'Auteure & Chercheuse',
    duration: '2024 — 2025',
    team: 'Travail individuel — jury académique',
    challenge:
      "Explorer la frontière entre engagement authentique et manipulation — comprendre ce qui pousse réellement les utilisateurs à rester, revenir et s'investir dans un produit numérique.",
    process: [
      {
        type: 'highlight',
        title: 'Le piège du "glaçage gamifié"',
        content:
          "Le premier réflexe face à la gamification : intégrer des mécaniques de jeu en surface. Mais la gamification ne résout pas les problèmes de l'entreprise, la mauvaise qualité du produit, ni le manque d'adéquation au marché.",
        color: '#2A1A0A',
      },
      {
        type: 'quote',
        content:
          "« Nous pouvons facilement étaler un «glaçage» gamifié sur votre produit ou service, mais si le «gâteau» sous-jacent n'est pas délicieux, la plupart des utilisateurs n'y reviendront pas. »",
        author: 'Zichermann — cité dans le mémoire',
      },
      {
        type: 'two-col',
        title: 'Concepts et théories explorés',
        left: 'Dark patterns, modèle Hook (Nir Eyal), Self-Determination Theory, Flow (Csikszentmihalyi), Fogg Behavior Model, Octalysis (Yu-kai Chou), framework MDA.',
        right:
          "Facteurs d'influence de l'engagement (Hodent, 2017) : perception, mémoire, attention, motivation, raison d'être, émotion, utilisabilité, engageabilité, fun.",
      },
      {
        type: 'quote',
        content:
          "« L'engagement utilisateur est composé d'une série de métriques interconnectées : Récence, Fréquence, Durée, Viralité, Évaluations — influencé par la perception, la motivation, l'émotion et le fun. »",
        author: 'Synthèse du mémoire',
      },
      {
        type: 'image-placeholder',
        alt: 'Mémoire — couverture et introduction',
        label: 'Mémoire — Couverture & Introduction',
      },
      {
        type: 'image-placeholder',
        alt: "Mémoire — framework d'analyse de l'engagement",
        label: "Framework d'analyse — Engagement",
      },
      {
        type: 'image-placeholder',
        alt: 'Mémoire — études de cas et conclusions',
        label: 'Études de cas & Conclusions',
      },
      {
        type: 'metrics',
        metrics: [
          { value: '80+', label: 'pages de recherche' },
          { value: 'Major', label: 'mention ex-aequo' },
          { value: '5+', label: 'théories analysées' },
          { value: '1', label: 'framework original produit' },
        ],
      },
    ],
    outcomes: [
      'Mémoire 80+ pages — mention Major ex-aequo',
      "Compréhension approfondie des dark patterns et de l'éthique design",
      "Framework personnel d'analyse de l'engagement en 5 dimensions",
      'Base théorique appliquée directement sur tous les projets gamification',
    ],
    learnings:
      "Formaliser ce que je faisais intuitivement a changé ma pratique. La rigueur académique appliquée à l'UX n'est pas une contrainte — c'est un outil pour justifier et améliorer ses décisions. Ce mémoire continue d'alimenter chacun de mes projets de gamification.",
    tools: [
      { label: 'Figma', logo: '/tools/figma.svg' },
      { label: 'Notion', logo: '/tools/notion.svg' },
    ],
  },
}
