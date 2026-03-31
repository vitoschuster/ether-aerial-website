import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={project.poster}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.img}
        />
        <div className={styles.overlay}>
          <span className={styles.playIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.client}>{project.client}</p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.year}>{project.year}</p>
      </div>
    </Link>
  )
}
