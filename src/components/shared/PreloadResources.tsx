'use client'

import ReactDOM from 'react-dom'
import { CDN_ORIGIN } from '@/lib/cdn'

// Open the TCP + TLS handshake to the R2 CDN as soon as the document
// starts streaming, so the first <video> Range request doesn't pay for
// connection setup. Pairs with the Cloudflare Cache Rules that bypass
// cache for .mp4/.webm under cdn.etheraerial.com — without preconnect,
// Safari/iOS waits on the cold connect before issuing range requests
// and the reel appears to "stall, then load all at once".
export default function PreloadResources() {
  ReactDOM.preconnect(CDN_ORIGIN, { crossOrigin: 'anonymous' })
  ReactDOM.prefetchDNS(CDN_ORIGIN)
  return null
}
