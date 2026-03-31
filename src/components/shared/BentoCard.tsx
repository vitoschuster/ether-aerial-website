import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import styles from './BentoCard.module.css'

type CardType = 'normal' | 'wide-left' | 'wide-right'

interface Props {
  project: Project
  cardType?: CardType
}

export default function BentoCard({ project, cardType = 'normal' }: Props) {
  const typeClass =
    cardType === 'wide-left' ? styles.wideLeft
    : cardType === 'wide-right' ? styles.wideRight
    : ''

  const isWide = cardType !== 'normal'

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${styles.card} ${typeClass}`}
    >
      <div className={styles.thumb}>
        <Image
          src={project.poster}
          alt={project.title}
          fill
          sizes={isWide
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
