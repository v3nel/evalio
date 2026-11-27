package fr.evalio.backend.featureflags;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * {@code configcat.sdk-key} est alimenté par {@code CONFIGCAT_SDK_KEY}.
 * Une valeur vide sélectionne le mode local.
 */
@ConfigurationProperties(prefix = "configcat")
public record ConfigCatProperties(String sdkKey, int pollIntervalSeconds) {

	public ConfigCatProperties {
		sdkKey = sdkKey == null ? "" : sdkKey.trim();
		if (pollIntervalSeconds <= 0) {
			pollIntervalSeconds = 60;
		}
	}

	public boolean remote() {
		return !sdkKey.isBlank();
	}

}
