import VideoReel from '@/components/home/VideoReel'
import ClientLogos from '@/components/home/ClientLogos'
import { featuredProjects } from '@/data/projects'

export default function HomePage() {
  return (
    <main>
      <VideoReel projects={featuredProjects} />
      <ClientLogos />
    </main>
  )
}
