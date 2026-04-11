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
          Aerial cinematography<br />
          studio based in Croatia.
        </h1>
      </header>

      <div className={styles.body}>
        <p className={styles.bio}>
          Founded by Fran Kaic, Ether Aerial specializes in cinematic drone footage
          for automotive brands, film productions, music videos, and commercial campaigns.
          From high-speed FPV chases to stabilized sweeps — the right platform for every shot.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>200+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>5+</span>
            <span className={styles.statLabel}>Platforms</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>HR</span>
            <span className={styles.statLabel}>Croatia</span>
          </div>
        </div>
      </div>

      <div className={styles.quoteBlock}>
        <blockquote className={styles.quote}>
          &ldquo;We don&apos;t just film from the air —
          we find the angle that makes people stop.&rdquo;
        </blockquote>
        <div className={styles.signature}>
          <Image
            src="/images/logo-icon-white.png"
            alt="Ether Aerial"
            width={44}
            height={28}
            className={styles.sigIcon}
          />
          <span className={styles.sigText}>Ether Aerial</span>
        </div>
      </div>
    </main>
  )
}
