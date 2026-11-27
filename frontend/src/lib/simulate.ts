import type { UeDetail, UpcomingEvaluation } from '@/api/types.ts'
import { VALIDATION_THRESHOLD } from '@/lib/grade.ts'

export function requiredGradeForThreshold(
  ue: UeDetail,
  upcoming: UpcomingEvaluation,
  threshold = VALIDATION_THRESHOLD,
): number | null {
  const current = upcoming.currentModuleAverage
  if (current == null) return null

  const otherPoints = ue.modules.reduce((sum, module) => {
    if (module.average == null) return sum
    if (module.id === upcoming.moduleId) return sum
    return sum + module.average * module.coefficient
  }, 0)

  const targetPoints = threshold * ue.totalCoefficient
  const weight = upcoming.weightInModule
  const kept = (1 - weight) * current
  const neededModuleAverage = (targetPoints - otherPoints) / upcoming.ueCoefficient
  if (weight === 0) return null
  return (neededModuleAverage - kept) / weight
}

export function formatUpcomingMeta(upcoming: UpcomingEvaluation): string {
  const date = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(upcoming.date))
  const percent = Math.round(upcoming.weightInModule * 100)
  return `${date} · ${percent} % de la ${upcoming.moduleKind === 'SAE' ? 'SAÉ' : 'ressource'} · Coefficient UE : ${upcoming.ueCoefficient}`
}
