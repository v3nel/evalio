package fr.evalio.backend.featureflags;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Surcharges locales ({@code evalio.feature-flags.defaults}).
 * Ignorées dès qu'une clé SDK ConfigCat est configurée.
 */
@ConfigurationProperties(prefix = "evalio.feature-flags")
public record FeatureFlagProperties(Map<String, Boolean> defaults) {

	public FeatureFlagProperties {
		defaults = defaults == null ? Map.of() : Map.copyOf(defaults);
	}

}
