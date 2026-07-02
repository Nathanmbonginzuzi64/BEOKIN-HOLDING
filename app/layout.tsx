import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvidersLoader } from '@/components/app-providers-loader'
import { PwaRegister } from '@/components/pwa-register'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BEOKIN HOLDING SARL - Services Informatiques',
  description: 'BEOKIN HOLDING SARL - Votre partenaire technologique en RDC et à l\'international. Expertise en développement, infrastructure IT et transformation digitale.',
  applicationName: 'BEOKIN HOLDING',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BEOKIN',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#12151c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <PwaRegister />
        <AppProvidersLoader>
          {children}
        </AppProvidersLoader>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
