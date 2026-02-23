package com.project.financemanager.service;

import com.project.financemanager.dto.AuthDTO;
import com.project.financemanager.dto.ProfileDTO;
import com.project.financemanager.entity.ProfileEntity;
import com.project.financemanager.repository.ProfileRepository;
import com.project.financemanager.service.Enums.AuthProviderType;
import com.project.financemanager.util.JwtUtil;

import java.util.Map;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public ProfileDTO registerProfile(ProfileDTO profileDTO) {
        ProfileEntity newProfileEntity = toEntity(profileDTO);
        newProfileEntity.setActivationToken(UUID.randomUUID().toString());
        newProfileEntity = profileRepository.save(newProfileEntity);

        // send activation email
        String activationLink = "http://localhost:8080/api/v1/activate?token="
                + newProfileEntity.getActivationToken();
        String subject = "Activate your personal money manager account :) ";
        String body = "Please click the link below to activate your account:\n\n" + activationLink;
        emailService.sendEmail(newProfileEntity.getEmail(), subject, body);

        return toDTO(newProfileEntity);
    }

    public ProfileEntity toEntity(ProfileDTO profileDTO) {
        AuthProviderType authProvider = profileDTO.getAuthProviderType();
        if (authProvider == null) {
            // default to local in case of local login
            authProvider = AuthProviderType.LOCAL;
        }

        String encodedPassword = null;
        if (authProvider == AuthProviderType.LOCAL) {
            encodedPassword = passwordEncoder.encode(profileDTO.getPassword());
        }

        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(encodedPassword)
                .authProviderType(authProvider)
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .authProviderType(profileEntity.getAuthProviderType())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profileEntity -> {
                    profileEntity.setIsActive(true);
                    profileRepository.save(profileEntity);
                    return true;
                })
                .orElse(false);
    }

    public Boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return profileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public ProfileDTO getPublicProfile(String email) {
        ProfileEntity currentUser = null;
        if (email == null) {
            currentUser = getCurrentProfile();
        } else {
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        }
        return toDTO(currentUser);
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword()));
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token", token,
                    "user", getPublicProfile(authDTO.getEmail()));
        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
