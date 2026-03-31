import type { Metadata } from 'next'
import BentoCard from '@/components/shared/BentoCard'
import { projects } from '@/data/projects'
import styles from './projects.module.css'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse all aerial cinematography projects by Ether Aerial.',
}

function getCardType(i: number): 'normal' | 'wide-left' | 'wide-right' {
  // Every 10 cards: position 0 = wide-left, position 6 = wide-right
  const pos = i % 10
  if (pos === 0) return 'wide-left'
  if (pos === 6) return 'wide-right'
  return 'normal'
}

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Portfolio</p>
        <h1 className={styles.heading}>Projects</h1>
        <p className={styles.count}>{projects.length} works</p>
      </header>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <BentoCard
            key={project.slug}
            project={project}
            cardType={getCardType(i)}
          />
        ))}
      </div>
    </main>
  )
}
