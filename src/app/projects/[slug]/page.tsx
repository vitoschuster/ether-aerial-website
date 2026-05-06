import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import styles from './project.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const related = projects
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3)

  return (
    <main className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <Image
          src={project.poster}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroMeta}>
          <p className={styles.client}>{project.client}</p>
          <h1 className={styles.title}>{project.title}</h1>
        </div>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Client</span>
            <span>{project.client}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Year</span>
            <span>{project.year}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Category</span>
            <span className={styles.category}>{project.category}</span>
          </div>
          {project.credits && (
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Role</span>
              <span>{project.credits}</span>
            </div>
          )}
          {project.label && (
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Label</span>
              <span>{project.label}</span>
            </div>
          )}
        </div>

        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}

        {/* Video embed — Vimeo takes priority over YouTube */}
        {project.vimeoId ? (
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          </div>
        ) : project.youtubeId ? (
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          </div>
        ) : null}
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <div className={styles.related}>
          <h2 className={styles.relatedHeading}>More projects</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedThumb}>
                  <Image src={p.poster} alt={p.title} fill sizes="33vw" className={styles.relatedImg} />
                </div>
                <p className={styles.relatedClient}>{p.client}</p>
                <p className={styles.relatedTitle}>{p.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={styles.back}>
        <Link href="/projects">← All projects</Link>
      </div>
    </main>
  )
}
