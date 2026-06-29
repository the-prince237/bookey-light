export const bookData = {
  title: "Le Produit Intérieur Brut Eto'o",
  subtitle: "Autopsie d'une Puissance Soft-Power",
  author: 'Guy Bertrand MESSINA',
  authorRole: "Économiste · Analyste de l'Innovation Africaine",
  price: 1500,
  currency: 'XAF',
  pages: '400+',
  chapters: 10,
  year: 2026,
  languages: ['FR', 'EN'],
  formats: ['Broché A5', 'Numérique'],
  thesis:
    "Le Cameroun dispose en Samuel Eto'o d'un actif symbolique estimé à 400–700 millions de dollars par an de valeur non capturée — faute d'instruments institutionnels adaptés.",
  stats: [
    { num: '700M$', label: 'Valeur annuelle\nnon capturée' },
    { num: '400+', label: 'Pages · 10\nchapitres' },
    { num: '2040', label: "Vision pour\nl'Afrique" },
  ],
  chapters_list: [
    {
      num: 'I',
      title: "L'Enfant de Nkol Ngok",
      sub: 'Des origines à la théorie du capital humain africain',
    },
    {
      num: 'II',
      title: 'Le Ballon Comme Passeport',
      sub: 'Sport, diplomatie et géopolitique du ballon rond',
    },
    {
      num: 'III',
      title: "Le PIB-Eto'o (Méthodologie)",
      sub: "Méthode de valorisation d'un actif symbolique national",
    },
    {
      num: 'IV',
      title: "Le Soft Power à l'Africaine",
      sub: 'Adapter le concept occidental au contexte africain',
    },
    {
      num: 'V',
      title: "La Marque Eto'o",
      sub: "Anatomie d'un capital immatériel de classe mondiale",
    },
    {
      num: 'VI',
      title: 'Cameroun Inc.',
      sub: "L'État-Nation comme entreprise — audit stratégique",
    },
    {
      num: 'VII',
      title: "L'Eto'o Investment Gateway",
      sub: "Architecture d'un instrument de diplomatie économique",
    },
    {
      num: 'VIII',
      title: 'Les PPP de la Fierté',
      sub: 'Financer académies, cliniques et stades avec du football',
    },
    {
      num: 'IX',
      title: 'Les Ennemis du Soft Power',
      sub: 'Corruption, jalousie, médiocrité : les virus institutionnels',
    },
    {
      num: 'X',
      title: "La Génération Eto'o 2040",
      sub: "Vision — nouveau paradigme d'excellence africaine",
    },
  ],
  quotes: [
    "Un pays qui produit Eto'o mais ne sait pas utiliser Eto'o, c'est un pays assis sur un gisement pétrolier sans jamais avoir inventé la foreuse.",
    "Les économistes mesurent le capital humain en années d'éducation. L'Afrique, elle, le mesure en kilomètres parcourus pieds nus derrière un rêve.",
    "Le soft power n'est pas une question de gentillesse internationale. C'est une question de profitabilité stratégique à long terme.",
    "La corruption ne vole pas seulement l'argent public. Elle vole l'avenir. Elle vole la possibilité même de transformer Eto'o en institution nationale durable.",
  ],
  angles: [
    {
      tag: 'Économie & Finance',
      title: 'Comment valoriser un actif immatériel national ?',
      body: "Le cas Eto'o comme étude de cas universelle pour les décideurs et investisseurs.",
    },
    {
      tag: 'Géopolitique',
      title: 'Le football peut-il remplacer les ambassades ?',
      body: 'La diplomatie sportive africaine comme levier de puissance douce internationale.',
    },
    {
      tag: 'Sport & Société',
      title: 'Au-delà des buts',
      body: "Ce qu'Eto'o a réellement rapporté au Cameroun — et ce qu'il aurait pu.",
    },
    {
      tag: 'Entrepreneuriat',
      title: "L'Eto'o Investment Gateway",
      body: 'Un modèle de PPP innovant pour la diaspora africaine et les investisseurs continentaux.',
    },
    {
      tag: 'Culture & Identité',
      title: 'Le syndrome du crabe',
      body: "Pourquoi l'Afrique détruit parfois ses propres héros, et comment briser ce cycle.",
    },
    {
      tag: 'Vision Continentale',
      title: "La Génération Eto'o 2040",
      body: "Construire un système d'excellence africaine pour les cinquante prochaines années.",
    },
  ],
  contact: {
    email: 'info@falamoi.com',
    press: 'ambatinda@gmail.com',
    phone: '+237 672 55 24 24',
    whatsapp: '237672552424',
  },
}

export type Track = {
  slug: string
  trackNumber: number
  title: string
  artist: string
  duration: string
  genre: string
  bpm: number
  description: string
  longDescription: string
  tags: string[]
  price: number
  currency: string
  coverColor: string
  accentColor: string
  previewUrl: string | null
  lyrics_excerpt: string
  mood: string
  instruments: string[]
}

export const tracks: Track[] = [
  {
    slug: 'pib-etoo-anthem',
    trackNumber: 1,
    title: "PIB Eto'o Anthem",
    artist: 'Guy Bertrand MESSINA',
    duration: '3:47',
    genre: 'Afrobeat · Inspirational',
    bpm: 98,
    description:
      "Le titre d'ouverture. Un hymne qui pose la question centrale : quelle est la valeur réelle d'un génie africain pour son pays ?",
    longDescription:
      "Composé comme la bande-son du livre lui-même, PIB Eto'o Anthem fusionne les rythmes afrobeat du Cameroun avec des arrangements orchestraux modernes.",
    tags: ['Afrobeat', 'Orchestral', 'Inspirational', 'Anthem'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#0B3D2E',
    accentColor: '#C9953A',
    previewUrl: null,
    lyrics_excerpt:
      "Un pays debout sur ses racines / Qui regarde ses étoiles s'envoler / Sans jamais tendre la main...",
    mood: 'Épique · Nostalgique',
    instruments: ['Guitare', 'Percussions Beti', 'Cordes', 'Piano'],
  },
  {
    slug: 'nkol-ngok',
    trackNumber: 2,
    title: 'Nkol Ngok',
    artist: 'Guy Bertrand MESSINA',
    duration: '4:12',
    genre: 'Makossa · Soul',
    bpm: 84,
    description:
      'Une plongée dans les origines. La route poussiéreuse de Nkol Ngok qui a mené aux plus grandes scènes du monde.',
    longDescription:
      "Inspiré du chapitre I du livre, Nkol Ngok évoque l'enfance, les origines humbles et la théorie du capital humain africain.",
    tags: ['Makossa', 'Soul', 'Nostalgique', 'Origines'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#1a3a2a',
    accentColor: '#E8C06A',
    previewUrl: null,
    lyrics_excerpt:
      'Du quartier aux lumières du stade / Chaque pas sur la terre rouge / Était déjà une danse pour demain...',
    mood: 'Mélancolique · Chaud',
    instruments: ['Guitare Bass', 'Balafon', 'Voix', 'Saxophone'],
  },
  {
    slug: 'soft-power-groove',
    trackNumber: 3,
    title: 'Soft Power Groove',
    artist: 'Guy Bertrand MESSINA',
    duration: '3:58',
    genre: 'Afrofusion · Jazz',
    bpm: 112,
    description:
      'Le concept de soft power réinterprété à travers le prisme africain. Groove intense, intellect en feu.',
    longDescription:
      'Ce titre traduit musicalement la thèse économique du livre : comment un actif symbolique peut devenir un levier de puissance internationale.',
    tags: ['Jazz', 'Afrofusion', 'Sophistiqué', 'Groovy'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#2a1a0B',
    accentColor: '#C9953A',
    previewUrl: null,
    lyrics_excerpt:
      "Le soft power c'est pas être gentil / C'est être stratégique pour l'éternité / Africa rising, Africa shining...",
    mood: 'Sophistiqué · Énergique',
    instruments: ['Trompette', 'Batterie', 'Basse', 'Piano Jazz'],
  },
  {
    slug: 'gateway',
    trackNumber: 4,
    title: 'Gateway',
    artist: 'Guy Bertrand MESSINA',
    duration: '5:03',
    genre: 'Electronic · Ambient',
    bpm: 90,
    description:
      "L'Eto'o Investment Gateway en musique. Un pont entre deux mondes, entre deux économies.",
    longDescription:
      "Gateway est la piste la plus ambitieuse de l'album. Elle représente musicalement le concept phare du livre : l'Eto'o Investment Gateway.",
    tags: ['Electronic', 'Ambient', 'Cinématique', 'Futuriste'],
    price: 2000,
    currency: 'XAF',
    coverColor: '#0a1520',
    accentColor: '#4a9eff',
    previewUrl: null,
    lyrics_excerpt:
      "Une porte s'ouvre entre les continents / Des milliards traversent en silence...",
    mood: 'Cinématique · Futuriste',
    instruments: ['Synthétiseurs', 'Kora électronique', 'Percussions programmées'],
  },
  {
    slug: 'generation-2040',
    trackNumber: 5,
    title: 'Génération 2040',
    artist: 'Guy Bertrand MESSINA',
    duration: '4:31',
    genre: 'Afropop · Uplifting',
    bpm: 120,
    description:
      'Le titre de clôture. Un appel à la jeunesse africaine. Urgent, optimiste, implacable.',
    longDescription:
      "Génération 2040 est le titre manifeste. S'adressant directement à la jeunesse africaine, ce titre afropop énergique synthétise la vision du livre.",
    tags: ['Afropop', 'Uplifting', 'Jeunesse', 'Futur'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#1a0B2E',
    accentColor: '#FCD116',
    previewUrl: null,
    lyrics_excerpt:
      "On est la génération Eto'o / On prend ce qu'on nous doit / 2040 c'est nous...",
    mood: 'Euphorique · Motivant',
    instruments: ['Guitare électrique', 'Percussions', 'Voix multiples', 'Cuivres'],
  },
  {
    slug: 'syndrome-du-crabe',
    trackNumber: 6,
    title: 'Syndrome du Crabe',
    artist: 'Guy Bertrand MESSINA',
    duration: '3:22',
    genre: 'Spoken Word · Afrobeat',
    bpm: 76,
    description:
      "Spoken word intense sur fond d'afrobeat. Pourquoi détruit-on ses propres héros ?",
    longDescription:
      "La piste la plus engagée de l'album. Sur un groove afrobeat hypnotique, une voix déconstruite analyse le syndrome du crabe.",
    tags: ['Spoken Word', 'Afrobeat', 'Engagé', 'Critique'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#200a0a',
    accentColor: '#CE1126',
    previewUrl: null,
    lyrics_excerpt:
      'On tire vers le bas celui qui monte / Comme si sa réussite nous condamnait...',
    mood: 'Intense · Provocateur',
    instruments: ['Voix', 'Djembé', 'Basse', 'Guitare Rhythm'],
  },
]

export const albumData = {
  title: "PIB Eto'o — L'Album",
  subtitle: 'La bande-son du livre',
  description:
    "6 titres inédits qui traduisent en musique l'analyse économique du livre.",
  totalTracks: 6,
  totalDuration: '24:53',
  year: 2026,
  albumPrice: 7500,
  currency: 'XAF',
}

// ─── Digital Products ─────────────────────────────────────────────────────────
export type ProductType =
  | 'ebook'
  | 'notion'
  | 'workbook'
  | 'sheets'
  | 'kit'
  | 'pitch'
  | 'guide'
  | 'cours'
  | 'newsletter'

export interface DigitalProduct {
  slug: string
  num: number
  type: ProductType
  typeLabel: string
  typeIcon: string
  typeColor: string
  titlePre: string
  titleEm: string
  titlePost: string
  description: string
  features: string[]
  price: number
  priceEur: number
  currency: string
  format: string
  formatSub: string
  isSubscription: boolean
  available: boolean
  coverBg: string
  accentColor: string
}

export const digitalProducts: DigitalProduct[] = [
  {
    slug: 'manuel-soft-power-africain',
    num: 1,
    type: 'ebook',
    typeLabel: 'EBOOK PDF',
    typeIcon: '📘',
    typeColor: '#7EC8E3',
    titlePre: 'Le Manuel du',
    titleEm: 'Soft Power Africain',
    titlePost: '',
    description:
      "Guide pratique de 60 pages pour comprendre, mesurer et activer le soft power d'un pays ou d'une organisation africaine. Déclinaison opérationnelle du livre.",
    features: [
      'Définitions + cadre théorique vulgarisé',
      '5 études de cas africaines annotées',
      "Checklist d'activation en 30 jours",
      "Fiches outils prêtes à l'emploi",
      'Exercices pratiques par chapitre',
    ],
    price: 17500,
    priceEur: 27,
    currency: 'XAF',
    format: 'PDF',
    formatSub: '60 PAGES',
    isSubscription: false,
    available: false,
    coverBg: '#0a1a20',
    accentColor: '#7EC8E3',
  },
  {
    slug: 'soft-power-dashboard-notion',
    num: 2,
    type: 'notion',
    typeLabel: 'NOTION TEMPLATE',
    typeIcon: '🗂️',
    typeColor: '#A78BFA',
    titlePre: 'Soft Power',
    titleEm: 'Dashboard',
    titlePost: '— Tracker National',
    description:
      "Tableau de bord Notion clé-en-main pour mesurer l'impact symbolique d'un talent ou d'une institution. Pensé pour ministères, fédérations et agences.",
    features: [
      'KPIs de visibilité internationale',
      'Tracker de mentions médias',
      'Base de données partenaires investisseurs',
      'Roadmap stratégique 3 ans',
      'Tableau comparatif benchmarking Afrique',
    ],
    price: 12500,
    priceEur: 19,
    currency: 'XAF',
    format: 'NOTION',
    formatSub: 'DUPLIQUÉ EN 1 CLIC',
    isSubscription: false,
    available: false,
    coverBg: '#120a20',
    accentColor: '#A78BFA',
  },
  {
    slug: 'workbook-marque-nation',
    num: 3,
    type: 'workbook',
    typeLabel: 'WORKBOOK PDF',
    typeIcon: '📋',
    typeColor: '#86EFAC',
    titlePre: '',
    titleEm: '30 Jours',
    titlePost: 'pour Construire la Marque de votre Nation',
    description:
      "Workbook interactif de 45 pages — un exercice par jour — pour bâtir la stratégie de marque d'un pays, d'une région ou d'une institution africaine.",
    features: [
      "Audit d'actifs symboliques existants",
      'Cartographie des parties prenantes',
      "Exercices d'idéation et positionnement",
      'Templates de communication stratégique',
      "Plan d'action final personnalisé",
    ],
    price: 24000,
    priceEur: 37,
    currency: 'XAF',
    format: 'PDF INTERACTIF',
    formatSub: 'REMPLISSABLE',
    isSubscription: false,
    available: false,
    coverBg: '#0a1a10',
    accentColor: '#86EFAC',
  },
  {
    slug: 'calculateur-pib-symbolique',
    num: 4,
    type: 'sheets',
    typeLabel: 'GOOGLE SHEETS',
    typeIcon: '📊',
    typeColor: '#34D399',
    titlePre: 'Calculateur du',
    titleEm: 'PIB Symbolique',
    titlePost: '',
    description:
      "Outil de calcul basé sur la méthodologie du livre — estimez la valeur économique non-captée d'un actif symbolique national selon 5 composantes clés.",
    features: [
      'Modèle de valorisation en 5 composantes',
      'Méthode des comparables intégrée',
      'Scénarios optimiste / réaliste / pessimiste',
      'Graphiques automatiques exportables',
      "Guide d'utilisation inclus (PDF)",
    ],
    price: 10000,
    priceEur: 15,
    currency: 'XAF',
    format: 'GOOGLE SHEETS',
    formatSub: 'COPIE PARTAGÉE',
    isSubscription: false,
    available: false,
    coverBg: '#061410',
    accentColor: '#34D399',
  },
  {
    slug: 'kit-ppp-afrique',
    num: 5,
    type: 'kit',
    typeLabel: 'KIT PROFESSIONNEL',
    typeIcon: '📑',
    typeColor: '#FCA5A5',
    titlePre: 'Kit PPP Afrique —',
    titleEm: 'Templates Contractuels',
    titlePost: '',
    description:
      'Pack complet de modèles pour structurer des Partenariats Public-Privé dans le contexte africain — académies, cliniques sportives, infrastructures culturelles.',
    features: [
      "Modèle de Mémorandum d'Entente (MOU)",
      'Structure type de JV mixte public-privé',
      "Grille d'analyse risques/bénéfices",
      'Tableau de répartition des revenus',
      'Checklist due diligence investisseur',
    ],
    price: 32000,
    priceEur: 49,
    currency: 'XAF',
    format: 'PDF + WORD',
    formatSub: 'MODIFIABLE',
    isSubscription: false,
    available: false,
    coverBg: '#1a0a0a',
    accentColor: '#FCA5A5',
  },
  {
    slug: 'pitch-deck-investor-gateway',
    num: 6,
    type: 'pitch',
    typeLabel: 'PITCH DECK',
    typeIcon: '🎯',
    typeColor: '#86EFAC',
    titlePre: '',
    titleEm: 'Investor Gateway',
    titlePost: '— Modèle de Présentation',
    description:
      "Template de pitch deck de 20 slides pour présenter une opportunité d'investissement en Afrique à des partenaires internationaux. Design professionnel inclus.",
    features: [
      'Structure narrative validée par des experts',
      'Slides : vision, marché, modèle, équipe',
      'Infographies économiques pré-remplies',
      'Section "soft power signal" différenciante',
      'Version française + anglaise incluses',
    ],
    price: 23000,
    priceEur: 35,
    currency: 'XAF',
    format: 'POWERPOINT',
    formatSub: '+ CANVA LINK',
    isSubscription: false,
    available: false,
    coverBg: '#0a1a0a',
    accentColor: '#86EFAC',
  },
  {
    slug: 'brand-drain-vs-brand-gain',
    num: 7,
    type: 'guide',
    typeLabel: 'MINI-GUIDE PDF',
    typeIcon: '📰',
    typeColor: '#7EC8E3',
    titlePre: '',
    titleEm: 'Brand Drain vs Brand Gain :',
    titlePost: '7 Stratégies Anti-Fuite',
    description:
      'Guide flash de 25 pages sur comment éviter la "fuite de marque" — le phénomène par lequel des pays africains perdent la valeur générée par leurs talents.',
    features: [
      '7 stratégies concrètes et actionnables',
      'Exemples réels : Jamaïque, Rwanda, Sénégal',
      'Matrice de capture de valeur symbolique',
      'Recommandations pour décideurs publics',
    ],
    price: 8000,
    priceEur: 12,
    currency: 'XAF',
    format: 'PDF LÉGER',
    formatSub: '25 PAGES',
    isSubscription: false,
    available: false,
    coverBg: '#0a1520',
    accentColor: '#7EC8E3',
  },
  {
    slug: 'cameroon-inc-notion',
    num: 8,
    type: 'notion',
    typeLabel: 'NOTION SYSTEM',
    typeIcon: '🗂️',
    typeColor: '#A78BFA',
    titlePre: '',
    titleEm: 'Cameroon Inc.',
    titlePost: '— OS Stratégique National',
    description:
      "Système Notion complet pour piloter une stratégie nationale d'attractivité — gestion des projets, des contacts investisseurs, du pipeline diplomatique.",
    features: [
      'CRM investisseurs + partenaires',
      'Pipeline de projets PPP',
      'Calendrier des événements stratégiques',
      'Bibliothèque de ressources économiques',
      'Tableau de bord exécutif mensuel',
    ],
    price: 19000,
    priceEur: 29,
    currency: 'XAF',
    format: 'NOTION AVANCÉ',
    formatSub: '5 BASES DE DONNÉES',
    isSubscription: false,
    available: false,
    coverBg: '#120a20',
    accentColor: '#A78BFA',
  },
  {
    slug: 'cours-diplomatie-economique',
    num: 9,
    type: 'cours',
    typeLabel: 'COURS EN LIGNE',
    typeIcon: '🎓',
    typeColor: '#FCD34D',
    titlePre: 'Diplomatie Économique',
    titleEm: 'Africaine',
    titlePost: '— De A à Z',
    description:
      'Programme en 6 modules (PDF + audio) qui transforme le contenu du livre en formation structurée pour professionnels, étudiants et décideurs africains.',
    features: [
      'Module 1 : Fondamentaux du soft power',
      'Module 2 : Valorisation du capital symbolique',
      'Module 3 : Structurer un PPP',
      'Module 4 : Stratégie de marque nationale',
      'Module 5 : Gérer les obstacles systémiques',
      "Module 6 : Vision 2040 — Plan d'action",
    ],
    price: 37500,
    priceEur: 57,
    currency: 'XAF',
    format: 'PDF + AUDIO MP3',
    formatSub: '6 MODULES',
    isSubscription: false,
    available: false,
    coverBg: '#1a1400',
    accentColor: '#FCD34D',
  },
  {
    slug: 'gdp-africa-intelligence',
    num: 10,
    type: 'newsletter',
    typeLabel: 'NEWSLETTER PREMIUM',
    typeIcon: '📧',
    typeColor: '#F9A8D4',
    titlePre: '',
    titleEm: 'GDP Africa Intelligence',
    titlePost: '— Lettre Mensuelle',
    description:
      "Newsletter mensuelle premium pour professionnels africains : analyses de soft power, opportunités d'investissement, profils de figures d'excellence à valoriser.",
    features: [
      '1 analyse économique exclusive / mois',
      "Profil d'un talent africain sous-exploité",
      'Opportunité PPP détaillée + contacts',
      'Accès à la communauté privée',
      'Archive PDF de tous les numéros',
    ],
    price: 6000,
    priceEur: 9,
    currency: 'XAF',
    format: 'SUBSTACK PRO',
    formatSub: 'ABONNEMENT MENSUEL',
    isSubscription: true,
    available: false,
    coverBg: '#1a0a14',
    accentColor: '#F9A8D4',
  },
]

export const boutiqueBundle = {
  price: 149000,
  regularTotal: digitalProducts.reduce((s, p) => s + p.price, 0),
  currency: 'XAF',
}
