package fr.evalio.backend.featureflags;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Flags d'interface pour le SPA. Le SDK ConfigCat ne va pas dans le navigateur.
 * Les flags métier (données, droits) ne sont pas sérialisés ici.
 */
@RestController
@RequestMapping("/api/me")
public class MeFeaturesController {

	private final FeatureFlags featureFlags;

	public MeFeaturesController(FeatureFlags featureFlags) {
		this.featureFlags = featureFlags;
	}

	@GetMapping("/features")
	public Map<String, Boolean> features() {
		return featureFlags.uiFlags();
	}

}
