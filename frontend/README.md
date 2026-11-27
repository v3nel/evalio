# Frontend Evalio

Application React (Vite + TypeScript) de consultation des notes pour les étudiants du BUT Informatique — IUT Montpellier-Sète.

L’interface suit les maquettes Figma **WebAppDesign** (page Web) : connexion ENT, tableau de bord, détail d’UE, détail de ressource.

## Stack

React 19, Vite, TypeScript, React Router, TanStack Query, Tailwind CSS, shadcn/ui, Recharts, ESLint, Prettier.

## Démarrage

```bash
cd frontend
npm install          # ou bun install
npm run dev
```

L’app s’ouvre sur `http://localhost:5173`. Par défaut elle tourne **avec des données mock** (Camille Martin, semestre 1 2026-2027), sans backend.

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement (proxy `/api` → `localhost:8080`) |
| `npm run build` | `tsc -b` + build de production |
| `npm run lint` | ESLint |
| `npm run preview` | Prévisualiser le build |

## Mode mock / API réelle

| Variable | Défaut | Effet |
| --- | --- | --- |
| `VITE_USE_MOCK` | `true` (sauf si `false`) | Client mock en mémoire, session `sessionStorage` |
| `VITE_API_BASE_URL` | vide | Origine des appels ; vide = même origine (proxy Vite) |

Copiez `.env.example` vers `.env` si besoin. Pour brancher le backend Spring :

```bash
VITE_USE_MOCK=false npm run dev
```

Le bouton « Se connecter avec l’ENT » redirige alors vers `/api/auth/cas/login`.

## Feature flags

Le front ne charge pas le SDK ConfigCat. `useFeatureFlag(key, defaultValue)` lit `GET /api/me/features` (TanStack Query, clé `['me', 'features']`). En mode mock, `MOCK_FEATURES` dans `src/api/mock/data.ts` renvoie les mêmes défauts que le backend (`beta-promotion-comparison` à `false`) : le détail d'une ressource ne change pas. Passer cette valeur à `true` affiche l'écart avec la promotion.

## Routes (maquettes)

| Route | Frame Figma |
| --- | --- |
| `/connexion` | 01 · Connexion |
| `/` | 02 · Tableau de bord |
| `/ue/:id` | 03 · Détail d’une UE |
| `/ressources/:id` | 04 · Détail d’une ressource |
| `/notes`, `/ue`, `/semestres`, `/parametres` | Navigation, même design system |
| 404 / erreurs / skeletons | États hors maquette, mêmes tokens |

Les identifiants étudiants ne figurent **jamais** dans l’URL : l’API est scoppée `/api/me/...`.
