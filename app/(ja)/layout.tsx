import React from "react"
import type { Metadata, Viewport } from 'next'
import { anton, inter } from '@/lib/fonts'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.m-i-m-o-s-a.com'),
  title: 'MIMO$A | Creative crew BASED IN OKINAWA',
  description: 'MIMO$A - A creative crew from Okinawa pushing boundaries in entertainment and fashion.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${anton.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
