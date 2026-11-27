import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import LoginPage from '../features/auth/pages/login.tsx'
import { ThemeProvider } from './ThemeProvider.tsx'

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<div className="flex min-h-svh items-center justify-center">
								<Link
									to="/auth/login"
									className="rounded-xl bg-[#E7314B] px-6 py-3 font-medium text-white transition-colors hover:bg-[#CE2C43]"
								>
									Se connecter
								</Link>
							</div>
						}
					/>
					<Route path="/auth/login" element={<LoginPage />} />
					<Route path="/login" element={<Navigate to="/auth/login" replace />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
