'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/data/projects'
import VideoPanel from './VideoPanel'
import styles from './VideoReel.module.css'

interface Props {
  projects: Project[]
}

export default function VideoReel({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const panelHeight = el.clientHeight

    const onScroll = () => {
      const index = Math.round(el.scrollTop / panelHeight)
      setActiveIndex(Math.min(index, projects.length - 1))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [projects.length])

  const scrollTo = (index: number) => {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ top: index * el.clientHeight, behavior: 'smooth' })
  }

  const progressPct = projects.length > 1
    ? (activeIndex / (projects.length - 1)) * 100
    : 0

  return (
    <div className={styles.reel}>
      {/* Scroll-snap container */}
      <div ref={containerRef} className={styles.container}>
        {projects.map((project, i) => (
          <VideoPanel
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            isActive={i === activeIndex}
          />
        ))}
      </div>

      {/* Right-edge progress indicator */}
      <div className={styles.progress}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ height: `${progressPct}%` }}
          />
        </div>
        <div className={styles.progressDots}>
          {projects.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to panel ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint — only on first panel */}
      {activeIndex === 0 && (
        <div className={styles.scrollHint}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      )}
    </div>
  )
}
