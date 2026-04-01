import styles from './ClientLogos.module.css'

// filter: 'invert' → brightness(0) invert(1) → renders as white silhouette
// filter: 'color'  → original brand colors / already dark-bg compatible
// size: 'lg' → larger height for circular / square logos that look small at default height
const LOGOS: { name: string; src?: string; filter?: 'invert' | 'color'; size?: 'lg' }[] = [
  { name: 'McDonald\'s', src: '/images/logos/mcdonalds.svg',  filter: 'color', size: 'lg' },
  { name: 'BMW',         src: '/images/logos/bmw.svg',        filter: 'color', size: 'lg' },
  { name: 'Porsche',     src: '/images/logos/porsche.svg',    filter: 'invert' },
  { name: 'Toyota',      src: '/images/logos/toyota.svg',     filter: 'color', size: 'lg' },
  { name: 'Opel',        src: '/images/logos/opel.svg',       filter: 'invert' },
  { name: 'Rimac',       src: '/images/logos/rimac.svg',      filter: 'invert' },
  { name: 'Pokémon GO',  src: '/images/logos/pokemon-go.svg', filter: 'color', size: 'lg' },
  { name: 'Joop!' },
  { name: 'Južni Vetar' },
  { name: 'IDJ Videos' },
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

export default function ClientLogos() {
  return (
    <section className={styles.section} aria-label="Trusted by">
      <p className={styles.label}>Trusted by</p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {LOGOS.map((l) => <LogoItem key={l.name} {...l} />)}
          {LOGOS.map((l) => <LogoItem key={l.name + '-2'} {...l} />)}
        </div>
      </div>
    </section>
  )
}
