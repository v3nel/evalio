import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

export const THEME_STORAGE_KEY = 'theme'

export function getInitialTheme(): Theme {
	if (typeof window === 'undefined') {
		return 'light'
	}

	const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
	if (stored === 'light' || stored === 'dark') {
		return stored
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
