import { siteConfig, instagramProfileUrl } from '@/data/siteConfig'

// Schema.org JSON-LD for search engines and AI crawlers. Only facts that are
// already published on the site: name, description, contact details and the
// Instagram profile (siteConfig), the founder (About page), and the country
// ("based in Croatia"). No street address is published, so this stays an
// Organization rather than a LocalBusiness. The logo is the site icon (the
// brand mark on a dark square), which stays visible on white backgrounds.
const ORG_ID = `${siteConfig.url}/#organization`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      founder: { '@type': 'Person', name: 'Fran Kaic' },
      address: { '@type': 'PostalAddress', addressCountry: 'HR' },
      sameAs: [instagramProfileUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
    },
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a value can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
