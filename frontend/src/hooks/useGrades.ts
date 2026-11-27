import { useQuery } from '@tanstack/react-query'
import { api, queryKeys } from '@/api/index.ts'

export function useUes(semesterId: string) {
  return useQuery({
    queryKey: queryKeys.ues(semesterId),
    queryFn: () => api.getUes(semesterId),
    enabled: Boolean(semesterId),
  })
}

export function useUe(ueId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.ue(ueId ?? ''),
    queryFn: () => api.getUe(ueId!),
    enabled: Boolean(ueId),
  })
}

export function useModules(semesterId: string) {
  return useQuery({
    queryKey: queryKeys.modules(semesterId),
    queryFn: () => api.getModules(semesterId),
    enabled: Boolean(semesterId),
  })
}

export function useModule(moduleId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.module(moduleId ?? ''),
    queryFn: () => api.getModule(moduleId!),
    enabled: Boolean(moduleId),
  })
}

export function useSearch(query: string, semesterId: string) {
  return useQuery({
    queryKey: queryKeys.search(semesterId, query),
    queryFn: () => api.search(query, semesterId),
    enabled: query.trim().length >= 2 && Boolean(semesterId),
  })
}
