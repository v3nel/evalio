import { Link } from 'react-router'
import type { ModuleSummary } from '@/api/types.ts'
import { Note } from '@/components/Note.tsx'

interface TableRowProps {
  module: ModuleSummary
}

export function TableRow({ module }: TableRowProps) {
  return (
    <Link
      to={`/ressources/${module.id}`}
      className="flex h-16 items-center gap-4 bg-surface px-4 hover:bg-canvas/60"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-[11px] font-medium leading-4 text-muted">{module.code}</p>
        <p className="truncate text-sm font-medium leading-5 text-ink">{module.title}</p>
      </div>
      <p className="w-28 text-right text-sm leading-5 text-ink">{module.coefficient}</p>
      <Note value={module.average} />
      <span className="text-lg leading-[26px] text-muted">→</span>
    </Link>
  )
}
