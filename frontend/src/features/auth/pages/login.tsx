import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { api, USE_MOCK } from '@/api/index.ts'
import { useMe } from '@/hooks/useMe.ts'
import { cn } from '@/lib/utils.ts'

export default function LoginPage() {
  const me = useMe()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (me.data) {
    return <Navigate to="/" replace />
  }

  async function handleLogin() {
    setError(null)
    setPending(true)
    try {
      const result = await api.loginWithCas()
      if (USE_MOCK) {
        await queryClient.invalidateQueries()
        navigate(result.redirectTo, { replace: true })
      }
    } catch {
      setError('La connexion ENT a échoué. Réessayez.')
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-white px-12 py-10 dark:bg-surface">
      <header className="flex items-center gap-4">
        <p className="text-[26px] font-bold leading-[38px] text-brand">Evalio</p>
        <div className="flex-1" />
        <p className="text-[13px] font-medium leading-[19px] text-muted">IUT Montpellier-Sète</p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[400px] flex-col gap-6">
          <p className="text-[11px] font-semibold leading-4 tracking-[1.2px] text-muted">
            VOTRE PARCOURS, EN CLAIR
          </p>
          <h1 className="text-[32px] font-semibold leading-[46px] text-ink">Bienvenue sur Evalio</h1>
          <p className="text-[15px] leading-[22px] text-muted">
            Vos notes, vos UE et votre progression.
            <br />
            Tout votre semestre au même endroit.
          </p>
          <button
            type="button"
            onClick={() => void handleLogin()}
            disabled={pending}
            className={cn(
              'flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-ent p-3 text-white',
              'text-sm font-semibold leading-5 hover:bg-[#b5263b] disabled:opacity-70',
            )}
          >
            {pending ? 'Redirection vers l’ENT…' : 'Se connecter avec l’ENT'}
            {pending ? null : <span className="text-lg font-normal leading-[26px]">→</span>}
          </button>
          {error ? <p className="text-xs text-bad">{error}</p> : null}
          <p className="text-xs leading-[17px] text-muted">
            Utilisez vos identifiants universitaires. Vous serez redirigé vers le service
            d’authentification CAS.
          </p>
          <div className="h-px w-full bg-line" />
          <div className="flex flex-col gap-2 text-xs leading-[17px]">
            <p className="font-medium text-ink">Vos données restent personnelles.</p>
            <p className="text-muted">
              L’accès à vos notes est sécurisé. Evalio ne conserve jamais votre mot de passe ENT.
            </p>
          </div>
        </div>
      </div>

      <footer className="flex items-start text-xs leading-[17px]">
        <p className="text-muted">BUT Informatique · Université de Montpellier</p>
        <div className="flex-1" />
        <Link to="/confidentialite" className="font-medium text-brand">
          Protection des données
        </Link>
      </footer>
    </div>
  )
}
