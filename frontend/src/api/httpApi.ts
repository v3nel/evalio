import { casLoginUrl } from '@/api/config.ts'
import { http } from '@/api/http.ts'
import type { ApiContract } from '@/api/types.ts'

export const httpApi: ApiContract = {
  getMe: () => http.get('/api/me'),
  getFeatures: () => http.get('/api/me/features'),
  async loginWithCas() {
    window.location.assign(casLoginUrl('/'))
    return { redirectTo: casLoginUrl('/') }
  },
  logout: () => http.post('/api/auth/logout'),
  getSettings: () => http.get('/api/me/settings'),
  updateSettings: (patch) => http.patch('/api/me/settings', patch),
  getSemesters: () => http.get('/api/me/semesters'),
  getDashboard: (semesterId) =>
    http.get(`/api/me/dashboard?semesterId=${encodeURIComponent(semesterId)}`),
  getUes: (semesterId) => http.get(`/api/me/ues?semesterId=${encodeURIComponent(semesterId)}`),
  getUe: (ueId) => http.get(`/api/me/ues/${encodeURIComponent(ueId)}`),
  getModules: (semesterId) =>
    http.get(`/api/me/ressources?semesterId=${encodeURIComponent(semesterId)}`),
  getModule: (moduleId) => http.get(`/api/me/ressources/${encodeURIComponent(moduleId)}`),
  search: (query, semesterId) =>
    http.get(
      `/api/me/search?q=${encodeURIComponent(query)}&semesterId=${encodeURIComponent(semesterId)}`,
    ),
}
