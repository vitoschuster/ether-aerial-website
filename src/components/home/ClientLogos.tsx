import styles from './ClientLogos.module.css'

// filter: 'invert' → brightness(0) invert(1) → pure white silhouette (for dark logos on transparent bg)
// filter: 'color'  → show original colors (for logos already white, light, or colored on transparent bg)
// size: 'lg' → larger height for circular / square logos that look small at default height
//
// Verified pixel composition per logo (transparent / usable-color):
//   toyota.svg    — white fill in SVG, shows correctly as-is (color)
//   bmw.svg       — full-color roundel (color)
//   mercedes.svg  — silver gradient (color)
//   bentley.png   — 70% transparent, light/white logo (color)
//   ina.png       — 67% transparent, red/orange (color)
//   koncar.png    — 79% transparent, colored (color)
//   idj-videos    — 81% transparent, colored (color)
//   opel.svg      — dark logo → invert → white
//   porsche.svg   — dark logo → invert → white
//   mcdonalds.svg — golden arches, transparent bg (color)
//   pokemon-go.svg— full-color (color)
const LOGOS: { name: string; src?: string; filter?: 'invert' | 'color'; size?: 'lg' }[] = [
  { name: 'McDonald\'s', src: '/images/logos/mcdonalds-logo.svg', filter: 'color' },
  { name: 'BMW',         src: '/images/logos/bmw.svg',            filter: 'color', size: 'lg' },
  { name: 'Mercedes',    src: '/images/logos/mercedes-logo.svg',  filter: 'color' },
  { name: 'Porsche',     src: '/images/logos/porsche.svg',        filter: 'invert' },
  { name: 'Toyota',      src: '/images/logos/toyota.svg',         filter: 'color' },
  { name: 'Opel',        src: '/images/logos/opel.svg',           filter: 'invert' },
  { name: 'Bentley',     src: '/images/logos/bentley.png',        filter: 'color' },
  { name: 'Pokémon GO',  src: '/images/logos/pokemon-go.svg',     filter: 'color', size: 'lg' },
  { name: 'INA',         src: '/images/logos/ina.png',            filter: 'color' },
  { name: 'Končar',      src: '/images/logos/koncar.png',         filter: 'color' },
  { name: 'IDJ Videos',  src: '/images/logos/idj-videos.webp',   filter: 'color' },
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

      {/* Row 3 — mobile only, scrolls left (−25s offset so it's staggered from row 1) */}
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track offset />
      </div>
    </section>
  )
}
