'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './AnimateOnScroll.module.css'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${visible ? styles.visible : ''} ${className ?? ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
