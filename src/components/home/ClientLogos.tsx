import styles from './ClientLogos.module.css'

// filter: 'invert' → brightness(0) invert(1) → renders as white silhouette (for dark logos)
// filter: 'color'  → original brand colors / already works on dark bg (white SVGs, color marks)
// size: 'lg' → larger height for circular / square logos that look small at default height
const LOGOS: { name: string; src?: string; filter?: 'invert' | 'color'; size?: 'lg' }[] = [
  { name: 'McDonald\'s',      src: '/images/logos/mcdonalds-logo.svg', filter: 'color' },
  { name: 'BMW',              src: '/images/logos/bmw.svg',            filter: 'color', size: 'lg' },
  { name: 'Mercedes',         src: '/images/logos/mercedes-logo.svg',  filter: 'invert' },
  { name: 'Porsche',          src: '/images/logos/porsche.svg',        filter: 'invert' },
  { name: 'Toyota',           src: '/images/logos/toyota.svg',         filter: 'color' },
  { name: 'Opel',             src: '/images/logos/opel.svg',           filter: 'invert' },
  { name: 'Rimac',            src: '/images/logos/rimac.svg',          filter: 'invert' },
  { name: 'Bentley',          src: '/images/logos/bentley.png',        filter: 'invert' },
  { name: 'Pokémon GO',       src: '/images/logos/pokemon-go.svg',     filter: 'color', size: 'lg' },
  { name: 'INA',              src: '/images/logos/ina.png',            filter: 'color' },
  { name: 'Končar',           src: '/images/logos/koncar.png',         filter: 'invert' },
  { name: 'IDJ Videos',       src: '/images/logos/idj-videos.webp',   filter: 'invert' },
  { name: 'FAT International', src: '/images/logos/fat-international.png', filter: 'invert' },
  { name: 'Joop!' },
  { name: 'Južni Vetar' },
  { name: 'Balkaton' },
  { name: 'Yellowcake' },
  { name: 'Imperia' },
]

function LogoItem({ name, src, filter, size }: { name: string; src?: string; filter?: 'invert' | 'color'; size?: 'lg' }) {
  return (
    <div className={styles.item} aria-label={name}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className={`${styles.logoImg} ${size === 'lg' ? styles.logoLg : ''} ${filter === 'color' ? styles.logoColor : styles.logoInvert}`}
        />
      ) : (
        <span className={styles.wordmark}>{name}</span>
      )}
    </div>
  )
}

function Track({ reverse, offset }: { reverse?: boolean; offset?: boolean }) {
  return (
    <div className={`${styles.track} ${reverse ? styles.trackReverse : ''} ${offset ? styles.trackOffset : ''}`}>
      {LOGOS.map((l) => <LogoItem key={l.name} {...l} />)}
      {LOGOS.map((l) => <LogoItem key={l.name + '-2'} {...l} />)}
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section className={styles.section} aria-label="Trusted by">
      <p className={styles.label}>Trusted by</p>

      {/* Row 1 — all viewports, scrolls left */}
      <div className={styles.viewport}>
        <Track />
      </div>

      {/* Row 2 — mobile only, scrolls right */}
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track reverse />
      </div>

      {/* Row 3 — mobile only, scrolls left (offset so it's not in sync with row 1) */}
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track offset />
      </div>
    </section>
  )
}
