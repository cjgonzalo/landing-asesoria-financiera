import { getMonthDifference } from "./dates"

// Base bands established in April 2025
const BASE_DATE = new Date(2025, 3, 1) // April 2025
const UPPER_BASE = 1400
const LOWER_BASE = 1000
const MONTHLY_RATE = 0.01 // 1% monthly

export interface BandValues {
  upper: number
  lower: number
}

// Calculate bands for a specific month
export function calculateBandsForMonth(date: Date): BandValues {
  const monthsDiff = getMonthDifference(BASE_DATE, date)

  // Upper band increases by 1% monthly (multiplicative)
  const upper = UPPER_BASE * Math.pow(1 + MONTHLY_RATE, monthsDiff)

  // Lower band decreases by 1% monthly (multiplicative)
  const lower = LOWER_BASE * Math.pow(1 - MONTHLY_RATE, monthsDiff)

  return { upper, lower }
}
