"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { MonthCalendar } from "./month-calendar"
import type { FlowInstrument } from "@/types/market"

interface FlowsCalendarProps {
  instruments: FlowInstrument[]
}

interface MonthEvent {
  date: number
  instruments: FlowInstrument[]
}

interface MonthData {
  year: number
  month: number
  events: MonthEvent[]
}

export function FlowsCalendar({ instruments }: FlowsCalendarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter instruments based on search query
  const filteredInstruments = useMemo(() => {
    if (!searchQuery.trim()) return instruments

    const query = searchQuery.toLowerCase()
    return instruments.filter((instrument) => instrument.ticker.toLowerCase().includes(query))
  }, [instruments, searchQuery])

  // Group instruments by month
  const monthsData = useMemo(() => {
    const monthsMap = new Map<string, MonthData>()

    filteredInstruments.forEach((instrument) => {
      const vencimiento = new Date(instrument.vencimiento)
      const year = vencimiento.getFullYear()
      const month = vencimiento.getMonth()
      const day = vencimiento.getDate()
      const key = `${year}-${month}`

      if (!monthsMap.has(key)) {
        monthsMap.set(key, {
          year,
          month,
          events: [],
        })
      }

      const monthData = monthsMap.get(key)!
      const existingEvent = monthData.events.find((e) => e.date === day)

      if (existingEvent) {
        existingEvent.instruments.push(instrument)
      } else {
        monthData.events.push({
          date: day,
          instruments: [instrument],
        })
      }
    })

    // Convert to array and sort by date
    return Array.from(monthsMap.values()).sort((a, b) => {
      const dateA = new Date(a.year, a.month)
      const dateB = new Date(b.year, b.month)
      return dateA.getTime() - dateB.getTime()
    })
  }, [filteredInstruments])

  // If no search query, show next 12 months from today or available months
  const displayMonths = useMemo(() => {
    if (searchQuery.trim()) {
      return monthsData
    }

    // Show next 12 months with data or at least from current month
    const today = new Date()
    const maxMonths = 12
    const result: MonthData[] = []

    // If we have data, show months with vencimientos
    if (monthsData.length > 0) {
      return monthsData.slice(0, maxMonths)
    }

    // Otherwise show next 12 months (empty)
    for (let i = 0; i < maxMonths; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1)
      result.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        events: [],
      })
    }

    return result
  }, [monthsData, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {filteredInstruments.length} instrumento(s) encontrado(s)
          </p>
        )}
      </div>

      {/* Calendar grid */}
      {displayMonths.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {displayMonths.map((monthData) => (
            <MonthCalendar
              key={`${monthData.year}-${monthData.month}`}
              year={monthData.year}
              month={monthData.month}
              events={monthData.events}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron vencimientos para la búsqueda.</p>
        </div>
      )}
    </div>
  )
}
