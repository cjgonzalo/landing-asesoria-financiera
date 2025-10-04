"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroParallax(
  { whatsAppRef }: { whatsAppRef: string }
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleWhatsAppClick = () => {
    window.open(whatsAppRef, "_blank")
  }

  const handleScheduleClick = () => {
    // This will trigger the contact modal
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20"
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/financial-charts-and-graphs-background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,77,177,0.1),transparent_70%)]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Ordená tus finanzas. <span className="text-primary">Invertí con un plan claro.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          >
            Asesoría personalizada por Darío Obregón. Tu dinero, con propósito. Planificá, invertí y dormí tranquilo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleScheduleClick}
              className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-analytics="cta_hero"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar asesoría
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleWhatsAppClick}
              className="text-lg px-8 py-6 rounded-2xl border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
              data-analytics="cta_whatsapp"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>+120 planes diseñados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              {/* TODO: agregar entidad expendedora de certificacion */}
              <span>Asesor certificado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Consulta inicial gratuita</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
