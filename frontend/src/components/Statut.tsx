import type { StatusKind } from '@/api/types.ts'
import { cn } from '@/lib/utils.ts'

const styles: Record<StatusKind, string> = {
  validee: 'bg-canvas text-muted',
  en_cours: 'bg-canvas text-muted',
  non_validee: 'bg-bad-soft text-bad',
  nouveau: 'bg-brand-soft text-brand',
  note: 'bg-canvas text-muted',
  absent: 'bg-canvas text-muted',
  abj: 'bg-canvas text-muted',
  attente: 'bg-canvas text-muted',
  simulation: 'bg-brand-soft text-brand',
  count: 'bg-canvas text-muted',
}

const labels: Record<StatusKind, string> = {
  validee: 'Validée',
  en_cours: 'En cours',
  non_validee: 'Non validée',
  nouveau: 'Nouveau',
  note: 'Noté',
  absent: 'Absent',
  abj: 'Absence justifiée',
  attente: 'En attente',
  simulation: 'Simulation',
  count: '',
}

interface StatutProps {
  kind: StatusKind
  label?: string
  className?: string
}

export function Statut({ kind, label, className }: StatutProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-2 py-1 text-[11px] font-medium leading-4',
        styles[kind],
        className,
      )}
    >
      {label ?? labels[kind]}
    </span>
  )
}
