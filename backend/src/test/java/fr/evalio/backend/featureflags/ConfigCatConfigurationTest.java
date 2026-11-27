package fr.evalio.backend.featureflags;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ConfigCatConfigurationTest {

	private final ApplicationContextRunner runner = new ApplicationContextRunner()
		.withUserConfiguration(ConfigCatConfiguration.class, FeatureFlags.class);

	@Test
	void blankSdkKeyUsesLocalDefaults() {
		assertFalse(new ConfigCatProperties("  ", 0).remote());
		assertEquals(60, new ConfigCatProperties(null, 0).pollIntervalSeconds());
		assertTrue(new ConfigCatProperties("present", 15).remote());
		assertEquals(15, new ConfigCatProperties("present", 15).pollIntervalSeconds());
		assertTrue(new FeatureFlagProperties(null).defaults().isEmpty());

		runner.withPropertyValues("configcat.sdk-key=").run(context -> {
			FeatureFlags flags = context.getBean(FeatureFlags.class);
			assertFalse(flags.isEnabled(FeatureFlag.BETA_PROMOTION_COMPARISON));
			assertFalse(flags.isEnabled(FeatureFlag.GRADES_EXPORT));
			assertEquals(false, flags.uiFlags(null).get(FeatureFlag.BETA_PROMOTION_COMPARISON.key()));
			assertFalse(flags.uiFlags(null).containsKey(FeatureFlag.GRADES_EXPORT.key()));
		});
	}

	@Test
	void localPropertiesOverrideCodeDefaultsWithoutExposingServerFlags() {
		runner.withPropertyValues(
				"configcat.sdk-key=",
				"evalio.feature-flags.defaults[beta-promotion-comparison]=true",
				"evalio.feature-flags.defaults[grades-export]=true")
			.run(context -> {
				FeatureFlags flags = context.getBean(FeatureFlags.class);
				assertTrue(flags.isEnabled(FeatureFlag.BETA_PROMOTION_COMPARISON.key(), false, null));
				assertTrue(flags.isEnabled(FeatureFlag.GRADES_EXPORT.key(), false, null));
				assertEquals(true, flags.uiFlags(null).get(FeatureFlag.BETA_PROMOTION_COMPARISON.key()));
				assertFalse(flags.uiFlags(null).containsKey(FeatureFlag.GRADES_EXPORT.key()));
			});
	}

}
