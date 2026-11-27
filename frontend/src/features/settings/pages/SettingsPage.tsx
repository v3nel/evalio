import { useNavigate } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api, queryKeys } from '@/api/index.ts'
import { ContentSkeleton } from '@/components/feedback/PageSkeleton.tsx'
import { ErrorState } from '@/components/feedback/ErrorState.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useMe } from '@/hooks/useMe.ts'
import { useTheme } from '@/lib/theme.ts'

export default function SettingsPage() {
  const me = useMe()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const settings = useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => api.getSettings(),
  })
  const logout = useMutation({
    mutationFn: () => api.logout(),
    onSuccess: async () => {
      await queryClient.clear()
      navigate('/connexion', { replace: true })
    },
  })
  const update = useMutation({
    mutationFn: (notifyOnNewGrade: boolean) => api.updateSettings({ notifyOnNewGrade }),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.settings, data)
    },
  })

  if (settings.isLoading) return <ContentSkeleton />
  if (settings.isError || !settings.data || !me.data) {
    return <ErrorState onRetry={() => void settings.refetch()} />
  }

  const student = me.data

  return (
    <div className="flex flex-col gap-5 p-8">
      <div>
        <h1 className="text-[28px] font-semibold leading-[41px] text-ink">Paramètres</h1>
        <p className="mt-1 text-sm leading-5 text-muted">
          Votre profil provient de l’ENT. Evalio n’affiche que vos propres notes.
        </p>
      </div>

      <section className="rounded-lg border border-line bg-surface p-6">
        <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Profil</h2>
        <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs text-muted">Nom</dt>
            <dd className="mt-1 font-medium">
              {student.firstName} {student.lastName}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Courriel</dt>
            <dd className="mt-1 font-medium">{student.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Numéro étudiant</dt>
            <dd className="mt-1 font-medium">{student.nip}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Formation</dt>
            <dd className="mt-1 font-medium">
              {student.group} · {student.formation}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Établissement</dt>
            <dd className="mt-1 font-medium">{student.campus}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-line bg-surface p-6">
        <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Affichage</h2>
        <p className="mt-1 text-xs text-muted">
          L’interface suit les maquettes claires. Le thème sombre est une option locale.
        </p>
        <div className="mt-4 flex gap-2">
          {(['light', 'dark'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={
                theme === value
                  ? 'rounded-lg bg-nav px-3 py-2 text-xs font-semibold text-brand'
                  : 'rounded-lg bg-canvas px-3 py-2 text-xs font-medium text-muted'
              }
            >
              {value === 'light' ? 'Clair' : 'Sombre'}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-surface p-6">
        <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Notifications</h2>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={settings.data.notifyOnNewGrade}
            onChange={(event) => update.mutate(event.target.checked)}
            className="size-4 accent-brand"
          />
          Me signaler les nouvelles notes publiées
        </label>
      </section>

      <section className="rounded-lg border border-line bg-surface p-6">
        <h2 className="text-[17px] font-semibold leading-[25px] text-ink">Session</h2>
        <p className="mt-1 text-xs text-muted">
          La déconnexion referme la session universitaire sur Evalio.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          {logout.isPending ? 'Déconnexion…' : 'Se déconnecter'}
        </Button>
      </section>
    </div>
  )
}
