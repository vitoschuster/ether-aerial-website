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

// Mobile — JS-driven scrollLeft. Lets users swipe to scrub; auto-scroll
// resumes ~2.5s after the last touch. `touch-action: pan-x` scopes touch
// gestures on this element to horizontal, so vertical page scrolling is
// untouched. If anything blocks JS, the logos still render as a static
// row — so there's no broken state.
function MobileTrack({
  items,
  durationSec,
  reverse,
}: {
  items: Logo[]
  durationSec: number
  reverse: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // A reverse-direction track starts at halfWidth so scrolling left has room
    // to wrap around.
    const seedPosition = () => {
      const half = el.scrollWidth / 2
      if (reverse && half > 0 && el.scrollLeft < 1) el.scrollLeft = half
    }
    seedPosition()

    const ro = new ResizeObserver(() => {
      if (reverse && el.scrollLeft < 1) seedPosition()
    })
    ro.observe(el)

    let rafId = 0
    let paused = false
    let resumeAt = 0
    let lastTs = performance.now()

    const step = (ts: number) => {
      const dt = Math.min(ts - lastTs, 100) // clamp long inactive-tab gaps
      lastTs = ts
      const half = el.scrollWidth / 2
      const canAdvance = !paused && ts >= resumeAt && half > 0 && !prefersReducedMotion
      if (canAdvance) {
        const pxPerMs = (half / (durationSec * 1000)) * (reverse ? -1 : 1)
        let next = el.scrollLeft + pxPerMs * dt
        if (next >= half) next -= half
        if (next < 0) next += half
        el.scrollLeft = next
      }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    const onTouchStart = () => {
      paused = true
    }
    const onTouchEnd = () => {
      paused = false
      // 2.5s grace period — long enough for iOS momentum to settle.
      resumeAt = performance.now() + 2500
      lastTs = performance.now()
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [durationSec, reverse])

  return (
    <div
      ref={ref}
      className={`${styles.viewport} ${styles.viewportMobile} ${styles.viewportInteractive}`}
    >
      <div className={styles.track}>
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
