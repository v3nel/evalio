export const queryKeys = {
  me: ['me'] as const,
  settings: ['settings'] as const,
  semesters: ['semesters'] as const,
  dashboard: (semesterId: string) => ['dashboard', semesterId] as const,
  ues: (semesterId: string) => ['ues', semesterId] as const,
  ue: (ueId: string) => ['ue', ueId] as const,
  modules: (semesterId: string) => ['modules', semesterId] as const,
  module: (moduleId: string) => ['module', moduleId] as const,
  search: (semesterId: string, query: string) => ['search', semesterId, query] as const,
}
