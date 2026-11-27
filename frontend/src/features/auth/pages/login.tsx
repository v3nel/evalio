import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import evalioLogoDark from "../../../assets/EvalioLargeDark.png";
import evalioLogoLight from "../../../assets/EvalioLargeLight.png";
import { ThemeToggle } from "../../../components/ui/ThemeToggle.tsx";
import { useTheme } from "../../../lib/theme.ts";

function LoginPage() {
	const { theme } = useTheme();
	const evalioLogo = theme === "dark" ? evalioLogoDark : evalioLogoLight;

	return (
		<div className="flex min-h-svh flex-col justify-between">
			<div className="flex flex-row items-center justify-between p-4">
				<img src={evalioLogo} alt="Evalio" className="h-8 w-auto" />
				<div className="flex flex-row items-center gap-3">
					<span className="text-black/65 dark:text-white/65">IUT Montpellier-Sète</span>
					<ThemeToggle />
				</div>
			</div>
			<div className="flex flex-col gap-5 w-lg self-center p-5 rounded-2xl">
				<div>
					<p className="text-black/60 dark:text-white/60 font-medium">VOTRE PARCOURS, EN CLAIR</p>
					<h1 className="text-3xl font-bold">Bienvenue sur Evalio</h1>
					<p className="text-black/80 dark:text-white/80">
						Vos notes, vos UE et votre progression. Tout votre semestre au même endroit
					</p>
				</div>
				<Link
					to="#"
					className="flex flex-row items-center gap-1 bg-[#E7314B] rounded-xl justify-center py-4 hover:bg-[#CE2C43] transition-colors"
				>
					<span className="text-white">Se connecter avec l'ENT</span>
					<ArrowRight className="size-6 text-white" />
				</Link>
				<div>
					<p className="text-black/80 dark:text-white/80">
						Utilisez vos identifiants universitaires. Vous serez redirigé vers le service d'authentification
						CAS
					</p>
				</div>
				<div className="h-0.5 w-full rounded-full bg-black/20 dark:bg-white/20"></div>
				<div>
					<p className="font-semibold">Vos données restent personnelles.</p>
					<p className="text-black/80 dark:text-white/80">
						L'accès à vos notes est sécurisé. Evalio ne conserve jamais votre mot de passer ENT.
					</p>
				</div>
			</div>
			<div className="flex flex-row justify-between p-4 text-black/80 dark:text-white/75">
				<span>BUT Informatique - Université de Montpellier</span>
				<a className="underline hover:font-medium transition-all px-2 text-center">Protection des données</a>
			</div>
		</div>
	);
}

export default LoginPage;
