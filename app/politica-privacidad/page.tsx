import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Política de Privacidad | Darío Obregón - Asesor Financiero",
  description: "Política de privacidad y tratamiento de datos personales de Darío Obregón, Asesor Financiero.",
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Política de Privacidad</h1>
          <p className="text-muted-foreground">Última actualización: Enero 2025</p>
        </div>

        <Card className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Información que recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Recopilamos información personal que nos proporcionas voluntariamente cuando solicitas nuestros servicios
              de asesoramiento financiero, incluyendo nombre, apellido, email, ocupación, provincia, experiencia en
              inversiones y objetivos financieros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso de la información</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Utilizamos tu información personal para:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Brindar asesoramiento financiero personalizado</li>
              <li>Contactarte para coordinar consultas y seguimientos</li>
              <li>Desarrollar estrategias de inversión adaptadas a tu perfil</li>
              <li>Cumplir con obligaciones legales y regulatorias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Protección de datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información
              personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Compartir información</h2>
            <p className="text-muted-foreground leading-relaxed">
              No vendemos, intercambiamos ni transferimos tu información personal a terceros sin tu consentimiento,
              excepto cuando sea requerido por ley o para cumplir con obligaciones regulatorias del sector financiero.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Tus derechos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Conforme a la Ley de Protección de Datos Personales (Ley 25.326), tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Rectificar datos inexactos o incompletos</li>
              <li>Suprimir tu información cuando corresponda</li>
              <li>Oponerte al tratamiento de tus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para ejercer tus derechos o realizar consultas sobre esta política, contactanos en{" "}
              <a href="mailto:dario@ejemplo.com" className="text-primary hover:underline">
                dario@ejemplo.com
              </a>
            </p>
          </section>
        </Card>
      </div>
    </div>
  )
}
