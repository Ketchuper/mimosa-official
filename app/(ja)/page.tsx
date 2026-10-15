"use client"

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

export default function Home() {
  return (
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
  )
}
