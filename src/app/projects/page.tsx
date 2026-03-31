import type { Metadata } from 'next'
import BentoCard from '@/components/shared/BentoCard'
import { projects } from '@/data/projects'
import styles from './projects.module.css'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse all aerial cinematography projects by Ether Aerial.',
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
          // Every 5th card (0, 5, 10, 15...) is wide (span 2)
          <BentoCard
            key={project.slug}
            project={project}
            wide={i % 5 === 0}
          />
        ))}
      </div>
    </main>
  )
}
