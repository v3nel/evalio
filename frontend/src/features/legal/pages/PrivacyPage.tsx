import { Link } from 'react-router'

export default function PrivacyPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white px-12 py-10 dark:bg-surface">
      <header className="flex items-center">
        <Link to="/connexion" className="text-[26px] font-bold leading-[38px] text-brand">
          Evalio
        </Link>
        <div className="flex-1" />
        <p className="text-[13px] font-medium text-muted">IUT Montpellier-Sète</p>
      </header>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 py-16">
        <p className="text-[11px] font-semibold tracking-[1.2px] text-muted">RGPD</p>
        <h1 className="text-[32px] font-semibold leading-[46px] text-ink">Protection des données</h1>
        <p className="text-[15px] leading-[22px] text-muted">
          Les notes sont des données personnelles. Evalio n’affiche que les vôtres, à partir de la
          session ouverte via l’ENT (CAS). L’identité n’est jamais passée dans l’URL.
        </p>
        <p className="text-[15px] leading-[22px] text-muted">
          Les moyennes sont calculées à la volée avec les coefficients, jamais stockées. Une
          absence non justifiée compte comme 0/20. Les absences justifiées et les évaluations en
          attente sont exclues du calcul.
        </p>
        <p className="text-[15px] leading-[22px] text-muted">
          Evalio ne conserve jamais votre mot de passe ENT. Projet étudiant non officiel, distinct
          des services de l’Université de Montpellier.
        </p>
        <Link to="/connexion" className="text-sm font-medium text-brand">
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  )
}
