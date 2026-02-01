package com.project.financemanager.service;

import com.project.financemanager.dto.ProfileDTO;
import com.project.financemanager.entity.ProfileEntity;
import com.project.financemanager.repository.ProfileRepository;

import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;

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
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullname(profileDTO.getFullname())
                .email(profileDTO.getEmail())
                .password(profileDTO.getPassword())
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullname(profileEntity.getFullname())
                .email(profileEntity.getEmail())
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
}
