import { ApiError } from '@/api/errors.ts'
import type { ApiContract, UserSettings } from '@/api/types.ts'
import {
  getDashboard,
  getModuleDetail,
  getUeDetail,
  listModuleSummaries,
  listUeSummaries,
  MOCK_SEMESTERS,
  MOCK_SETTINGS,
  MOCK_STUDENT,
  searchCatalog,
} from '@/api/mock/data.ts'
import { isMockAuthenticated, setMockAuthenticated } from '@/api/mock/session.ts'

function delay(ms = 280): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function requireAuth(): void {
  if (!isMockAuthenticated()) {
    throw new ApiError(401, 'Non authentifié', 'UNAUTHENTICATED')
  }
}

let settings: UserSettings = { ...MOCK_SETTINGS }

export const mockApi: ApiContract = {
  async getMe() {
    await delay(160)
    requireAuth()
    return MOCK_STUDENT
  },

  async loginWithCas() {
    await delay(700)
    setMockAuthenticated(true)
    return { redirectTo: '/' }
  },

  async logout() {
    await delay(120)
    setMockAuthenticated(false)
  },

  async getSettings() {
    await delay(120)
    requireAuth()
    return settings
  },

  async updateSettings(patch) {
    await delay(160)
    requireAuth()
    settings = { ...settings, ...patch }
    return settings
  },

  async getSemesters() {
    await delay()
    requireAuth()
    return MOCK_SEMESTERS
  },

  async getDashboard(semesterId) {
    await delay()
    requireAuth()
    return getDashboard(semesterId)
  },

  async getUes(semesterId) {
    await delay()
    requireAuth()
    return listUeSummaries(semesterId)
  },

  async getUe(ueId) {
    await delay()
    requireAuth()
    const ue = getUeDetail(ueId)
    if (!ue) throw new ApiError(404, 'UE introuvable', 'NOT_FOUND')
    return ue
  },

  async getModules(semesterId) {
    await delay()
    requireAuth()
    return listModuleSummaries(semesterId)
  },

  async getModule(moduleId) {
    await delay()
    requireAuth()
    const module = getModuleDetail(moduleId)
    if (!module) throw new ApiError(404, 'Ressource introuvable', 'NOT_FOUND')
    return module
  },

  async search(query, semesterId) {
    await delay(120)
    requireAuth()
    return searchCatalog(query, semesterId)
  },
}
