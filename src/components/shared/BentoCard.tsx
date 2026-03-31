import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import styles from './BentoCard.module.css'

interface Props {
  project: Project
  wide?: boolean
}

export default function BentoCard({ project, wide }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${styles.card} ${wide ? styles.wide : ''}`}
    >
      <div className={styles.thumb}>
        <Image
          src={project.poster}
          alt={project.title}
          fill
          sizes={wide
            ? '(max-width: 768px) 100vw, 66vw'
            : '(max-width: 768px) 100vw, 33vw'
          }
          className={styles.img}
        />
        <div className={styles.overlay} />
        <div className={styles.meta}>
          <p className={styles.client}>{project.client}</p>
          <h3 className={styles.title}>{project.title}</h3>
        </div>
        <span className={styles.year}>{project.year}</span>
      </div>
    </Link>
  )
}
