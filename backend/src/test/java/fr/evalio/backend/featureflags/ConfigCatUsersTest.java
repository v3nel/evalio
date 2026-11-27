package fr.evalio.backend.featureflags;

import java.util.List;

import com.configcat.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class ConfigCatUsersTest {

	@AfterEach
	void clearSecurity() {
		SecurityContextHolder.clearContext();
	}

	@Test
	void ignoresMissingAndAnonymousAuthentication() {
		assertNull(ConfigCatUsers.fromAuthentication(null));
		assertNull(ConfigCatUsers.fromAuthentication(new UsernamePasswordAuthenticationToken("cmartin", "n/a")));
		assertNull(ConfigCatUsers.fromAuthentication(new AnonymousAuthenticationToken(
				"key", "anonymousUser", List.of(new SimpleGrantedAuthority("ROLE_ANONYMOUS")))));

		TestingAuthenticationToken blank = new TestingAuthenticationToken("  ", "n/a");
		blank.setAuthenticated(true);
		assertNull(ConfigCatUsers.fromAuthentication(blank));
		assertNull(ConfigCatUsers.current());
	}

	@Test
	void mapsIdentifierEmailAndRoles() {
		User user = ConfigCatUsers.fromAuthentication(new UsernamePasswordAuthenticationToken(
				"camille.martin@etu.umontpellier.fr",
				"n/a",
				List.of(new SimpleGrantedAuthority("ROLE_STUDENT"))));

		assertEquals("camille.martin@etu.umontpellier.fr", user.getIdentifier());
		assertEquals("camille.martin@etu.umontpellier.fr", user.getAttribute("Email"));
		assertEquals(List.of("ROLE_STUDENT"), user.getAttribute(ConfigCatUsers.ROLES_ATTRIBUTE));
	}

}
