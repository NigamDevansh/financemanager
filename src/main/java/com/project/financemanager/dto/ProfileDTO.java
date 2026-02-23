package com.project.financemanager.dto;

import java.time.LocalDateTime;

import com.project.financemanager.service.Enums.AuthProviderType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDTO {

    private Long id;
    private String fullName;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AuthProviderType authProviderType;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
