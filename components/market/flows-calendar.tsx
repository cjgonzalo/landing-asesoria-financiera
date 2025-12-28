"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { MonthCalendar } from "./month-calendar"
import type { FlowInstrument } from "@/types/market"

interface FlowsCalendarProps {
  instruments: FlowInstrument[]
}

// Helper to parse DD/MM/YYYY format
function parseDateString(dateStr: string): { year: number; month: number; day: number } {
  const [day, month, year] = dateStr.split("/").map(Number)
  return { day, month: month - 1, year } // month is 0-indexed for Date
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
  const [showOnlyWithEvents, setShowOnlyWithEvents] = useState(false)

  // Filter instruments based on search query
  const filteredInstruments = useMemo(() => {
    if (!searchQuery.trim()) return instruments

    const query = searchQuery.toLowerCase()
    return instruments.filter((instrument) => instrument.ticker.toLowerCase().includes(query))
  }, [instruments, searchQuery])

  // Build next 12 months (current month + next 11) and attach events from filtered instruments
  const monthsData = useMemo(() => {
    const today = new Date()
    const maxMonths = 12
    const monthsMap = new Map<string, MonthData>()

    // Pre-populate next 12 months
    for (let i = 0; i < maxMonths; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1)
      const year = date.getFullYear()
      const month = date.getMonth()
      const key = `${year}-${month}`

      monthsMap.set(key, {
        year,
        month,
        events: [],
      })
    }

    // Assign filtered instruments to their corresponding month if within the 12-month window
    filteredInstruments.forEach((instrument) => {
      const { day, month, year } = parseDateString(instrument.vencimiento)
      const key = `${year}-${month}`

      const monthData = monthsMap.get(key)
      if (!monthData) return // instrument is outside the 12-month window

      const existingEvent = monthData.events.find((e) => e.date === day)
      if (existingEvent) {
        existingEvent.instruments.push(instrument)
      } else {
        monthData.events.push({ date: day, instruments: [instrument] })
      }
    })

    // Convert to array and ensure chronological order
    return Array.from(monthsMap.values()).sort((a, b) => {
      const dateA = new Date(a.year, a.month)
      const dateB = new Date(b.year, b.month)
      return dateA.getTime() - dateB.getTime()
    })
  }, [filteredInstruments])

  // Group filtered instruments across all months (not limited to next 12)
  const monthsWithEventsAll = useMemo(() => {
    const map = new Map<string, MonthData>()

    filteredInstruments.forEach((instrument) => {
      const { day, month, year } = parseDateString(instrument.vencimiento)
      const key = `${year}-${month}`

      if (!map.has(key)) {
        map.set(key, { year, month, events: [] })
      }

      const monthData = map.get(key)!
      const existing = monthData.events.find((e) => e.date === day)
      if (existing) existing.instruments.push(instrument)
      else monthData.events.push({ date: day, instruments: [instrument] })
    })

    return Array.from(map.values()).sort((a, b) => {
      const dateA = new Date(a.year, a.month)
      const dateB = new Date(b.year, b.month)
      return dateA.getTime() - dateB.getTime()
    })
  }, [filteredInstruments])

  // Display the monthsData, optionally showing only months with events within the 12-month window
  const displayMonths = useMemo(() => {
    if (!showOnlyWithEvents) return monthsData
    
    // Filter to show only months with events (within the current month + next 11 months window)
    const today = new Date()
    return monthsWithEventsAll
      .filter(m => new Date(m.year, m.month).getTime() >= today.getTime())
      .slice(0, 12)

  }, [monthsData, showOnlyWithEvents])

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
        <div className="flex items-center justify-center gap-2 mt-3">
          <Checkbox
            id="only-with-events"
            checked={showOnlyWithEvents}
            onCheckedChange={(v) => setShowOnlyWithEvents(Boolean(v))}
          />
          <Label htmlFor="only-with-events" className="text-sm text-muted-foreground">
            Mostrar solo meses con vencimientos (primeros 12 meses)
          </Label>
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
          {displayMonths.map((monthData) => {
            // console.log({monthData})
            return (
            <MonthCalendar
              key={`${monthData.year}-${monthData.month}`}
              year={monthData.year}
              month={monthData.month}
              events={monthData.events}
            />
          )})}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron vencimientos para la búsqueda.</p>
        </div>
      )}
      {showOnlyWithEvents && displayMonths.length > 0 && displayMonths.length < 12 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No hay más vencimientos disponibles.</p>
        </div>
      )}
    </div>
  )
}
