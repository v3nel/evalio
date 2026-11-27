import { Link } from 'react-router'
import { Button } from '@/components/ui/button.tsx'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Une erreur est survenue',
  message = 'Impossible de charger vos notes pour le moment. Réessayez dans un instant.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-8 text-center">
      <p className="text-[11px] font-semibold tracking-[1.2px] text-muted">EVALIO</p>
      <h1 className="text-[28px] font-semibold leading-[41px] text-ink">{title}</h1>
      <p className="max-w-md text-[15px] leading-[22px] text-muted">{message}</p>
      <div className="flex gap-3">
        {onRetry ? (
          <Button type="button" onClick={onRetry}>
            Réessayer
          </Button>
        ) : null}
        <Button asChild variant="outline">
          <Link to="/">Retour au tableau de bord</Link>
        </Button>
      </div>
    </div>
  )
}
