package com.project.financemanager.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.financemanager.entity.ProfileEntity;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

    Optional<ProfileEntity> findByEmail(String email);
}
