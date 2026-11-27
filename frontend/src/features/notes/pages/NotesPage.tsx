import { ContentSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { ErrorState } from '@/components/feedback/ErrorState.tsx'
import { TableRow } from '@/components/TableRow.tsx'
import { useModules } from '@/hooks/useGrades.ts'
import { useSemester } from '@/hooks/useSemester.ts'

export default function NotesPage() {
  const { semester, semesterId } = useSemester()
  const query = useModules(semesterId)

  if (query.isLoading) return <ContentSkeleton />
  if (query.isError || !query.data) {
    return <ErrorState onRetry={() => void query.refetch()} />
  }

  const ressources = query.data.filter((module) => module.kind === 'RESSOURCE')
  const saes = query.data.filter((module) => module.kind === 'SAE')

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <h1 className="text-[28px] font-semibold leading-[41px] text-ink">Mes notes</h1>
        <p className="mt-1 text-sm leading-5 text-muted">
          Ressources et SAÉs du {semester?.label ?? 'semestre'} · {semester?.academicYear}
        </p>
      </div>

      <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
        <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Ressources</h2>
        <div>
          <div className="flex h-9 items-center gap-4 bg-canvas px-4 text-[10px] font-semibold leading-[15px] text-muted">
            <p className="flex-1">RESSOURCE / SAÉ</p>
            <p className="w-28 text-right">COEFFICIENT</p>
            <p className="w-[72px] text-right">MOYENNE</p>
            <p className="w-[18px]" />
          </div>
          {ressources.map((module, index) => (
            <div key={module.id}>
              {index > 0 ? <div className="h-px bg-line" /> : null}
              <TableRow module={module} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
        <h2 className="text-[17px] font-semibold leading-[25px] text-ink">SAÉs</h2>
        <div>
          {saes.map((module, index) => (
            <div key={module.id}>
              {index > 0 ? <div className="h-px bg-line" /> : null}
              <TableRow module={module} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
