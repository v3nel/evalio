package fr.evalio.backend.featureflags;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MeFeaturesController.class)
class MeFeaturesControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockitoBean
	private FeatureFlags featureFlags;

	@Test
	@WithMockUser(username = "cmartin")
	void returnsUiFlagsFromTheAuthenticatedCall() throws Exception {
		when(featureFlags.uiFlags()).thenReturn(Map.of(FeatureFlag.BETA_PROMOTION_COMPARISON.key(), false));

		mockMvc.perform(get("/api/me/features"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$['beta-promotion-comparison']").value(false))
			.andExpect(jsonPath("$['grades-export']").doesNotExist());
	}

}
