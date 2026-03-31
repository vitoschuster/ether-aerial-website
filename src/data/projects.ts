export type Category = 'automotive' | 'film' | 'music' | 'commercial' | 'showreel'

export interface Project {
  slug: string
  title: string
  client: string
  year: number
  category: Category
  poster: string
  // Self-hosted video (Cloudflare R2) — leave empty until uploaded
  videoSrc?: string
  // YouTube video ID for music videos already on label channels
  youtubeId?: string
  description?: string
  label?: string
  // Show as one of the 7 homepage scroll panels
  featured?: boolean
  // Order in the homepage reel (1-7)
  reelOrder?: number
  credits?: string
}

export const projects: Project[] = [
  {
    slug: 'showreel-2024',
    title: 'Showreel 2024',
    client: 'Ether Aerial',
    year: 2024,
    category: 'showreel',
    poster: '/images/projects/maxresdefault.jpg',
    // videoSrc: 'https://r2.etheraerial.com/showreel-2024.mp4',
    description: 'A curated collection of the best aerial cinematography work from 2024.',
    featured: true,
    reelOrder: 1,
  },
  {
    slug: 'bmw-m3-cs-touring',
    title: 'BMW M3 CS Touring',
    client: 'BMW',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-2.jpg',
    // videoSrc: 'https://r2.etheraerial.com/bmw-m3-cs-touring.mp4',
    description: 'High-speed aerial pursuit of the BMW M3 CS Touring through mountain roads.',
    featured: true,
    reelOrder: 2,
    credits: 'Director of Photography',
  },
  {
    slug: 'porsche-911',
    title: 'The New 911',
    client: 'Porsche',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-3.jpg',
    // videoSrc: 'https://r2.etheraerial.com/porsche-911.mp4',
    description: 'The one and always. Cinematic drone footage of the iconic Porsche 911.',
    featured: true,
    reelOrder: 3,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'bmw-m2-coupe',
    title: 'The New M2 Coupé',
    client: 'BMW',
    year: 2023,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-4.jpg',
    // videoSrc: 'https://r2.etheraerial.com/bmw-m2-coupe.mp4',
    description: 'Dynamic aerial cinematography showcasing the BMW M2 Coupé.',
    featured: true,
    reelOrder: 4,
    credits: 'Director of Photography',
  },
  {
    slug: 'opel-mokka-gse-rally',
    title: 'Mokka GSE Rally',
    client: 'Opel',
    year: 2024,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-5.jpg',
    // videoSrc: 'https://r2.etheraerial.com/opel-mokka-gse-rally.mp4',
    description: 'Adrenaline-fueled rally footage of the Opel Mokka GSE on gravel stages.',
    featured: true,
    reelOrder: 5,
    credits: 'FPV Pilot & Cinematographer',
  },
  {
    slug: 'juzni-vetar-na-granici',
    title: 'Na Granici',
    client: 'Južni Vetar',
    year: 2023,
    category: 'film',
    poster: '/images/projects/maxresdefault-6.jpg',
    // videoSrc: 'https://r2.etheraerial.com/juzni-vetar-na-granici.mp4',
    description: 'Aerial cinematography for the major Balkan TV series Južni Vetar.',
    featured: true,
    reelOrder: 6,
    credits: 'Aerial Director of Photography',
  },
  {
    slug: 'pokemon-go',
    title: 'Pokémon GO',
    client: 'Niantic',
    year: 2023,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-7.jpg',
    // videoSrc: 'https://r2.etheraerial.com/pokemon-go.mp4',
    description: 'Large-scale event aerial coverage for the Pokémon GO Fest Croatia.',
    featured: true,
    reelOrder: 7,
    credits: 'Aerial Cinematography',
  },
  {
    slug: 'jala-brat',
    title: 'Jala Brat',
    client: 'Jala Brat',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-8.jpg',
    youtubeId: '',
    description: 'Music video aerial cinematography.',
    label: 'Yellowcake',
  },
  {
    slug: 'voyage',
    title: 'Voyage',
    client: 'Voyage',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-9.jpg',
    youtubeId: '',
    description: 'Aerial cinematography for Voyage music video.',
    label: 'Imperia',
  },
  {
    slug: 'connect',
    title: 'Connect',
    client: 'Connect',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-10.jpg',
    youtubeId: '',
    description: 'Music video aerial cinematography for Connect.',
    label: 'IDJ Videos',
  },
  {
    slug: 'hanna',
    title: 'Hanna',
    client: 'Hanna',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-11.jpg',
    youtubeId: '',
    description: 'Aerial cinematography for Hanna music video.',
    label: 'Balkaton',
  },
  {
    slug: 'rasta-x-link',
    title: 'Rasta x Link',
    client: 'Rasta x Link',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-12.jpg',
    youtubeId: '',
    description: 'Aerial cinematography collaboration.',
    label: 'IDJ Videos',
  },
  {
    slug: 'bmw-2',
    title: 'BMW',
    client: 'BMW',
    year: 2022,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-13.jpg',
    // videoSrc: 'https://r2.etheraerial.com/bmw-2.mp4',
    description: 'Aerial cinematography for BMW.',
  },
  {
    slug: 'porsche-2',
    title: 'Porsche',
    client: 'Porsche',
    year: 2022,
    category: 'automotive',
    poster: '/images/projects/maxresdefault-14.jpg',
    // videoSrc: 'https://r2.etheraerial.com/porsche-2.mp4',
    description: 'Cinematic aerial footage of Porsche.',
  },
  {
    slug: 'project-15',
    title: 'Commercial',
    client: 'Client',
    year: 2023,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-15.jpg',
  },
  {
    slug: 'project-16',
    title: 'Music Video',
    client: 'Artist',
    year: 2023,
    category: 'music',
    poster: '/images/projects/maxresdefault-16.jpg',
    youtubeId: '',
    label: 'IDJ Videos',
  },
  {
    slug: 'project-17',
    title: 'Aerial Reel',
    client: 'Client',
    year: 2022,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-17.jpg',
  },
  {
    slug: 'project-18',
    title: 'Film Production',
    client: 'Production',
    year: 2022,
    category: 'film',
    poster: '/images/projects/maxresdefault-18.jpg',
  },
  {
    slug: 'project-19',
    title: 'Event Coverage',
    client: 'Client',
    year: 2023,
    category: 'commercial',
    poster: '/images/projects/maxresdefault-19.jpg',
  },
  {
    slug: 'project-20',
    title: 'Music Video',
    client: 'Artist',
    year: 2022,
    category: 'music',
    poster: '/images/projects/maxresdefault-20.jpg',
    youtubeId: '',
    label: 'Balkaton',
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
