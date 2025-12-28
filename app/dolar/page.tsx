import { Suspense } from "react"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { DollarTable } from "@/components/market/dollar-table"
import { BandsCard } from "@/components/market/bands-card"
import { BandsChart } from "@/components/market/bands-chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { DollarRate, BandData } from "@/types/market"
import { getLastNMonths } from "@/lib/dates"
import { calculateBandsForMonth } from "@/lib/bands"
import { formatMonthLabel } from "@/lib/format"
import { DOLLAR_ENDPOINTS } from "@/lib/api-endpoints"
import { CONTACT_EMAIL, CONTACT_PHONE, WHATSAPP_REF } from "@/helpers/contact.helper"

export const metadata = {
  title: "Cotizaciones del Dólar | Darío Obregón",
  description: "Consulta las cotizaciones actuales del dólar y las bandas cambiarias.",
}

async function getDollarRates(): Promise<DollarRate[]> {
  try {
    const res = await fetch(DOLLAR_ENDPOINTS.current, {
      next: { revalidate: 300 }, // 5 minutes
    })

    if (!res.ok) {
      throw new Error("Failed to fetch dollar rates")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching dollar rates:", error)
    return []
  }
}

async function getHistoricalDollarRate(year: number, month: number, day: number): Promise<number | null> {
  try {
    // Check if the passed date is after today, if so use today's date
    const today = new Date()
    const passedDate = new Date(year, month - 1, day)

    const url = passedDate > today
      ? DOLLAR_ENDPOINTS.official
      : DOLLAR_ENDPOINTS.historical(year, month, day)
    
    const res = await fetch(url, { next: { revalidate: 86400 } }) // 24 hours - historical data doesn't change

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    // Return the selling price (venta) from the API response
    return data?.venta || null
  } catch (error) {
    console.error(`Error fetching historical rate for ${year}-${month}-${day}:`, error)
    return null
  }
}

async function generateChartData(): Promise<BandData[]> {
  const months = getLastNMonths(12)

  // Fetch historical rates for all months in parallel
  const chartDataPromises = months.map(async (date) => {
    const bands = calculateBandsForMonth(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    // Use the last day of the month for historical data
    const lastDay = new Date(year, month, 0).getDate()

    const historicalRate = await getHistoricalDollarRate(year, month, lastDay)

    return {
      month: formatMonthLabel(date),
      upper: bands.upper,
      lower: bands.lower,
      official: historicalRate || bands.lower, // Fallback to lower band if API fails
    }
  })

  const chartData = await Promise.all(chartDataPromises)
  return chartData
}

async function DollarContent() {
  const [rates, chartData] = await Promise.all([getDollarRates(), generateChartData()])

  if (rates.length === 0) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar datos</AlertTitle>
        <AlertDescription>
          No se pudieron obtener las cotizaciones del dólar. Por favor, intente más tarde.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <DollarTable rates={rates} />
        <BandsCard />
      </div>

      {/* Full Width Chart */}
      <BandsChart data={chartData} />

      {/* Disclaimer */}
      <p className="text-sm text-muted-foreground text-center mt-8">
        Los datos son informativos y pueden presentar demoras. No constituyen recomendación de inversión.
      </p>
    </>
  )
}

function DollarSkeleton() {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Skeleton className="h-96 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
      <Skeleton className="h-96 rounded-2xl" />
    </>
  )
}

export default function DollarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Cotizaciones del Dólar</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Consulta las cotizaciones actuales y la evolución de las bandas cambiarias.
            </p>
          </div>

          <Suspense fallback={<DollarSkeleton />}>
            <DollarContent />
          </Suspense>
        </div>
      </main>
      <Footer contactEmail={CONTACT_EMAIL} contactPhone={CONTACT_PHONE}/>
      <WhatsAppFloat whatsAppRef={WHATSAPP_REF}/>
    </div>
  )
}
