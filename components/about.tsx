"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, ExternalLink, Award, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

export function About() {
  const credentials = [
    { icon: Award, text: "+120 planes financieros diseñados" },
    { icon: Users, text: "Miembro del Instituto Argentino de Mercado de Capitales" },
    { icon: TrendingUp, text: "Especialista en carteras diversificadas" },
    { icon: CheckCircle, text: "Certificación en Planificación Financiera" },
  ]

  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Sobre <span className="text-primary">Darío Obregón</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Tu asesor financiero de confianza en Argentina
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Darío+Obregón"
                  alt="Darío Obregón - Asesor Financiero"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/50 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Con más de 8 años de experiencia en el mercado financiero argentino, me especializo en ayudar a personas
                y familias a construir un futuro financiero sólido y sostenible.
              </p>
              <p>
                Mi enfoque se basa en la educación financiera y la construcción de estrategias personalizadas que se
                adapten a tu perfil de riesgo, objetivos y situación particular. Creo firmemente que cada persona merece
                tener control sobre sus finanzas y la tranquilidad de un plan bien estructurado.
              </p>
              <p>
                Trabajo con transparencia total, explicando cada decisión y asegurándome de que entiendas completamente
                tu estrategia de inversión. Tu éxito financiero es mi prioridad.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <credential.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{credential.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl bg-transparent"
                onClick={() => window.open("https://linkedin.com/in/dario-obregon", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver LinkedIn
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
