package fr.evalio.backend.featureflags;

import java.util.List;
import java.util.Map;

import com.configcat.User;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * User ConfigCat construit depuis l'authentification courante (CAS, plus tard).
 * Un visiteur anonyme ne devient pas une cible de ciblage.
 */
public final class ConfigCatUsers {

	static final String ROLES_ATTRIBUTE = "roles";

	private ConfigCatUsers() {
	}

	public static User current() {
		return fromAuthentication(SecurityContextHolder.getContext().getAuthentication());
	}

	public static User fromAuthentication(Authentication authentication) {
		if (authentication == null || !authentication.isAuthenticated()
				|| authentication instanceof AnonymousAuthenticationToken) {
			return null;
		}
		String identifier = authentication.getName();
		if (identifier == null || identifier.isBlank()) {
			return null;
		}
		User.Builder builder = User.newBuilder();
		if (identifier.contains("@")) {
			builder.email(identifier);
		}
		List<String> roles = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.filter(role -> role != null && !role.isBlank())
			.toList();
		if (!roles.isEmpty()) {
			builder.custom(Map.of(ROLES_ATTRIBUTE, roles));
		}
		return builder.build(identifier);
	}

}
