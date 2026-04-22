'use client'

import { useEffect, useRef } from 'react'
import styles from './ClientLogos.module.css'

// filter: 'invert' → brightness(0) invert(1) → pure white silhouette (for dark logos on transparent bg)
// filter: 'color'  → show original colors (for logos already white, light, or colored on transparent bg)
// size: 'lg' → larger height for circular / square logos that look small at default height
// w, h: intrinsic pixel dimensions — passed to <img width height> so the browser reserves the
//       slot before load. Prevents track-wide layout shift when a late image (esp. wide logos
//       like porsche at 9.6:1) pops in and suddenly claims ~268px of horizontal space.
type Logo = {
  name: string
  src?: string
  filter?: 'invert' | 'color'
  size?: 'lg'
  w?: number
  h?: number
}

const LOGOS: Logo[] = [
  { name: 'McDonald\'s',       src: '/images/logos/mcdonalds-logo.svg',    filter: 'color',  w: 117,  h: 92 },
  { name: 'BMW',               src: '/images/logos/bmw.svg',               filter: 'color',  size: 'lg', w: 1015, h: 1015 },
  { name: 'BMW M',             src: '/images/logos/bmw-m.png',             filter: 'color',  size: 'lg', w: 225,  h: 225 },
  { name: 'Mercedes',          src: '/images/logos/mercedes-logo.svg',     filter: 'color',  w: 112,  h: 112 },
  { name: 'Porsche',           src: '/images/logos/porsche.svg',           filter: 'invert', w: 921,  h: 96  },
  { name: 'Toyota',            src: '/images/logos/toyota.svg',            filter: 'color',  w: 1096, h: 293 },
  { name: 'Opel',              src: '/images/logos/opel.svg',              filter: 'invert', w: 455,  h: 402 },
  { name: 'Bentley',           src: '/images/logos/bentley.png',           filter: 'color',  w: 110,  h: 55  },
  { name: 'Pokémon GO',        src: '/images/logos/pokemon-go.svg',        filter: 'color',  size: 'lg', w: 100, h: 60 },
  { name: 'INA',               src: '/images/logos/ina.png',               filter: 'color',  w: 1657, h: 664 },
  { name: 'Končar',            src: '/images/logos/koncar.png',            filter: 'color',  w: 3410, h: 1181 },
  { name: 'HAC',               src: '/images/logos/hac.png',               filter: 'color',  size: 'lg', w: 420, h: 594 },
  { name: 'HEP',               src: '/images/logos/hep-logo.png',          filter: 'color',  w: 408,  h: 124 },
  { name: 'HR Telekom',        src: '/images/logos/hr-telekom-logo.png',   filter: 'color',  size: 'lg', w: 206, h: 245 },
  { name: 'Rimac',             src: '/images/logos/rimac.webp',            filter: 'color',  size: 'lg', w: 2000, h: 1500 },
  { name: 'IDJ Videos',        src: '/images/logos/idj-videos.webp',       filter: 'color',  w: 271,  h: 111 },
  { name: 'WRC',               src: '/images/logos/wrc-01.jpg',            filter: 'color',  size: 'lg', w: 181, h: 185 },
  { name: 'Joop!',             src: '/images/logos/joop.jpg',              filter: 'color',  size: 'lg', w: 900, h: 900 },
  { name: 'Južni Vetar',       src: '/images/logos/juzni-vetar.jpg',       filter: 'color',  size: 'lg', w: 900, h: 900 },
  { name: 'Balkaton',          src: '/images/logos/balkaton.jpg',          filter: 'color',  size: 'lg', w: 900, h: 900 },
  { name: 'FNC',               src: '/images/logos/fnc_logo.jpeg',         filter: 'color',  w: 2560, h: 858 },
  { name: 'FAT International', src: '/images/logos/fat-international.png', filter: 'color',  w: 820,  h: 344 },
  { name: 'Imperia' },
]

function LogoItem({ name, src, filter, size, w, h }: Logo) {
  return (
    <div className={styles.item} aria-label={name}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          width={w}
          height={h}
          loading="eager"
          decoding="async"
          className={`${styles.logoImg} ${size === 'lg' ? styles.logoLg : ''} ${filter === 'color' ? styles.logoColor : styles.logoInvert}`}
        />
      ) : (
        <span className={styles.wordmark}>{name}</span>
      )}
    </div>
  )
}

// Mobile shows 3 rows. To guarantee no logo is visible in two rows at the same
// time, we partition LOGOS into 3 disjoint subsets (modulo 3 — keeps the mix
// of image and wordmark types spread across all rows). Desktop still shows
// the full set in its single row.
const ROW_1_MOBILE = LOGOS.filter((_, i) => i % 3 === 0)
const ROW_2_MOBILE = LOGOS.filter((_, i) => i % 3 === 1)
const ROW_3_MOBILE = LOGOS.filter((_, i) => i % 3 === 2)

// Desktop — CSS animation, single row, full LOGOS list.
function DesktopTrack() {
  return (
    <div className={`${styles.track} ${styles.trackA}`}>
      {LOGOS.map((l, i) => <LogoItem key={`d1-${l.name}-${i}`} {...l} />)}
      {LOGOS.map((l, i) => <LogoItem key={`d2-${l.name}-${i}`} {...l} />)}
    </div>
  )
}

// Mobile — hybrid transform-for-auto / scrollLeft-for-touch. Two visual
// representations are equivalent: `transform: translateX(-X)` on the track
// with scrollLeft=0 looks identical to transform=0 with scrollLeft=X.
// Auto mode uses transform for GPU-accelerated sub-pixel smoothness (iOS
// Safari rounds scrollLeft to integer pixels, which caused the blocky look).
// While the user is touching (or in the 2.5s grace after release, while iOS
// momentum finishes), we hand control to the native scroll container so
// drag and momentum feel right. `touch-action: pan-x` keeps vertical page
// scrolling uninterfered. If JS fails to mount, rows render as static
// strips — no broken state.
function MobileTrack({
  items,
  durationSec,
  reverse,
}: {
  items: Logo[]
  durationSec: number
  reverse: boolean
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    type Mode = 'auto' | 'touch' | 'grace'
    let mode: Mode = 'auto'
    let pos = 0 // float — current visual offset in px (positive shifts track left)
    let resumeAt = 0
    let lastTs = performance.now()
    let rafId = 0

    const applyTransform = () => {
      track.style.transform = `translate3d(${-pos}px, 0, 0)`
    }

    let seeded = false
    const seed = () => {
      const half = track.scrollWidth / 2
      if (half <= 0) return
      if (reverse) pos = half // reverse needs headroom to decrement
      else pos = 0
      viewport.scrollLeft = 0
      applyTransform()
      seeded = true
    }
    seed()

    // If layout wasn't ready on first tick (images still measuring), seed on
    // first resize. Don't re-seed after that — ongoing image loads shouldn't
    // wipe out animation progress.
    const ro = new ResizeObserver(() => {
      if (!seeded) seed()
    })
    ro.observe(track)

    const step = (ts: number) => {
      const dt = Math.min(ts - lastTs, 100)
      lastTs = ts
      const half = track.scrollWidth / 2

      // Grace → auto handoff: iOS momentum has settled, capture wherever the
      // user scrolled to, fold it into `pos`, and switch back to transform.
      if (mode === 'grace' && ts >= resumeAt && half > 0) {
        const scrolled = viewport.scrollLeft
        pos = ((scrolled % half) + half) % half
        viewport.scrollLeft = 0
        applyTransform()
        mode = 'auto'
      }

      if (mode === 'auto' && half > 0 && !prefersReducedMotion) {
        const pxPerMs = (half / (durationSec * 1000)) * (reverse ? -1 : 1)
        pos += pxPerMs * dt
        if (pos >= half) pos -= half
        if (pos < 0) pos += half
        applyTransform()
      }

      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    const onTouchStart = () => {
      if (mode === 'auto') {
        // Swap representations without visual change: pos → scrollLeft, transform 0.
        track.style.transform = 'translate3d(0, 0, 0)'
        viewport.scrollLeft = pos
      }
      // If we were in grace, iOS is already doing momentum — leave it alone.
      mode = 'touch'
    }
    const onTouchEnd = () => {
      mode = 'grace'
      resumeAt = performance.now() + 2500
      lastTs = performance.now()
    }

    viewport.addEventListener('touchstart', onTouchStart, { passive: true })
    viewport.addEventListener('touchend', onTouchEnd, { passive: true })
    viewport.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      viewport.removeEventListener('touchstart', onTouchStart)
      viewport.removeEventListener('touchend', onTouchEnd)
      viewport.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [durationSec, reverse])

  return (
    <div
      ref={viewportRef}
      className={`${styles.viewport} ${styles.viewportMobile} ${styles.viewportInteractive}`}
    >
      <div ref={trackRef} className={styles.track}>
        {items.map((l, i) => <LogoItem key={`m1-${l.name}-${i}`} {...l} />)}
        {items.map((l, i) => <LogoItem key={`m2-${l.name}-${i}`} {...l} />)}
      </div>
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section className={styles.section} aria-label="Trusted by">
      <p className={styles.label}>Trusted by</p>

      {/* Desktop — single row showing every logo */}
      <div className={`${styles.viewport} ${styles.viewportDesktop}`}>
        <DesktopTrack />
      </div>

      {/* Mobile — three disjoint rows, swipe-to-scrub */}
      <MobileTrack items={ROW_1_MOBILE} durationSec={49} reverse={false} />
      <MobileTrack items={ROW_2_MOBILE} durationSec={43} reverse={true} />
      <MobileTrack items={ROW_3_MOBILE} durationSec={56} reverse={false} />
    </section>
  )
}
