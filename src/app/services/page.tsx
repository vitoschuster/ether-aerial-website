import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/data/services'
import styles from './services.module.css'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Aerial cinematography services: Cinelifter FPV, DJI Inspire 3, Gimbal FPV, and Racing FPV platforms.',
}

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>What we fly</p>
        <h1 className={styles.heading}>Services</h1>
        <p className={styles.sub}>
          Four specialized platforms. One team. Every shot.
        </p>
      </header>

      <div className={styles.services}>
        {services.map((service, i) => (
          <div key={service.slug} className={styles.service}>
            <div className={styles.serviceImg}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className={styles.serviceContent}>
              <p className={styles.serviceNum}>{String(i + 1).padStart(2, '0')}</p>
              <h2 className={styles.serviceTitle}>{service.title}</h2>
              <p className={styles.serviceSubtitle}>{service.subtitle}</p>
              <p className={styles.serviceDesc}>{service.description}</p>
              <ul className={styles.specs}>
                {service.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaHeading}>Ready to fly?</h2>
        <p className={styles.ctaSub}>
          Tell us about your project and we&apos;ll recommend the right platform.
        </p>
        <Link href="/#contact" className={styles.ctaBtn}>
          Start a project
        </Link>
      </div>
    </main>
  )
}
