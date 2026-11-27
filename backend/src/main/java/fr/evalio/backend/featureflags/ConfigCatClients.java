package fr.evalio.backend.featureflags;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import com.configcat.ConfigCatClient;
import com.configcat.LogLevel;
import com.configcat.OverrideBehaviour;
import com.configcat.OverrideDataSourceBuilder;
import com.configcat.PollingModes;

/**
 * Construit le singleton ConfigCat. Sans clé SDK, le client reste en
 * {@code LOCAL_ONLY} : le SDK ne crée pas de fetcher et ne contacte pas le CDN.
 */
final class ConfigCatClients {

	private ConfigCatClients() {
	}

	static ConfigCatClient create(ConfigCatProperties properties, FeatureFlagProperties flags) {
		if (!properties.remote()) {
			return openLocal("local-" + UUID.randomUUID(), flags.defaults());
		}
		return openRemote(properties.sdkKey(), properties.pollIntervalSeconds());
	}

	static ConfigCatClient openLocal(String sdkKey, Map<String, Boolean> defaults) {
		Map<String, Object> overrides = new LinkedHashMap<>();
		for (FeatureFlag flag : FeatureFlag.values()) {
			overrides.put(flag.key(), flag.defaultValue());
		}
		if (defaults != null) {
			defaults.forEach((key, value) -> {
				if (key != null && !key.isBlank() && value != null) {
					overrides.put(key, value);
				}
			});
		}
		return ConfigCatClient.get(sdkKey, options -> {
			options.flagOverrides(OverrideDataSourceBuilder.map(overrides), OverrideBehaviour.LOCAL_ONLY);
			options.logLevel(LogLevel.WARNING);
		});
	}

	static ConfigCatClient openRemote(String sdkKey, int pollIntervalSeconds) {
		int interval = Math.max(pollIntervalSeconds, 1);
		try {
			return ConfigCatClient.get(sdkKey, options -> {
				options.pollingMode(PollingModes.autoPoll(interval));
				options.logLevel(LogLevel.WARNING);
			});
		}
		catch (IllegalArgumentException ex) {
			throw new IllegalStateException(
					"Clé SDK ConfigCat refusée. Vérifiez la variable CONFIGCAT_SDK_KEY.");
		}
	}

}
