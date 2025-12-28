// Dollar API Types
export interface DollarRate {
  compra: number
  venta: number
  casa: string
  nombre: string
  moneda: string
  fechaActualizacion: string
}

// Inflation and Risk Types
export interface InflationData {
  fecha: string
  valor: number
}

export interface RiskData {
  fecha: string
  valor: number
}

// Flows Types
export interface FlowDetail {
  fecha: string
  monto: number
  renta: number
  amortizacion: number
  residual: number
}

export interface FlowInstrument {
  ticker: string
  descripcion: string
  vencimiento: string
  tasa: string
  moneda: string
  minimo: string
  ley: string
  calificacion: string
  flujos: FlowDetail[]
}

// Bands Types
export interface BandData {
  month: string
  upper: number
  lower: number
  official: number
}
