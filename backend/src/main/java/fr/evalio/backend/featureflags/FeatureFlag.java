package fr.evalio.backend.featureflags;

/**
 * Catalogue des flags. Ceux qui touchent aux données ou aux droits restent
 * côté serveur ({@code exposedToUi == false}) et ne partent pas dans
 * {@code GET /api/me/features}.
 */
public enum FeatureFlag {

	/**
	 * Écart entre la moyenne de l'étudiant et celle de la promotion,
	 * sur le détail d'une ressource. Désactivé par défaut.
	 */
	BETA_PROMOTION_COMPARISON("beta-promotion-comparison", false, true),

	/**
	 * Export des notes. Données personnelles : évaluation serveur uniquement.
	 */
	GRADES_EXPORT("grades-export", false, false);

	private final String key;
	private final boolean defaultValue;
	private final boolean exposedToUi;

	FeatureFlag(String key, boolean defaultValue, boolean exposedToUi) {
		this.key = key;
		this.defaultValue = defaultValue;
		this.exposedToUi = exposedToUi;
	}

	public String key() {
		return key;
	}

	public boolean defaultValue() {
		return defaultValue;
	}

	public boolean exposedToUi() {
		return exposedToUi;
	}

}
