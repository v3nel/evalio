import { type ReactNode, useCallback, useEffect, useState } from 'react'
import {
	getInitialTheme,
	type Theme,
	THEME_STORAGE_KEY,
	ThemeContext,
} from '../lib/theme.ts'

interface ThemeProviderProps {
	children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(getInitialTheme)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (event: MediaQueryListEvent) => {
			const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
			if (stored !== 'light' && stored !== 'dark') {
				setThemeState(event.matches ? 'dark' : 'light')
			}
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	const setTheme = useCallback((nextTheme: Theme) => {
		window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
		setThemeState(nextTheme)
	}, [])

	const toggleTheme = useCallback(() => {
		setThemeState((current) => {
			const nextTheme: Theme = current === 'dark' ? 'light' : 'dark'
			window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
			return nextTheme
		})
	}, [])

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
