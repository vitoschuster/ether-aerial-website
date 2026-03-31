import type { Metadata } from 'next'
import ProjectCard from '@/components/shared/ProjectCard'
import { projects, categories } from '@/data/projects'
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
      </header>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  )
}
