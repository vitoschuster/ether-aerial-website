'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { Project } from '@/data/projects'
import styles from './VideoPanel.module.css'

interface Props {
  project: Project
  index: number
  total: number
  /** VideoReel drives this — panel is "on" when true */
  isActive: boolean
  /** True when this panel's video should begin loading (sequential pipeline) */
  shouldLoad: boolean
  /** Called when this panel's video is fully loaded (or immediately if no local video) */
  onLoaded: () => void
  /** Called on mouseenter — VideoReel decides whether to act on it */
  onPointerEnter: () => void
  /** Called when panel crosses 50% of viewport — VideoReel decides whether to act on it */
  onBecomeVisible: () => void
}

export default function VideoPanel({
  project,
  index,
  isActive,
  shouldLoad,
  onLoaded,
  onPointerEnter,
  onBecomeVisible,
}: Props) {
  const panelRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [ytOpen, setYtOpen] = useState(false)
  const [vimeoOpen, setVimeoOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [modalPlaying, setModalPlaying] = useState(true)
  const [modalMuted, setModalMuted] = useState(false)

  // Stable ref for the callback — IntersectionObserver re-creates only on mount
  const onBecomeVisibleRef = useRef(onBecomeVisible)
  useEffect(() => { onBecomeVisibleRef.current = onBecomeVisible })

  const onLoadedRef = useRef(onLoaded)
  useEffect(() => { onLoadedRef.current = onLoaded })

  // Sequential preload pipeline — fires onLoaded once the video has enough data
  // to play through (or immediately if this panel has no local video to load)
  useEffect(() => {
    if (!shouldLoad) return

    const video = videoRef.current
    const hasLocalVideo = !!(project.videoSrc || project.videoSrcWebm)

    if (!hasLocalVideo || !video) {
      onLoadedRef.current()
      return
    }

    // Already buffered enough (e.g. cached)
    if (video.readyState >= 3) {
      onLoadedRef.current()
      return
    }

    const advance = () => onLoadedRef.current()
    video.addEventListener('canplaythrough', advance, { once: true })
    // Don't stall the pipeline on error — advance anyway
    video.addEventListener('error', advance, { once: true })
    return () => {
      video.removeEventListener('canplaythrough', advance)
      video.removeEventListener('error', advance)
    }
  }, [shouldLoad, project.videoSrc, project.videoSrcWebm])

  // Video play / pause — driven entirely by isActive
  useEffect(() => {
    const video = videoRef.current
    if (!video || (!project.videoSrc && !project.videoSrcWebm)) return
    if (isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
      // Don't reset currentTime — resume from where it was paused
    }
  }, [isActive, project.videoSrc, project.videoSrcWebm])

  // IntersectionObserver — fires onBecomeVisible (VideoReel uses it for mobile only)
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onBecomeVisibleRef.current()
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = modalVideoRef.current
    if (!videoOpen || !video) return

    video.currentTime = 0
    video.muted = modalMuted
    video.play().then(() => {
      setModalPlaying(true)
    }).catch(() => {
      setModalPlaying(false)
    })
  }, [videoOpen, modalMuted])

  useEffect(() => {
    const video = modalVideoRef.current
    if (!video) return
    video.muted = modalMuted
  }, [modalMuted])

  const closeVideo = () => {
    const video = modalVideoRef.current
    video?.pause()
    setVideoOpen(false)
    setModalPlaying(false)
  }

  const toggleModalPlayback = () => {
    const video = modalVideoRef.current
    if (!video) return

    if (video.paused) {
      video.play().then(() => setModalPlaying(true)).catch(() => {})
      return
    }

    video.pause()
    setModalPlaying(false)
  }

  useEffect(() => {
    if (!videoOpen && !ytOpen && !vimeoOpen) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setYtOpen(false)
        setVimeoOpen(false)
        closeVideo()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [videoOpen, ytOpen, vimeoOpen])

  const handlePlay = () => {
    if (project.vimeoId) {
      setVimeoOpen(true)
      return
    }
    if (project.youtubeId) {
      setYtOpen(true)
      return
    }
    if (project.videoSrc) {
      setModalMuted(false)
      setVideoOpen(true)
    }
  }

  const panelNumber = String(index + 1).padStart(2, '0')

  return (
    <section
      ref={panelRef}
      id={`panel-${index}`}
      className={`${styles.panel} ${isActive ? styles.panelActive : ''}`}
      onMouseEnter={onPointerEnter}
    >
      {/* Video — no poster, dark gradient background is intentional */}
      {(project.videoSrc || project.videoSrcWebm) && (
        <video
          ref={videoRef}
          className={styles.video}
          muted
          loop
          playsInline
          preload={shouldLoad ? 'auto' : 'none'}
          style={(project.videoScale || project.videoScaleMobile) ? {
            '--video-scale': project.videoScale ?? 1,
            '--video-scale-mobile': project.videoScaleMobile ?? project.videoScale ?? 1,
          } as CSSProperties : undefined}
        >
          {project.videoSrcWebm && <source src={project.videoSrcWebm} type="video/webm" />}
          {project.videoSrc && <source src={project.videoSrc} type="video/mp4" />}
        </video>
      )}

      {/* Gradient overlays */}
      <div className={styles.overlayBottom} />
      <div className={styles.overlayTop} />

      {/* Focus line — draws in from top when panel is active / hovered */}
      <div className={styles.reelLine} aria-hidden="true" />

      {/* Panel number */}
      <span className={styles.panelNumber}>{panelNumber}</span>

      {/* Meta — CSS drives visibility via :hover and .panelActive */}
      <div className={styles.meta}>
        <p className={styles.client}>{project.client}</p>
        <h2 className={styles.title}>{project.title}</h2>
        {project.credits && <p className={styles.credits}>{project.credits}</p>}
      </div>

      {/* Play button */}
      {(project.videoSrc || project.videoSrcWebm || project.vimeoId || project.youtubeId) && (
        <button
          className={styles.playBtn}
          onClick={handlePlay}
          aria-label={`Play ${project.title}`}
        >
          <svg className={styles.playIcon} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.5" />
            <path d="M27 22l16 10-16 10V22z" fill="currentColor" />
          </svg>
        </button>
      )}

      {/* Vimeo overlay */}
      {vimeoOpen && project.vimeoId && (
        <div className={styles.ytOverlay} onClick={() => setVimeoOpen(false)}>
          <button className={styles.ytClose} onClick={() => setVimeoOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className={styles.ytWrapper} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={project.title}
            />
          </div>
        </div>
      )}

      {/* YouTube overlay */}
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

      {videoOpen && project.videoSrc && (
        <div className={styles.videoOverlay} onClick={closeVideo}>
          <div className={styles.videoDialog} onClick={(e) => e.stopPropagation()}>
            <button className={styles.videoClose} onClick={closeVideo} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className={styles.videoFrame}>
              <video
                ref={modalVideoRef}
                className={styles.modalVideo}
                src={project.videoSrc}
                playsInline
                preload="metadata"
                onPlay={() => setModalPlaying(true)}
                onPause={() => setModalPlaying(false)}
                onClick={toggleModalPlayback}
              />

              {!modalPlaying && (
                <button
                  className={styles.centerPlay}
                  onClick={toggleModalPlayback}
                  aria-label={`Resume ${project.title}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </button>
              )}
            </div>

            <div className={styles.videoControls}>
              <div className={styles.videoMeta}>
                <p className={styles.videoClient}>{project.client}</p>
                <h3 className={styles.videoTitle}>{project.title}</h3>
              </div>

              <div className={styles.videoActions}>
                <button className={styles.controlBtn} onClick={toggleModalPlayback}>
                  {modalPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  className={styles.controlBtn}
                  onClick={() => setModalMuted((current) => !current)}
                >
                  {modalMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
