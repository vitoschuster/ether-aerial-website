import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/siteConfig'

// Rendered once at build time into out/robots.txt (output: 'export').
// Cloudflare prepends its managed AI-crawler block to this file at the edge.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
