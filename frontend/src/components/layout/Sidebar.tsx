import { Link, NavLink, useLocation } from 'react-router'
import type { StudentProfile } from '@/api/types.ts'
import { Icon, type IconName } from '@/components/Icon.tsx'
import { Logo } from '@/components/Logo.tsx'
import { cn } from '@/lib/utils.ts'

const links: {
  to: string
  label: string
  icon: IconName
  match?: (pathname: string) => boolean
}[] = [
  { to: '/', label: 'Tableau de bord', icon: 'dashboard', match: (path) => path === '/' },
  {
    to: '/notes',
    label: 'Mes notes',
    icon: 'notes',
    match: (path) => path === '/notes' || path.startsWith('/ressources/'),
  },
  {
    to: '/ue',
    label: 'UE',
    icon: 'ue',
    match: (path) => path === '/ue' || path.startsWith('/ue/'),
  },
  { to: '/semestres', label: 'Semestres', icon: 'semesters' },
  { to: '/parametres', label: 'Paramètres', icon: 'settings' },
]

interface SidebarProps {
  student: StudentProfile
  className?: string
}

export function Sidebar({ student, className }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'flex h-full w-56 shrink-0 flex-col gap-8 bg-canvas p-6',
        className,
      )}
    >
      <div className="flex shrink-0 flex-col items-start gap-2">
        <Link to="/" aria-label="Evalio — Tableau de bord">
          <Logo className="h-8" />
        </Link>
        <p className="text-xs font-medium leading-4.25 text-muted">{student.formation}</p>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            aria-current={link.match?.(location.pathname) ? 'page' : undefined}
            className={({ isActive }) => {
              const active = link.match ? link.match(location.pathname) : isActive
              return cn(
                'flex h-11 shrink-0 items-center gap-3 rounded-lg p-3 text-[13px] leading-4.75',
                active
                  ? 'bg-nav font-semibold text-brand'
                  : 'font-medium text-muted hover:bg-white/60 dark:hover:bg-white/5',
              )
            }}
          >
            {({ isActive }) => {
              const active = link.match ? link.match(location.pathname) : isActive
              return (
                <>
                  <Icon name={link.icon} className={active ? 'text-brand' : 'text-muted'} />
                  {link.label}
                </>
              )
            }}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex shrink-0 flex-col gap-1">
        <p className="text-sm font-semibold leading-5 text-ink">
          {student.firstName} {student.lastName}
        </p>
        <p className="text-[11px] leading-4 text-muted">
          {student.group} · {student.formation}
        </p>
        <p className="text-[11px] leading-4 text-muted">{student.campus}</p>
      </div>
    </aside>
  )
}
