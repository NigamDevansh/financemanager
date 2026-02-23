package com.project.financemanager.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.project.financemanager.service.Enums.AuthProviderType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    @Column(unique = true)
    private String email;
    private String password;
    private String profileImageUrl;
    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String activationToken;
    private Boolean isActive;
    @Enumerated(EnumType.STRING)
    private AuthProviderType authProviderType;

    // this is a hook that is called before the entity is created in the table
    @PrePersist
    public void prePersist() {
        if (this.isActive == null) {
            this.isActive = false;
        }
    }
}
