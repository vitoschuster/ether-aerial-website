'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/data/siteConfig'
import styles from './Navigation.module.css'

export default function Navigation() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setVisible(true)
      } else {
        setVisible(y < lastY.current)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`${styles.nav} ${!visible && !menuOpen ? styles.navHidden : ''}`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/logo-white.png"
              alt="Ether Aerial"
              width={200}
              height={52}
              priority
            />
          </Link>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Full-screen menu */}
      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
        <nav className={styles.menuLinks}>
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.menuLink}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              <span className={styles.menuNum}>{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.menuFooter}>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          <div className={styles.menuSocials}>
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={siteConfig.socials.vimeo} target="_blank" rel="noopener noreferrer">Vimeo</a>
          </div>
        </div>
      </div>
    </>
  )
}
