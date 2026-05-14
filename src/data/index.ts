export const bookData = {
  title: "Le Produit Intérieur Brut Eto'o",
  subtitle: "Autopsie d'une Puissance Soft-Power",
  author: 'Guy Bertrand MESSINA',
  authorRole: "Économiste · Analyste de l'Innovation Africaine",
  price: 100,
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
      "Composé comme la bande-son du livre lui-même, PIB Eto'o Anthem fusionne les rythmes afrobeat du Cameroun avec des arrangements orchestraux modernes. Le titre capture l'essence de la thèse : la fierté nationale, l'ambition continentale, et la frustration face au potentiel inexploité.",
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
      "Inspiré du chapitre I du livre, Nkol Ngok évoque l'enfance, les origines humbles et la théorie du capital humain africain. Une fusion de makossa traditionnel et de soul contemporaine qui transporte l'auditeur dans le Cameroun profond des années 1980.",
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
      'Ce titre traduit musicalement la thèse économique du livre : comment un actif symbolique peut devenir un levier de puissance internationale. Jazz africain, cuivres expansifs et rythmes contemporains se mêlent pour créer une piste à la fois sophistiquée et dansante.',
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
      "Gateway est la piste la plus ambitieuse de l'album. Elle représente musicalement le concept phare du livre : l'Eto'o Investment Gateway, mécanisme hybride public-privé de diplomatie économique. Électronique ambient aux accents africains, avec des samples de discours économiques.",
    tags: ['Electronic', 'Ambient', 'Cinématique', 'Futuriste'],
    price: 2000,
    currency: 'XAF',
    coverColor: '#0a1520',
    accentColor: '#4a9eff',
    previewUrl: null,
    lyrics_excerpt:
      "Une porte s'ouvre entre les continents / Des milliards traversent en silence / Ce que l'Afrique construit pour demain...",
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
      "Génération 2040 est le titre manifeste. S'adressant directement à la jeunesse africaine, ce titre afropop énergique synthétise la vision du livre : construire un système d'excellence africaine pour les cinquante prochaines années. Featuring des voix de jeunes talents camerounais.",
    tags: ['Afropop', 'Uplifting', 'Jeunesse', 'Futur'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#1a0B2E',
    accentColor: '#FCD116',
    previewUrl: null,
    lyrics_excerpt:
      "On est la génération Eto'o / On prend ce qu'on nous doit / 2040 c'est nous, c'est maintenant, c'est l'Afrique...",
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
      "La piste la plus engagée de l'album. Sur un groove afrobeat hypnotique, une voix déconstruite analyse le 'syndrome du crabe' : ce phénomène culturel qui pousse parfois les sociétés à saboter leurs propres champions. Une accusation musicale, lucide et douloureuse.",
    tags: ['Spoken Word', 'Afrobeat', 'Engagé', 'Critique'],
    price: 1500,
    currency: 'XAF',
    coverColor: '#200a0a',
    accentColor: '#CE1126',
    previewUrl: null,
    lyrics_excerpt:
      'On tire vers le bas celui qui monte / Comme si sa réussite nous condamnait / Le crabe ne sait pas nager vers le large...',
    mood: 'Intense · Provocateur',
    instruments: ['Voix', 'Djembé', 'Basse', 'Guitare Rhythm'],
  },
]

export const albumData = {
  title: "PIB Eto'o — L'Album",
  subtitle: 'La bande-son du livre',
  description:
    "6 titres inédits qui traduisent en musique l'analyse économique du livre. De l'afrobeat au jazz en passant par l'électronique ambient — une expérience sonore au service d'une thèse.",
  totalTracks: 6,
  totalDuration: '24:53',
  year: 2026,
  albumPrice: 7500,
  currency: 'XAF',
}
