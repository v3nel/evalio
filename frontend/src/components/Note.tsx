import { gradeTone } from '@/lib/grade.ts'
import { formatGrade } from '@/lib/format.ts'
import { cn } from '@/lib/utils.ts'
import type { GradeStatus } from '@/api/types.ts'

const toneClass = {
  good: 'bg-good-soft text-good',
  warn: 'bg-warn-soft text-warn',
  bad: 'bg-bad-soft text-bad',
  neutral: 'bg-transparent text-muted',
}

interface NoteProps {
  value: number | null
  status?: GradeStatus
  className?: string
}

export function Note({ value, status = 'NOTE', className }: NoteProps) {
  if (value == null || (status !== 'NOTE' && status !== 'ABS')) {
    return (
      <span className={cn('text-right text-sm leading-5 text-muted', className)}>—</span>
    )
  }

  const tone = gradeTone(value, status)
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-2 py-1 text-sm font-semibold leading-5',
        toneClass[tone],
        className,
      )}
    >
      {formatGrade(value)}
    </span>
  )
}
