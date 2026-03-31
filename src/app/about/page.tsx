import type { Metadata } from 'next'
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
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Drone platforms</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>HR</span>
            <span className={styles.statLabel}>Based in Croatia</span>
          </div>
        </div>
      </div>

      {/* Editorial statement */}
      <div className={styles.statement}>
        <blockquote className={styles.quote}>
          &ldquo;We don&apos;t just film from the air.
          <br />
          We find perspectives that make people stop.&rdquo;
        </blockquote>
        <p className={styles.quoteAttr}>— Fran Kaic, Founder &amp; Aerial Cinematographer</p>
      </div>

      {/* Approach pillars */}
      <div className={styles.pillars}>
        <div className={styles.pillar}>
          <span className={styles.pillarNum}>01</span>
          <h3 className={styles.pillarTitle}>Platform-first thinking</h3>
          <p className={styles.pillarText}>
            Every shot starts with the right machine. We match platform to vision —
            not the other way around.
          </p>
        </div>
        <div className={styles.pillar}>
          <span className={styles.pillarNum}>02</span>
          <h3 className={styles.pillarTitle}>Cinematic precision</h3>
          <p className={styles.pillarText}>
            Raw altitude means nothing. We&apos;re obsessed with motion, light,
            and the frame that moves people.
          </p>
        </div>
        <div className={styles.pillar}>
          <span className={styles.pillarNum}>03</span>
          <h3 className={styles.pillarTitle}>On-set reliability</h3>
          <p className={styles.pillarText}>
            Productions trust us because we deliver — on schedule, in any weather,
            with every permit in order.
          </p>
        </div>
      </div>
    </main>
  )
}
