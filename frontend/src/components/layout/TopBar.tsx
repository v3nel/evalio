import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import type { Semester } from '@/api/types.ts'
import { Icon } from '@/components/Icon.tsx'
import { useSearch } from '@/hooks/useGrades.ts'
import { cn } from '@/lib/utils.ts'

interface TopBarProps {
  semesters: Semester[]
  semesterId: string
  onSemesterChange: (id: string) => void
  unreadCount?: number
  onMenuClick?: () => void
}

export function TopBar({
  semesters,
  semesterId,
  onSemesterChange,
  unreadCount = 2,
  onMenuClick,
}: TopBarProps) {
  const navigate = useNavigate()
  const semester = semesters.find((item) => item.id === semesterId)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const search = useSearch(query, semesterId)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="flex h-20 items-center gap-4 bg-surface px-8">
      {onMenuClick ? (
        <button
          type="button"
          onClick={onMenuClick}
          className="flex size-9 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label="Ouvrir la navigation"
        >
          <span className="text-lg leading-none">☰</span>
        </button>
      ) : null}

      <label className="flex cursor-pointer items-center gap-3">
        <span className="sr-only">Choisir un semestre</span>
        <select
          value={semesterId}
          onChange={(event) => onSemesterChange(event.target.value)}
          className="appearance-none bg-transparent text-sm font-medium leading-5 text-ink"
        >
          {semesters.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label} · {item.academicYear}
            </option>
          ))}
        </select>
        <Icon name="chevron" size={16} className="text-muted" />
        {semester ? null : null}
      </label>

      <div className="flex-1" />

      <div ref={rootRef} className="relative hidden md:block">
        <div className="flex h-9 w-72 items-center gap-2 rounded-lg bg-canvas p-2">
          <Icon name="search" size={16} className="text-muted" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Rechercher une ressource…"
            className="w-full bg-transparent text-xs leading-[17px] text-ink placeholder:text-muted"
          />
        </div>
        {open && query.trim().length >= 2 ? (
          <div className="absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
            {search.isLoading ? (
              <p className="px-3 py-2 text-xs text-muted">Recherche…</p>
            ) : search.data?.length ? (
              search.data.map((hit) => (
                <button
                  key={`${hit.kind}-${hit.id}`}
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-canvas"
                  onClick={() => {
                    setOpen(false)
                    setQuery('')
                    navigate(hit.kind === 'ue' ? `/ue/${hit.id}` : `/ressources/${hit.id}`)
                  }}
                >
                  <span className="text-[11px] font-medium text-muted">{hit.code}</span>
                  <span className="truncate text-xs text-ink">{hit.title}</span>
                </button>
              ))
            ) : (
              <p className="px-3 py-2 text-xs text-muted">Aucun résultat</p>
            )}
          </div>
        ) : null}
      </div>

      <Link
        to="/notes"
        className="relative flex items-center gap-2"
        aria-label="Notifications · 2 nouvelles notes"
      >
        <Icon name="bell" size={20} className="text-ink" />
        {unreadCount > 0 ? (
          <span
            className={cn(
              'flex size-5 items-center justify-center rounded-lg bg-brand text-[10px] font-semibold leading-[15px] text-white',
            )}
          >
            {unreadCount}
          </span>
        ) : null}
      </Link>
    </header>
  )
}
