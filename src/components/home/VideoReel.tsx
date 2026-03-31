'use client'

import { useCallback, useState } from 'react'
import type { Project } from '@/data/projects'
import VideoPanel from './VideoPanel'
import styles from './VideoReel.module.css'

interface Props {
  projects: Project[]
}

function ReelIndicator({
  projects,
  activeIndex,
  onSelect,
}: {
  projects: Project[]
  activeIndex: number
  onSelect: (i: number) => void
}) {
  return (
    <nav className={styles.indicator} aria-label="Reel navigation">
      {/* Connecting track line */}
      <div className={styles.indicatorTrack} />

      {projects.map((project, i) => (
        <button
          key={i}
          className={`${styles.indicatorItem} ${i === activeIndex ? styles.indicatorActive : ''}`}
          onClick={() => onSelect(i)}
          aria-label={`Jump to ${project.title}`}
        >
          {/* Left: client name */}
          <span className={styles.indicatorLabel}>{project.client}</span>

          {/* Center: pill marker */}
          <span className={styles.indicatorPill} />

          {/* Right: number */}
          <span className={styles.indicatorNum}>
            {String(i + 1).padStart(2, '0')}
          </span>
        </button>
      ))}
    </nav>
  )
}

export default function VideoReel({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToPanel = useCallback((index: number) => {
    const el = document.getElementById(`panel-${index}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className={styles.reel}>
      {projects.map((project, i) => (
        <VideoPanel
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          onBecomeActive={() => setActiveIndex(i)}
        />
      ))}

      <ReelIndicator
        projects={projects}
        activeIndex={activeIndex}
        onSelect={scrollToPanel}
      />
    </div>
  )
}
