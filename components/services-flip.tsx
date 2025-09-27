"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Target, TrendingUp, ShieldCheck, CheckCircle } from "lucide-react"
import { services } from "@/data/services"

const iconMap = {
  target: Target,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
}

export function ServicesFlip() {
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  const toggleCard = (cardId: number) => {
    setFlippedCards((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
  }

  return (
    <section id="services" className="py-20 bg-secondary/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Mis <span className="text-primary">Servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Soluciones financieras integrales diseñadas para tu éxito
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            const isFlipped = flippedCards.includes(service.id)

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flip-card"
                onClick={() => toggleCard(service.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleCard(service.id)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isFlipped}
                aria-label={`${service.title} - ${isFlipped ? "Ver frente" : "Ver detalles"}`}
              >
                <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                  {/* Front */}
                  <Card className="flip-card-front bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center cursor-pointer">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 text-balance">{service.title}</h3>
                    <p className="text-muted-foreground text-pretty">{service.frontDescription}</p>
                    <div className="mt-6 text-sm text-primary font-medium">Toca para ver detalles →</div>
                  </Card>

                  {/* Back */}
                  <Card className="flip-card-back bg-primary text-primary-foreground shadow-lg p-6 flex h-full flex-col overflow-hidden cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-6 w-6" />
                      <span className="text-sm opacity-80">← Toca para volver</span>
                    </div>
                    <h3 className="text-lg font-bold mb-4 text-balance">{service.title}</h3>
                    <p className="text-sm mb-6 opacity-90 text-pretty">{service.backDescription}</p>
                    <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm opacity-90">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-card border-border shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">¿Listo para transformar tus finanzas?</h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              Comenzá con una consulta gratuita de 20 minutos donde analizaremos tu situación actual y definiremos los
              primeros pasos hacia tus objetivos financieros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium hover:bg-primary/90 transition-colors"
                data-analytics="cta_services"
              >
                Agendar consulta gratuita
              </button>
              <button
                onClick={() => window.open("https://wa.me/54911XXXXYYYY", "_blank")}
                className="border border-border px-6 py-3 rounded-2xl font-medium hover:bg-secondary transition-colors"
                data-analytics="cta_whatsapp_services"
              >
                Consultar por WhatsApp
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
