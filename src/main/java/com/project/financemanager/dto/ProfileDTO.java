package com.project.financemanager.dto;

import java.time.LocalDateTime;

import com.project.financemanager.service.AuthProviderType.AuthProviderType;

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
    private String fullname;
    private String email;
    private String password;
    private AuthProviderType authProviderType;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
