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
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`${styles.nav} ${!visible && !menuOpen ? styles.navHidden : ''}`}
      >
        <div className={styles.inner}>
          {/* Logo: icon + wordmark text */}
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo-icon-white.png"
              alt=""
              width={40}
              height={40}
              priority
              className={styles.logoIcon}
            />
            <span className={styles.logoText}>ETHER AERIAL.</span>
          </Link>

          {/* Desktop nav links (≥1024px only) */}
          <nav className={styles.links}>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${pathname === item.href ? styles.linkActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger (tablet + mobile only, <1024px) */}
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

      {/* Full-screen overlay menu */}
      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
        <nav className={styles.menuLinks}>
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.menuLink}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${i * 55 + 80}ms` : '0ms' }}
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
            {Object.entries(siteConfig.socials).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
