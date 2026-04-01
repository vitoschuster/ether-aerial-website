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
  /** Cloudflare R2 URL — uncomment when uploaded. Uses /videos/ symlink for local dev. */
  videoSrc?: string
  /** YouTube video ID for music videos on label channels */
  youtubeId?: string
  description?: string
  label?: string
  featured?: boolean
  reelOrder?: number
  credits?: string
}

// Public R2 bucket — no secret, safe to hardcode. Override via env var if bucket changes.
const R2 = 'https://pub-c8ba59ccdd244b3cb6828e1df4ab7931.r2.dev'
const r2Base = (process.env.NEXT_PUBLIC_R2_BASE_URL ?? R2).replace(/\/+$/, '')

function r2(filename: string): string {
  return `${r2Base}/${encodeURIComponent(filename)}`
}

export const projects: Project[] = [
  {
    slug: 'showreel-2024',
    title: 'Showreel 2024',
    client: 'Ether Aerial',
    reelLabel: 'Showreel',
    year: 2024,
    category: 'showreel',
    poster: '/images/projects/maxresdefault-17.jpg',
    videoSrc: r2('57 - fran_showreel_v1 2.mp4'),
    description: 'A curated collection of the best aerial cinematography from 2024.',
    featured: true,
    reelOrder: 1,
  },
  {
    slug: 'bmw-m3-cs-touring',
    title: 'BMW M3 CS Touring',
    client: 'BMW',
    reelLabel: 'BMW',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-9.jpg',
    videoSrc: r2('51 - THE BMW M3 CS TOURING.mp4'),
    description: 'High-speed aerial pursuit of the BMW M3 CS Touring through mountain roads.',
    featured: true,
    reelOrder: 2,
    credits: 'Director of Photography',
  },
  {
    slug: 'porsche-911',
    title: 'The New 911',
    client: 'Porsche',
    reelLabel: 'Porsche',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-8.jpg',
    videoSrc: r2('56 - The new 911. The one and always..mp4'),
    description: 'The one and always. Cinematic drone footage of the iconic Porsche 911.',
    featured: true,
    reelOrder: 3,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'bmw-m2-coupe',
    title: 'The New M2 Coupé',
    client: 'BMW',
    reelLabel: 'BMW',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-7.jpg',
    videoSrc: r2('55 - THE NEW BMW M2 COUPÉ..mp4'),
    description: 'Dynamic aerial cinematography showcasing the BMW M2 Coupé.',
    featured: true,
    reelOrder: 4,
    credits: 'Director of Photography',
  },
  {
    slug: 'opel-mokka-gse-rally',
    title: 'Mokka GSE Rally',
    client: 'Opel',
    reelLabel: 'Opel',
    year: 2024,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-5.jpg',
    videoSrc: r2('MOKKA GSE RALLY – A RIDE TO REMEMBER_2160p.mp4'),
    description: 'Adrenaline-fueled rally footage of the Opel Mokka GSE on gravel stages.',
    featured: true,
    reelOrder: 5,
    credits: 'FPV Pilot & Cinematographer',
  },
  {
    slug: 'juzni-vetar-na-granici',
    title: 'Na Granici',
    client: 'Južni Vetar',
    reelLabel: 'Južni Vetar',
    year: 2023,
    category: 'film',
    poster: '/images/projects/maxresdefault-10.jpg',
    videoSrc: r2('49 - juznivetar_bw.mp4'),
    description: 'Aerial cinematography for the major Balkan TV series Južni Vetar.',
    featured: true,
    reelOrder: 6,
    credits: 'Aerial Director of Photography',
  },
  {
    slug: 'pokemon-go',
    title: 'Pokémon GO',
    client: 'Niantic',
    reelLabel: 'Pokémon GO',
    year: 2023,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-6.jpg',
    videoSrc: r2('ADVENTURES GO ROUND_1080p.mp4'),
    description: 'Large-scale event aerial coverage for the Pokémon GO Fest Croatia.',
    featured: true,
    reelOrder: 7,
    credits: 'Aerial Cinematography',
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
    title: 'Lajala',
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
    videoSrc: r2('52 - bmw_2.mp4'),
    description: 'Aerial performance film for BMW.',
  },
  {
    slug: 'porsche-2',
    title: 'Porsche Performance Film',
    client: 'Porsche',
    year: 2022,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-8.jpg',
    videoSrc: r2('53 - porsche.mp4'),
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
