export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export const CAS_LOGIN_PATH = '/api/auth/cas/login'

export function casLoginUrl(redirectPath = '/'): string {
  const redirect = encodeURIComponent(redirectPath)
  return `${API_BASE_URL}${CAS_LOGIN_PATH}?redirect=${redirect}`
}
