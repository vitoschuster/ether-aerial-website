import type { Metadata } from 'next'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/shared/LoadingScreen'
import PreloadResources from '@/components/shared/PreloadResources'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://etheraerial.com'),
  title: {
    default: 'Ether Aerial — Cinematic Drone Cinematography',
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
    title: 'Ether Aerial — Cinematic Drone Cinematography',
    description:
      'Award-winning drone cinematography studio based in Croatia. Clients include BMW, Porsche, Opel, and major Balkan film productions.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ether Aerial — Cinematic Drone Cinematography',
    description: 'Award-winning drone cinematography studio based in Croatia.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PreloadResources />
        <LoadingScreen />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
