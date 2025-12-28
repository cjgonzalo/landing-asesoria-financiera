"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, BarChart3, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const marketCards = [
  {
    title: "Dólar",
    description: "Cotizaciones y bandas cambiarias",
    href: "/dolar",
    icon: TrendingUp,
    // Replace this placeholder with your desired image
    image: "/financial-charts-candlestick-trading.jpg",
  },
  {
    title: "Indicadores",
    description: "Inflación y riesgo país",
    href: "/indicadores",
    icon: BarChart3,
    // Replace this placeholder with your desired image
    image: "/statistics-bar-charts-data-analytics.jpg",
  },
  {
    title: "Flujos",
    description: "Calendario de vencimientos",
    href: "/flujos",
    icon: Calendar,
    // Replace this placeholder with your desired image
    image: "/calendar-financial-planning-schedule.jpg",
  },
]

export function MarketSectionCards() {
  return (
    <section id="mercado" className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Mercado</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Datos e indicadores clave para acompañar la toma de decisiones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {marketCards.map((card, index) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={card.href}>
                <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                  {/* Background Image with Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <div className="mb-4">
                      <card.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-white/90 mb-4">{card.description}</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-fit transition-transform group-hover:translate-x-1"
                    >
                      Ver
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Hover Shadow Effect */}
                  <div className="absolute inset-0 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
