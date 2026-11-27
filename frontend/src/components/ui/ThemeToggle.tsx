import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme.ts'

interface ThemeToggleProps {
	className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
	const { theme, toggleTheme } = useTheme()
	const isDark = theme === 'dark'

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
			title={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
			className={`inline-flex cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-black/5 p-2 text-black/75 transition-colors hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 ${className}`}
		>
			{isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
		</button>
	)
}
