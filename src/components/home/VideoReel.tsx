'use client'

import { useCallback, useState } from 'react'
import type { Project } from '@/data/projects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
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
      <div className={styles.indicatorTrack} />
      {projects.map((project, i) => (
        <button
          key={i}
          className={`${styles.indicatorItem} ${i === activeIndex ? styles.indicatorActive : ''}`}
          onClick={() => onSelect(i)}
          aria-label={`Jump to ${project.title}`}
        >
          <span className={styles.indicatorLabel}>{project.reelLabel ?? project.client}</span>
          <span className={styles.indicatorPill} />
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
  const hasPointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const scrollToPanel = useCallback((index: number) => {
    const el = document.getElementById(`panel-${index}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
    scrollToPanel(index)
  }, [scrollToPanel])

  return (
    <div className={styles.reel}>
      {projects.map((project, i) => (
        <VideoPanel
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          isActive={i === activeIndex}
          onPointerEnter={() => { if (hasPointer) setActiveIndex(i) }}
          onBecomeVisible={() => { if (!hasPointer) setActiveIndex(i) }}
        />
      ))}

      <ReelIndicator
        projects={projects}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      />
    </div>
  )
}
