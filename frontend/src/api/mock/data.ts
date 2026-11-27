import { featureFlagKeys } from '@/api/featureFlags.ts'
import type {
  Dashboard,
  Evaluation,
  FeatureFlagMap,
  ModuleDetail,
  ModuleSummary,
  RecentGrade,
  Semester,
  StudentProfile,
  UeDetail,
  UeSummary,
  UpcomingEvaluation,
  UserSettings,
} from '@/api/types.ts'

export const MOCK_STUDENT: StudentProfile = {
  firstName: 'Camille',
  lastName: 'Martin',
  email: 'camille.martin@etu.umontpellier.fr',
  nip: '22408751',
  formation: 'BUT Informatique',
  group: 'Groupe S4',
  campus: 'IUT Montpellier-Sète',
  currentSemesterId: 's1-2026',
}

export const MOCK_SEMESTERS: Semester[] = [
  {
    id: 's1-2026',
    code: 'S1',
    label: 'Semestre 1',
    academicYear: '2026-2027',
    startDate: '2026-09-01',
    endDate: '2027-01-31',
    isCurrent: true,
  },
  {
    id: 's2-2026',
    code: 'S2',
    label: 'Semestre 2',
    academicYear: '2026-2027',
    startDate: '2027-02-01',
    endDate: '2027-06-30',
    isCurrent: false,
  },
]

export const MOCK_SETTINGS: UserSettings = {
  theme: 'light',
  notifyOnNewGrade: true,
}

/** Défauts alignés sur le backend : la bêta reste masquée. */
export const MOCK_FEATURES: FeatureFlagMap = {
  [featureFlagKeys.betaPromotionComparison]: false,
}

const r103Evals: Evaluation[] = [
  {
    id: 'ev-r103-rep',
    title: 'Représentation des données',
    type: 'TP',
    date: '2026-11-20',
    coefficient: 1,
    grade: { status: 'NOTE', score: 18, maxScore: 20 },
    isNew: true,
    publishedAt: '2026-11-20T14:32:00',
    weightInModule: null,
  },
  {
    id: 'ev-r103-arch',
    title: 'Architecture et processeur',
    type: 'DS',
    date: '2026-11-12',
    coefficient: 1,
    grade: { status: 'NOTE', score: 11, maxScore: 20 },
    isNew: false,
    publishedAt: '2026-11-12T16:00:00',
    weightInModule: null,
  },
  {
    id: 'ev-r103-logique',
    title: 'Logique combinatoire',
    type: 'TP',
    date: '2026-11-05',
    coefficient: 2,
    grade: { status: 'NOTE', score: 9, maxScore: 20 },
    isNew: false,
    publishedAt: '2026-11-05T11:00:00',
    weightInModule: null,
  },
  {
    id: 'ev-r103-asm',
    title: 'Assembleur : prise en main',
    type: 'TP',
    date: '2026-10-22',
    coefficient: 1,
    grade: { status: 'ABS', score: 0, maxScore: 20 },
    isNew: false,
    publishedAt: '2026-10-22T10:00:00',
    weightInModule: null,
  },
  {
    id: 'ev-r103-mem',
    title: 'Organisation de la mémoire',
    type: 'TP',
    date: '2026-10-15',
    coefficient: 1,
    grade: { status: 'ABJ', score: null, maxScore: 20 },
    isNew: false,
    publishedAt: null,
    weightInModule: null,
  },
  {
    id: 'ev-r103-synthese',
    title: 'Synthèse du semestre',
    type: 'DS',
    date: '2026-12-08',
    coefficient: 3,
    grade: { status: 'ATT', score: null, maxScore: 20 },
    isNew: false,
    publishedAt: null,
    weightInModule: null,
  },
]

interface ModuleSeed extends ModuleSummary {
  evaluations: Evaluation[]
  promotionAverage: number | null
  promotionCount: number
  weightedFormula: string
}

const modules: ModuleSeed[] = [
  {
    id: 'mod-r101',
    code: 'R1.01',
    title: 'Initiation au développement',
    kind: 'RESSOURCE',
    coefficient: 6,
    average: 14.2,
    ueContributions: [
      { ueId: 'ue-1-1', code: 'UE1.1', title: 'Réaliser', coefficient: 6 },
      { ueId: 'ue-1-2', code: 'UE1.2', title: 'Optimiser', coefficient: 2 },
    ],
    evaluations: [
      {
        id: 'ev-r101-ctrl',
        title: 'Structures de contrôle',
        type: 'DS',
        date: '2026-11-19',
        coefficient: 2,
        grade: { status: 'NOTE', score: 15, maxScore: 20 },
        isNew: true,
        publishedAt: '2026-11-19T09:00:00',
        weightInModule: null,
      },
    ],
    promotionAverage: 12.4,
    promotionCount: 108,
    weightedFormula: 'Moyenne indicative à partir des notes publiées',
  },
  {
    id: 'mod-r103',
    code: 'R1.03',
    title: 'Introduction à l’architecture des ordinateurs',
    kind: 'RESSOURCE',
    coefficient: 6,
    average: 9.4,
    ueContributions: [
      { ueId: 'ue-1-3', code: 'UE1.3', title: 'Administrer', coefficient: 6 },
      { ueId: 'ue-1-6', code: 'UE1.6', title: 'Collaborer', coefficient: 1 },
    ],
    evaluations: r103Evals,
    promotionAverage: 11.8,
    promotionCount: 108,
    weightedFormula: '(18 × 1 + 11 × 1 + 9 × 2 + 0 × 1) ÷ 5 = 9,40/20',
  },
  {
    id: 'mod-r104',
    code: 'R1.04',
    title: 'Introduction aux systèmes d’exploitation',
    kind: 'RESSOURCE',
    coefficient: 4,
    average: 10,
    ueContributions: [{ ueId: 'ue-1-3', code: 'UE1.3', title: 'Administrer', coefficient: 4 }],
    evaluations: [
      {
        id: 'ev-r104-process',
        title: 'Processus et commandes',
        type: 'TP',
        date: '2026-11-03',
        coefficient: 1,
        grade: { status: 'NOTE', score: 10, maxScore: 20 },
        isNew: false,
        publishedAt: '2026-11-03T15:00:00',
        weightInModule: null,
      },
    ],
    promotionAverage: 11.1,
    promotionCount: 108,
    weightedFormula: '10,00 × 1 ÷ 1 = 10,00/20',
  },
  {
    id: 'mod-r105',
    code: 'R1.05',
    title: 'Bases de données',
    kind: 'RESSOURCE',
    coefficient: 4,
    average: 14.5,
    ueContributions: [{ ueId: 'ue-1-4', code: 'UE1.4', title: 'Gérer des données', coefficient: 4 }],
    evaluations: [
      {
        id: 'ev-r105-sql',
        title: 'Requêtes SQL',
        type: 'TP',
        date: '2026-11-17',
        coefficient: 1,
        grade: { status: 'NOTE', score: 14.5, maxScore: 20 },
        isNew: false,
        publishedAt: '2026-11-17T10:20:00',
        weightInModule: null,
      },
    ],
    promotionAverage: 13.2,
    promotionCount: 108,
    weightedFormula: '14,50 × 1 ÷ 1 = 14,50/20',
  },
  {
    id: 'mod-r110',
    code: 'R1.10',
    title: 'Anglais technique',
    kind: 'RESSOURCE',
    coefficient: 2,
    average: 12,
    ueContributions: [
      { ueId: 'ue-1-3', code: 'UE1.3', title: 'Administrer', coefficient: 2 },
      { ueId: 'ue-1-6', code: 'UE1.6', title: 'Collaborer', coefficient: 2 },
    ],
    evaluations: [
      {
        id: 'ev-r110-oral',
        title: 'Présentation orale',
        type: 'TP',
        date: '2026-10-28',
        coefficient: 1,
        grade: { status: 'NOTE', score: 12, maxScore: 20 },
        isNew: false,
        publishedAt: '2026-10-28T14:00:00',
        weightInModule: null,
      },
    ],
    promotionAverage: 13.0,
    promotionCount: 108,
    weightedFormula: '12,00 × 1 ÷ 1 = 12,00/20',
  },
  {
    id: 'mod-sae101',
    code: 'SAÉ1.01',
    title: 'Implémentation d’un besoin client',
    kind: 'SAE',
    coefficient: 6,
    average: 14.25,
    ueContributions: [{ ueId: 'ue-1-1', code: 'UE1.1', title: 'Réaliser', coefficient: 6 }],
    evaluations: [
      {
        id: 'ev-sae101-sout',
        title: 'Soutenance intermédiaire',
        type: 'Projet',
        date: '2026-11-14',
        coefficient: 1,
        grade: { status: 'NOTE', score: 14.25, maxScore: 20 },
        isNew: false,
        publishedAt: '2026-11-14T17:00:00',
        weightInModule: 0.5,
      },
    ],
    promotionAverage: 13.6,
    promotionCount: 108,
    weightedFormula: '14,25 × 1 ÷ 1 = 14,25/20',
  },
  {
    id: 'mod-sae103',
    code: 'SAÉ1.03',
    title: 'Installation d’un poste pour le développement',
    kind: 'SAE',
    coefficient: 8,
    average: 8.5,
    ueContributions: [{ ueId: 'ue-1-3', code: 'UE1.3', title: 'Administrer', coefficient: 8 }],
    evaluations: [
      {
        id: 'ev-sae103-projet',
        title: 'Livrable projet',
        type: 'Projet',
        date: '2026-11-08',
        coefficient: 1,
        grade: { status: 'NOTE', score: 8.5, maxScore: 20 },
        isNew: false,
        publishedAt: '2026-11-08T12:00:00',
        weightInModule: 0.5,
      },
      {
        id: 'ev-sae103-sout',
        title: 'Soutenance finale',
        type: 'Soutenance',
        date: '2026-12-15',
        coefficient: 1,
        grade: { status: 'ATT', score: null, maxScore: 20 },
        isNew: false,
        publishedAt: null,
        weightInModule: 0.5,
      },
    ],
    promotionAverage: 11.4,
    promotionCount: 108,
    weightedFormula: '8,50 × 1 ÷ 1 = 8,50/20',
  },
  {
    id: 'mod-r102',
    code: 'R1.02',
    title: 'Développement d’interfaces web',
    kind: 'RESSOURCE',
    coefficient: 4,
    average: 13.8,
    ueContributions: [{ ueId: 'ue-1-1', code: 'UE1.1', title: 'Réaliser', coefficient: 4 }],
    evaluations: [],
    promotionAverage: 12.9,
    promotionCount: 108,
    weightedFormula: 'Moyenne indicative',
  },
  {
    id: 'mod-r106',
    code: 'R1.06',
    title: 'Mathématiques discrètes',
    kind: 'RESSOURCE',
    coefficient: 4,
    average: 11.2,
    ueContributions: [{ ueId: 'ue-1-2', code: 'UE1.2', title: 'Optimiser', coefficient: 4 }],
    evaluations: [],
    promotionAverage: 11.0,
    promotionCount: 108,
    weightedFormula: 'Moyenne indicative',
  },
  {
    id: 'mod-r107',
    code: 'R1.07',
    title: 'Outils mathématiques logiciels',
    kind: 'RESSOURCE',
    coefficient: 3,
    average: 12.4,
    ueContributions: [{ ueId: 'ue-1-2', code: 'UE1.2', title: 'Optimiser', coefficient: 3 }],
    evaluations: [],
    promotionAverage: 12.1,
    promotionCount: 108,
    weightedFormula: 'Moyenne indicative',
  },
  {
    id: 'mod-r108',
    code: 'R1.08',
    title: 'Gérer un projet',
    kind: 'RESSOURCE',
    coefficient: 4,
    average: 12.8,
    ueContributions: [{ ueId: 'ue-1-5', code: 'UE1.5', title: 'Conduire un projet', coefficient: 4 }],
    evaluations: [],
    promotionAverage: 13.0,
    promotionCount: 108,
    weightedFormula: 'Moyenne indicative',
  },
  {
    id: 'mod-r109',
    code: 'R1.09',
    title: 'Économie et droit du numérique',
    kind: 'RESSOURCE',
    coefficient: 2,
    average: 13.2,
    ueContributions: [{ ueId: 'ue-1-6', code: 'UE1.6', title: 'Collaborer', coefficient: 2 }],
    evaluations: [],
    promotionAverage: 13.5,
    promotionCount: 108,
    weightedFormula: 'Moyenne indicative',
  },
]

function toSummary(module: ModuleSeed, coefficient: number): ModuleSummary {
  return {
    id: module.id,
    code: module.code,
    title: module.title,
    kind: module.kind,
    coefficient,
    average: module.average,
    ueContributions: module.ueContributions,
  }
}

function findModule(id: string): ModuleSeed {
  const module = modules.find((item) => item.id === id)
  if (!module) throw new Error(`Module inconnu: ${id}`)
  return module
}

interface UeSeed {
  id: string
  code: string
  title: string
  average: number
  status: UeSummary['status']
  ects: number
  contributions: { moduleId: string; coefficient: number }[]
  weightedFormula: string
  upcoming: UpcomingEvaluation[]
}

const ues: UeSeed[] = [
  {
    id: 'ue-1-1',
    code: 'UE1.1',
    title: 'Réaliser un développement d’application',
    average: 13.5,
    status: 'validee',
    ects: 10,
    contributions: [
      { moduleId: 'mod-r101', coefficient: 6 },
      { moduleId: 'mod-r102', coefficient: 4 },
      { moduleId: 'mod-sae101', coefficient: 6 },
    ],
    weightedFormula: 'Moyenne pondérée des ressources et SAÉs de l’UE',
    upcoming: [],
  },
  {
    id: 'ue-1-2',
    code: 'UE1.2',
    title: 'Optimiser des applications informatiques',
    average: 11.2,
    status: 'en_cours',
    ects: 8,
    contributions: [
      { moduleId: 'mod-r101', coefficient: 2 },
      { moduleId: 'mod-r106', coefficient: 4 },
      { moduleId: 'mod-r107', coefficient: 3 },
    ],
    weightedFormula: 'Moyenne pondérée des ressources et SAÉs de l’UE',
    upcoming: [],
  },
  {
    id: 'ue-1-3',
    code: 'UE1.3',
    title: 'Administrer des systèmes informatiques',
    average: 9.42,
    status: 'non_validee',
    ects: 8,
    contributions: [
      { moduleId: 'mod-r103', coefficient: 6 },
      { moduleId: 'mod-r104', coefficient: 4 },
      { moduleId: 'mod-r110', coefficient: 2 },
      { moduleId: 'mod-sae103', coefficient: 8 },
    ],
    weightedFormula: '188,40 points ÷ 20 coefficients = 9,42/20',
    upcoming: [
      {
        id: 'ev-sae103-sout',
        label: 'SAÉ1.03 · Soutenance finale',
        date: '2026-12-15',
        moduleId: 'mod-sae103',
        moduleCode: 'SAÉ1.03',
        moduleTitle: 'Installation d’un poste pour le développement',
        moduleKind: 'SAE',
        weightInModule: 0.5,
        ueCoefficient: 8,
        currentModuleAverage: 8.5,
      },
    ],
  },
  {
    id: 'ue-1-4',
    code: 'UE1.4',
    title: 'Gérer des données de l’information',
    average: 14.1,
    status: 'validee',
    ects: 8,
    contributions: [{ moduleId: 'mod-r105', coefficient: 4 }],
    weightedFormula: 'Moyenne pondérée des ressources et SAÉs de l’UE',
    upcoming: [],
  },
  {
    id: 'ue-1-5',
    code: 'UE1.5',
    title: 'Conduire un projet',
    average: 12.8,
    status: 'validee',
    ects: 6,
    contributions: [{ moduleId: 'mod-r108', coefficient: 4 }],
    weightedFormula: 'Moyenne pondérée des ressources et SAÉs de l’UE',
    upcoming: [],
  },
  {
    id: 'ue-1-6',
    code: 'UE1.6',
    title: 'Collaborer au sein d’une équipe',
    average: 13.2,
    status: 'validee',
    ects: 6,
    contributions: [
      { moduleId: 'mod-r103', coefficient: 1 },
      { moduleId: 'mod-r109', coefficient: 2 },
      { moduleId: 'mod-r110', coefficient: 2 },
    ],
    weightedFormula: 'Moyenne pondérée des ressources et SAÉs de l’UE',
    upcoming: [],
  },
]

function toUeSummary(ue: UeSeed): UeSummary {
  return {
    id: ue.id,
    code: ue.code,
    title: ue.title,
    average: ue.average,
    status: ue.status,
    ects: ue.ects,
  }
}

const recentGrades: RecentGrade[] = [
  {
    evaluationId: 'ev-r103-rep',
    moduleId: 'mod-r103',
    moduleCode: 'R1.03',
    moduleTitle: 'Architecture des ordinateurs',
    evaluationTitle: 'Représentation des données',
    type: 'TP',
    date: '2026-11-20',
    grade: { status: 'NOTE', score: 18, maxScore: 20 },
    isNew: true,
  },
  {
    evaluationId: 'ev-r101-ctrl',
    moduleId: 'mod-r101',
    moduleCode: 'R1.01',
    moduleTitle: 'Initiation au développement',
    evaluationTitle: 'Structures de contrôle',
    type: 'DS',
    date: '2026-11-19',
    grade: { status: 'NOTE', score: 15, maxScore: 20 },
    isNew: true,
  },
  {
    evaluationId: 'ev-r105-sql',
    moduleId: 'mod-r105',
    moduleCode: 'R1.05',
    moduleTitle: 'Bases de données',
    evaluationTitle: 'Requêtes SQL',
    type: 'TP',
    date: '2026-11-17',
    grade: { status: 'NOTE', score: 14.5, maxScore: 20 },
    isNew: false,
  },
  {
    evaluationId: 'ev-sae101-sout',
    moduleId: 'mod-sae101',
    moduleCode: 'SAÉ1.01',
    moduleTitle: 'Implémentation d’un besoin',
    evaluationTitle: 'Soutenance intermédiaire',
    type: 'Projet',
    date: '2026-11-14',
    grade: { status: 'NOTE', score: 14.25, maxScore: 20 },
    isNew: false,
  },
]

export function getSemester(id: string): Semester {
  return MOCK_SEMESTERS.find((item) => item.id === id) ?? MOCK_SEMESTERS[0]
}

export function listUeSummaries(semesterId: string): UeSummary[] {
  if (semesterId !== 's1-2026') return []
  return ues.map(toUeSummary)
}

export function getUeDetail(ueId: string): UeDetail | null {
  const ue = ues.find((item) => item.id === ueId)
  if (!ue) return null
  const moduleList = ue.contributions.map((contribution) =>
    toSummary(findModule(contribution.moduleId), contribution.coefficient),
  )
  return {
    ...toUeSummary(ue),
    semesterId: 's1-2026',
    modules: moduleList,
    totalCoefficient: ue.contributions.reduce((sum, item) => sum + item.coefficient, 0),
    weightedFormula: ue.weightedFormula,
    upcomingEvaluations: ue.upcoming,
  }
}

export function listModuleSummaries(semesterId: string): ModuleSummary[] {
  if (semesterId !== 's1-2026') return []
  return modules.map((module) => toSummary(module, module.coefficient))
}

export function getModuleDetail(moduleId: string): ModuleDetail | null {
  const module = modules.find((item) => item.id === moduleId)
  if (!module) return null
  const counted = module.evaluations.filter(
    (evaluation) => evaluation.grade.status === 'NOTE' || evaluation.grade.status === 'ABS',
  )
  const absencesAsZero = module.evaluations.filter(
    (evaluation) => evaluation.grade.status === 'ABS',
  ).length
  return {
    ...toSummary(module, module.coefficient),
    semesterId: 's1-2026',
    evaluations: module.evaluations,
    countedEvaluations: counted.length,
    totalEvaluations: module.evaluations.length,
    absencesAsZero,
    promotionAverage: module.promotionAverage,
    promotionCount: module.promotionCount,
    weightedFormula: module.weightedFormula,
  }
}

export function getDashboard(semesterId: string): Dashboard {
  const semester = getSemester(semesterId)
  const ueAverages = listUeSummaries(semesterId)
  return {
    semester,
    overallAverage: semesterId === 's1-2026' ? 12.37 : null,
    ueAverages,
    recentGrades: semesterId === 's1-2026' ? recentGrades : [],
    lastSyncAt: '2026-11-20T14:32:00',
    source: 'SCODOC',
    evolution:
      semesterId === 's1-2026'
        ? [
            { date: '2026-09-15', average: 10.3 },
            { date: '2026-09-30', average: 11.1 },
            { date: '2026-10-12', average: 10.8 },
            { date: '2026-10-25', average: 11.7 },
            { date: '2026-11-05', average: 11.5 },
            { date: '2026-11-14', average: 12.1 },
            { date: '2026-11-20', average: 12.37 },
          ]
        : [],
    attention:
      semesterId === 's1-2026'
        ? { ueId: 'ue-1-3', ueCode: 'UE1.3', pointsMissing: 0.58 }
        : null,
  }
}

export function searchCatalog(query: string, semesterId: string) {
  const needle = query.trim().toLowerCase()
  if (!needle || semesterId !== 's1-2026') return []
  const ueHits = ues
    .filter(
      (ue) =>
        ue.code.toLowerCase().includes(needle) || ue.title.toLowerCase().includes(needle),
    )
    .map((ue) => ({ id: ue.id, kind: 'ue' as const, code: ue.code, title: ue.title }))
  const moduleHits = modules
    .filter(
      (module) =>
        module.code.toLowerCase().includes(needle) ||
        module.title.toLowerCase().includes(needle),
    )
    .map((module) => ({
      id: module.id,
      kind: module.kind === 'SAE' ? ('sae' as const) : ('ressource' as const),
      code: module.code,
      title: module.title,
    }))
  return [...ueHits, ...moduleHits].slice(0, 8)
}
