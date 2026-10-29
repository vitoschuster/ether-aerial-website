import { projects, type Category } from '@/data/projects'
import { services } from '@/data/services'
import { siteConfig, instagramProfileUrl } from '@/data/siteConfig'

// /llms.txt (https://llmstxt.org): a plain-Markdown map of the site for LLMs.
// Generated at build time from the same data the pages use, so it can't drift
// when projects or services change. Facts only from the site itself.
export const dynamic = 'force-static'

const CATEGORY_LABEL: Record<Category, string> = {
  automotive: 'Automotive',
  film: 'Film & TV',
  music: 'Music video',
  commercial: 'Commercial',
  showreel: 'Showreel',
}

const url = (path: string) => new URL(path, siteConfig.url).href

function projectLine(p: (typeof projects)[number]) {
  const facts = [p.client, String(p.year), CATEGORY_LABEL[p.category]]
  if (p.label) facts.push(`label: ${p.label}`)
  const desc = p.description ? ` ${p.description}` : ''
  return `- [${p.title}](${url(`/projects/${p.slug}`)}): ${facts.join(', ')}.${desc}`
}

export function GET() {
  const body = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.name} is an aerial cinematography studio based in Croatia, founded by Fran Kaic, that films cinematic drone footage for automotive brands, film productions, music videos and commercial campaigns.`,
    '',
    siteConfig.description,
    '',
    `Contact: ${siteConfig.email}, ${siteConfig.phone}. Instagram: ${instagramProfileUrl}`,
    '',
    '## Pages',
    '',
    `- [Home](${url('/')}): Video reel of featured projects and a "Trusted by" row of client logos.`,
    `- [Projects](${url('/projects')}): All ${projects.length} works across automotive, film & TV, music video and commercial projects.`,
    `- [Services](${url('/services')}): The drone platforms the studio flies: ${services.map((s) => s.title).join(', ')}.`,
    `- [About](${url('/about')}): The studio and its founder.`,
    '',
    '## Projects',
    '',
    ...projects.map(projectLine),
    '',
    '## Optional',
    '',
    `- [Instagram](${instagramProfileUrl}): The studio's Instagram profile.`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
