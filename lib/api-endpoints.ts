// API Endpoints centralizados

// Dollar API endpoints
export const DOLLAR_ENDPOINTS = {
  current: "https://dolarapi.com/v1/dolares",
  official: "https://dolarapi.com/v1/dolares/oficial",
  historical: (year: number, month: number, day: number) =>
    `https://api.argentinadatos.com/v1/cotizaciones/dolares/oficial/${year}/${month < 10 ? "0" + month : month}/${day}`,
}

// Flows API endpoints
export const FLOWS_ENDPOINTS = {
  instruments: "https://www.acuantoesta.com.ar/api/flujos",
}

// Indicators API endpoints
export const INDICATORS_ENDPOINTS = {
  monthlyInflation: "https://api.argentinadatos.com/v1/finanzas/indices/inflacion",
  annualInflation: "https://api.argentinadatos.com/v1/finanzas/indices/inflacionInteranual",
  countryRisk: "https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais",
}
