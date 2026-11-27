import { Link } from 'react-router'
import { Logo } from '@/components/Logo.tsx'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white px-12 py-10 dark:bg-surface">
      <header className="flex items-center">
        <Link to="/" aria-label="Evalio — Tableau de bord">
          <Logo className="h-9" />
        </Link>
        <div className="flex-1" />
        <p className="text-[13px] font-medium text-muted">IUT Montpellier-Sète</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-[11px] font-semibold tracking-[1.2px] text-muted">ERREUR 404</p>
        <h1 className="text-[32px] font-semibold leading-[46px] text-ink">Page introuvable</h1>
        <p className="max-w-[400px] text-center text-[15px] leading-[22px] text-muted">
          Cette adresse ne correspond à aucune page Evalio. Vérifiez le lien ou revenez au tableau
          de bord.
        </p>
        <Link
          to="/"
          className="flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-white"
        >
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  )
}
