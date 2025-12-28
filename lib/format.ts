// Format currency in Argentine Pesos
export function formatARS(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value)
}

// Format month label (e.g., "ene 25")
export function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    month: "short",
    year: "2-digit",
  }).format(date)
}

// Parse date string to Date object
export function parseDate(dateString: string): Date {
  // Handle ISO format or YYYY-MM-DD
  return new Date(dateString)
}
