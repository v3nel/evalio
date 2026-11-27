package fr.evalio.backend.featureflags;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.configcat.ConfigCatClient;
import com.configcat.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class FeatureFlagsTest {

	private ConfigCatClient client;

	@AfterEach
	void tearDown() throws Exception {
		SecurityContextHolder.clearContext();
		if (client != null) {
			client.close();
		}
	}

	@Test
	void localOverridesReplaceCodeDefaultsAndHideServerFlags() {
		client = ConfigCatClients.openLocal("test-" + UUID.randomUUID(), Map.of(
				FeatureFlag.BETA_PROMOTION_COMPARISON.key(), true,
				FeatureFlag.GRADES_EXPORT.key(), true));
		FeatureFlags flags = new FeatureFlags(client);

		assertTrue(flags.isEnabled(FeatureFlag.BETA_PROMOTION_COMPARISON.key(), false, null));
		assertTrue(flags.isEnabled(FeatureFlag.GRADES_EXPORT.key(), false, null));
		assertTrue(flags.isEnabled("flag-inconnu", true, null));
		assertFalse(flags.isEnabled("flag-inconnu", false, null));

		Map<String, Boolean> ui = flags.uiFlags(null);
		assertEquals(Map.of(FeatureFlag.BETA_PROMOTION_COMPARISON.key(), true), ui);
		assertFalse(ui.containsKey(FeatureFlag.GRADES_EXPORT.key()));
	}

	@Test
	void mockedClientReceivesTheExplicitUser() {
		client = mock(ConfigCatClient.class);
		User user = User.newBuilder().build("cmartin");
		when(client.getValue(Boolean.class, FeatureFlag.GRADES_EXPORT.key(), user, false)).thenReturn(true);
		FeatureFlags flags = new FeatureFlags(client);

		assertTrue(flags.isEnabled(FeatureFlag.GRADES_EXPORT.key(), false, user));
		verify(client).getValue(Boolean.class, FeatureFlag.GRADES_EXPORT.key(), user, false);
	}

	@Test
	void authenticatedUserIsForwardedAndAnonymousIsNot() {
		client = mock(ConfigCatClient.class);
		when(client.getValue(eq(Boolean.class), eq(FeatureFlag.GRADES_EXPORT.key()), any(User.class), eq(false)))
			.thenReturn(true);
		when(client.getValue(eq(Boolean.class), eq(FeatureFlag.GRADES_EXPORT.key()), isNull(), eq(false)))
			.thenReturn(false);
		FeatureFlags flags = new FeatureFlags(client);

		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
				"cmartin", "n/a", List.of(new SimpleGrantedAuthority("ROLE_STUDENT"))));
		assertTrue(flags.isEnabled(FeatureFlag.GRADES_EXPORT));
		verify(client).getValue(eq(Boolean.class), eq(FeatureFlag.GRADES_EXPORT.key()),
				argThat(user -> user != null && "cmartin".equals(user.getIdentifier())
						&& List.of("ROLE_STUDENT").equals(user.getAttribute(ConfigCatUsers.ROLES_ATTRIBUTE))),
				eq(false));

		SecurityContextHolder.getContext().setAuthentication(new AnonymousAuthenticationToken(
				"key", "anonymousUser", List.of(new SimpleGrantedAuthority("ROLE_ANONYMOUS"))));
		assertFalse(flags.isEnabled(FeatureFlag.GRADES_EXPORT));
		verify(client).getValue(Boolean.class, FeatureFlag.GRADES_EXPORT.key(), null, false);
	}

}
