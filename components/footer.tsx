"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, MessageCircle, Clock, Linkedin, Instagram, Twitter, Users } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">DO | Asesor Financiero</h3>
              <p className="text-background/80 leading-relaxed text-pretty">
                Tu asesor financiero de confianza en Argentina. Transformamos tu relación con el dinero a través de
                estrategias personalizadas y educación financiera integral.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent border-background/20 text-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
                onClick={() => window.open("https://linkedin.com/in/dario-obregon", "_blank")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent border-background/20 text-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
                onClick={() => window.open("https://www.instagram.com/asesordarioobregon?igsh=MTJhNTQyNWVyY29iNQ==", "_blank")}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent border-background/20 text-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
                onClick={() => window.open("https://twitter.com/dario_obregon", "_blank")}
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-primary">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80 text-sm">Email</p>
                  <a href="mailto:dario@ejemplo.com" className="text-background hover:text-primary transition-colors">
                    dario@ejemplo.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80 text-sm">WhatsApp</p>
                  <a
                    href="https://wa.me/54911XXXXYYYY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:text-primary transition-colors"
                  >
                    +54 9 11 XXXX-YYYY
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80 text-sm">Comunidad WhatsApp</p>
                  <a
                    href="https://chat.whatsapp.com/CaR5OUA9IMs1IsEfJ9F0WS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:text-primary transition-colors"
                  >
                    Unite a la comunidad
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/80 text-sm">Horario</p>
                  <p className="text-background">Lun-Vie: 9:00-18:00</p>
                  <p className="text-background">Sáb: 9:00-13:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-primary">Legal</h4>
            <div className="space-y-3">
              <Link
                href="/politica-privacidad"
                className="block text-background/80 hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos-condiciones"
                className="block text-background/80 hover:text-primary transition-colors"
              >
                Términos y Condiciones
              </Link>
              <div className="pt-4">
                <p className="text-background/60 text-sm leading-relaxed">
                  Las inversiones conllevan riesgos. Los rendimientos pasados no garantizan resultados futuros. Toda
                  recomendación será personalizada según tu perfil de riesgo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-background/60 text-sm">© {currentYear} Darío Obregón. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}
