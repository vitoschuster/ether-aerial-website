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

// Three distinct orderings ensure the 3 mobile rows never show the same logo
// vertically aligned at the same time. The track content is different, not just
// animation timing offset — offsetting identical arrays falls back into sync.
const ROW_1 = LOGOS
const ROW_2 = [...LOGOS].reverse()
const ROW_3 = [...LOGOS.slice(Math.floor(LOGOS.length / 2)), ...LOGOS.slice(0, Math.floor(LOGOS.length / 2))]

function Track({ items, variant }: { items: typeof LOGOS; variant: 'a' | 'b' | 'c' }) {
  const variantClass =
    variant === 'a' ? styles.trackA : variant === 'b' ? styles.trackB : styles.trackC
  return (
    <div className={`${styles.track} ${variantClass}`}>
      {items.map((l, i) => <LogoItem key={`${variant}-1-${l.name}-${i}`} {...l} />)}
      {items.map((l, i) => <LogoItem key={`${variant}-2-${l.name}-${i}`} {...l} />)}
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section className={styles.section} aria-label="Trusted by">
      <p className={styles.label}>Trusted by</p>

      {/* Row 1 — all viewports, scrolls left */}
      <div className={styles.viewport}>
        <Track items={ROW_1} variant="a" />
      </div>

      {/* Row 2 — mobile only, reversed order scrolling right */}
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track items={ROW_2} variant="b" />
      </div>

      {/* Row 3 — mobile only, shifted order scrolling left (different duration keeps it out of sync) */}
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track items={ROW_3} variant="c" />
      </div>
    </section>
  )
}
