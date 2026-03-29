package com.project.financemanager.security;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.project.financemanager.entity.ProfileEntity;
import com.project.financemanager.repository.ProfileRepository;
import com.project.financemanager.service.Enums.AuthProviderType;
import com.project.financemanager.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${financemanager.frontend.url}")
    private String frontendUrl;

    private final ProfileRepository profileRepository;
    private final JwtUtil jwtUtil;
    private final AuthCodeStore authCodeStore;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        log.info("OAuth2 login success for email: {}", email);

        var existingProfile = profileRepository.findByEmail(email);

        if (existingProfile.isPresent()) {
            ProfileEntity existing = existingProfile.get();

            if (existing.getAuthProviderType() == AuthProviderType.LOCAL) {
                log.warn("User {} tried Google login but signed up with email/password", email);
                String redirectUrl = frontendUrl + "/oauth2/callback?error=provider_conflict&provider=LOCAL";
                getRedirectStrategy().sendRedirect(request, response, redirectUrl);
                return;
            }
        }

        ProfileEntity profile = existingProfile.orElseGet(() -> {
            // First time Google login → create account
            log.info("Creating new profile for OAuth2 user: {}", email);
            ProfileEntity newProfile = ProfileEntity.builder()
                    .email(email)
                    .fullName(name)
                    .profileImageUrl(picture)
                    .authProviderType(AuthProviderType.GOOGLE)
                    .isActive(true) // Google already verified their email!
                    .build();
            return profileRepository.save(newProfile);
        });

        String jwtToken = jwtUtil.generateToken(profile.getEmail());
        String code = authCodeStore.generateAuthCode(jwtToken);
        String redirectUrl = frontendUrl + "/oauth2/callback?code=" + code;
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);

    }

}
