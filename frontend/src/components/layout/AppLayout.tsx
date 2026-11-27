import { useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '@/components/layout/Sidebar.tsx'
import { TopBar } from '@/components/layout/TopBar.tsx'
import { useMe } from '@/hooks/useMe.ts'
import { SemesterContext, useSemestersQuery } from '@/hooks/useSemester.ts'

export function AppLayout() {
  const me = useMe()
  const semestersQuery = useSemestersQuery()
  const [semesterId, setSemesterId] = useState(me.data?.currentSemesterId ?? 's1-2026')
  const [mobileOpen, setMobileOpen] = useState(false)

  const value = useMemo(
    () => ({
      semesters: semestersQuery.data ?? [],
      semester: (semestersQuery.data ?? []).find((item) => item.id === semesterId),
      semesterId,
      setSemesterId,
    }),
    [semestersQuery.data, semesterId],
  )

  if (!me.data) return null

  return (
    <SemesterContext.Provider value={value}>
      <div className="flex min-h-svh bg-surface">
        <div className="hidden shrink-0 bg-canvas lg:block">
          <Sidebar student={me.data} className="sticky top-0 h-dvh" />
        </div>
        {mobileOpen ? (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-ink/30"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            />
            <Sidebar student={me.data} className="relative z-40 h-full" />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            semesters={value.semesters}
            semesterId={semesterId}
            onSemesterChange={setSemesterId}
            onMenuClick={() => setMobileOpen(true)}
          />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SemesterContext.Provider>
  )
}
