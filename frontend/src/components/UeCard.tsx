import { Link } from 'react-router'
import type { UeSummary } from '@/api/types.ts'
import { Statut } from '@/components/Statut.tsx'
import { formatGrade } from '@/lib/format.ts'
import { gradeTone, progressTowardThreshold } from '@/lib/grade.ts'
import { cn } from '@/lib/utils.ts'

const scoreClass = {
  good: 'text-good',
  warn: 'text-warn',
  bad: 'text-bad',
  neutral: 'text-ink',
}

const barClass = {
  good: 'bg-good',
  warn: 'bg-warn',
  bad: 'bg-bad/90',
  neutral: 'bg-muted',
}

interface UeCardProps {
  ue: UeSummary
}

export function UeCard({ ue }: UeCardProps) {
  const tone = gradeTone(ue.average)
  const width = progressTowardThreshold(ue.average)

  return (
    <Link
      to={`/ue/${ue.id}`}
      className="flex h-[216px] min-w-0 flex-col gap-3 overflow-hidden rounded-lg border border-line bg-surface p-4"
    >
      <p className="text-xs font-semibold leading-[17px] text-muted">{ue.code}</p>
      <p className="h-[60px] text-[13px] font-medium leading-[19px] text-ink">{ue.title}</p>
      <div className="flex items-baseline gap-1">
        <span className={cn('text-2xl font-semibold leading-[35px]', scoreClass[tone])}>
          {formatGrade(ue.average)}
        </span>
        <span className="text-xs leading-[17px] text-muted">/20</span>
      </div>
      <div className="h-1 w-full shrink-0 overflow-hidden rounded-lg bg-line">
        <div
          className={cn('h-full rounded-lg', barClass[tone])}
          style={{ width: `${width}%` }}
        />
      </div>
      <Statut kind={ue.status} />
    </Link>
  )
}
