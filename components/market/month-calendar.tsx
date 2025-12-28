"use client"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FlowInstrument } from "@/types/market"

interface MonthEvent {
  date: number
  instruments: FlowInstrument[]
}

interface MonthCalendarProps {
  year: number
  month: number
  events: MonthEvent[]
}

export function MonthCalendar({ year, month, events }: MonthCalendarProps) {
  const monthName = new Date(year, month).toLocaleDateString("es-AR", { month: "long", year: "numeric" })
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Create array for calendar grid
  const calendarDays = []
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const getEventsForDay = (day: number | null): FlowInstrument[] => {
    if (!day) return []
    const event = events.find((e) => e.date === day)
    return event ? event.instruments : []
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg capitalize">{monthName}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(day)
            const hasEvents = dayEvents.length > 0

            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            if (!hasEvents) {
              return (
                <div
                  key={day}
                  className="aspect-square flex items-start justify-center p-1 rounded-md border border-transparent"
                >
                  <span className="text-sm text-muted-foreground">{day}</span>
                </div>
              )
            }

            return (
              <Popover key={day}>
                <PopoverTrigger asChild>
                  <button className="aspect-square flex flex-col items-center justify-start p-1 rounded-md border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                    <span className="text-sm font-semibold text-foreground mb-1">{day}</span>
                    <div className="flex flex-wrap gap-0.5 justify-center">
                      {dayEvents.slice(0, 2).map((instrument, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-[8px] px-1 py-0 h-3 leading-none bg-primary/80 text-white hover:bg-primary"
                        >
                          {instrument.ticker}
                        </Badge>
                      ))}
                      {dayEvents.length > 2 && (
                        <Badge variant="secondary" className="text-[8px] px-1 py-0 h-3 leading-none">
                          +{dayEvents.length - 2}
                        </Badge>
                      )}
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 max-h-96 overflow-y-auto" align="center">
                  <div className="space-y-3">
                    <div className="font-semibold text-sm border-b pb-2">
                      Vencimientos - {day}/{month + 1}/{year}
                    </div>
                    {dayEvents.map((instrument, i) => (
                      <div key={i} className="text-sm space-y-1.5 p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">{instrument.ticker}</Badge>
                          <span className="text-xs text-muted-foreground">{instrument.moneda}</span>
                        </div>
                        <div className="font-medium">{instrument.descripcion}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Tasa:</span> {instrument.tasa}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Mínimo:</span> {instrument.minimo}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Ley:</span> {instrument.ley}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Calificación:</span> {instrument.calificacion}
                          </div>
                        </div>
                        {instrument.flujos && instrument.flujos.length > 0 && (
                          <div className="pt-2 border-t border-border mt-2">
                            <div className="text-xs text-muted-foreground mb-1">Próximos flujos:</div>
                            {instrument.flujos.slice(0, 3).map((flujo, idx) => (
                              <div key={idx} className="text-xs flex justify-between">
                                <span>{new Date(flujo.fecha).toLocaleDateString("es-AR")}</span>
                                <span className="font-medium">
                                  ${flujo.monto.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
