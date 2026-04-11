'use client'

import { useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/siteConfig'
import styles from './Footer.module.css'

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // mailto fallback — swap for actual API route when backend is ready
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Start a project</p>
          <h2 className={styles.heading}>{siteConfig.tagline}</h2>
          <div className={styles.contactDetails}>
            <a href={`mailto:${siteConfig.email}`} className={styles.contactLink}>
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone}`} className={styles.contactLink}>
              {siteConfig.phone}
            </a>
          </div>
          <div className={styles.socials}>
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell us about your project..."
              required
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className={styles.submit}
            disabled={status === 'sending' || status === 'sent'}
          >
            {status === 'sent' ? 'Message sent' : 'Start a project'}
          </button>
        </form>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Ether Aerial. All rights reserved.</p>
        <nav className={styles.bottomNav}>
          {siteConfig.nav.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
