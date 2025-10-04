import { HeroParallax } from "@/components/hero-parallax"
import { About } from "@/components/about"
import { ServicesFlip } from "@/components/services-flip"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { ContactModal } from "@/components/contact-modal"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_REF } from "@/helpers/contact.helper"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <main>
        <HeroParallax
          whatsAppRef={WHATSAPP_REF}
        />
        <About />
        <ServicesFlip />
        <ReviewsCarousel />
        <div id="contact" className="scroll-mt-20">
          <ContactModal 
            contactEmail={CONTACT_EMAIL}
            contactPhone={CONTACT_PHONE}
          />
        </div>
      </main>
      <Footer 
        contactEmail={CONTACT_EMAIL}
        contactPhone={CONTACT_PHONE}
      />
      <WhatsAppFloat 
        whatsAppRef={WHATSAPP_REF}
      />
    </div>
  )
}
