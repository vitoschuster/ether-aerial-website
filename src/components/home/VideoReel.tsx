'use client'

import { useCallback, useEffect, useState } from 'react'
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

// Bytes per video to consider "primed enough" to start smooth playback.
// ~2MB holds several seconds of 1080p H.264 at typical CRF 23 bitrates —
// enough head start that panels don't stall when scrolled to.
const PRIME_BYTES = 2 * 1024 * 1024

export default function VideoReel({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [primed, setPrimed] = useState<Set<number>>(new Set())
  const hasPointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  const scrollToPanel = useCallback((index: number) => {
    const el = document.getElementById(`panel-${index}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
    scrollToPanel(index)
  }, [scrollToPanel])

  // Parallel prefetch: kick off every video's fetch on mount so they all
  // start buffering at once. Each one streams bytes into the HTTP cache.
  // As soon as a video crosses PRIME_BYTES, its panel is "primed" and
  // the <video> element gets preload="auto" (so Range requests hit the
  // warm cache). Fetches continue to completion in the background.
  //
  // A `reel-primed` window event fires once panel 0's bytes have landed —
  // LoadingScreen listens for this to hold the splash until the first
  // video can play smoothly.
  useEffect(() => {
    let cancelled = false
    let primeFired = false

    const markPrimed = (i: number) => {
      if (cancelled) return
      setPrimed((prev) => {
        if (prev.has(i)) return prev
        const next = new Set(prev)
        next.add(i)
        return next
      })
      if (i === 0 && !primeFired) {
        primeFired = true
        window.dispatchEvent(new CustomEvent('reel-primed'))
      }
    }

    async function drainOne(src: string, i: number) {
      try {
        const res = await fetch(src)
        if (!res.ok || !res.body) {
          markPrimed(i)
          return
        }
        const reader = res.body.getReader()
        let bytes = 0
        let crossed = false
        while (true) {
          const { done, value } = await reader.read()
          if (cancelled) {
            reader.cancel().catch(() => {})
            return
          }
          if (done) break
          bytes += value?.byteLength ?? 0
          if (!crossed && bytes >= PRIME_BYTES) {
            crossed = true
            markPrimed(i)
          }
        }
        if (!crossed) markPrimed(i) // video smaller than threshold
      } catch {
        markPrimed(i)
      }
    }

    async function preload() {
      await Promise.all(
        projects.map((p, i) => (p.videoSrc ? drainOne(p.videoSrc, i) : (markPrimed(i), Promise.resolve())))
      )
      // If panel 0 had no videoSrc and somehow reel-primed never fired,
      // ensure the LoadingScreen's fallback isn't the only safety net.
      if (!cancelled && !primeFired) {
        primeFired = true
        window.dispatchEvent(new CustomEvent('reel-primed'))
      }
    }

    preload()

    return () => {
      cancelled = true
    }
  }, [projects])

  return (
    <div className={styles.reel}>
      {projects.map((project, i) => (
        <VideoPanel
          key={project.slug}
          project={project}
          index={i}
          total={projects.length}
          isActive={i === activeIndex}
          shouldLoad={primed.has(i) || i === activeIndex}
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
