"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { InflationData } from "@/types/market"

interface IndicatorsChartsProps {
  monthlyInflation: InflationData[]
  annualInflation: InflationData[]
  countryRisk: InflationData[]
}

export function IndicatorsCharts({ monthlyInflation, annualInflation, countryRisk }: IndicatorsChartsProps) {
  const lastUpdateMonthly = monthlyInflation[monthlyInflation.length - 1]?.fecha
  const lastUpdateAnnual = annualInflation[annualInflation.length - 1]?.fecha
  const lastUpdateRisk = countryRisk[countryRisk.length - 1]?.fecha

  return (
    <div className="space-y-12">
      {/* Monthly Inflation */}
      <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">Inflación Mensual</h3>
            <p className="text-sm text-muted-foreground mt-1">Últimos 12 meses</p>
          </div>
          {lastUpdateMonthly && (
            <div className="text-sm text-muted-foreground">
              Última actualización:{" "}
              {new Date(lastUpdateMonthly).toLocaleDateString("es-AR", {
                month: "long",
                year: "numeric",
              })}
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyInflation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, "Inflación"]}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
            />
            <Bar dataKey="valor" fill="#1b4db1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Annual Inflation */}
      <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">Inflación Interanual</h3>
            <p className="text-sm text-muted-foreground mt-1">Últimos 12 meses</p>
          </div>
          {lastUpdateAnnual && (
            <div className="text-sm text-muted-foreground">
              Última actualización:{" "}
              {new Date(lastUpdateAnnual).toLocaleDateString("es-AR", {
                month: "long",
                year: "numeric",
              })}
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={annualInflation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, "Inflación Interanual"]}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
            />
            <Bar dataKey="valor" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Country Risk */}
      <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">Riesgo País</h3>
            <p className="text-sm text-muted-foreground mt-1">Últimos 12 meses</p>
          </div>
          {lastUpdateRisk && (
            <div className="text-sm text-muted-foreground">
              Última actualización:{" "}
              {new Date(lastUpdateRisk).toLocaleDateString("es-AR", {
                month: "long",
                year: "numeric",
              })}
            </div>
          )}
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={countryRisk} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "12px" }} />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [value.toFixed(0), "Riesgo País"]}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
            />
            <Line type="monotone" dataKey="valor" stroke="#dc2626" strokeWidth={3} dot={{ fill: "#dc2626", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
