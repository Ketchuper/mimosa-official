import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroSection } from "@/components/hero-section"
import { LatestNews } from "@/components/latest-news"
import { SpotsSection } from "@/components/spots-section"
import { CrewSection } from "@/components/crew-section"
import { PartnersMarquee } from "@/components/partners-marquee"
import { BusinessSection } from "@/components/business-section"
import { CompanySection } from "@/components/company-section"
import { BookUsCta } from "@/components/book-us-cta"
import { ContactSection } from "@/components/contact-section"
import { FloatingPlayer } from "@/components/floating-player"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next'
import { homepageJsonLd } from '@/lib/site-structured-data'
import { SITE_URL, sitePageMetadata } from '@/lib/store-seo'

export const metadata: Metadata = sitePageMetadata({
  title: 'MIMO$A | Creative crew BASED IN OKINAWA',
  description: 'MIMO$A - A creative crew from Okinawa pushing boundaries in entertainment and fashion.',
  path: '/',
  locale: 'ja_JP',
})

export default function Home() {
  const jsonLd = homepageJsonLd(SITE_URL)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SmoothScroll>
        <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
          <CustomCursor />

          <HeroSection />
          <LatestNews />
          <SpotsSection />
          <BusinessSection />
          <CompanySection />
          <CrewSection />
          <PartnersMarquee />
          <BookUsCta />
          <ContactSection />
          <Footer />
          <FloatingPlayer />
        </main>
      </SmoothScroll>
    </>
  )
}
