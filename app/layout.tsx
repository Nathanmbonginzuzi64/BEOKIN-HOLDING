import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvidersLoader } from '@/components/app-providers-loader'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BEOKIN HOLDING SARL - Services Informatiques',
  description: 'BEOKIN HOLDING SARL - Votre partenaire technologique en RDC et à l\'international. Expertise en développement, infrastructure IT et transformation digitale.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){if(!("serviceWorker"in navigator))return;navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(x){x.unregister()})});if("caches"in window)caches.keys().then(function(k){k.forEach(function(n){caches.delete(n)})})})();`,
            }}
          />
        )}
        <AppProvidersLoader>
          {children}
        </AppProvidersLoader>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
