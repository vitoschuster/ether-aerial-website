'use client'

import { useEffect, useState } from 'react'
import styles from './ProjectPlayButton.module.css'

interface Props {
  title: string
  vimeoId?: string
  youtubeId?: string
}

export default function ProjectPlayButton({ title, vimeoId, youtubeId }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!vimeoId && !youtubeId) return null

  const src = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`
    : `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`

  const allow = vimeoId
    ? 'autoplay; fullscreen; picture-in-picture'
    : 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'

  return (
    <>
      <button
        className={styles.playBtn}
        onClick={() => setOpen(true)}
        aria-label={`Watch ${title}`}
      >
        <svg className={styles.playIcon} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.5" />
          <path d="M27 22l16 10-16 10V22z" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <button
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={src}
              allow={allow}
              allowFullScreen
              title={title}
            />
          </div>
        </div>
      )}
    </>
  )
}
