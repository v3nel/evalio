package fr.evalio.backend.featureflags;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import com.configcat.ConfigCatClient;
import com.configcat.User;
import org.springframework.stereotype.Service;

/**
 * Lecture des flags. La valeur par défaut s'applique si ConfigCat n'a pas la clé
 * ou si l'évaluation échoue. Le ciblage utilise l'utilisateur authentifié.
 */
@Service
public class FeatureFlags {

	private final ConfigCatClient client;

	public FeatureFlags(ConfigCatClient client) {
		this.client = client;
	}

	public boolean isEnabled(FeatureFlag flag) {
		return isEnabled(flag.key(), flag.defaultValue(), ConfigCatUsers.current());
	}

	public boolean isEnabled(String key, boolean defaultValue) {
		return isEnabled(key, defaultValue, ConfigCatUsers.current());
	}

	public boolean isEnabled(String key, boolean defaultValue, User user) {
		return client.getValue(Boolean.class, key, user, defaultValue);
	}

	public Map<String, Boolean> uiFlags() {
		return uiFlags(ConfigCatUsers.current());
	}

	public Map<String, Boolean> uiFlags(User user) {
		Map<String, Boolean> exposed = new LinkedHashMap<>();
		for (FeatureFlag flag : FeatureFlag.values()) {
			if (flag.exposedToUi()) {
				exposed.put(flag.key(), isEnabled(flag.key(), flag.defaultValue(), user));
			}
		}
		return Collections.unmodifiableMap(exposed);
	}

}
