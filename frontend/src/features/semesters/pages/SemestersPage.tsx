import { Link } from 'react-router'
import { useSemester } from '@/hooks/useSemester.ts'
import { cn } from '@/lib/utils.ts'

export default function SemestersPage() {
  const { semesters, semesterId, setSemesterId } = useSemester()

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <h1 className="text-[28px] font-semibold leading-[41px] text-ink">Semestres</h1>
        <p className="mt-1 text-sm leading-5 text-muted">
          Choisissez le semestre affiché dans Evalio. Les notes restent personnelles.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {semesters.map((semester) => {
          const active = semester.id === semesterId
          return (
            <button
              key={semester.id}
              type="button"
              onClick={() => setSemesterId(semester.id)}
              className={cn(
                'rounded-lg border p-6 text-left',
                active ? 'border-brand bg-nav' : 'border-line bg-surface',
              )}
            >
              <p className="text-xs font-semibold text-muted">{semester.code}</p>
              <p className="mt-2 text-[17px] font-semibold text-ink">{semester.label}</p>
              <p className="mt-1 text-xs text-muted">Année universitaire {semester.academicYear}</p>
              {semester.isCurrent ? (
                <p className="mt-3 text-xs font-medium text-brand">Semestre en cours</p>
              ) : (
                <p className="mt-3 text-xs text-muted">À venir</p>
              )}
            </button>
          )
        })}
      </div>
      <Link to="/" className="text-xs font-medium text-brand">
        Retour au tableau de bord →
      </Link>
    </div>
  )
}
