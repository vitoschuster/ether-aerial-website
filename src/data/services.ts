export interface Service {
  slug: string
  title: string
  subtitle: string
  description: string
  specs: string[]
  image: string
}

export const services: Service[] = [
  {
    slug: '5inch-fpv-gopro',
    title: '5" FPV Drone with GoPro',
    subtitle: 'Agile. Fearless. Everywhere.',
    description:
      'A nimble 5-inch FPV racing drone with a top-mounted GoPro, purpose-built for high-energy, low-altitude cinematography. Ideal for close-proximity chase shots, tight indoor corridors, and fast-paced sequences where larger platforms simply cannot follow.',
    specs: [
      '5" racing frame',
      'GoPro HERO12 / HERO13',
      'Up to 180 km/h',
      'Ultra-low latency FPV link',
      'Indoor & tight-space specialist',
    ],
    image: '/images/drones/5inch fpv.webp',
  },
  {
    slug: 'cinelifter-fpv',
    title: 'Cinelifter FPV',
    subtitle: 'Raw speed. Cinema quality.',
    description:
      'Our custom-built Cinelifter FPV platform combines the agility of racing drones with the image quality of cinema cameras. Perfect for high-speed chase sequences, dynamic action shots, and impossible camera moves.',
    specs: [
      'Custom 7" cinelifter frame',
      'Modular payloads (Blackmagic, RED Komodo 6K, Freefly Ember S5K)',
      'Up to 160 km/h',
      'Indoor & outdoor capable',
    ],
    image: '/images/drones/siccario-fpv.png',
  },
  {
    slug: 'dji-inspire-3',
    title: 'DJI Inspire 3',
    subtitle: 'Cinema precision. Stabilized perfection.',
    description:
      'The DJI Inspire 3 with its interchangeable lens system and full-frame sensor delivers broadcast-quality aerial footage. Ideal for automotive shoots, commercial productions, and any project demanding the highest image quality.',
    specs: [
      'Full-frame Zenmuse X9-8K sensor',
      '8K CinemaDNG / Apple ProRes',
      'Up to 120 km/h',
      'Stabilized 3-axis gimbal',
      'Dual-operator mode',
    ],
    image: '/images/drones/dji-inspire-3.png',
  },
  {
    slug: 'gimbal-fpv',
    title: 'Gimbal FPV System',
    subtitle: 'Smooth. Fast. Versatile.',
    description:
      'A unique hybrid platform combining FPV agility with gimbal-stabilized smoothness. This setup delivers flowing, dramatic shots that traditional drones cannot achieve — proximity flying with cinema-grade stability.',
    specs: [
      'Custom 5" FPV frame',
      '2-axis gimbal stabilization',
      'DJI O3 digital transmission',
      '4K 60fps',
      'Proximity specialist',
    ],
    image: '/images/drones/beast-fpv.png',
  },
  {
    slug: 'dji-mavic-4-pro',
    title: 'DJI Mavic 4 Pro',
    subtitle: 'Professional. Portable. Precise.',
    description:
      "DJI's flagship prosumer drone, combining a Hasselblad-tuned triple-camera system with intelligent flight modes and exceptional portability. The go-to platform for cinematic aerials, travel shoots, and productions demanding fast deployment without compromising image quality.",
    specs: [
      'Triple-camera Hasselblad system (wide / mid / tele)',
      '6K / 4K HDR video',
      '48MP stills',
      '46-minute flight time',
      'Omnidirectional obstacle sensing',
    ],
    image: '/images/drones/DJI-Mavic-4-Pro.png',
  },
]
