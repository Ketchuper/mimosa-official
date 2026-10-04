import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { anton, inter } from '@/lib/fonts'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.m-i-m-o-s-a.com'),
  title: 'MIMO$A | Shops in Okinawa',
  description: 'Discover MIMO$A shops in Okinawa.',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${anton.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
