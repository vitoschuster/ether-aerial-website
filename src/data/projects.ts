export type Category = 'automotive' | 'film' | 'music' | 'commercial' | 'showreel'

export interface Project {
  slug: string
  title: string
  client: string
  /** Short label shown in the reel indicator. Defaults to client if omitted. */
  reelLabel?: string
  year: number
  category: Category
  poster: string
  /** Cloudflare R2 URL for autoplay background loop */
  videoSrc?: string
  /** WebM version of videoSrc — served first for browsers that support it */
  videoSrcWebm?: string
  /** Vimeo video ID — click-to-play opens Vimeo overlay (priority over youtubeId) */
  vimeoId?: string
  /** YouTube video ID for music videos on label channels */
  youtubeId?: string
  description?: string
  label?: string
  featured?: boolean
  reelOrder?: number
  credits?: string
  /** Scale factor to crop burned-in letterbox bars (e.g. 1.33 for 2.35:1 in 16:9) */
  videoScale?: number
  /** Mobile-specific scale override — falls back to videoScale if omitted */
  videoScaleMobile?: number
}

// Public R2 bucket — no secret, safe to hardcode. Override via env var if bucket changes.
const R2 = 'https://pub-c8ba59ccdd244b3cb6828e1df4ab7931.r2.dev'
const r2Base = (process.env.NEXT_PUBLIC_R2_BASE_URL ?? R2).replace(/\/+$/, '')

function r2(filename: string): string {
  return `${r2Base}/${encodeURIComponent(filename)}`
}

export const projects: Project[] = [
  {
    slug: 'bmw-m3-cs-touring',
    title: 'BMW M3 CS Touring',
    client: 'BMW',
    reelLabel: 'BMW',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-9.jpg',
    videoSrc: r2('1-m3-cs-touring.mp4'),
    videoSrcWebm: r2('1-m3-cs-touring.webm'),
    vimeoId: '1179255325',
    description: 'High-speed aerial pursuit of the BMW M3 CS Touring through mountain roads.',
    featured: true,
    reelOrder: 1,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'porsche-911',
    title: 'The New 911',
    client: 'Porsche',
    reelLabel: 'Porsche',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-8.jpg',
    videoSrc: r2('2-the-new-911.mp4'),
    videoSrcWebm: r2('2-the-new-911.webm'),
    vimeoId: '1179258546',
    description: 'The one and always. Cinematic drone footage of the iconic Porsche 911.',
    featured: true,
    reelOrder: 2,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'mcdonalds-ad',
    title: 'McDonald\'s Commercial',
    client: 'McDonald\'s',
    reelLabel: 'McDonald\'s',
    year: 2024,
    category: 'commercial',
    poster: '/images/projects/mcdonalds-thumbnail.jpg',
    videoSrc: r2('3-mcdelivery.mp4'),
    videoSrcWebm: r2('3-mcdelivery.webm'),
    vimeoId: '1179259721',
    description: 'Commercial aerial cinematography for McDonald\'s.',
    featured: true,
    reelOrder: 3,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'opel-mokka-gse-rally',
    title: 'Mokka GSE Rally',
    client: 'Opel',
    reelLabel: 'Opel',
    year: 2024,
    category: 'automotive',
    poster: '/images/projects/mokka-poster.jpg',
    videoSrc: r2('4-mokka-gse-opel.mp4'),
    videoSrcWebm: r2('4-mokka-gse-opel.webm'),
    vimeoId: '1179260759',
    description: 'Adrenaline-fueled rally footage of the Opel Mokka GSE on gravel stages.',
    featured: true,
    reelOrder: 4,
    credits: 'FPV Pilot & Cinematographer',
    videoScale: 1.3,
    videoScaleMobile: 1.4,
  },
  {
    slug: 'mercedes-amg',
    title: 'Mercedes-AMG',
    client: 'Mercedes-AMG',
    reelLabel: 'Mercedes-AMG',
    year: 2026,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-32.jpg',
    videoSrc: r2('5-mercedes-amg.mp4'),
    videoSrcWebm: r2('5-mercedes-amg.webm'),
    vimeoId: '1185460079',
    description: 'Aerial cinematography for Mercedes-AMG.',
    featured: true,
    reelOrder: 5,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'juzni-vetar-na-granici',
    title: 'Na Granici',
    client: 'Južni Vetar',
    reelLabel: 'Južni Vetar',
    year: 2023,
    category: 'film',
    poster: '/images/projects/maxresdefault-10.jpg',
    videoSrc: r2('6-juzni-vetar.mp4'),
    videoSrcWebm: r2('6-juzni-vetar.webm'),
    vimeoId: '1179258341',
    description: 'Aerial cinematography for the major Balkan TV series Južni Vetar.',
    featured: true,
    reelOrder: 6,
    credits: 'Aerial Cinematography',
    videoScale: 1.5,
    videoScaleMobile: 1.4,
  },
  {
    slug: 'bmw-m2-coupe',
    title: 'The New M2 Coupé',
    client: 'BMW',
    reelLabel: 'BMW',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-7.jpg',
    videoSrc: r2('7-new-m2.mp4'),
    videoSrcWebm: r2('7-new-m2.webm'),
    vimeoId: '1179253422',
    description: 'Dynamic aerial cinematography showcasing the BMW M2 Coupé.',
    featured: true,
    reelOrder: 7,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'pokemon-go',
    title: 'Pokémon GO',
    client: 'Niantic',
    reelLabel: 'Pokémon GO',
    year: 2023,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-6.jpg',
    videoSrc: r2('8-pokemon-go.mp4'),
    videoSrcWebm: r2('8-pokemon-go.webm'),
    vimeoId: '1179258698',
    description: 'Large-scale event aerial coverage for the Pokémon GO Fest Croatia.',
    featured: true,
    reelOrder: 8,
    videoScale: 1.26,
    videoScaleMobile: 1.4,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'showreel-2024',
    title: 'Showreel 2024',
    client: 'Ether Aerial',
    reelLabel: 'Showreel',
    year: 2024,
    category: 'showreel',
    poster: '/images/projects/maxresdefault-17.jpg',
    vimeoId: '1179261490',
    description: 'A curated collection of the best aerial cinematography from 2024.',
  },
  {
    slug: 'jala-brat',
    title: 'Rosalia',
    client: 'Jala Brat x Buba Corelli',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault.jpg',
    youtubeId: '',
    description: 'Aerial cinematography for the Rosalia music video.',
    label: 'Yellowcake / Imperia',
  },
  {
    slug: 'voyage',
    title: 'LalaLa',
    client: 'Voyage',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-2.jpg',
    youtubeId: '',
    description: 'Aerial cinematography for Voyage.',
    label: 'IDJ Videos',
  },
  {
    slug: 'connect',
    title: 'Roze',
    client: 'Jala Brat x Devito x Buba Corelli',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-3.jpg',
    youtubeId: '',
    description: 'Aerial cinematography for the Roze music video.',
    label: 'Yellowcake / Imperia',
  },
  {
    slug: 'hanna',
    title: 'Novo Vrijeme, Novi Sky',
    client: 'Sky Cola',
    year: 2023,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-4.jpg',
    youtubeId: '',
    description: 'Commercial aerial cinematography for Sky Cola.',
    label: 'Brand Campaign',
  },
  {
    slug: 'rasta-x-link',
    title: 'I Dalje Sam Isti',
    client: 'Rasta x Link',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-16.jpg',
    youtubeId: '',
    description: 'Aerial cinematography for Rasta x Link.',
    label: 'Balkaton',
  },
  {
    slug: 'bmw-2',
    title: 'BMW Performance Film',
    client: 'BMW',
    year: 2022,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-7.jpg',
    description: 'Aerial performance film for BMW.',
  },
  {
    slug: 'porsche-2',
    title: 'Porsche Performance Film',
    client: 'Porsche',
    year: 2022,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-8.jpg',
    vimeoId: '1179254949',
    description: 'Aerial performance film for Porsche.',
  },
  {
    slug: 'project-15',
    title: 'Geto Djevojka',
    client: 'Connect',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-14.jpg',
    label: 'IDJ Videos',
  },
  {
    slug: 'project-16',
    title: 'Karamela',
    client: 'Jala Brat x Buba Corelli x Devito',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-15.jpg',
    youtubeId: '',
    label: 'Imperia / Yellowcake',
  },
  {
    slug: 'project-17',
    title: 'Peljesac Bridge',
    client: 'Infrastructure',
    year: 2022,
    category: 'film',
    poster: '/images/projects/maxresdefault-24.jpg',
  },
  {
    slug: 'project-18',
    title: 'Wheelchair Court',
    client: 'Documentary',
    year: 2022,
    category: 'film',
    poster: '/images/projects/maxresdefault-18.jpg',
  },
  {
    slug: 'project-19',
    title: 'Goodfellas',
    client: 'Jala Brat x Kalash Kriminel',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-19.jpg',
    label: 'Imperia / Yellowcake',
  },
  {
    slug: 'project-20',
    title: 'Warsaw',
    client: 'Jala Brat x Buba Corelli',
    year: 2022,
    category: 'music',
    poster: '/images/projects/maxresdefault-20.jpg',
    youtubeId: '',
    label: 'Yellowcake / Imperia',
  },
  {
    slug: 'fnc-arena-pula',
    title: 'FNC at Arena Pula',
    client: 'FNC',
    year: 2024,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-31.jpg',
    description: 'Aerial coverage of the FNC fight night held at the Roman Arena in Pula.',
  },
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.reelOrder ?? 99) - (b.reelOrder ?? 99))

export const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'film', label: 'Film & TV' },
  { value: 'music', label: 'Music' },
  { value: 'commercial', label: 'Commercial' },
]
