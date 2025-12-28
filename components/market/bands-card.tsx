import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatARS } from "@/lib/format"
import { calculateBandsForMonth } from "@/lib/bands"
import { TrendingUp, TrendingDown } from "lucide-react"

export function BandsCard() {
  const baseMonth = "Abril 2025"
  const baseUpperBandValue = "$1400"
  const baseLowerBandValue = "$1000"
  const monthlyRate = "1%"
  const today = new Date()
  const { lower, upper } = calculateBandsForMonth(today)

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Bandas Cambiarias</CardTitle>
        <CardDescription>Las bandas cambiarias fueron implementadas en {baseMonth} con valores base de {baseUpperBandValue} para la banda superior y {baseLowerBandValue} para la banda inferior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <TrendingUp className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-red-900">Banda Superior</div>
            <div className="text-2xl font-bold text-red-600 my-1">{formatARS(upper)}</div>
            <div className="text-sm text-red-700">Actualización: +{monthlyRate} mensual</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
          <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-green-900">Banda Inferior</div>
            <div className="text-2xl font-bold text-green-600 my-1">{formatARS(lower)}</div>
            <div className="text-sm text-green-700">Actualización: -{monthlyRate} mensual</div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Las bandas se actualizan mensualmente de forma multiplicativa según la regla establecida.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
