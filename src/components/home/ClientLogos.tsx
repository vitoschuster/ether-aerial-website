import styles from './ClientLogos.module.css'

const clients = [
  'BMW',
  'Porsche',
  'Opel',
  'Južni Vetar',
  'Pokémon GO',
  'Yellowcake',
  'IDJ Videos',
  'Balkaton',
  'Imperia',
]

export default function ClientLogos() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Trusted by</p>
      <div className={styles.track}>
        <div className={styles.inner}>
          {[...clients, ...clients].map((name, i) => (
            <span key={i} className={styles.client}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
