// Canonical CDN base URL for video/image assets served from Cloudflare R2.
// Default points at the custom domain (cdn.etheraerial.com) so a forgotten
// env var doesn't silently fall back to the public pub-HASH.r2.dev origin —
// which has no Cache Rules attached and behaves differently for Range
// requests on Safari/iOS.
const DEFAULT_CDN_URL = 'https://cdn.etheraerial.com'

export const CDN_URL = (process.env.NEXT_PUBLIC_R2_BASE_URL ?? DEFAULT_CDN_URL).replace(/\/+$/, '')

// Origin form (scheme + host) for resource hints like preconnect/dns-prefetch.
export const CDN_ORIGIN = new URL(CDN_URL).origin

export function cdn(filename: string): string {
  return `${CDN_URL}/${encodeURIComponent(filename)}`
}
