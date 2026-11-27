import evalioLargeDark from '@/assets/EvalioLargeDark.png'
import evalioLargeLight from '@/assets/EvalioLargeLight.png'
import evalioSmallDark from '@/assets/EvalioSmallDark.png'
import evalioSmallLight from '@/assets/EvalioSmallLight.png'
import { useTheme } from '@/lib/theme.ts'
import { cn } from '@/lib/utils.ts'

interface LogoProps {
  variant?: 'large' | 'small'
  className?: string
}

export function Logo({ variant = 'large', className }: LogoProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const src =
    variant === 'small'
      ? isDark
        ? evalioSmallDark
        : evalioSmallLight
      : isDark
        ? evalioLargeDark
        : evalioLargeLight

  return (
    <img
      src={src}
      alt="Evalio"
      className={cn('block h-8 w-auto object-contain', className)}
    />
  )
}
