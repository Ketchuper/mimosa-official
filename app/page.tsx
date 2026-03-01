"use client"

import { CustomCursor } from "@/components/custom-cursor"

import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroSection } from "@/components/hero-section"
import { LatestNews } from "@/components/latest-news"
import { MediaSection } from "@/components/media-section"
import { CrewSection } from "@/components/crew-section"
import { PartnersMarquee } from "@/components/partners-marquee"
import { SpotsSection } from "@/components/spots-section"
import { ContactSection } from "@/components/contact-section"
import { BusinessSection } from "@/components/business-section"
import { BookUsCta } from "@/components/book-us-cta"
import { FloatingPlayer } from "@/components/floating-player"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <CustomCursor />

        
        <HeroSection />
        <LatestNews />
        <MediaSection />
        <CrewSection />
        <BusinessSection />
        <SpotsSection />
        <PartnersMarquee />
        <BookUsCta />
        <ContactSection />
        <Footer />
        <FloatingPlayer />
      </main>
    </SmoothScroll>
  )
}
