import { HeroParallax } from "@/components/hero-parallax"
import { About } from "@/components/about"
import { ServicesFlip } from "@/components/services-flip"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { ContactModal } from "@/components/contact-modal"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <main>
        <HeroParallax />
        <About />
        <ServicesFlip />
        <ReviewsCarousel />
        <div id="contact" className="scroll-mt-20">
          <ContactModal />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
