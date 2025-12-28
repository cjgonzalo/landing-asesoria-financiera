"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { BandData } from "@/types/market"
import { formatARS } from "@/lib/format"

interface BandsChartProps {
  data: BandData[]
}

export function BandsChart({ data }: BandsChartProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">Evolución - Últimos 12 Meses</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} tickFormatter={(value) => `$${value.toFixed(0)}`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => formatARS(value)}
            labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={(value) => {
              const labels: Record<string, string> = {
                upper: "Banda Superior",
                lower: "Banda Inferior",
                official: "Dólar Oficial",
              }
              return labels[value] || value
            }}
          />
          <Line
            type="monotone"
            dataKey="upper"
            stroke="#dc2626"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="upper"
          />
          <Line
            type="monotone"
            dataKey="lower"
            stroke="#16a34a"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="lower"
          />
          <Line
            type="monotone"
            dataKey="official"
            stroke="#1b4db1"
            strokeWidth={3}
            dot={{ fill: "#1b4db1", r: 4 }}
            name="official"
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        * Cálculo estimado según regla fija de actualización mensual. Los datos son informativos y pueden presentar
        demoras.
      </p>
    </div>
  )
}
