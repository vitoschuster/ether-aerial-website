import type { Metadata } from 'next'
import Image from 'next/image'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ether Aerial is a drone cinematography studio founded by Fran Kaic, based in Croatia.',
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>About</p>
        <h1 className={styles.heading}>
          We make the&nbsp;impossible&nbsp;shot&nbsp;possible.
        </h1>
      </header>

      <div className={styles.body}>
        <div className={styles.textBlock}>
          <p>
            Ether Aerial is a drone cinematography studio based in Croatia. Founded by Fran Kaic,
            we specialize in cinematic aerial footage for automotive brands, film productions,
            music videos, and commercial campaigns.
          </p>
          <p>
            From high-speed FPV chases to stabilized cinematic sweeps, we pair
            the right platform to the right moment — always in pursuit of the frame that stops
            people cold.
          </p>
          <p>
            Our clients include BMW, Porsche, Opel, Južni Vetar, Pokémon GO, and some of
            the biggest names in Balkan music through labels Yellowcake, Imperia,
            IDJ Videos, and Balkaton.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>30+</span>
            <span className={styles.statLabel}>Projects completed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Drone platforms</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>HR</span>
            <span className={styles.statLabel}>Based in Croatia</span>
          </div>
        </div>
      </div>

      {/* Equipment strip */}
      <div className={styles.equipment}>
        <p className={styles.equipLabel}>Our platforms</p>
        <div className={styles.drones}>
          {[
            { src: '/images/drones/dji-inspire-3.png', name: 'DJI Inspire 3' },
            { src: '/images/drones/beast-fpv.png', name: 'Cinelifter FPV' },
            { src: '/images/drones/siccario-fpv.png', name: 'Gimbal FPV' },
            { src: '/images/drones/qav-pro-lifter.png', name: 'Racing FPV' },
          ].map((drone) => (
            <div key={drone.name} className={styles.drone}>
              <div className={styles.droneImg}>
                <Image
                  src={drone.src}
                  alt={drone.name}
                  fill
                  sizes="200px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className={styles.droneName}>{drone.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
