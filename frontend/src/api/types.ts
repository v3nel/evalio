export type GradeStatus = 'NOTE' | 'ABS' | 'ABJ' | 'DISP' | 'ATT'
export type ModuleKind = 'RESSOURCE' | 'SAE'
export type EvaluationType = 'TP' | 'DS' | 'Projet' | 'Soutenance'
export type GradeTone = 'good' | 'warn' | 'bad' | 'neutral'
export type UeValidationStatus = 'validee' | 'en_cours' | 'non_validee'
export type StatusKind =
  | 'validee'
  | 'en_cours'
  | 'non_validee'
  | 'nouveau'
  | 'note'
  | 'absent'
  | 'abj'
  | 'attente'
  | 'simulation'
  | 'count'

export interface StudentProfile {
  firstName: string
  lastName: string
  email: string
  nip: string
  formation: string
  group: string
  campus: string
  currentSemesterId: string
}

export interface Semester {
  id: string
  code: string
  label: string
  academicYear: string
  startDate: string
  endDate: string
  isCurrent: boolean
}

export interface GradeValue {
  status: GradeStatus
  score: number | null
  maxScore: number
}

export interface UeContribution {
  ueId: string
  code: string
  title: string
  coefficient: number
}

export interface Evaluation {
  id: string
  title: string
  type: EvaluationType
  date: string
  coefficient: number
  grade: GradeValue
  isNew: boolean
  publishedAt: string | null
  weightInModule: number | null
}

export interface ModuleSummary {
  id: string
  code: string
  title: string
  kind: ModuleKind
  coefficient: number
  average: number | null
  ueContributions: UeContribution[]
}

export interface ModuleDetail extends ModuleSummary {
  semesterId: string
  evaluations: Evaluation[]
  countedEvaluations: number
  totalEvaluations: number
  absencesAsZero: number
  promotionAverage: number | null
  promotionCount: number
  weightedFormula: string
}

export interface UeSummary {
  id: string
  code: string
  title: string
  average: number | null
  status: UeValidationStatus
  ects: number
}

export interface UeDetail extends UeSummary {
  semesterId: string
  modules: ModuleSummary[]
  totalCoefficient: number
  weightedFormula: string
  upcomingEvaluations: UpcomingEvaluation[]
}

export interface UpcomingEvaluation {
  id: string
  label: string
  date: string
  moduleId: string
  moduleCode: string
  moduleTitle: string
  moduleKind: ModuleKind
  weightInModule: number
  ueCoefficient: number
  currentModuleAverage: number | null
}

export interface RecentGrade {
  evaluationId: string
  moduleId: string
  moduleCode: string
  moduleTitle: string
  evaluationTitle: string
  type: EvaluationType
  date: string
  grade: GradeValue
  isNew: boolean
}

export interface EvolutionPoint {
  date: string
  average: number
}

export interface Dashboard {
  semester: Semester
  overallAverage: number | null
  ueAverages: UeSummary[]
  recentGrades: RecentGrade[]
  lastSyncAt: string
  source: 'SCODOC'
  evolution: EvolutionPoint[]
  attention: Attention | null
}

export interface Attention {
  ueId: string
  ueCode: string
  pointsMissing: number
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifyOnNewGrade: boolean
}

export interface SearchHit {
  id: string
  kind: 'ue' | 'ressource' | 'sae'
  code: string
  title: string
}

/** Flags d'interface renvoyés par GET /api/me/features. Les flags métier restent côté serveur. */
export type FeatureFlagMap = Record<string, boolean>

export interface ApiContract {
  getMe: () => Promise<StudentProfile>
  getFeatures: () => Promise<FeatureFlagMap>
  loginWithCas: () => Promise<{ redirectTo: string }>
  logout: () => Promise<void>
  getSettings: () => Promise<UserSettings>
  updateSettings: (patch: Partial<UserSettings>) => Promise<UserSettings>
  getSemesters: () => Promise<Semester[]>
  getDashboard: (semesterId: string) => Promise<Dashboard>
  getUes: (semesterId: string) => Promise<UeSummary[]>
  getUe: (ueId: string) => Promise<UeDetail>
  getModules: (semesterId: string) => Promise<ModuleSummary[]>
  getModule: (moduleId: string) => Promise<ModuleDetail>
  search: (query: string, semesterId: string) => Promise<SearchHit[]>
}
