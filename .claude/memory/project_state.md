---
name: Ether Aerial — build state
description: What has been built so far and what remains
type: project
---

**Built (session 2, 2026-03-31):** Full site scaffold is complete and builds cleanly (27 static pages).

Files created:
- `src/data/siteConfig.ts` — nav, email, phone, socials
- `src/data/projects.ts` — 20 projects, 7 featured (homepage reel), typed with slug/poster/videoSrc/youtubeId
- `src/data/services.ts` — 4 platforms: Cinelifter FPV, DJI Inspire 3, Gimbal FPV, Racing FPV
- `src/hooks/useInView.ts`, `useMediaQuery.ts`
- `src/components/layout/Navigation.tsx/.module.css` — fixed transparent nav, scroll-blur, hamburger mobile menu
- `src/components/layout/Footer.tsx/.module.css` — André Larsen-style contact form (mailto fallback), socials
- `src/components/home/VideoReel.tsx/.module.css` — scroll-snap container, right-edge progress bar + dots
- `src/components/home/VideoPanel.tsx/.module.css` — 100svh panel, poster/video bg, play button (solid white), YouTube overlay modal
- `src/components/home/ClientLogos.tsx/.module.css` — marquee strip
- `src/components/shared/ProjectCard.tsx/.module.css` — hover play reveal, 16:9 thumb
- `src/app/layout.tsx` — Inter font, Navigation + Footer in root layout
- `src/app/page.tsx` — VideoReel + ClientLogos
- `src/app/about/page.tsx/.module.css`
- `src/app/services/page.tsx/.module.css` — alternating image/text layout
- `src/app/projects/page.tsx/.module.css` — 3-col grid
- `src/app/projects/[slug]/page.tsx/.module.css` — hero + details + related

**Remaining:**
- Videos not yet uploaded to Cloudflare R2 — `videoSrc` fields in projects.ts are commented out
- YouTube IDs for music videos are empty strings — need Fran to supply
- Client logo images not yet in `/public/images/logos/` — using text marquee as fallback
- No real OG image at `/public/images/og-image.jpg`
- `metadataBase` warning — add to layout.tsx once domain is confirmed
- No Cloudflare Pages deployment config yet
- Consider adding Framer Motion page transitions and AnimateOnScroll

**Why:** Site migrating from Wix to custom Next.js. Full project summary in main chat context.
**How to apply:** When adding videos, uncomment `videoSrc` in projects.ts and set the R2 URL. When adding YouTube IDs, set `youtubeId` string.
