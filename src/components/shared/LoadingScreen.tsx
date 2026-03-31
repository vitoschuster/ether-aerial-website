'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setGone(true), 2200)
    return () => clearTimeout(t)
  }, [])

  const onExitComplete = () => {
    document.body.style.overflow = ''
  }

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {!gone && (
        <motion.div
          className={styles.screen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <motion.div
            className={styles.logo}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/logo-white.png"
              alt="Ether Aerial"
              width={220}
              height={56}
              priority
            />
          </motion.div>

          {/* Animated underline */}
          <motion.div
            className={styles.line}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Aerial Cinematography
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
