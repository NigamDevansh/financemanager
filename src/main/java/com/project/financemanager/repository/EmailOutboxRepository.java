package com.project.financemanager.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.financemanager.entity.EmailOutboxEntity;

@Repository
public interface EmailOutboxRepository extends JpaRepository<EmailOutboxEntity, Long> {

    @Query("SELECT e FROM EmailOutboxEntity e WHERE e.status = 'PENDING' AND e.nextRetryAt <= :now")
    List<EmailOutboxEntity> findPendingEmails(@Param("now") LocalDateTime now);
}
