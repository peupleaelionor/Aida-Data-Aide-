import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'AIDA — AI Data Aides | Find Government Benefits',
    template: '%s | AIDA',
  },
  description:
    'AI-powered platform connecting citizens with government benefits in 15+ countries. Discover eligibility, apply faster, and never miss a benefit you deserve.',
  keywords: ['government benefits', 'social welfare', 'eligibility checker', 'benefits finder', 'AI'],
  authors: [{ name: 'AIDA Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'AIDA — AI Data Aides',
    description: 'Find government benefits you qualify for — powered by AI.',
    siteName: 'AIDA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIDA — AI Data Aides',
    description: 'Find government benefits you qualify for — powered by AI.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
