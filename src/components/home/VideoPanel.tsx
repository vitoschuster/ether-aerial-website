'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/data/projects'
import styles from './VideoPanel.module.css'

interface Props {
  project: Project
  index: number
  total: number
  isActive: boolean
}

export default function VideoPanel({ project, index, total, isActive }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ytOpen, setYtOpen] = useState(false)

  // Play/pause based on which panel is active in the reel
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive])

  const handlePlay = () => {
    if (project.youtubeId) {
      setYtOpen(true)
      return
    }
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) {
      video.requestFullscreen()
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen()
    }
  }

  const panelNumber = String(index + 1).padStart(2, '0')

  return (
    <section className={styles.panel}>
      {/* Background video / poster */}
      {project.videoSrc ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={project.videoSrc}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="none"
        />
      ) : (
        <div
          className={styles.poster}
          style={{ backgroundImage: `url(${project.poster})` }}
        />
      )}

      {/* Gradient overlays */}
      <div className={styles.overlayBottom} />
      <div className={styles.overlayTop} />

      {/* Panel number — top right */}
      <span className={styles.panelNumber}>{panelNumber}</span>

      {/* Bottom left: client + title */}
      <div className={styles.meta}>
        <p className={styles.client}>{project.client}</p>
        <h2 className={styles.title}>{project.title}</h2>
        {project.credits && (
          <p className={styles.credits}>{project.credits}</p>
        )}
      </div>

      {/* Center: play button */}
      <button
        className={styles.playBtn}
        onClick={handlePlay}
        aria-label={`Play ${project.title}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </button>

      {/* YouTube overlay modal */}
      {ytOpen && project.youtubeId && (
        <div className={styles.ytOverlay} onClick={() => setYtOpen(false)}>
          <button className={styles.ytClose} onClick={() => setYtOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
