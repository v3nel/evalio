import type { GradeStatus, GradeTone, UeValidationStatus } from '@/api/types.ts'

export const VALIDATION_THRESHOLD = 10

export function gradeTone(score: number | null | undefined, status?: GradeStatus): GradeTone {
  if (status && status !== 'NOTE' && status !== 'ABS') return 'neutral'
  if (score == null) return 'neutral'
  if (score >= 12) return 'good'
  if (score >= VALIDATION_THRESHOLD) return 'warn'
  return 'bad'
}

export function ueStatus(average: number | null, complete: boolean): UeValidationStatus {
  if (average == null) return 'en_cours'
  if (average < VALIDATION_THRESHOLD) return 'non_validee'
  return complete ? 'validee' : 'en_cours'
}

export function progressTowardThreshold(average: number | null): number {
  if (average == null) return 0
  return Math.min(100, (average / VALIDATION_THRESHOLD) * 100)
}

export function pointsToThreshold(average: number | null): number {
  if (average == null) return VALIDATION_THRESHOLD
  return Math.max(0, VALIDATION_THRESHOLD - average)
}

export function weightedAverage(
  items: { coefficient: number; average: number | null }[],
): number | null {
  let points = 0
  let coeffs = 0
  for (const item of items) {
    if (item.average == null) continue
    points += item.average * item.coefficient
    coeffs += item.coefficient
  }
  if (coeffs === 0) return null
  return points / coeffs
}
