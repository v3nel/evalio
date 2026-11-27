import { Navigate, Outlet, useLocation } from 'react-router'
import { isUnauthorized } from '@/api/errors.ts'
import { PageSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { useMe } from '@/hooks/useMe.ts'

export function RequireAuth() {
  const location = useLocation()
  const me = useMe()

  if (me.isLoading) {
    return <PageSkeleton />
  }

  if (me.isError && isUnauthorized(me.error)) {
    return <Navigate to="/connexion" replace state={{ from: location.pathname }} />
  }

  if (me.isError || !me.data) {
    return <Navigate to="/connexion" replace />
  }

  return <Outlet />
}
