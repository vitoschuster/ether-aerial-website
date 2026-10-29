import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/shared/LoadingScreen'
import PreloadResources from '@/components/shared/PreloadResources'
import StructuredData from '@/components/shared/StructuredData'
import { siteConfig } from '@/data/siteConfig'
import './globals.css'

export const metadata: Metadata = {
  // Canonical URLs are set per page (alternates.canonical), not here, so
  // routes never inherit the home page's canonical.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Ether Aerial — Drone Cinematography',
    template: '%s | Ether Aerial',
  },
  description:
    'Award-winning drone cinematography studio based in Croatia. Clients include BMW, Porsche, Opel, and major Balkan film productions.',
  keywords: ['drone cinematography', 'aerial film', 'FPV', 'Croatia', 'BMW', 'Porsche'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://etheraerial.com',
    siteName: 'Ether Aerial',
    title: 'Ether Aerial — Drone Cinematography',
    description:
      'Award-winning drone cinematography studio based in Croatia. Clients include BMW, Porsche, Opel, and major Balkan film productions.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ether Aerial — Drone Cinematography',
    description: 'Award-winning drone cinematography studio based in Croatia.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <PreloadResources />
        <LoadingScreen />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
