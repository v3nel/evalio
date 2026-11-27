const numberFr = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const numberFrShort = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatGrade(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—'
  return numberFr.format(value)
}

export function formatGradeShort(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—'
  return numberFrShort.format(value)
}

export function formatDayMonth(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date)
}

export function formatDayMonthYear(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatUpdatedAt(iso: string): string {
  const date = new Date(iso)
  const day = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date)
  const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(date)
  return `Mis à jour le ${day} à ${time}`
}

export function formatPoints(value: number): string {
  return numberFr.format(value)
}
