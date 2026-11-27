import { useQuery } from '@tanstack/react-query'
import { api, queryKeys } from '@/api/index.ts'

export function useDashboard(semesterId: string) {
  return useQuery({
    queryKey: queryKeys.dashboard(semesterId),
    queryFn: () => api.getDashboard(semesterId),
    enabled: Boolean(semesterId),
  })
}
