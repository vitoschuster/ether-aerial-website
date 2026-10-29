export const siteConfig = {
  name: 'Ether Aerial',
  // Canonical origin — used for metadataBase, canonical URLs, sitemap, robots, JSON-LD, llms.txt.
  url: 'https://etheraerial.com',
  tagline: 'Cinematic aerial cinematography for brands that demand excellence.',
  description:
    'Drone cinematography studio based in Croatia. Clients include BMW, Porsche, Opel, and major Balkan productions.',
  email: 'info@etheraerial.com',
  phone: '+385 98 281 849',
  location: 'Croatia',
  socials: {
    instagram: 'https://www.instagram.com/ether_aerial?igsh=ZDE2MHk0YzNnNW9j&utm_source=qr',
  },
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '#contact' },
  ],
}

// Instagram profile URL without the share-sheet tracking params (igsh, utm_source).
export const instagramProfileUrl = (() => {
  const u = new URL(siteConfig.socials.instagram)
  return `${u.origin}${u.pathname.replace(/\/+$/, '')}/`
})()
