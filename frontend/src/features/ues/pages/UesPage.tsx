import { ContentSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { ErrorState } from '@/components/feedback/ErrorState.tsx'
import { UeCard } from '@/components/UeCard.tsx'
import { useUes } from '@/hooks/useGrades.ts'
import { useSemester } from '@/hooks/useSemester.ts'

export default function UesPage() {
  const { semester, semesterId } = useSemester()
  const query = useUes(semesterId)

  if (query.isLoading) return <ContentSkeleton />
  if (query.isError || !query.data) {
    return <ErrorState onRetry={() => void query.refetch()} />
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-end">
        <div>
          <h1 className="text-[28px] font-semibold leading-[41px] text-ink">
            Unités d’enseignement
          </h1>
          <p className="mt-1 text-sm leading-5 text-muted">
            {semester?.label} · {semester?.academicYear}
          </p>
        </div>
        <div className="flex-1" />
        <p className="text-xs text-muted">Seuil de validation : 10/20</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {query.data.map((ue) => (
          <UeCard key={ue.id} ue={ue} />
        ))}
      </div>
      <p className="text-[11px] leading-4 text-muted">
        Statuts indicatifs sur les notes publiées, sous réserve de la décision du jury.
      </p>
    </div>
  )
}
