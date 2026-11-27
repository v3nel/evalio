package fr.evalio.backend.featureflags;

import com.configcat.ConfigCatClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({ ConfigCatProperties.class, FeatureFlagProperties.class })
public class ConfigCatConfiguration {

	private static final Logger log = LoggerFactory.getLogger(ConfigCatConfiguration.class);

	@Bean(destroyMethod = "close")
	ConfigCatClient configCatClient(ConfigCatProperties configCat, FeatureFlagProperties flags) {
		if (configCat.remote()) {
			log.info("ConfigCat : polling automatique toutes les {} s.", configCat.pollIntervalSeconds());
		}
		else {
			log.info("ConfigCat : mode local (CONFIGCAT_SDK_KEY absente), aucun appel réseau.");
		}
		return ConfigCatClients.create(configCat, flags);
	}

}
