import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api, queryKeys } from '@/api/index.ts'
import type { Semester } from '@/api/types.ts'

export interface SemesterContextValue {
  semesters: Semester[]
  semester: Semester | undefined
  semesterId: string
  setSemesterId: (id: string) => void
}

export const SemesterContext = createContext<SemesterContextValue | undefined>(undefined)

export function useSemestersQuery() {
  return useQuery({
    queryKey: queryKeys.semesters,
    queryFn: () => api.getSemesters(),
  })
}

export function useSemester(): SemesterContextValue {
  const context = useContext(SemesterContext)
  if (!context) {
    throw new Error('useSemester must be used within AppLayout')
  }
  return context
}
