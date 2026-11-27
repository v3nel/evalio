import { useQuery } from '@tanstack/react-query'
import { api, queryKeys } from '@/api/index.ts'

/**
 * Lit un flag d'UI exposé par GET /api/me/features.
 * Tant que la réponse n'est pas là, ou si la clé est absente, renvoie `defaultValue`.
 */
export function useFeatureFlag(key: string, defaultValue = false): boolean {
  const features = useQuery({
    queryKey: queryKeys.features,
    queryFn: () => api.getFeatures(),
    retry: false,
  })
  const value = features.data?.[key]
  return typeof value === 'boolean' ? value : defaultValue
}
