import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { featureFlagKeys } from '@/api/featureFlags.ts'
import type { Evaluation, GradeStatus } from '@/api/types.ts'
import { isNotFound } from '@/api/errors.ts'
import { ContentSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { ErrorState } from '@/components/feedback/ErrorState.tsx'
import { Note } from '@/components/Note.tsx'
import { Statut } from '@/components/Statut.tsx'
import NotFoundPage from '@/features/errors/pages/NotFoundPage.tsx'
import { useFeatureFlag } from '@/hooks/useFeatureFlag.ts'
import { useModule } from '@/hooks/useGrades.ts'
import { useSemester } from '@/hooks/useSemester.ts'
import { formatDayMonthYear, formatGrade } from '@/lib/format.ts'
import { gradeTone } from '@/lib/grade.ts'
import { cn } from '@/lib/utils.ts'

const scoreClass = {
  good: 'text-good',
  warn: 'text-warn',
  bad: 'text-bad',
  neutral: 'text-ink',
}

type Filter = 'all' | GradeStatus

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tous les statuts' },
  { id: 'NOTE', label: 'Noté' },
  { id: 'ABS', label: 'Absent' },
  { id: 'ABJ', label: 'Absence justifiée' },
  { id: 'ATT', label: 'En attente' },
]

function promotionGapLabel(gap: number): string {
  if (Math.abs(gap) < 0.005) return 'Au niveau de la promotion'
  const formatted = formatGrade(Math.abs(gap))
  return gap > 0 ? `${formatted} au-dessus de la promotion` : `${formatted} sous la promotion`
}

function PromotionGap({
  average,
  promotionAverage,
}: {
  average: number | null
  promotionAverage: number | null
}) {
  const enabled = useFeatureFlag(featureFlagKeys.betaPromotionComparison, false)
  if (!enabled || average == null || promotionAverage == null) return null
  return (
    <p className="text-[11px] leading-4 text-muted">
      <span className="mr-2 inline-flex items-center rounded-lg bg-brand-soft px-2 py-1 font-medium text-brand">
        Bêta
      </span>{' '}
      {promotionGapLabel(average - promotionAverage)}
    </p>
  )
}

function statusKind(evaluation: Evaluation) {
  if (evaluation.grade.status === 'ABS') return 'absent' as const
  if (evaluation.grade.status === 'ABJ') return 'abj' as const
  if (evaluation.grade.status === 'ATT') return 'attente' as const
  return 'note' as const
}

export default function ResourceDetailPage() {
  const { moduleId } = useParams()
  const { semester } = useSemester()
  const query = useModule(moduleId)
  const [filter, setFilter] = useState<Filter>('all')

  const evaluations = useMemo(() => {
    const list = query.data?.evaluations ?? []
    if (filter === 'all') return list
    return list.filter((evaluation) => evaluation.grade.status === filter)
  }, [query.data, filter])

  if (query.isLoading) return <ContentSkeleton />
  if (query.isError && isNotFound(query.error)) return <NotFoundPage />
  if (query.isError || !query.data) {
    return <ErrorState onRetry={() => void query.refetch()} />
  }

  const module = query.data
  const tone = gradeTone(module.average)

  return (
    <div className="flex flex-col gap-4 p-8">
      <p className="text-xs font-medium leading-[17px] text-muted">
        Mes notes&nbsp;&nbsp; /&nbsp;&nbsp; {module.code}
      </p>
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-semibold leading-[41px] text-ink">{module.title}</h1>
        <p className="text-[13px] leading-[19px] text-muted">
          {module.code} · {semester?.label ?? 'Semestre 1'} · BUT Informatique
        </p>
      </div>

      <section className="flex h-32 items-center gap-8 overflow-hidden rounded-lg border border-line bg-canvas p-6">
        <div className="flex w-[280px] shrink-0 flex-col gap-1">
          <p className="text-xs font-medium leading-[17px] text-muted">Moyenne de la ressource</p>
          <div className="flex items-baseline gap-2">
            <span className={cn('text-4xl font-semibold leading-[52px]', scoreClass[tone])}>
              {formatGrade(module.average)}
            </span>
            <span className="text-sm leading-5 text-muted">/20</span>
          </div>
        </div>
        <div className="h-20 w-px bg-line" />
        <div className="flex w-60 shrink-0 flex-col gap-2">
          <p className="text-[22px] font-semibold leading-8 text-ink">
            {module.countedEvaluations} évaluations
          </p>
          <p className="text-xs leading-[17px] text-muted">
            prises en compte sur {module.totalEvaluations}
          </p>
          <p className="text-[11px] leading-4 text-muted">
            {module.absencesAsZero > 0
              ? `dont une absence notée 0/20`
              : 'Aucune absence non justifiée'}
          </p>
        </div>
        <div className="h-20 w-px bg-line" />
        <div className="flex min-w-0 flex-1 flex-col gap-2 text-muted">
          <p className="text-xs font-medium leading-[17px]">Moyenne de la promotion</p>
          <p className="text-xl font-medium leading-[29px]">
            {formatGrade(module.promotionAverage)} /20
          </p>
          <p className="text-[11px] leading-4">
            {module.promotionCount} étudiants · À titre indicatif
          </p>
        </div>
      </section>

      <PromotionGap average={module.average} promotionAverage={module.promotionAverage} />

      <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
        <div className="flex items-center">
          <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Évaluations</h2>
          <Statut kind="count" label={String(module.evaluations.length)} className="ml-1" />
          <div className="flex-1" />
          <label className="flex h-8 items-center gap-4 rounded-lg border border-line bg-surface p-2 text-xs">
            <span className="sr-only">Filtrer par statut</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as Filter)}
              className="appearance-none bg-transparent font-medium text-ink"
            >
              {filters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <span className="text-muted">⌄</span>
          </label>
        </div>

        <div>
          <div className="flex h-10 items-center gap-4 bg-canvas px-4 text-[10px] font-semibold leading-[15px] text-muted">
            <p className="flex-1">ÉVALUATION</p>
            <p className="w-16">TYPE</p>
            <p className="w-[104px]">DATE</p>
            <p className="w-14 text-right">COEF.</p>
            <p className="w-20 text-right">NOTE /20</p>
            <p className="w-36">STATUT</p>
          </div>
          {evaluations.map((evaluation, index) => (
            <div key={evaluation.id}>
              {index > 0 ? <div className="h-px bg-line" /> : null}
              <div className="flex h-14 items-center gap-4 px-4">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-[13px] font-medium leading-[19px] text-ink">
                    {evaluation.title}
                  </p>
                  {evaluation.isNew ? (
                    <p className="text-[10px] font-medium leading-[15px] text-brand">
                      Nouvelle note publiée
                    </p>
                  ) : null}
                </div>
                <p className="w-16 text-xs font-medium leading-[17px] text-muted">
                  {evaluation.type}
                </p>
                <p className="w-[104px] text-xs leading-[17px] text-muted">
                  {formatDayMonthYear(evaluation.date)}
                </p>
                <p className="w-14 text-right text-[13px] leading-[19px] text-ink">
                  {evaluation.coefficient}
                </p>
                <div className="flex w-20 justify-end">
                  <Note value={evaluation.grade.score} status={evaluation.grade.status} />
                </div>
                <div className="w-36">
                  <Statut kind={statusKind(evaluation)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] leading-4 text-muted">Moyenne pondérée : {module.weightedFormula}</p>
      </section>

      <section className="flex gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-lg border border-line bg-canvas p-6">
          <h2 className="text-[15px] font-semibold leading-[22px] text-ink">
            Comprendre votre moyenne
          </h2>
          <p className="text-xs leading-[17px] text-muted">
            Une absence non justifiée compte comme 0/20. Les absences justifiées et les évaluations
            en attente sont exclues du calcul.
          </p>
        </div>
        <div className="flex w-[400px] shrink-0 flex-col gap-3 rounded-lg border border-line bg-surface p-6">
          <h2 className="text-[15px] font-semibold leading-[22px] text-ink">
            Cette ressource contribue à
          </h2>
          {module.ueContributions.map((contribution, index) => (
            <div key={contribution.ueId}>
              {index > 0 ? <div className="mb-3 h-px bg-line" /> : null}
              <div className="flex items-start">
                <Link to={`/ue/${contribution.ueId}`} className="text-xs font-medium text-brand">
                  {contribution.code} · {contribution.title}
                </Link>
                <div className="flex-1" />
                <p className="text-[11px] leading-4 text-muted">
                  Coefficient {contribution.coefficient}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-[11px] leading-4 text-muted">
        Les notes sont synchronisées depuis votre ENT. En cas d’erreur, contactez votre enseignant.
      </p>
    </div>
  )
}
