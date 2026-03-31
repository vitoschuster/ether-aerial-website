import styles from './ClientLogos.module.css'

// Inline SVG logos for brands with recognizable geometric marks.
// Swap these for official press-kit SVGs when available — keep same className structure.

function BmwRoundel() {
  return (
    <svg className={styles.svgLogo} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="BMW">
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" strokeWidth="1.5"/>
      {/* Top-right quadrant (blue in color version) */}
      <path d="M50,16 A34,34 0 0,1 84,50 L50,50 Z" fill="currentColor"/>
      {/* Bottom-left quadrant */}
      <path d="M50,84 A34,34 0 0,1 16,50 L50,50 Z" fill="currentColor"/>
      <text x="50" y="11.5" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif" fontSize="6" fontWeight="900" fill="currentColor" letterSpacing="2">BMW</text>
    </svg>
  )
}

function OpelBlitz() {
  return (
    <svg className={styles.svgLogo} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Opel">
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2.5"/>
      {/* Opel Blitz lightning bolt */}
      <path d="M62,18 L36,52 L53,52 L40,82 L64,48 L47,48 Z" fill="currentColor"/>
    </svg>
  )
}

function Pokeball() {
  return (
    <svg className={styles.svgLogo} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pokémon GO">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="3"/>
      <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="3"/>
      <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="3"/>
      <circle cx="50" cy="50" r="5" fill="currentColor"/>
    </svg>
  )
}

const CLIENTS = [
  { name: 'BMW', el: <BmwRoundel /> },
  { name: 'Porsche', el: null },
  { name: 'Opel', el: <OpelBlitz /> },
  { name: 'Pokémon GO', el: <Pokeball /> },
  { name: 'Južni Vetar', el: null },
  { name: 'IDJ Videos', el: null },
  { name: 'Balkaton', el: null },
  { name: 'Yellowcake', el: null },
  { name: 'Imperia', el: null },
]

export default function ClientLogos() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Trusted by</p>
      <div className={styles.grid}>
        {CLIENTS.map(({ name, el }) => (
          <div key={name} className={styles.client}>
            {el ? (
              <span className={styles.iconWrap} title={name}>{el}</span>
            ) : (
              <span className={styles.wordmark}>{name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
