const STORAGE_KEY = 'evalio.mock.session'

export function isMockAuthenticated(): boolean {
  return window.sessionStorage.getItem(STORAGE_KEY) === '1'
}

export function setMockAuthenticated(value: boolean): void {
  if (value) {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } else {
    window.sessionStorage.removeItem(STORAGE_KEY)
  }
}
