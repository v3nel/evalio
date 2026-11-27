import { Link } from 'react-router'
import { EvolutionChart } from '@/components/charts/EvolutionChart.tsx'
import { ContentSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { ErrorState } from '@/components/feedback/ErrorState.tsx'
import { Note } from '@/components/Note.tsx'
import { Statut } from '@/components/Statut.tsx'
import { UeCard } from '@/components/UeCard.tsx'
import { useDashboard } from '@/hooks/useDashboard.ts'
import { useMe } from '@/hooks/useMe.ts'
import { useSemester } from '@/hooks/useSemester.ts'
import { formatDayMonth, formatGrade, formatUpdatedAt } from '@/lib/format.ts'
import { VALIDATION_THRESHOLD } from '@/lib/grade.ts'

export default function DashboardPage() {
  const me = useMe()
  const { semester, semesterId } = useSemester()
  const dashboard = useDashboard(semesterId)

  if (dashboard.isLoading) return <ContentSkeleton />
  if (dashboard.isError || !dashboard.data) {
    return <ErrorState onRetry={() => void dashboard.refetch()} />
  }

  const data = dashboard.data
  const validatedCount = data.ueAverages.filter(
    (ue) => ue.average != null && ue.average >= VALIDATION_THRESHOLD,
  ).length

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] font-semibold leading-[41px] text-ink">Tableau de bord</h1>
          <p className="text-sm leading-5 text-muted">
            Bonjour {me.data?.firstName}, voici où vous en êtes ce semestre.
          </p>
        </div>
        <div className="flex-1" />
        <p className="text-[11px] leading-4 text-muted">{formatUpdatedAt(data.lastSyncAt)}</p>
      </div>

      <section className="flex h-36 items-center gap-8 overflow-hidden rounded-lg border border-line bg-canvas p-6">
        <div className="flex w-[280px] shrink-0 flex-col gap-1">
          <p className="text-[13px] font-medium leading-[19px] text-muted">Moyenne du semestre</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-semibold leading-[58px] text-ink">
              {formatGrade(data.overallAverage)}
            </span>
            <span className="text-base leading-[23px] text-muted">/20</span>
          </div>
          <p className="text-[11px] leading-4 text-muted">
            Moyenne indicative des {data.ueAverages.length} UE
          </p>
        </div>
        <div className="h-20 w-px bg-line" />
        <div className="flex w-[210px] shrink-0 flex-col gap-2">
          <p className="text-2xl font-semibold leading-[35px] text-ink">
            {validatedCount} sur {data.ueAverages.length}
          </p>
          <p className="text-[13px] leading-[19px] text-muted">UE à 10/20 ou plus</p>
        </div>
        <div className="h-20 w-px bg-line" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {data.attention ? (
            <>
              <p className="text-sm font-semibold leading-5 text-ink">
                Un cap à franchir en {data.attention.ueCode}
              </p>
              <p className="text-xs leading-[17px] text-muted">
                Il vous manque {formatGrade(data.attention.pointsMissing)} point pour atteindre le
                seuil de validation.
              </p>
              <Link
                to={`/ue/${data.attention.ueId}#simulateur`}
                className="text-xs font-medium leading-[17px] text-brand"
              >
                Simuler ma prochaine note →
              </Link>
            </>
          ) : (
            <p className="text-sm font-semibold text-ink">Toutes les UE sont au-dessus du seuil.</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-start">
          <h2 className="text-[17px] font-semibold leading-[25px] text-ink">
            Mes unités d’enseignement
          </h2>
          <div className="flex-1" />
          <p className="text-xs leading-[17px] text-muted">Seuil de validation : 10/20</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {data.ueAverages.map((ue) => (
            <UeCard key={ue.id} ue={ue} />
          ))}
        </div>
        <p className="text-[11px] leading-4 text-muted">
          Statuts indicatifs sur les notes publiées, sous réserve de la décision du jury.
        </p>
      </section>

      <section className="flex flex-col gap-6 xl:flex-row">
        <div className="flex w-full flex-col gap-4 rounded-lg border border-line bg-surface p-6 xl:w-[648px] xl:shrink-0">
          <div className="flex items-start">
            <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Dernières notes</h2>
            <div className="flex-1" />
            <Link to="/notes" className="text-xs font-medium leading-[17px] text-brand">
              Toutes mes notes →
            </Link>
          </div>
          {data.recentGrades.map((grade, index) => (
            <div key={grade.evaluationId}>
              {index > 0 ? <div className="mb-4 h-px bg-line" /> : null}
              <Link
                to={`/ressources/${grade.moduleId}`}
                className="flex items-center gap-3"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate text-xs font-medium leading-[17px] text-ink">
                    {grade.moduleCode} · {grade.moduleTitle}
                  </p>
                  <p className="text-[11px] leading-4 text-muted">
                    {grade.type} · {grade.evaluationTitle}
                  </p>
                </div>
                {grade.isNew ? <Statut kind="nouveau" /> : null}
                <Note value={grade.grade.score} status={grade.grade.status} />
                <p className="w-12 text-right text-[11px] leading-4 text-muted">
                  {formatDayMonth(grade.date)}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-lg border border-line bg-surface p-6">
          <h2 className="text-[17px] font-semibold leading-[25px] text-ink">
            Évolution de la moyenne
          </h2>
          <p className="text-xs leading-[17px] text-muted">Moyenne indicative du semestre</p>
          <EvolutionChart points={data.evolution} />
          <div className="flex w-full items-start text-[10px] leading-[15px] text-muted">
            <span>Septembre</span>
            <span className="flex-1" />
            <span>Octobre</span>
            <span className="flex-1" />
            <span>Novembre</span>
          </div>
          <div className="h-px w-full bg-line" />
          <p className="whitespace-pre text-[11px] leading-4 text-muted">
            —  Votre moyenne     - -  Seuil de validation
          </p>
        </div>
      </section>

      <div className="flex items-start">
        <p className="text-[11px] leading-4 text-muted">
          Les moyennes évoluent à chaque nouvelle note publiée.
        </p>
        <div className="flex-1" />
        <p className="text-[11px] leading-4 text-muted">
          Année universitaire {semester?.academicYear ?? data.semester.academicYear}
        </p>
      </div>
    </div>
  )
}
