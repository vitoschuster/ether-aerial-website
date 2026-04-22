'use client'

import { useCallback, useEffect, useState, useMemo } from 'react'
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
  const [loadedUpTo, setLoadedUpTo] = useState(0)
  const hasPointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const scrollToPanel = useCallback((index: number) => {
    const el = document.getElementById(`panel-${index}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
    scrollToPanel(index)
  }, [scrollToPanel])

  // Sequentially drain each video's full body into the HTTP cache. Range
  // requests from <video> elements hit that cache = instant playback.
  // canplaythrough fires too early (~2–5s of buffer), so we can't rely on
  // the <video> element itself to know when a video is actually "loaded."
  useEffect(() => {
    let cancelled = false
    let activeReader: ReadableStreamDefaultReader<Uint8Array> | null = null

    async function preload() {
      for (let i = 0; i < projects.length; i++) {
        if (cancelled) return
        const src = projects[i].videoSrc

        if (src) {
          try {
            const res = await fetch(src)
            if (res.ok && res.body) {
              activeReader = res.body.getReader()
              while (true) {
                const { done } = await activeReader.read()
                if (cancelled) {
                  activeReader.cancel().catch(() => {})
                  return
                }
                if (done) break
              }
              activeReader = null
            }
          } catch {
            // Network/CORS error — advance anyway so the pipeline doesn't stall
          }
        }

        if (cancelled) return
        setLoadedUpTo((prev) => Math.max(prev, i + 1))
      }
    }

    preload()

    return () => {
      cancelled = true
      activeReader?.cancel().catch(() => {})
    }
  }, [projects])

  // Always ensure the active panel (and everything before it) is loaded,
  // even if the user jumped ahead of the sequential pipeline
  const loadThreshold = useMemo(
    () => Math.max(loadedUpTo, activeIndex),
    [loadedUpTo, activeIndex]
  )

  return (
    <div className={styles.reel}>
      {projects.map((project, i) => (
        <VideoPanel
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          isActive={i === activeIndex}
          shouldLoad={i <= loadThreshold}
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
