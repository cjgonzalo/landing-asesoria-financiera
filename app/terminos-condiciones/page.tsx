import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Términos y Condiciones | Darío Obregón - Asesor Financiero",
  description: "Términos y condiciones del servicio de asesoramiento financiero de Darío Obregón.",
}

export default function TerminosCondicionesPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Términos y Condiciones</h1>
          <p className="text-muted-foreground">Última actualización: Enero 2025</p>
        </div>

        <Card className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Servicios ofrecidos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Darío Obregón ofrece servicios de asesoramiento financiero personalizado, incluyendo planificación
              financiera integral, diseño de carteras de inversión y estrategias de protección patrimonial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Naturaleza del asesoramiento</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              El asesoramiento financiero proporcionado es de carácter educativo y orientativo. Las decisiones de
              inversión finales son responsabilidad exclusiva del cliente.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Las inversiones conllevan riesgos inherentes</li>
              <li>Los rendimientos pasados no garantizan resultados futuros</li>
              <li>Toda recomendación se basa en la información proporcionada por el cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Responsabilidades del cliente</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">El cliente se compromete a:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Proporcionar información veraz y completa sobre su situación financiera</li>
              <li>Comunicar cambios relevantes en su perfil de riesgo u objetivos</li>
              <li>Tomar decisiones informadas basadas en el asesoramiento recibido</li>
              <li>Cumplir con los honorarios acordados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitación de responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              El asesor no será responsable por pérdidas financieras derivadas de decisiones de inversión del cliente,
              cambios en las condiciones del mercado, o información incorrecta proporcionada por el cliente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Confidencialidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Toda información financiera y personal compartida durante el proceso de asesoramiento será tratada con
              estricta confidencialidad y no será divulgada a terceros sin consentimiento expreso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos términos pueden ser modificados en cualquier momento. Los cambios serán comunicados a los clientes
              activos y publicados en este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Jurisdicción</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será resuelta en los
              tribunales competentes de la Ciudad Autónoma de Buenos Aires.
            </p>
          </section>
        </Card>
      </div>
    </div>
  )
}
