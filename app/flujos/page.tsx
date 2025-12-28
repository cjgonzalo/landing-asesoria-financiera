import { Suspense } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { FlowsCalendar } from "@/components/market/flows-calendar"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { FlowInstrument } from "@/types/market"
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_REF } from "@/helpers/contact.helper"

export const metadata = {
  title: "Flujos y Vencimientos | Darío Obregón",
  description: "Consulta el calendario de vencimientos de instrumentos financieros.",
}

async function getFlows(): Promise<FlowInstrument[]> {
  try {
    const res = await fetch("https://www.acuantoesta.com.ar/api/flujos",
      { next: { revalidate: 3600 } } // 1 hour
    )

    if (!res.ok) {
      throw new Error("Failed to fetch flows")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching flows:", error)
    return []
  }
}

async function FlowsContent() {
  const instruments = await getFlows()

  if (instruments.length === 0) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar datos</AlertTitle>
        <AlertDescription>No se pudieron obtener los datos de flujos. Por favor, intente más tarde.</AlertDescription>
      </Alert>
    )
  }

  return <FlowsCalendar instruments={instruments} />
}

function FlowsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 max-w-md mx-auto rounded-lg" />
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default function FlujosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Flujos y Vencimientos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Consulta el calendario de vencimientos de instrumentos financieros y sus próximos flujos de pago.
            </p>
          </div>

          <Suspense fallback={<FlowsSkeleton />}>
            <FlowsContent />
          </Suspense>
        </div>
      </main>
      <Footer contactEmail={CONTACT_EMAIL} contactPhone={CONTACT_PHONE}/>
      <WhatsAppFloat whatsAppRef={WHATSAPP_REF}/>
    </div>
  )
}
