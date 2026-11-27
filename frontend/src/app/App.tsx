import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { QueryProvider } from '@/app/QueryProvider.tsx'
import { ThemeProvider } from '@/app/ThemeProvider.tsx'
import { AppLayout } from '@/components/layout/AppLayout.tsx'
import { RequireAuth } from '@/components/layout/RequireAuth.tsx'
import LoginPage from '@/features/auth/pages/login.tsx'
import DashboardPage from '@/features/dashboard/pages/DashboardPage.tsx'
import NotFoundPage from '@/features/errors/pages/NotFoundPage.tsx'
import PrivacyPage from '@/features/legal/pages/PrivacyPage.tsx'
import NotesPage from '@/features/notes/pages/NotesPage.tsx'
import ResourceDetailPage from '@/features/notes/pages/ResourceDetailPage.tsx'
import SemestersPage from '@/features/semesters/pages/SemestersPage.tsx'
import SettingsPage from '@/features/settings/pages/SettingsPage.tsx'
import UeDetailPage from '@/features/ues/pages/UeDetailPage.tsx'
import UesPage from '@/features/ues/pages/UesPage.tsx'

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/login" element={<Navigate to="/connexion" replace />} />
            <Route path="/auth/login" element={<Navigate to="/connexion" replace />} />
            <Route path="/confidentialite" element={<PrivacyPage />} />
            <Route element={<RequireAuth />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/ue" element={<UesPage />} />
                <Route path="/ue/:ueId" element={<UeDetailPage />} />
                <Route path="/ressources/:moduleId" element={<ResourceDetailPage />} />
                <Route path="/semestres" element={<SemestersPage />} />
                <Route path="/parametres" element={<SettingsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
