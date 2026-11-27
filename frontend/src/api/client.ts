import { USE_MOCK } from '@/api/config.ts'
import { httpApi } from '@/api/httpApi.ts'
import { mockApi } from '@/api/mock/api.ts'
import type { ApiContract } from '@/api/types.ts'

export const api: ApiContract = USE_MOCK ? mockApi : httpApi
