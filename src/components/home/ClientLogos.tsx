import styles from './ClientLogos.module.css'

const LOGOS: { name: string; src?: string }[] = [
  { name: 'BMW',         src: '/images/logos/bmw.svg' },
  { name: 'Porsche',     src: '/images/logos/porsche.svg' },
  { name: 'Opel',        src: '/images/logos/opel.svg' },
  { name: 'Pokémon GO',  src: '/images/logos/pokemon-go.svg' },
  { name: 'Južni Vetar' },
  { name: 'IDJ Videos' },
  { name: 'Balkaton' },
  { name: 'Yellowcake' },
  { name: 'Imperia' },
]

function LogoItem({ name, src }: { name: string; src?: string }) {
  return (
    <div className={styles.item} aria-label={name}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className={styles.logoImg} />
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
        {/* Duplicate the list for seamless infinite loop */}
        <div className={styles.track}>
          {LOGOS.map((l) => <LogoItem key={l.name} {...l} />)}
          {LOGOS.map((l) => <LogoItem key={l.name + '-2'} {...l} />)}
        </div>
      </div>
    </section>
  )
}
