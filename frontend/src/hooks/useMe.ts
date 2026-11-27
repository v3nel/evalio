import { useQuery } from '@tanstack/react-query'
import { api, queryKeys } from '@/api/index.ts'

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => api.getMe(),
    retry: false,
  })
}
