'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Hold the splash until VideoReel primes the first panel (or 5s passes).
    // A minimum of 1.6s keeps the brand animation from flashing off too fast
    // on fast connections / warm caches.
    const MIN_MS = 1600
    const MAX_MS = 5000
    const mountTime = Date.now()
    let closed = false

    const close = () => {
      if (closed) return
      closed = true
      const elapsed = Date.now() - mountTime
      const wait = Math.max(0, MIN_MS - elapsed)
      window.setTimeout(() => setGone(true), wait)
    }

    const onPrimed = () => close()
    window.addEventListener('reel-primed', onPrimed)
    const fallback = window.setTimeout(close, MAX_MS)

    return () => {
      window.removeEventListener('reel-primed', onPrimed)
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = '' }}>
      {!gone && (
        <motion.div
          className={styles.screen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/logo-icon-white.png"
              alt="Ether Aerial"
              width={64}
              height={64}
              priority
              className={styles.icon}
            />
          </motion.div>

          <motion.p
            className={styles.brand}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            ETHER AERIAL.
          </motion.p>

          {/* Underline draw */}
          <motion.div
            className={styles.line}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            Aerial Cinematography
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
