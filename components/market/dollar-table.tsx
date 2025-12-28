import { formatARS } from "@/lib/format"
import type { DollarRate } from "@/types/market"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DollarTableProps {
  rates: DollarRate[]
}

export function DollarTable({ rates }: DollarTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-bold text-foreground">Cotizaciones del Dólar</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Dólar</TableHead>
            <TableHead className="text-right">Compra</TableHead>
            <TableHead className="text-right">Venta</TableHead>
            <TableHead className="text-right">Actualización</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.casa}>
              <TableCell className="font-medium">{rate.nombre}</TableCell>
              <TableCell className="text-right font-semibold text-green-600">
                {rate.compra > 0 ? formatARS(rate.compra) : "-"}
              </TableCell>
              <TableCell className="text-right font-semibold text-red-600">
                {rate.venta > 0 ? formatARS(rate.venta) : "-"}
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {new Date(rate.fechaActualizacion).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
