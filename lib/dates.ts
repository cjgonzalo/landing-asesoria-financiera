// Get last N months from today
export function getLastNMonths(n: number): Date[] {
  const months: Date[] = []
  const today = new Date()

  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    months.push(date)
  }

  return months
}

// Get month difference from a base date
export function getMonthDifference(from: Date, to: Date): number {
  return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth())
}

// Format date to YYYY-MM
export function formatYearMonth(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}
