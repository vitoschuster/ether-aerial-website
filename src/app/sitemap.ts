import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { siteConfig } from '@/data/siteConfig'

// Rendered once at build time into out/sitemap.xml (output: 'export').
export const dynamic = 'force-static'

// Every real route. No lastModified: the data has no per-page edit dates,
// and a build timestamp would claim every page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/projects', '/services', '/about']
  return [
    ...pages.map((path) => ({ url: new URL(path, siteConfig.url).href })),
    ...projects.map((p) => ({ url: new URL(`/projects/${p.slug}`, siteConfig.url).href })),
  ]
}
