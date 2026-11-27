import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { ContentSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { ErrorState } from '@/components/feedback/ErrorState.tsx'
import { Statut } from '@/components/Statut.tsx'
import { TableRow } from '@/components/TableRow.tsx'
import { isNotFound } from '@/api/errors.ts'
import { useUe } from '@/hooks/useGrades.ts'
import { useSemester } from '@/hooks/useSemester.ts'
import { formatGrade, formatPoints } from '@/lib/format.ts'
import { gradeTone, pointsToThreshold, VALIDATION_THRESHOLD } from '@/lib/grade.ts'
import { formatUpcomingMeta, requiredGradeForThreshold } from '@/lib/simulate.ts'
import { cn } from '@/lib/utils.ts'
import NotFoundPage from '@/features/errors/pages/NotFoundPage.tsx'

const scoreClass = {
  good: 'text-good',
  warn: 'text-warn',
  bad: 'text-bad',
  neutral: 'text-ink',
}

export default function UeDetailPage() {
  const { ueId } = useParams()
  const { semester } = useSemester()
  const query = useUe(ueId)
  const [upcomingId, setUpcomingId] = useState<string | undefined>(undefined)

  const selected = useMemo(() => {
    const list = query.data?.upcomingEvaluations ?? []
    return list.find((item) => item.id === upcomingId) ?? list[0]
  }, [query.data, upcomingId])

  if (query.isLoading) return <ContentSkeleton />
  if (query.isError && isNotFound(query.error)) return <NotFoundPage />
  if (query.isError || !query.data) {
    return <ErrorState onRetry={() => void query.refetch()} />
  }

  const ue = query.data
  const tone = gradeTone(ue.average)
  const missing = pointsToThreshold(ue.average)
  const required = selected ? requiredGradeForThreshold(ue, selected) : null
  const totalPoints =
    ue.modules.reduce((sum, module) => {
      if (module.average == null) return sum
      return sum + module.average * module.coefficient
    }, 0)

  return (
    <div className="flex flex-col gap-5 p-8">
      <p className="text-xs font-medium leading-[17px] text-muted">
        Mes UE&nbsp;&nbsp; /&nbsp;&nbsp; {ue.code}
      </p>

      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] font-semibold leading-[41px] text-ink">{ue.title}</h1>
          <p className="text-[13px] leading-[19px] text-muted">
            {ue.code} · {semester?.label ?? 'Semestre 1'} · BUT Informatique
          </p>
        </div>
        <div className="flex-1" />
        <Statut kind={ue.status} />
      </div>

      <section className="flex h-[120px] items-center gap-8 overflow-hidden rounded-lg border border-line bg-canvas p-6">
        <div className="flex w-60 shrink-0 flex-col gap-1">
          <p className="text-xs font-medium leading-[17px] text-muted">Moyenne actuelle de l’UE</p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn('text-4xl font-semibold leading-[52px]', scoreClass[tone])}>
              {formatGrade(ue.average)}
            </span>
            <span className="text-sm leading-5 text-muted">/20</span>
          </div>
        </div>
        <div className="h-16 w-px bg-line" />
        <div className="flex w-60 shrink-0 flex-col gap-1">
          <p className="text-xs font-medium leading-[17px] text-muted">Objectif de validation</p>
          <p className="text-2xl font-semibold leading-[35px] text-ink">
            {formatGrade(VALIDATION_THRESHOLD)} /20
          </p>
          <p className="text-[11px] leading-4 text-muted">
            Soit {formatGrade(missing)} point à gagner
          </p>
        </div>
        <div className="h-16 w-px bg-line" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-sm font-semibold leading-5 text-ink">Chaque coefficient compte.</p>
          <p className="text-xs leading-[17px] text-muted">
            {ue.modules.length} ressources et SAÉs contribuent à cette UE, avec un total de{' '}
            {ue.totalCoefficient} coefficients.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
        <div className="flex items-start">
          <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Ressources et SAÉs</h2>
          <div className="flex-1" />
          <p className="text-xs leading-[17px] text-muted">Coefficients propres à cette UE</p>
        </div>
        <div>
          <div className="flex h-9 items-center gap-4 bg-canvas px-4 text-[10px] font-semibold leading-[15px] text-muted">
            <p className="flex-1">RESSOURCE / SAÉ</p>
            <p className="w-28 text-right">COEFFICIENT</p>
            <p className="w-[72px] text-right">MOYENNE</p>
            <p className="w-[18px]" />
          </div>
          {ue.modules.map((module, index) => (
            <div key={module.id}>
              {index > 0 ? <div className="h-px bg-line" /> : null}
              <TableRow module={module} />
            </div>
          ))}
          <div className="h-px bg-line" />
        </div>
        <p className="text-[11px] leading-4 text-muted">
          Moyenne pondérée : {formatPoints(totalPoints)} points ÷ {ue.totalCoefficient} coefficients
          = {formatGrade(ue.average)}/20
        </p>
      </section>

      <section
        id="simulateur"
        className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6"
      >
        <div className="flex items-start">
          <h2 className="text-[17px] font-semibold leading-[25px] text-ink">
            Quelle note me faut-il ?
          </h2>
          <div className="flex-1" />
          <Statut kind="simulation" />
        </div>
        {selected ? (
          <div className="flex items-center gap-6">
            <div className="flex w-[488px] shrink-0 flex-col gap-2">
              <p className="text-[11px] font-medium leading-4 text-muted">Évaluation à venir</p>
              <label className="flex h-11 items-center gap-3 rounded-lg border border-line bg-surface p-3">
                <span className="sr-only">Évaluation à venir</span>
                <select
                  value={selected.id}
                  onChange={(event) => setUpcomingId(event.target.value)}
                  className="w-full appearance-none bg-transparent text-[13px] font-medium leading-[19px] text-ink"
                >
                  {ue.upcomingEvaluations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <span className="text-base leading-[23px] text-muted">⌄</span>
              </label>
              <p className="text-[11px] leading-4 text-muted">{formatUpcomingMeta(selected)}</p>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-lg bg-brand-soft p-4 text-brand">
              <p className="text-xs font-medium leading-[17px]">
                Note minimale pour atteindre 10/20
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-[30px] font-semibold leading-[44px]">
                  {required != null && required <= 20 ? formatGrade(required) : '—'}
                </span>
                <span className="text-sm leading-5">/20</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted">Aucune évaluation à venir sur cette UE.</p>
        )}
        <div className="h-px bg-line" />
        <p className="text-[11px] leading-4 text-muted">
          {selected
            ? `Hypothèse : les autres moyennes restent inchangées. La soutenance compte autant que la note de projet actuelle (${formatGrade(selected.currentModuleAverage)}/20).`
            : 'Les simulations ne modifient pas vos notes.'}
        </p>
      </section>

      <p className="text-[11px] leading-4 text-muted">
        Validation définitive après délibération du jury. Les simulations ne modifient pas vos notes.
      </p>
    </div>
  )
}
