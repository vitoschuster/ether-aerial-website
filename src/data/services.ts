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
    slug: 'cinelifter-fpv',
    title: 'Cinelifter FPV',
    subtitle: 'Raw speed. Cinema quality.',
    description:
      'Our custom-built Cinelifter FPV platform combines the agility of racing drones with the image quality of cinema cameras. Perfect for high-speed chase sequences, dynamic action shots, and impossible camera moves.',
    specs: [
      'Custom 7" cinelifter frame',
      'GoPro HERO12 / DJI Action 4',
      'Up to 160 km/h',
      '4K 120fps slow motion',
      'Indoor & outdoor capable',
    ],
    image: '/images/drones/beast-fpv.png',
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
    image: '/images/drones/siccario-fpv.png',
  },
]
