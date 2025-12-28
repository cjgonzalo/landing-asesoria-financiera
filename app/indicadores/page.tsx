import { Suspense } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { IndicatorsCharts } from "@/components/market/indicators-charts"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { InflationData } from "@/types/market"
import { parseDate, formatMonthLabel } from "@/lib/format"
import { INDICATORS_ENDPOINTS } from "@/lib/api-endpoints"
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_REF } from "@/lib/constants"

export const metadata = {
  title: "Indicadores Económicos | Darío Obregón",
  description: "Consulta los indicadores económicos de Argentina: inflación y riesgo país.",
}

async function getMonthlyInflation(): Promise<InflationData[]> {
  try {
    const res = await fetch(INDICATORS_ENDPOINTS.monthlyInflation, {
      next: { revalidate: 3600 }, // 1 hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch monthly inflation")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching monthly inflation:", error)
    return []
  }
}

async function getAnnualInflation(): Promise<InflationData[]> {
  try {
    const res = await fetch(INDICATORS_ENDPOINTS.annualInflation, {
      next: { revalidate: 3600 }, // 1 hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch annual inflation")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching annual inflation:", error)
    return []
  }
}

async function getCountryRisk(): Promise<InflationData[]> {
  try {
    const res = await fetch(INDICATORS_ENDPOINTS.countryRisk, {
      next: { revalidate: 3600 }, // 1 hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch country risk")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching country risk:", error)
    return []
  }
}

function processLast12Months(data: InflationData[]): InflationData[] {
  // Sort by date ascending
  const sorted = [...data].sort((a, b) => parseDate(a.fecha).getTime() - parseDate(b.fecha).getTime())

  // Get last 12 entries
  const last12 = sorted.slice(-12)

  // Add month label for charts
  return last12.map((item) => ({
    ...item,
    month: formatMonthLabel(parseDate(item.fecha)),
  }))
}

async function IndicatorsContent() {
  const [monthlyData, annualData, riskData] = await Promise.all([
    getMonthlyInflation(),
    getAnnualInflation(),
    getCountryRisk(),
  ])

  if (monthlyData.length === 0 && annualData.length === 0 && riskData.length === 0) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar datos</AlertTitle>
        <AlertDescription>
          No se pudieron obtener los indicadores económicos. Por favor, intente más tarde.
        </AlertDescription>
      </Alert>
    )
  }

  const monthlyInflation = processLast12Months(monthlyData)
  const annualInflation = processLast12Months(annualData)
  const countryRisk = processLast12Months(riskData)

  return (
    <>
      <IndicatorsCharts
        monthlyInflation={monthlyInflation}
        annualInflation={annualInflation}
        countryRisk={countryRisk}
      />

      {/* Disclaimer */}
      <p className="text-sm text-muted-foreground text-center mt-8">
        Los datos son informativos y pueden presentar demoras. No constituyen recomendación de inversión.
      </p>
    </>
  )
}

function IndicatorsSkeleton() {
  return (
    <div className="space-y-12">
      <Skeleton className="h-96 rounded-2xl" />
      <Skeleton className="h-96 rounded-2xl" />
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  )
}

export default function IndicadoresPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Indicadores Económicos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Consulta la evolución de la inflación mensual, interanual y el riesgo país de Argentina.
            </p>
          </div>

          <Suspense fallback={<IndicatorsSkeleton />}>
            <IndicatorsContent />
          </Suspense>
        </div>
      </main>
      <Footer contactEmail={CONTACT_EMAIL} contactPhone={CONTACT_PHONE} />
      <WhatsAppFloat whatsAppRef={WHATSAPP_REF} />
    </div>
  )
}
