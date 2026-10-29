import type { Metadata } from 'next'
import VideoReel from '@/components/home/VideoReel'
import ClientLogos from '@/components/home/ClientLogos'
import { featuredProjects } from '@/data/projects'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main>
      {/* The hero is a video reel with no visible headline, so the page h1
          is visually hidden: it names the studio for search engines,
          screen readers and AI crawlers without changing the design. */}
      <h1 className="visually-hidden">
        Ether Aerial, drone cinematography studio based in Croatia
      </h1>
      <VideoReel projects={featuredProjects} />
      <ClientLogos />
    </main>
  )
}
