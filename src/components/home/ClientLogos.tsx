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
  { name: 'McDonald\'s',     src: '/images/logos/mcdonalds-logo.svg',  filter: 'color' },
  { name: 'BMW',             src: '/images/logos/bmw.svg',             filter: 'color', size: 'lg' },
  { name: 'Mercedes',        src: '/images/logos/mercedes-logo.svg',   filter: 'color' },
  { name: 'Porsche',         src: '/images/logos/porsche.svg',         filter: 'invert' },
  { name: 'Toyota',          src: '/images/logos/toyota.svg',          filter: 'color' },
  { name: 'Opel',            src: '/images/logos/opel.svg',            filter: 'invert' },
  { name: 'Bentley',         src: '/images/logos/bentley.png',         filter: 'color' },
  { name: 'Pokémon GO',      src: '/images/logos/pokemon-go.svg',      filter: 'color', size: 'lg' },
  { name: 'INA',             src: '/images/logos/ina.png',             filter: 'color' },
  { name: 'Končar',          src: '/images/logos/koncar.png',          filter: 'color' },
  { name: 'IDJ Videos',      src: '/images/logos/idj-videos.webp',     filter: 'color' },
  { name: 'Joop!',           src: '/images/logos/joop.jpg',            filter: 'color', size: 'lg' },
  { name: 'Južni Vetar',     src: '/images/logos/juzni-vetar.jpg',     filter: 'color', size: 'lg' },
  { name: 'Balkaton',        src: '/images/logos/balkaton.jpg',        filter: 'color', size: 'lg' },
  { name: 'FAT International', src: '/images/logos/fat-international.png', filter: 'color' },
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

// Mobile shows 3 rows. To guarantee no logo is visible in two rows at the same
// time, we partition LOGOS into 3 disjoint subsets (modulo 3 — keeps the mix
// of image and wordmark types spread across all rows). Desktop still shows
// the full set in its single row.
const ROW_1_MOBILE = LOGOS.filter((_, i) => i % 3 === 0)
const ROW_2_MOBILE = LOGOS.filter((_, i) => i % 3 === 1)
const ROW_3_MOBILE = LOGOS.filter((_, i) => i % 3 === 2)

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

      {/* Desktop — single row showing every logo */}
      <div className={`${styles.viewport} ${styles.viewportDesktop}`}>
        <Track items={LOGOS} variant="a" />
      </div>

      {/* Mobile — three disjoint rows, no overlapping logos */}
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track items={ROW_1_MOBILE} variant="a" />
      </div>
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track items={ROW_2_MOBILE} variant="b" />
      </div>
      <div className={`${styles.viewport} ${styles.viewportMobile}`}>
        <Track items={ROW_3_MOBILE} variant="c" />
      </div>
    </section>
  )
}
