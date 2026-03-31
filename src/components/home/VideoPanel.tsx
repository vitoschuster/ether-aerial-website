'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Project } from '@/data/projects'
import styles from './VideoPanel.module.css'

interface Props {
  project: Project
  index: number
  total: number
  onBecomeActive: () => void
}

export default function VideoPanel({ project, index, onBecomeActive }: Props) {
  const panelRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const callbackRef = useRef(onBecomeActive)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [ytOpen, setYtOpen] = useState(false)

  // Keep callback ref stable so IntersectionObserver effect doesn't re-run
  useEffect(() => { callbackRef.current = onBecomeActive })

  // Detect pointer capability (desktop vs touch) — false until hydrated
  const hasPointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  // IntersectionObserver — triggers mobile autoplay + active index tracking
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setInView(visible)
        if (visible) callbackRef.current()
      },
      { threshold: 0.55 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Video play / pause
  useEffect(() => {
    const video = videoRef.current
    if (!video || !project.videoSrc) return
    const shouldPlay = hasPointer ? hovered : inView
    if (shouldPlay) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [hovered, inView, hasPointer, project.videoSrc])

  const handlePlay = useCallback(() => {
    if (project.youtubeId) {
      setYtOpen(true)
      return
    }
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else {
      (video as HTMLVideoElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen?.()
    }
  }, [project.youtubeId])

  const panelNumber = String(index + 1).padStart(2, '0')

  return (
    <section
      ref={panelRef}
      id={`panel-${index}`}
      className={styles.panel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video — no poster, intentional dark start */}
      {project.videoSrc && (
        <video
          ref={videoRef}
          className={styles.video}
          src={project.videoSrc}
          muted
          loop
          playsInline
          preload="none"
        />
      )}

      {/* Gradient overlays */}
      <div className={styles.overlayBottom} />
      <div className={styles.overlayTop} />

      {/* Panel number */}
      <span className={styles.panelNumber}>{panelNumber}</span>

      {/* Meta — CSS handles show/hide via :hover for pointer, always-on for touch */}
      <div className={styles.meta}>
        <p className={styles.client}>{project.client}</p>
        <h2 className={styles.title}>{project.title}</h2>
        {project.credits && (
          <p className={styles.credits}>{project.credits}</p>
        )}
      </div>

      {/* Play button */}
      <button
        className={styles.playBtn}
        onClick={handlePlay}
        aria-label={`Play ${project.title}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </button>

      {/* YouTube fullscreen overlay */}
      {ytOpen && project.youtubeId && (
        <div className={styles.ytOverlay} onClick={() => setYtOpen(false)}>
          <button className={styles.ytClose} onClick={() => setYtOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className={styles.ytWrapper} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          </div>
        </div>
      )}
    </section>
  )
}
